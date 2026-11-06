import { Fraunces, Inter } from 'next/font/google';

/*
 * Fetched at build time and served from the site itself. Only the latin subset
 * is preloaded; latin-ext stays declared, so Polish glyphs load on demand.
 */
const display = Fraunces({ subsets: ['latin'], axes: ['opsz'], display: 'swap', variable: '--font-fraunces' });
const body = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const fontVariables = `${display.variable} ${body.variable}`;
