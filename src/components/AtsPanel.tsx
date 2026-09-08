'use client';

import { useMemo, useState } from 'react';
import type { Resume, TemplateId } from './resume';
import { reviewResume, type CheckStatus } from './atsCheck';
import { fillValues, type Content } from './content';

/*
 * The ATS review tab.
 *
 * Each rule prints what it looked for and what it found, so the score can be
 * argued with rather than trusted blindly. Nothing here calls a service — the
 * whole review runs on the text in the browser.
 */
export function AtsPanel({
  resume,
  template,
  content,
}: {
  resume: Resume;
  template: TemplateId;
  content: Content;
}) {
  const [advert, setAdvert] = useState('');
  const report = useMemo(() => reviewResume(resume, template, advert), [resume, template, advert]);
  const a = content.ats;

  const tone: Record<CheckStatus, { dot: string; text: string; mark: string }> = {
    pass: { dot: 'bg-emerald-500', text: 'text-ink-2', mark: '✓' },
    warn: { dot: 'bg-amber-500', text: 'text-ink-2', mark: '!' },
    fail: { dot: 'bg-rose-500', text: 'text-ink-2', mark: '×' },
  };

  const verdict = report.score >= 80 ? a.scoreGood : report.score >= 55 ? a.scoreOk : a.scoreBad;
  const ring = report.score >= 80 ? 'text-emerald-500' : report.score >= 55 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-ink-3">{a.intro}</p>

      {/* Score */}
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-line bg-paper p-5">
        <div className="relative grid size-24 shrink-0 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-line" />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${report.score} 100`}
              className={ring}
            />
          </svg>
          <span className="font-display text-2xl font-extrabold tabular-nums text-ink">{report.score}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold text-ink">
            {a.score}: {report.score}/100
          </p>
          <p className="mt-1 text-sm text-ink-3">{verdict}</p>
          <p className="mt-1 text-xs text-ink-4">
            {a.runOn}: {content.templates.items[template].name}
          </p>
        </div>
      </div>

      {/* Checks */}
      <ol className="space-y-2">
        {report.checks.map((check) => {
          const copy = a.checks[check.id];
          if (!copy) return null;
          const style = tone[check.status];
          return (
            <li key={check.id} className="flex gap-3 rounded-xl border border-line bg-paper p-4">
              <span
                aria-hidden="true"
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${style.dot}`}
              >
                {style.mark}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{copy.title}</p>
                <p className={`mt-0.5 text-sm leading-relaxed ${style.text}`}>
                  {fillValues(copy[check.status], check.values)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Job advert keywords */}
      <div className="rounded-xl border border-line bg-paper p-5">
        <label htmlFor="ats-advert" className="mb-1 block text-sm font-semibold text-ink">
          {a.advertLabel}
        </label>
        <p id="ats-advert-hint" className="mb-2 text-xs text-ink-4">
          {a.advertHint}
        </p>
        <textarea
          id="ats-advert"
          rows={5}
          value={advert}
          aria-describedby="ats-advert-hint"
          placeholder={a.advertPlaceholder}
          onChange={(event) => setAdvert(event.target.value)}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm leading-relaxed text-ink transition-colors placeholder:text-ink-4 hover:border-line-strong focus:border-saffron"
        />

        {report.keywords ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
                {a.matched} ({report.keywords.matched.length})
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {report.keywords.matched.map((word) => (
                  <li key={word} className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-400">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
                {a.missing} ({report.keywords.missing.length})
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {report.keywords.missing.map((word) => (
                  <li key={word} className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs text-rose-700 dark:text-rose-400">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-ink-4">{a.noKeywords}</p>
        )}
      </div>
    </div>
  );
}
