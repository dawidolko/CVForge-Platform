/*
 * Opening the finished CV in its own tab.
 *
 * The builder around the sheet is useful while editing and in the way when you
 * just want to look at the result, hand it to somebody, or print it. This opens
 * a clean window containing the sheet alone, with its own toolbar.
 *
 * The new window reuses the current page's stylesheets rather than duplicating
 * the design, so the two can never drift apart.
 */

export type PreviewLabels = {
  title: string;
  print: string;
  downloadHtml: string;
  close: string;
  hint: string;
};

/** The sheet as it stands, with the on-screen scaling removed. */
function sheetMarkup(): string | null {
  const sheet = document.querySelector('.sheet');
  if (!sheet) return null;

  const clone = sheet.cloneNode(true) as HTMLElement;
  // The preview scales the sheet to fit its column; at full size it must not.
  clone.style.transform = '';
  clone.style.fontSize = (sheet as HTMLElement).style.fontSize;
  clone.classList.remove('origin-top-left');
  // Page-break markers belong to the editor, not to the document.
  clone.querySelectorAll('.sheet-page-break').forEach((node) => node.remove());
  return clone.outerHTML;
}

function documentHtml(sheet: string, fileTitle: string, labels: PreviewLabels): string {
  const styles = [...document.querySelectorAll('link[rel="stylesheet"], style')]
    .map((node) => node.outerHTML)
    .join('\n');

  return `<!doctype html>
<html lang="${document.documentElement.lang || 'en'}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${fileTitle}</title>
${styles}
<style>
  body { margin: 0; background: #e8e4dc; display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px 12px 48px; }
  .cvf-bar { position: sticky; top: 12px; z-index: 10; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
             background: #ffffff; border: 1px solid #e2d9cb; border-radius: 12px; padding: 10px 12px;
             box-shadow: 0 6px 20px rgb(23 19 16 / 0.10); font: 500 14px Inter, system-ui, sans-serif; }
  .cvf-bar button { font: inherit; cursor: pointer; border-radius: 8px; padding: 8px 14px; border: 1px solid #e2d9cb; background: #fff; color: #3b332c; }
  .cvf-bar button.primary { background: #c2410c; border-color: #c2410c; color: #fff; }
  .cvf-bar button:hover { border-color: #c2410c; color: #c2410c; }
  .cvf-bar button.primary:hover { background: #ea580c; color: #fff; }
  .cvf-hint { color: #6b6055; font-size: 12px; }
  /* The sheet keeps its real size here; only very narrow screens scale it. */
  .sheet { box-shadow: 0 1px 2px rgb(23 19 16 / .08), 0 12px 32px rgb(23 19 16 / .14); }
  @media (max-width: 840px) {
    .sheet { transform: scale(calc((100vw - 24px) / 794)); transform-origin: top left; }
    body { align-items: flex-start; }
  }
  @media print {
    body { background: #fff; margin: 0; padding: 0; display: block; }
    .cvf-bar { display: none !important; }
    .sheet { transform: none !important; box-shadow: none; }
    @page { size: A4; margin: 0; }
  }
</style>
</head>
<body>
  <div class="cvf-bar">
    <button type="button" class="primary" onclick="window.print()">${labels.print}</button>
    <button type="button" onclick="cvfDownload()">${labels.downloadHtml}</button>
    <button type="button" onclick="window.close()">${labels.close}</button>
    <span class="cvf-hint">${labels.hint}</span>
  </div>
  ${sheet}
<script>
  function cvfDownload() {
    // Saves this very page, toolbar removed, as one self-contained file.
    var doc = document.documentElement.cloneNode(true);
    var bar = doc.querySelector('.cvf-bar');
    if (bar) bar.remove();
    var blob = new Blob(['<!doctype html>' + doc.outerHTML], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = ${JSON.stringify(fileTitle)} + '.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
</script>
</body>
</html>`;
}

export function openPreviewWindow(fileTitle: string, labels: PreviewLabels): boolean {
  const sheet = sheetMarkup();
  if (!sheet) return false;

  const target = window.open('', '_blank');
  // Blocked by a pop-up blocker: the caller tells the user rather than failing silently.
  if (!target) return false;

  target.document.open();
  target.document.write(documentHtml(sheet, fileTitle, labels));
  target.document.close();
  return true;
}
