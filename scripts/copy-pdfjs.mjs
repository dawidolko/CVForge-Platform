import { copyFileSync, mkdirSync } from 'node:fs';

/*
 * The PDF import loads pdf.js on demand from the site itself. The two files are
 * copied here rather than bundled because pdf.js needs its worker as a separate URL.
 */
const target = 'public/vendor/pdfjs';
mkdirSync(target, { recursive: true });
for (const file of ['pdf.min.mjs', 'pdf.worker.min.mjs']) {
  copyFileSync(`node_modules/pdfjs-dist/build/${file}`, `${target}/${file}`);
}
