import type { Content } from './content';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { Builder } from './Builder';
import { TemplateGallery } from './TemplateGallery';

/*
 * The page.
 *
 * The Polish and the English version share this component and differ only in
 * the content object, so a layout fix can never reach one language alone.
 */
export function LandingPage({ content }: { content: Content }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-saffron focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {content.common.skipToContent}
      </a>

      <SiteHeader content={content} />

      <main id="main-content">
        {/* Hero */}
        <section className="no-print border-b border-line">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-saffron">
                CVForge
              </p>
              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {content.hero.heading}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-3">{content.hero.lead}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#builder"
                  className="rounded-lg bg-saffron px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-saffron-2"
                >
                  {content.hero.cta}
                </a>
                <a
                  href="#builder"
                  className="rounded-lg border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink-2 transition-colors hover:border-saffron hover:text-saffron"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3">
                {content.hero.badges.map((badge) => (
                  <li key={badge} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-saffron">✓</span>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            {/* A photograph rather than an illustration — this is a paper product. */}
            <div className="relative">
              <img
                src="/img/hero.webp"
                alt=""
                width={1600}
                height={1100}
                className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
                loading="eager"
                decoding="async"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 hidden w-44 rounded-xl border border-line bg-paper p-4 shadow-lg sm:block"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                  {content.ats.score}
                </p>
                <p className="font-display text-3xl font-extrabold tabular-nums text-saffron">92</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full w-[92%] rounded-full bg-saffron" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="no-print bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.benefits.map((benefit, index) => (
                <li key={benefit.title} className="rounded-xl border border-line bg-surface p-6">
                  <span aria-hidden="true" className="font-display text-sm font-bold tabular-nums text-saffron">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-bold text-ink">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{benefit.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Builder with the ATS tab */}
        <Builder content={content} />

        {/* Template gallery */}
        <section id="templates" className="no-print scroll-mt-20 bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {content.templates.title}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-3">{content.templates.intro}</p>
            <div className="mt-8">
              <TemplateGallery content={content} />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="no-print scroll-mt-20 border-t border-line bg-surface-2/50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {content.how.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink-3">{content.how.intro}</p>

                <ol className="mt-8 grid gap-6 sm:grid-cols-2">
                  {content.how.steps.map((step, index) => (
                    <li key={step.title} className="rounded-xl border border-line bg-paper p-6">
                      <span
                        aria-hidden="true"
                        className="grid size-8 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper"
                      >
                        {index + 1}
                      </span>
                      <h3 className="mt-3 font-display text-base font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-3">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <img
                src="/img/paper.webp"
                alt=""
                width={1200}
                height={800}
                className="hidden aspect-[3/4] w-full rounded-2xl border border-line object-cover lg:block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* FAQ — details/summary only, no JavaScript. */}
        <section id="faq" className="no-print scroll-mt-20 bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {content.faq.title}
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {content.faq.items.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold text-ink marker:content-['']">
                    {item.question}
                    <span aria-hidden="true" className="shrink-0 text-saffron transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
    </>
  );
}
