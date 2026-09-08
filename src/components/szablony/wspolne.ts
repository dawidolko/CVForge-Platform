/*
 * Male pomocniki wspoldzielone przez szablony. Zadnej logiki biznesowej —
 * wylacznie rzeczy, ktore inaczej powtarzalyby sie w trzech plikach.
 */

import type { DaneCV } from '../daneCV';

/** Opis wpisujemy w wielu liniach; kazda linia staje sie osobnym punktem. */
export function linieOpisu(opis: string): string[] {
  return opis
    .split('\n')
    .map((linia) => linia.trim())
    .filter(Boolean);
}

/** Kontakty w kolejnosci, w jakiej maja sie pojawic, z pominieciem pustych. */
export function pozycjeKontaktu(dane: DaneCV): { klucz: string; wartosc: string }[] {
  const k = dane.kontakt;
  return [
    { klucz: 'email', wartosc: k.email },
    { klucz: 'telefon', wartosc: k.telefon },
    { klucz: 'lokalizacja', wartosc: k.lokalizacja },
    { klucz: 'strona', wartosc: k.strona },
    { klucz: 'linkedin', wartosc: k.linkedin },
    { klucz: 'github', wartosc: k.github },
  ].filter((pozycja) => pozycja.wartosc.trim().length > 0);
}

/** Czy sekcja ma cokolwiek do pokazania — puste sekcje nie drukuja naglowka. */
export function maTresc(lista: { [k: string]: unknown }[], pola: string[]): boolean {
  return lista.some((wpis) => pola.some((pole) => String(wpis[pole] ?? '').trim().length > 0));
}
