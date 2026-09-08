/*
 * Zapis pracy w przegladarce.
 *
 * CVForge nie ma backendu — dane nie opuszczaja urzadzenia. Trzymamy je w
 * localStorage i pozwalamy wyeksportowac do pliku JSON, zeby dalo sie wrocic
 * do CV na innym komputerze bez zakladania konta.
 */

import type { DaneCV, Ustawienia } from './daneCV';

const KLUCZ_DANE = 'cvforge:dane';
const KLUCZ_USTAWIENIA = 'cvforge:ustawienia';

/*
 * localStorage rzuca wyjatkiem w trybie prywatnym i przy zablokowanych danych
 * witryny. Kreator ma wtedy dzialac dalej — tylko bez zapamietywania.
 */
function bezpiecznie<T>(operacja: () => T, awaryjnie: T): T {
  try {
    return operacja();
  } catch {
    return awaryjnie;
  }
}

export function zapiszDane(dane: DaneCV): void {
  bezpiecznie(() => localStorage.setItem(KLUCZ_DANE, JSON.stringify(dane)), undefined);
}

export function wczytajDane(): DaneCV | null {
  return bezpiecznie(() => {
    const surowe = localStorage.getItem(KLUCZ_DANE);
    return surowe ? (JSON.parse(surowe) as DaneCV) : null;
  }, null);
}

export function zapiszUstawienia(ustawienia: Ustawienia): void {
  bezpiecznie(() => localStorage.setItem(KLUCZ_USTAWIENIA, JSON.stringify(ustawienia)), undefined);
}

export function wczytajUstawienia(): Ustawienia | null {
  return bezpiecznie(() => {
    const surowe = localStorage.getItem(KLUCZ_USTAWIENIA);
    return surowe ? (JSON.parse(surowe) as Ustawienia) : null;
  }, null);
}

export function wyczyscMagazyn(): void {
  bezpiecznie(() => {
    localStorage.removeItem(KLUCZ_DANE);
    localStorage.removeItem(KLUCZ_USTAWIENIA);
  }, undefined);
}

/** Nazwa pliku wyprowadzona z imienia i nazwiska, bezpieczna dla systemu plikow. */
export function nazwaPliku(imieNazwisko: string): string {
  const bazowa = imieNazwisko
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return bazowa ? `cv-${bazowa}` : 'cv';
}

export function eksportujJSON(dane: DaneCV, ustawienia: Ustawienia): void {
  const tresc = JSON.stringify({ wersja: 1, dane, ustawienia }, null, 2);
  const blob = new Blob([tresc], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${nazwaPliku(dane.kontakt.imieNazwisko)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export type WynikImportu =
  | { ok: true; dane: DaneCV; ustawienia: Ustawienia | null }
  | { ok: false };

/*
 * Import sprawdza ksztalt pliku, zanim podmieni stan kreatora. Plik z innego
 * narzedzia albo uszkodzony JSON nie moze wyczyscic pracy uzytkownika.
 */
export async function importujJSON(plik: File): Promise<WynikImportu> {
  try {
    const surowe = JSON.parse(await plik.text()) as {
      dane?: DaneCV;
      ustawienia?: Ustawienia;
    };
    const dane = surowe.dane;
    if (!dane || typeof dane !== 'object' || !dane.kontakt || !Array.isArray(dane.doswiadczenie)) {
      return { ok: false };
    }
    return { ok: true, dane, ustawienia: surowe.ustawienia ?? null };
  } catch {
    return { ok: false };
  }
}
