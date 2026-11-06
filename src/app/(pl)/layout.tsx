import type { Metadata } from 'next';
import '../globals.css';
import { fontVariables } from '../fonts';
import { CONTENT_SECURITY_POLICY } from '../csp';
import { THEME_INIT_SCRIPT } from '@/components/ThemeToggle';

const OPIS =
  'Darmowy kreator CV działający w przeglądarce: wypełnij formularz, wybierz jeden z sześciu szablonów i wydrukuj arkusz A4. Bez konta i bez wysyłania danych.';

const OG_ALT = 'CVForge: kreator CV na jedną stronę A4';

export const metadata: Metadata = {
  metadataBase: new URL('https://cvforge.dawidolko.pl'),
  title: { default: 'CVForge — kreator CV na jedną stronę A4', template: '%s — CVForge' },
  description: OPIS,
  keywords: ['kreator CV', 'darmowe CV', 'szablony CV', 'CV po polsku', 'CV do PDF', 'CV A4'],
  authors: [{ name: 'Dawid Olko', url: 'https://dawidolko.pl' }],
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: 'en_GB',
    url: 'https://cvforge.dawidolko.pl/pl/',
    siteName: 'CVForge',
    title: 'CVForge — kreator CV na jedną stronę A4',
    description: OPIS,
    images: [{ url: 'https://cvforge.dawidolko.pl/og-image.png', width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: { card: 'summary_large_image', title: 'CVForge — kreator CV na jedną stronę A4', description: OPIS, images: ['https://cvforge.dawidolko.pl/og-image.png'] },
  alternates: {
    canonical: 'https://cvforge.dawidolko.pl/pl/',
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
  url: 'https://cvforge.dawidolko.pl/pl/',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Dowolna przeglądarka',
  description: OPIS,
  inLanguage: 'pl',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' },
  author: { '@type': 'Person', name: 'Dawid Olko', url: 'https://dawidolko.pl' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={fontVariables} suppressHydrationWarning>
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
