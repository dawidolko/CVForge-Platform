'use client';

import { useRef } from 'react';
import type { Resume, TemplateId } from './resume';
import { ATS_SAFE_TEMPLATES, DEFAULT_SETTINGS, DEMO, TEMPLATE_IDS } from './resume';
import type { Content } from './content';
import type { TemplateLabels } from './templates/types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TimelineTemplate } from './templates/TimelineTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

const MM_TO_PX = 96 / 25.4;
const CARD_WIDTH = 260;
const SCALE = CARD_WIDTH / (210 * MM_TO_PX);

/*
 * Template gallery.
 *
 * The thumbnails are the templates themselves, rendered small and filled with
 * the demo CV — not screenshots. A change to a template shows up here without
 * anybody remembering to regenerate an image.
 */
export function TemplateGallery({ content }: { content: Content }) {
  const rail = useRef<HTMLUListElement>(null);
  const resume: Resume = DEMO[content.locale];

  const labels: TemplateLabels = {
    contact: content.builder.sections.contact,
    summary: content.builder.sections.summary,
    experience: content.builder.sections.experience,
    education: content.builder.sections.education,
    skills: content.builder.sections.skills,
    languages: content.builder.sections.languages,
    projects: content.builder.sections.projects,
    present: content.common.present,
  };

  function render(id: TemplateId) {
    const props = { resume, settings: { ...DEFAULT_SETTINGS, template: id, accent: '#c2410c' }, labels };
    switch (id) {
      case 'sidebar':
        return <SidebarTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'timeline':
        return <TimelineTemplate {...props} />;
      case 'compact':
        return <CompactTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  }

  function scrollBy(direction: -1 | 1) {
    rail.current?.scrollBy({ left: direction * (CARD_WIDTH + 24) * 2, behavior: 'smooth' });
  }

  const arrow =
    'grid size-9 place-items-center rounded-full border border-line bg-paper text-ink-3 transition-colors hover:border-saffron hover:text-saffron';

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className={arrow} aria-label="←">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" onClick={() => scrollBy(1)} className={arrow} aria-label="→">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Horizontal rail; on a touch screen it is simply swiped. */}
      <ul
        ref={rail}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {TEMPLATE_IDS.map((id) => (
          <li key={id} className="w-[260px] shrink-0 snap-start">
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
              {/* The sheet is 210mm wide and scaled down; the frame crops it. */}
              <div style={{ width: CARD_WIDTH, height: 340, overflow: 'hidden' }} aria-hidden="true">
                <div
                  className="origin-top-left"
                  style={{ width: 210 * MM_TO_PX, transform: `scale(${SCALE})` }}
                >
                  {render(id)}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold text-ink">{content.templates.items[id].name}</h3>
                {ATS_SAFE_TEMPLATES.includes(id) && (
                  <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {content.templates.atsSafe}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-3">{content.templates.items[id].body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
