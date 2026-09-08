'use client';

import { useEffect, useState } from 'react';
import type { Content } from './content';

export type Theme = 'light' | 'dark';

/*
 * Applied before the first paint by an inline script in the layout, so the page
 * never flashes the wrong theme. This component only keeps the button in sync
 * with what that script already decided.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('cvforge:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export function ThemeToggle({ content }: { content: Content }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? 'light';
    setTheme(current);
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('cvforge:theme', next);
    } catch {
      /* Private mode: the choice simply will not survive a reload. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? content.theme.toLight : content.theme.toDark}
      title={theme === 'dark' ? content.theme.toLight : content.theme.toDark}
      className="rounded-lg border border-line px-2.5 py-2 text-ink-3 transition-colors hover:border-saffron hover:text-saffron"
    >
      {/* Before hydration both icons would be a guess, so nothing is drawn. */}
      {ready && theme === 'dark' ? (
        <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M16 4l-1.4 1.4M5.4 14.6 4 16M16 16l-1.4-1.4M5.4 5.4 4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
          <path d="M17 11.5A7 7 0 0 1 8.5 3 7 7 0 1 0 17 11.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
