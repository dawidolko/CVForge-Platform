'use client';

import type { ReactNode } from 'react';

/*
 * Elementy formularza uzywane w calym kreatorze.
 *
 * Kazde pole ma prawdziwa etykiete zwiazana z kontrolka przez id — bez
 * placeholderow udajacych etykiety, bo te znikaja w chwili, gdy uzytkownik
 * zaczyna pisac, i nie czyta ich zaden czytnik ekranu.
 */

export function Pole({
  id,
  etykieta,
  wartosc,
  onZmiana,
  typ = 'text',
  podpowiedz,
  autoComplete,
}: {
  id: string;
  etykieta: string;
  wartosc: string;
  onZmiana: (v: string) => void;
  typ?: string;
  podpowiedz?: string;
  autoComplete?: string;
}) {
  const idPodpowiedzi = podpowiedz ? `${id}-podpowiedz` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-700">
        {etykieta}
      </label>
      <input
        id={id}
        type={typ}
        value={wartosc}
        autoComplete={autoComplete}
        aria-describedby={idPodpowiedzi}
        onChange={(e) => onZmiana(e.target.value)}
        className="w-full rounded-lg border border-sand-200 bg-paper px-3 py-2 text-sm text-ink-900 transition-colors placeholder:text-ink-400 hover:border-sand-300 focus:border-steel-500"
      />
      {podpowiedz && (
        <p id={idPodpowiedzi} className="mt-1 text-xs text-ink-400">
          {podpowiedz}
        </p>
      )}
    </div>
  );
}

export function PoleWieloliniowe({
  id,
  etykieta,
  wartosc,
  onZmiana,
  wiersze = 4,
  podpowiedz,
}: {
  id: string;
  etykieta: string;
  wartosc: string;
  onZmiana: (v: string) => void;
  wiersze?: number;
  podpowiedz?: string;
}) {
  const idPodpowiedzi = podpowiedz ? `${id}-podpowiedz` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-700">
        {etykieta}
      </label>
      <textarea
        id={id}
        rows={wiersze}
        value={wartosc}
        aria-describedby={idPodpowiedzi}
        onChange={(e) => onZmiana(e.target.value)}
        className="w-full rounded-lg border border-sand-200 bg-paper px-3 py-2 text-sm leading-relaxed text-ink-900 transition-colors hover:border-sand-300 focus:border-steel-500"
      />
      {podpowiedz && (
        <p id={idPodpowiedzi} className="mt-1 text-xs text-ink-400">
          {podpowiedz}
        </p>
      )}
    </div>
  );
}

/** Karta pojedynczego wpisu listy, z akcjami kolejnosci i usuwania. */
export function KartaWpisu({
  tytul,
  pozycja,
  liczba,
  etykiety,
  onWGore,
  onWDol,
  onUsun,
  children,
}: {
  tytul: string;
  pozycja: number;
  liczba: number;
  etykiety: { wGore: string; wDol: string; usun: string };
  onWGore: () => void;
  onWDol: () => void;
  onUsun: () => void;
  children: ReactNode;
}) {
  const przycisk =
    'rounded-md border border-sand-200 px-2 py-1 text-xs font-medium text-ink-500 transition-colors hover:border-steel-500 hover:text-steel-600 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <li className="rounded-xl border border-sand-200 bg-sand-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-ink-700">
          {tytul} {pozycja + 1}
        </h4>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onWGore} disabled={pozycja === 0} className={przycisk}>
            <span aria-hidden="true">↑</span>
            <span className="sr-only">{etykiety.wGore}</span>
          </button>
          <button type="button" onClick={onWDol} disabled={pozycja === liczba - 1} className={przycisk}>
            <span aria-hidden="true">↓</span>
            <span className="sr-only">{etykiety.wDol}</span>
          </button>
          <button
            type="button"
            onClick={onUsun}
            className="rounded-md border border-sand-200 px-2 py-1 text-xs font-medium text-ink-500 transition-colors hover:border-copper-500 hover:text-copper-600"
          >
            {etykiety.usun}
          </button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </li>
  );
}

export function PrzyciskDodaj({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-dashed border-sand-300 px-4 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:border-steel-500 hover:bg-steel-100/50 hover:text-steel-600"
    >
      + {children}
    </button>
  );
}
