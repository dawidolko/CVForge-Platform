'use client';

import { useEffect, useRef, useState } from 'react';
import type { DaneCV, IdSzablonu, Ustawienia } from './daneCV';
import { AKCENTY, DANE_DEMO, USTAWIENIA_STARTOWE, pusteCV } from './daneCV';
import type { Tresc } from './tresc';
import { FormularzCV, type Zakladka } from './FormularzCV';
import { PodgladCV } from './PodgladCV';
import {
  eksportujJSON,
  importujJSON,
  wczytajDane,
  wczytajUstawienia,
  wyczyscMagazyn,
  zapiszDane,
  zapiszUstawienia,
} from './magazyn';

/*
 * Kreator — jedyne miejsce, w ktorym mieszka stan CV.
 *
 * Formularz i podglad sa bezstanowe, wiec nie ma szans, zeby pokazywaly rozne
 * wersje dokumentu. Zapis do przegladarki jest odroczony (debounce), bo
 * inaczej kazde nacisniecie klawisza pisalo by do localStorage.
 */
export function KreatorCV({ t }: { t: Tresc }) {
  const [dane, setDane] = useState<DaneCV>(() => DANE_DEMO[t.jezyk]);
  const [ustawienia, setUstawienia] = useState<Ustawienia>(USTAWIENIA_STARTOWE);
  const [zakladka, setZakladka] = useState<Zakladka>('dane');
  const [komunikat, setKomunikat] = useState('');
  const [gotowe, setGotowe] = useState(false);
  const polePliku = useRef<HTMLInputElement>(null);

  /*
   * Zapisana praca ma pierwszenstwo przed danymi pokazowymi, ale odczytujemy
   * ja dopiero po zamontowaniu — serwer nie zna localStorage, a rozjazd miedzy
   * HTML-em z buildu a pierwszym renderem w przegladarce zepsulby hydracje.
   */
  useEffect(() => {
    const zapisane = wczytajDane();
    if (zapisane) setDane(zapisane);
    const zapisaneUstawienia = wczytajUstawienia();
    if (zapisaneUstawienia) setUstawienia({ ...USTAWIENIA_STARTOWE, ...zapisaneUstawienia });
    setGotowe(true);
  }, []);

  useEffect(() => {
    if (!gotowe) return;
    const licznik = setTimeout(() => zapiszDane(dane), 400);
    return () => clearTimeout(licznik);
  }, [dane, gotowe]);

  useEffect(() => {
    if (!gotowe) return;
    zapiszUstawienia(ustawienia);
  }, [ustawienia, gotowe]);

  /** Komunikaty znikaja same — inaczej zostawalyby na ekranie na zawsze. */
  function poinformuj(tresc: string) {
    setKomunikat(tresc);
    setTimeout(() => setKomunikat(''), 4000);
  }

  async function obsluzImport(e: React.ChangeEvent<HTMLInputElement>) {
    const plik = e.target.files?.[0];
    if (!plik) return;
    const wynik = await importujJSON(plik);
    if (wynik.ok) {
      setDane(wynik.dane);
      if (wynik.ustawienia) setUstawienia({ ...USTAWIENIA_STARTOWE, ...wynik.ustawienia });
      poinformuj(t.kreator.komunikaty.zaimportowano);
    } else {
      poinformuj(t.kreator.komunikaty.bladImportu);
    }
    e.target.value = '';
  }

  const zakladki: { id: Zakladka; etykieta: string }[] = [
    { id: 'dane', etykieta: t.kreator.zakladki.dane },
    { id: 'doswiadczenie', etykieta: t.kreator.zakladki.doswiadczenie },
    { id: 'edukacja', etykieta: t.kreator.zakladki.edukacja },
    { id: 'umiejetnosci', etykieta: t.kreator.zakladki.umiejetnosci },
    { id: 'projekty', etykieta: t.kreator.zakladki.projekty },
  ];

  const przyciskAkcji =
    'rounded-lg border border-sand-200 bg-paper px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-steel-500 hover:text-steel-600';

  return (
    <section id="kreator" className="scroll-mt-20 border-t border-sand-200 bg-sand-100/60 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-8 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t.kreator.tytul}
          </h2>
          <p className="mt-3 text-ink-500">{t.kreator.wstep}</p>
        </header>

        {/* Pasek akcji */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-steel-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
          >
            {t.kreator.przyciski.drukuj}
          </button>
          <button type="button" onClick={() => eksportujJSON(dane, ustawienia)} className={przyciskAkcji}>
            {t.kreator.przyciski.eksport}
          </button>
          <button type="button" onClick={() => polePliku.current?.click()} className={przyciskAkcji}>
            {t.kreator.przyciski.import}
          </button>
          <input
            ref={polePliku}
            type="file"
            accept="application/json,.json"
            onChange={obsluzImport}
            className="sr-only"
            aria-label={t.kreator.przyciski.import}
          />
          <button
            type="button"
            onClick={() => {
              setDane(DANE_DEMO[t.jezyk]);
              poinformuj(t.kreator.komunikaty.wczytanoDemo);
            }}
            className={przyciskAkcji}
          >
            {t.kreator.przyciski.demo}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!window.confirm(t.kreator.komunikaty.potwierdzWyczysc)) return;
              setDane(pusteCV());
              wyczyscMagazyn();
              poinformuj(t.kreator.komunikaty.wyczyszczono);
            }}
            className={przyciskAkcji}
          >
            {t.kreator.przyciski.wyczysc}
          </button>

          {/* Komunikaty czytane przez czytniki ekranu bez przenoszenia fokusu. */}
          <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm font-medium text-copper-600">
            {komunikat}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          {/* Kolumna formularza */}
          <div>
            <div className="mb-5 flex flex-wrap gap-1 border-b border-sand-200" role="tablist" aria-label={t.kreator.tytul}>
              {zakladki.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  role="tab"
                  id={`zakladka-${z.id}`}
                  aria-selected={zakladka === z.id}
                  aria-controls="panel-formularza"
                  onClick={() => setZakladka(z.id)}
                  className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    zakladka === z.id
                      ? 'border-steel-600 text-steel-700'
                      : 'border-transparent text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {z.etykieta}
                </button>
              ))}
            </div>

            <div id="panel-formularza" role="tabpanel" aria-labelledby={`zakladka-${zakladka}`}>
              <FormularzCV dane={dane} zakladka={zakladka} t={t} onZmiana={setDane} />
            </div>
          </div>

          {/* Kolumna podgladu */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="mb-4 rounded-xl border border-sand-200 bg-paper p-4">
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-ink-500">
                {t.kreator.wyglad.tytul}
              </h3>

              <div className="space-y-3">
                <div>
                  <label htmlFor="w-szablon" className="mb-1 block text-sm font-medium text-ink-700">
                    {t.kreator.wyglad.szablon}
                  </label>
                  <select
                    id="w-szablon"
                    value={ustawienia.szablon}
                    onChange={(e) => setUstawienia((u) => ({ ...u, szablon: e.target.value as IdSzablonu }))}
                    className="w-full rounded-lg border border-sand-200 bg-paper px-3 py-2 text-sm text-ink-900"
                  >
                    {t.szablonyOpis.lista.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nazwa}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="mb-1.5 block text-sm font-medium text-ink-700">{t.kreator.wyglad.akcent}</legend>
                  <div className="flex flex-wrap gap-2">
                    {AKCENTY.map((kolor) => (
                      <button
                        key={kolor.id}
                        type="button"
                        onClick={() => setUstawienia((u) => ({ ...u, akcent: kolor.wartosc }))}
                        aria-pressed={ustawienia.akcent === kolor.wartosc}
                        className={`size-8 rounded-full transition-transform hover:scale-110 ${
                          ustawienia.akcent === kolor.wartosc ? 'ring-2 ring-ink-900 ring-offset-2' : ''
                        }`}
                        style={{ background: kolor.wartosc }}
                      >
                        <span className="sr-only">{kolor.id}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="w-rozmiar" className="mb-1 block text-sm font-medium text-ink-700">
                    {t.kreator.wyglad.rozmiar}
                  </label>
                  <input
                    id="w-rozmiar"
                    type="range"
                    min={0.9}
                    max={1.1}
                    step={0.02}
                    value={ustawienia.rozmiarPisma}
                    aria-valuetext={`${Math.round(ustawienia.rozmiarPisma * 100)}%`}
                    onChange={(e) => setUstawienia((u) => ({ ...u, rozmiarPisma: Number(e.target.value) }))}
                    className="w-full accent-steel-600"
                  />
                  <p className="mt-1 text-xs text-ink-400">{Math.round(ustawienia.rozmiarPisma * 100)}%</p>
                </div>

                <label className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="checkbox"
                    checked={ustawienia.pokazPoziomy}
                    onChange={(e) => setUstawienia((u) => ({ ...u, pokazPoziomy: e.target.checked }))}
                    className="size-4 rounded border-sand-300 text-steel-600"
                  />
                  {t.kreator.wyglad.poziomy}
                </label>
              </div>
            </div>

            <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-ink-500">
              {t.kreator.podglad.tytul}
            </h3>
            <p className="mb-3 text-xs text-ink-400">{t.kreator.podglad.opis}</p>
            <PodgladCV dane={dane} ustawienia={ustawienia} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
