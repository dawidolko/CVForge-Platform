'use client';

import type { ReactNode } from 'react';

/*
 * Form primitives used across the builder.
 *
 * Every field carries a real label bound by id — no placeholders standing in
 * for labels, because those vanish the moment someone starts typing and no
 * screen reader announces them.
 */

export function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  hint,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-describedby={hintId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink transition-colors placeholder:text-ink-4 hover:border-line-strong focus:border-saffron"
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-ink-4">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        aria-describedby={hintId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm leading-relaxed text-ink transition-colors hover:border-line-strong focus:border-saffron"
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-ink-4">
          {hint}
        </p>
      )}
    </div>
  );
}

/** A single list row with reordering and removal. */
export function EntryCard({
  title,
  index,
  total,
  labels,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: {
  title: string;
  index: number;
  total: number;
  labels: { moveUp: string; moveDown: string; remove: string };
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  const button =
    'rounded-md border border-line px-2 py-1 text-xs font-medium text-ink-3 transition-colors hover:border-saffron hover:text-saffron disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <li className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-ink-2">
          {title} {index + 1}
        </h4>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className={button}>
            <span aria-hidden="true">↑</span>
            <span className="sr-only">{labels.moveUp}</span>
          </button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className={button}>
            <span aria-hidden="true">↓</span>
            <span className="sr-only">{labels.moveDown}</span>
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md border border-line px-2 py-1 text-xs font-medium text-ink-3 transition-colors hover:border-saffron hover:text-saffron"
          >
            {labels.remove}
          </button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </li>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-dashed border-line-strong px-4 py-2.5 text-sm font-medium text-ink-3 transition-colors hover:border-saffron hover:bg-saffron-soft hover:text-saffron"
    >
      + {children}
    </button>
  );
}
