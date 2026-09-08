import type { Tresc } from './tresc';

export function SiteFooter({ t }: { t: Tresc }) {
  return (
    <footer className="border-t border-sand-200 bg-ink-900 py-10 text-sand-100 print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-extrabold tracking-tight text-white">CVForge</p>
          <p className="mt-1 max-w-md text-sm text-sand-300">{t.stopka.opis}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a href="https://dawidolko.pl" className="text-sand-100 underline-offset-4 hover:text-white hover:underline">
              {t.stopka.autor}: Dawid Olko
            </a>
          </li>
          <li>
            <a
              href="https://github.com/dawidolko/CVForge-Platform"
              className="text-sand-100 underline-offset-4 hover:text-white hover:underline"
            >
              {t.stopka.kod}
            </a>
          </li>
          <li>
            <a href={t.drugiJezyk.sciezka} hrefLang={t.drugiJezyk.kod} className="text-sand-100 underline-offset-4 hover:text-white hover:underline">
              {t.drugiJezyk.etykieta}
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-6 max-w-7xl px-4 text-xs text-sand-300/70 sm:px-6">
        &copy; {new Date().getFullYear()} Dawid Olko. {t.stopka.prawa}
      </p>
    </footer>
  );
}
