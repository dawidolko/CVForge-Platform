'use client';

import { useEffect, useRef, useState } from 'react';
import type { Resume, Settings } from './resume';
import type { Content } from './content';
import type { TemplateLabels } from './templates/types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TimelineTemplate } from './templates/TimelineTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

const MM_TO_PX = 96 / 25.4;
const SHEET_WIDTH = 210 * MM_TO_PX;
const SHEET_HEIGHT = 297 * MM_TO_PX;

/*
 * The A4 preview.
 *
 * The sheet keeps its real 210mm width and is only scaled with a transform.
 * Resizing it instead would change how the text wraps, and the preview would
 * stop matching the print — which is the one thing this screen promises.
 *
 * "Fit" follows the container width; the zoom buttons override it until the
 * user asks to fit again.
 */
export function ResumePreview({
  resume,
  settings,
  content,
  labels,
}: {
  resume: Resume;
  settings: Settings;
  content: Content;
  labels: TemplateLabels;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [zoom, setZoom] = useState<number | null>(null);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const measure = () => setFitScale(Math.min(1, element.clientWidth / SHEET_WIDTH));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /*
   * How many A4 pages the content actually needs. Measured from the rendered
   * sheet, so it reacts to the template, the type size and the text itself.
   */
  useEffect(() => {
    const element = sheet.current;
    if (!element) return;
    const measure = () => setPages(Math.max(1, Math.ceil(element.scrollHeight / SHEET_HEIGHT - 0.02)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [resume, settings]);

  const scale = zoom ?? fitScale;

  const shared = { resume, settings, labels };
  const template =
    settings.template === 'sidebar' ? <SidebarTemplate {...shared} />
    : settings.template === 'minimal' ? <MinimalTemplate {...shared} />
    : settings.template === 'timeline' ? <TimelineTemplate {...shared} />
    : settings.template === 'compact' ? <CompactTemplate {...shared} />
    : settings.template === 'modern' ? <ModernTemplate {...shared} />
    : <ClassicTemplate {...shared} />;

  const button =
    'rounded-md border border-line px-2 py-1 text-xs font-medium text-ink-3 transition-colors hover:border-saffron hover:text-saffron';

  return (
    <div>
      <div className="no-print mb-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setZoom(Math.max(0.3, scale - 0.15))} className={button}>
          − <span className="sr-only">{content.builder.preview.zoomOut}</span>
        </button>
        <button type="button" onClick={() => setZoom(Math.min(2, scale + 0.15))} className={button}>
          + <span className="sr-only">{content.builder.preview.zoomIn}</span>
        </button>
        <button type="button" onClick={() => setZoom(null)} className={button}>
          {content.builder.preview.fit}
        </button>
        <span className="text-xs tabular-nums text-ink-4">{Math.round(scale * 100)}%</span>
        <span className="ml-auto text-xs tabular-nums text-ink-4">A4 · {pages}</span>
      </div>

      {pages > 1 && (
        <p role="status" className="no-print mb-2 rounded-lg bg-saffron-soft px-3 py-2 text-xs text-saffron">
          {content.builder.preview.overflow}
        </p>
      )}

      <div ref={frame} className="w-full max-w-full overflow-hidden">
        <div style={{ height: SHEET_HEIGHT * scale * pages }}>
          <div
            ref={sheet}
            className="sheet relative origin-top-left"
            style={{ transform: `scale(${scale})`, fontSize: `${settings.fontScale}em` }}
          >
            {template}

            {/* Where the printer would break the page. */}
            {Array.from({ length: pages - 1 }, (_, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="sheet-page-break"
                style={{ top: SHEET_HEIGHT * (index + 1) }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
