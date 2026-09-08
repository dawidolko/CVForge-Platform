import type { Tresc } from './tresc';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { KreatorCV } from './KreatorCV';

/*
 * Uklad strony.
 *
 * Wersja polska i angielska korzystaja z tego samego komponentu — rozni je
 * wylacznie obiekt z trescia. Dzieki temu poprawka ukladu nigdy nie dotyczy
 * tylko jednego jezyka.
 */
export function StronaGlowna({ t }: { t: Tresc }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-steel-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.wspolne.przejdzDoTresci}
      </a>

      <SiteHeader t={t} />

      <main id="main-content">
        {/* Hero */}
        <section className="border-b border-sand-200 bg-sand-50 print:hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sand-200 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-steel-600">
                CVForge
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
                {t.hero.naglowek}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{t.hero.lead}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#kreator"
                  className="rounded-lg bg-steel-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
                >
                  {t.hero.cta}
                </a>
                <a
                  href="#szablony"
                  className="rounded-lg border border-sand-300 bg-paper px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-steel-500 hover:text-steel-600"
                >
                  {t.hero.ctaDrugie}
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
                {t.hero.znaczniki.map((znacznik) => (
                  <li key={znacznik} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-copper-500">
                      ✓
                    </span>
                    {znacznik}
                  </li>
                ))}
              </ul>
            </div>

            {/* Miniatura arkusza — sama typografia, bez obrazka do pobrania. */}
            <div aria-hidden="true" className="hidden lg:block">
              <div className="mx-auto w-full max-w-sm rotate-[-1.5deg] rounded-lg bg-paper p-8 shadow-[0_1px_2px_rgb(20_24_32/0.08),0_18px_44px_rgb(20_24_32/0.14)]">
                <div className="h-3 w-2/3 rounded bg-steel-700" />
                <div className="mt-2 h-2 w-1/3 rounded bg-sand-300" />
                <div className="mt-6 space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-sand-200" />
                  <div className="h-1.5 w-11/12 rounded bg-sand-200" />
                  <div className="h-1.5 w-4/5 rounded bg-sand-200" />
                </div>
                <div className="mt-6 h-2 w-1/4 rounded bg-copper-500" />
                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-sand-200" />
                  <div className="h-1.5 w-10/12 rounded bg-sand-200" />
                  <div className="h-1.5 w-9/12 rounded bg-sand-200" />
                </div>
                <div className="mt-6 h-2 w-1/3 rounded bg-steel-500" />
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="h-1.5 rounded bg-sand-200" />
                  <div className="h-1.5 rounded bg-sand-200" />
                  <div className="h-1.5 rounded bg-sand-200" />
                  <div className="h-1.5 rounded bg-sand-200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zalety */}
        <section className="bg-paper py-14 sm:py-20 print:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.zalety.map((zaleta, i) => (
                <li key={zaleta.tytul} className="rounded-xl border border-sand-200 bg-sand-50 p-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-bold tabular-nums text-copper-500"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-bold text-ink-900">{zaleta.tytul}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{zaleta.opis}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kreator */}
        <KreatorCV t={t} />

        {/* Szablony */}
        <section id="szablony" className="scroll-mt-20 bg-paper py-14 sm:py-20 print:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {t.szablonyOpis.tytul}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-500">{t.szablonyOpis.wstep}</p>

            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {t.szablonyOpis.lista.map((szablon) => (
                <li key={szablon.id} className="flex flex-col rounded-xl border border-sand-200 bg-sand-50 p-6">
                  <h3 className="font-display text-lg font-bold text-ink-900">{szablon.nazwa}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{szablon.opis}</p>
                  <a
                    href="#kreator"
                    className="mt-4 text-sm font-semibold text-steel-600 underline-offset-4 hover:underline"
                  >
                    {t.hero.cta} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Jak to dziala */}
        <section id="jak" className="scroll-mt-20 border-t border-sand-200 bg-sand-100/60 py-14 sm:py-20 print:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {t.jak.tytul}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-500">{t.jak.wstep}</p>

            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.jak.kroki.map((krok, i) => (
                <li key={krok.tytul} className="rounded-xl border border-sand-200 bg-paper p-6">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-steel-700 font-display text-sm font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-ink-900">{krok.tytul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{krok.opis}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ — same znaczniki details/summary, bez JavaScriptu. */}
        <section id="faq" className="scroll-mt-20 bg-paper py-14 sm:py-20 print:hidden">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {t.faq.tytul}
            </h2>
            <div className="mt-8 divide-y divide-sand-200 border-y border-sand-200">
              {t.faq.pozycje.map((pozycja) => (
                <details key={pozycja.pytanie} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold text-ink-900 marker:content-['']">
                    {pozycja.pytanie}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-copper-500 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{pozycja.odpowiedz}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter t={t} />
    </>
  );
}
