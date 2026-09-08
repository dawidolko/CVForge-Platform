import type { Metadata } from 'next';
import '../globals.css';
import { THEME_INIT_SCRIPT } from '@/components/ThemeToggle';

const OPIS =
  'A free CV builder that runs entirely in your browser: fill in the form, pick one of three templates and print a ready A4 sheet. No account, no upload, no server.';

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
  },
  twitter: { card: 'summary_large_image', title: 'CVForge — build a CV that fits one A4 page', description: OPIS },
  alternates: {
    canonical: 'https://cvforge.dawidolko.pl/',
    // Obie wersje wskazuja na siebie nawzajem; angielska jest domyslna dla
    // odwiedzajacych spoza listy jezykow.
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
    <html lang="en" suppressHydrationWarning>
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
