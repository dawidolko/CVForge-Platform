'use client';

import { useEffect, useState } from 'react';
import type { Tresc } from './tresc';

export function SiteHeader({ t }: { t: Tresc }) {
  const [otwarte, setOtwarte] = useState(false);

  /*
   * Escape zamyka menu na telefonie. Bez tego jedynym wyjsciem jest trafienie
   * w przycisk — a osoba poruszajaca sie klawiatura nie ma jak sie wycofac.
   */
  useEffect(() => {
    if (!otwarte) return;
    const naKlawisz = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOtwarte(false);
    };
    document.addEventListener('keydown', naKlawisz);
    return () => document.removeEventListener('keydown', naKlawisz);
  }, [otwarte]);

  const linki = [
    { href: '#kreator', label: t.nav.kreator },
    { href: '#szablony', label: t.nav.szablony },
    { href: '#jak', label: t.nav.jak },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href={t.sciezka} className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-md bg-steel-700 font-display text-lg font-bold text-white"
          >
            CV
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-900">CVForge</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.kreator}>
          {linki.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-sand-100 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href={t.drugiJezyk.sciezka}
            hrefLang={t.drugiJezyk.kod}
            className="ml-2 rounded-md border border-sand-200 px-3 py-1.5 text-sm font-medium text-ink-500 transition-colors hover:border-steel-500 hover:text-steel-600"
          >
            {t.drugiJezyk.etykieta}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOtwarte((v) => !v)}
          aria-expanded={otwarte}
          aria-controls="menu-mobilne"
          className="rounded-md p-2 text-ink-500 transition-colors hover:bg-sand-100 hover:text-ink-900 md:hidden"
        >
          <span className="sr-only">{t.nav.kreator}</span>
          <svg viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {otwarte && (
        <nav id="menu-mobilne" className="border-t border-sand-200 px-4 py-3 md:hidden" aria-label={t.nav.kreator}>
          <ul className="space-y-1">
            {linki.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOtwarte(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sand-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={t.drugiJezyk.sciezka}
                hrefLang={t.drugiJezyk.kod}
                className="block rounded-md px-3 py-2 text-sm font-medium text-steel-600 hover:bg-sand-100"
              >
                {t.drugiJezyk.etykieta}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
