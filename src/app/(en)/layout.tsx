import type { Metadata } from 'next';
import '../globals.css';
import { fontVariables } from '../fonts';
import { CONTENT_SECURITY_POLICY } from '../csp';
import { THEME_INIT_SCRIPT } from '@/components/ThemeToggle';

const OPIS =
  'A free CV builder that runs entirely in your browser: fill in the form, pick one of six templates and print a ready A4 sheet. No account, no upload, no server.';

const OG_ALT = 'CVForge: a CV builder that fits one A4 page';

export const metadata: Metadata = {
  metadataBase: new URL('https://cvforge.dawidolko.pl'),
  title: { default: 'CVForge — build a CV that fits one A4 page', template: '%s — CVForge' },
  description: OPIS,
  keywords: ['CV builder', 'resume builder', 'CV templates', 'A4 CV', 'PDF CV', 'free CV maker'],
  authors: [{ name: 'Dawid Olko', url: 'https://dawidolko.pl' }],
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: 'pl_PL',
    url: 'https://cvforge.dawidolko.pl/',
    siteName: 'CVForge',
    title: 'CVForge — build a CV that fits one A4 page',
    description: OPIS,
    images: [{ url: 'https://cvforge.dawidolko.pl/og-image.png', width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: { card: 'summary_large_image', title: 'CVForge — build a CV that fits one A4 page', description: OPIS, images: ['https://cvforge.dawidolko.pl/og-image.png'] },
  alternates: {
    canonical: 'https://cvforge.dawidolko.pl/',
    languages: {
      en: 'https://cvforge.dawidolko.pl/',
      pl: 'https://cvforge.dawidolko.pl/pl/',
      'x-default': 'https://cvforge.dawidolko.pl/',
    },
  },
  robots: { index: true, follow: true },
  referrer: 'strict-origin-when-cross-origin',
};

const daneStrukturalne = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CVForge',
  url: 'https://cvforge.dawidolko.pl/',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any browser',
  description: OPIS,
  inLanguage: 'en',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Person', name: 'Dawid Olko', url: 'https://dawidolko.pl' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        <script src="/a11y/a11y-panel.js" data-accent="#1d4ed8" defer></script>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(daneStrukturalne) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
