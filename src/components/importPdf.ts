/*
 * Reading an existing CV out of a PDF.
 *
 * Starting from a blank form when you already have a CV is the slowest part of
 * any builder. This pulls the text out of a PDF so it can be copied across, and
 * fills in the fields that can be recognised without guessing: e-mail, phone,
 * links and the name printed at the top.
 *
 * What it deliberately does not do is invent structure. Splitting arbitrary
 * prose into positions and dates is guesswork, and a wrong guess in a CV is
 * worse than no guess - so the rest of the text is shown for you to move over
 * yourself.
 *
 * pdf.js is loaded from a CDN only when somebody actually imports a PDF; it
 * never weighs down the first visit.
 */

import type { Contact } from './resume';

const PDFJS_VERSION = '4.6.82';
const PDFJS_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`;
const WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;

type PdfTextItem = { str?: string; transform?: number[] };
type PdfPage = { getTextContent: () => Promise<{ items: PdfTextItem[] }> };
type PdfDocument = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: ArrayBuffer }) => { promise: Promise<PdfDocument> };
};

let pdfLib: PdfLib | null = null;

async function loadPdfLib(): Promise<PdfLib> {
  if (pdfLib) return pdfLib;
  const module = (await import(/* webpackIgnore: true */ PDFJS_URL)) as unknown as PdfLib;
  module.GlobalWorkerOptions.workerSrc = WORKER_URL;
  pdfLib = module;
  return module;
}

export type PdfImport = {
  text: string;
  contact: Partial<Contact>;
};

/** Fields that can be recognised from raw text without guessing. */
function readContact(text: string, lines: string[]): Partial<Contact> {
  const contact: Partial<Contact> = {};

  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.]{2,}/)?.[0];
  if (email) contact.email = email;

  // Phone numbers are written a dozen ways; this covers the common ones.
  const phone = text.match(/(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){9,11}/)?.[0]?.trim();
  if (phone && phone.replace(/\D/g, '').length >= 9) contact.phone = phone;

  const linkedin = text.match(/(?:linkedin\.com\/in\/)[\w-]+/i)?.[0];
  if (linkedin) contact.linkedin = linkedin;

  const github = text.match(/(?:github\.com\/)[\w-]+/i)?.[0];
  if (github) contact.github = github;

  /*
   * The name is normally the first thing on a CV: two or three capitalised
   * words with no digits. pdf.js often returns a whole page as a single run of
   * text, so we look both at the opening lines and at the first words overall,
   * and give up rather than filling the field with a heading.
   */
  const looksLikeName = (words: string[]) =>
    words.length >= 2 &&
    words.length <= 4 &&
    words.every((word) => /^\p{Lu}[\p{L}'-]{1,}$/u.test(word));

  for (const line of lines.slice(0, 6)) {
    if (!line || line.length > 60 || /[@\d]/.test(line)) continue;
    const words = line.split(/\s+/);
    if (looksLikeName(words)) {
      contact.fullName = line;
      break;
    }
  }

  return contact;
}

export async function readPdf(file: File): Promise<PdfImport> {
  const lib = await loadPdfLib();
  const document = await lib.getDocument({ data: await file.arrayBuffer() }).promise;

  const pages: string[] = [];
  for (let number = 1; number <= document.numPages; number++) {
    const page = await document.getPage(number);
    const content = await page.getTextContent();

    /*
     * pdf.js returns positioned fragments, not lines. Joining them all with
     * spaces turns a page into one long run, which then makes it impossible to
     * tell where the name ends and the job title begins. Grouping by the Y
     * coordinate (transform[5]) rebuilds the real lines.
     */
    const byLine = new Map<number, string[]>();
    for (const item of content.items) {
      const textPart = item.str ?? '';
      if (!textPart.trim()) continue;
      // Round to a point, so fragments a hair apart still land on one line.
      const y = Math.round(item.transform?.[5] ?? 0);
      const key = [...byLine.keys()].find((existing) => Math.abs(existing - y) <= 2) ?? y;
      byLine.set(key, [...(byLine.get(key) ?? []), textPart]);
    }

    pages.push(
      [...byLine.entries()]
        .sort((a, b) => b[0] - a[0]) // PDF counts upwards from the bottom
        .map(([, parts]) => parts.join(' ').replace(/\s+/g, ' ').trim())
        .join('\n'),
    );
  }

  const text = pages
    .join('\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);

  return { text, contact: readContact(text, lines) };
}
