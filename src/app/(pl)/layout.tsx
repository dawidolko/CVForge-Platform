import type { Metadata } from 'next';
import '../globals.css';
import { THEME_INIT_SCRIPT } from '@/components/ThemeToggle';

const OPIS =
  'Darmowy kreator CV działający w całości w przeglądarce: wypełnij formularz, wybierz jeden z trzech szablonów i wydrukuj gotowy arkusz A4. Bez konta, bez wysyłania danych.';

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
  },
  twitter: { card: 'summary_large_image', title: 'CVForge — kreator CV na jedną stronę A4', description: OPIS },
  alternates: {
    canonical: 'https://cvforge.dawidolko.pl/pl/',
    languages: {
      en: 'https://cvforge.dawidolko.pl/',
      pl: 'https://cvforge.dawidolko.pl/pl/',
      'x-default': 'https://cvforge.dawidolko.pl/',
    },
  },
  robots: { index: true, follow: true },
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
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap"
        />
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
