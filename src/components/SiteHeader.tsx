'use client';

import { useEffect, useState } from 'react';
import type { Content } from './content';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader({ content }: { content: Content }) {
  const [open, setOpen] = useState(false);

  /* Escape closes the mobile menu — otherwise the only way out is the button. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: '#builder', label: content.nav.builder },
    { href: '#templates', label: content.nav.templates },
    { href: '#builder', label: content.nav.ats },
    { href: '#faq', label: content.nav.faq },
  ];

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href={content.path} className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-md bg-ink font-display text-lg font-bold text-paper"
          >
            CV
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">CVForge</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label={content.nav.builder}>
          {links.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={content.otherLocale.path}
            hrefLang={content.otherLocale.code}
            className="ml-2 rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-3 transition-colors hover:border-saffron hover:text-saffron"
          >
            {content.otherLocale.label}
          </a>
          <ThemeToggle content={content} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle content={content} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-md p-2 text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <span className="sr-only">{content.common.openMenu}</span>
            <svg viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-line px-4 py-3 md:hidden" aria-label={content.nav.builder}>
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={content.otherLocale.path}
                hrefLang={content.otherLocale.code}
                className="block rounded-md px-3 py-2 text-sm font-medium text-saffron hover:bg-surface-2"
              >
                {content.otherLocale.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
