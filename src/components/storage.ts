/*
 * Keeping work in the browser.
 *
 * CVForge has no backend — the document never leaves the device. It lives in
 * localStorage and can be exported to a JSON file, which is how a CV moves to
 * another computer without an account.
 */

import type { Resume, Settings } from './resume';

const RESUME_KEY = 'cvforge:resume';
const SETTINGS_KEY = 'cvforge:settings';

/*
 * localStorage throws in private mode and when site data is blocked. The
 * builder has to keep working in that case — just without remembering.
 */
function safely<T>(operation: () => T, fallback: T): T {
  try {
    return operation();
  } catch {
    return fallback;
  }
}

export function saveResume(resume: Resume): void {
  safely(() => localStorage.setItem(RESUME_KEY, JSON.stringify(resume)), undefined);
}

export function loadResume(): Resume | null {
  return safely(() => {
    const raw = localStorage.getItem(RESUME_KEY);
    return raw ? (JSON.parse(raw) as Resume) : null;
  }, null);
}

export function saveSettings(settings: Settings): void {
  safely(() => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)), undefined);
}

export function loadSettings(): Settings | null {
  return safely(() => {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? (JSON.parse(raw) as Settings) : null;
  }, null);
}

export function clearStorage(): void {
  safely(() => {
    localStorage.removeItem(RESUME_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  }, undefined);
}

/** A file name derived from the person's name, safe for any file system. */
export function fileName(fullName: string): string {
  const base = fullName
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return base ? `cv-${base}` : 'cv';
}

export function exportJson(resume: Resume, settings: Settings): void {
  const content = JSON.stringify({ version: 1, resume, settings }, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName(resume.contact.fullName)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export type ImportResult = { ok: true; resume: Resume; settings: Settings | null } | { ok: false };

/*
 * Import validates the shape before replacing anything. A file from another
 * tool, or a truncated one, must not be able to wipe someone's work.
 */
export async function importJson(file: File): Promise<ImportResult> {
  try {
    const raw = JSON.parse(await file.text()) as { resume?: Resume; settings?: Settings };
    const resume = raw.resume;
    if (!resume || typeof resume !== 'object' || !resume.contact || !Array.isArray(resume.experience)) {
      return { ok: false };
    }
    return { ok: true, resume, settings: raw.settings ?? null };
  } catch {
    return { ok: false };
  }
}
