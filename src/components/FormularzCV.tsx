'use client';

import type {
  DaneCV,
  Doswiadczenie,
  Edukacja,
  JezykObcy,
  Projekt,
  Umiejetnosc,
} from './daneCV';
import {
  pustaEdukacja,
  pustaUmiejetnosc,
  pustyDoswiadczenie,
  pustyJezyk,
  pustyProjekt,
} from './daneCV';
import type { Tresc } from './tresc';
import { KartaWpisu, Pole, PoleWieloliniowe, PrzyciskDodaj } from './PolaFormularza';

export type Zakladka = 'dane' | 'doswiadczenie' | 'edukacja' | 'umiejetnosci' | 'projekty';

/*
 * Formularz kreatora.
 *
 * Komponent jest bezstanowy: dostaje dane i funkcje aktualizujaca. Cala prawda
 * o CV mieszka w KreatorCV, dzieki czemu podglad, zapis i eksport zawsze widza
 * dokladnie to samo.
 */
export function FormularzCV({
  dane,
  zakladka,
  t,
  onZmiana,
}: {
  dane: DaneCV;
  zakladka: Zakladka;
  t: Tresc;
  onZmiana: (zmiana: (poprzednie: DaneCV) => DaneCV) => void;
}) {
  const k = t.kreator;
  const p = k.pola;
  const etykietyAkcji = { wGore: k.przyciski.wGore, wDol: k.przyciski.wDol, usun: k.przyciski.usun };

  /** Przesuwa wpis na liscie o jedna pozycje; poza zakresem nic nie robi. */
  function przesun<T>(lista: T[], indeks: number, kierunek: -1 | 1): T[] {
    const cel = indeks + kierunek;
    if (cel < 0 || cel >= lista.length) return lista;
    const kopia = [...lista];
    [kopia[indeks], kopia[cel]] = [kopia[cel], kopia[indeks]];
    return kopia;
  }

  const ustawKontakt = (pole: keyof DaneCV['kontakt'], wartosc: string) =>
    onZmiana((poprzednie) => ({ ...poprzednie, kontakt: { ...poprzednie.kontakt, [pole]: wartosc } }));

  const ustawDoswiadczenie = (id: string, pole: keyof Doswiadczenie, wartosc: string | boolean) =>
    onZmiana((poprzednie) => ({
      ...poprzednie,
      doswiadczenie: poprzednie.doswiadczenie.map((w) => (w.id === id ? { ...w, [pole]: wartosc } : w)),
    }));

  const ustawEdukacje = (id: string, pole: keyof Edukacja, wartosc: string) =>
    onZmiana((poprzednie) => ({
      ...poprzednie,
      edukacja: poprzednie.edukacja.map((w) => (w.id === id ? { ...w, [pole]: wartosc } : w)),
    }));

  const ustawProjekt = (id: string, pole: keyof Projekt, wartosc: string) =>
    onZmiana((poprzednie) => ({
      ...poprzednie,
      projekty: poprzednie.projekty.map((w) => (w.id === id ? { ...w, [pole]: wartosc } : w)),
    }));

  const ustawUmiejetnosc = (id: string, pole: keyof Umiejetnosc, wartosc: string | number) =>
    onZmiana((poprzednie) => ({
      ...poprzednie,
      umiejetnosci: poprzednie.umiejetnosci.map((w) => (w.id === id ? { ...w, [pole]: wartosc } : w)),
    }));

  const ustawJezyk = (id: string, pole: keyof JezykObcy, wartosc: string) =>
    onZmiana((poprzednie) => ({
      ...poprzednie,
      jezyki: poprzednie.jezyki.map((w) => (w.id === id ? { ...w, [pole]: wartosc } : w)),
    }));

  const Sekcja = ({ tytul, children }: { tytul: string; children: React.ReactNode }) => (
    <section className="mb-8">
      <h3 className="mb-3 font-display text-base font-bold text-ink-900">{tytul}</h3>
      {children}
    </section>
  );

  if (zakladka === 'dane') {
    return (
      <>
        <Sekcja tytul={k.sekcje.kontakt}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Pole id="f-imie" etykieta={p.imieNazwisko} wartosc={dane.kontakt.imieNazwisko} autoComplete="name" onZmiana={(v) => ustawKontakt('imieNazwisko', v)} />
            <Pole id="f-stanowisko" etykieta={p.stanowisko} wartosc={dane.kontakt.stanowisko} autoComplete="organization-title" onZmiana={(v) => ustawKontakt('stanowisko', v)} />
            <Pole id="f-email" etykieta={p.email} typ="email" autoComplete="email" wartosc={dane.kontakt.email} onZmiana={(v) => ustawKontakt('email', v)} />
            <Pole id="f-telefon" etykieta={p.telefon} typ="tel" autoComplete="tel" wartosc={dane.kontakt.telefon} onZmiana={(v) => ustawKontakt('telefon', v)} />
            <Pole id="f-lokalizacja" etykieta={p.lokalizacja} wartosc={dane.kontakt.lokalizacja} onZmiana={(v) => ustawKontakt('lokalizacja', v)} />
            <Pole id="f-strona" etykieta={p.strona} wartosc={dane.kontakt.strona} onZmiana={(v) => ustawKontakt('strona', v)} />
            <Pole id="f-linkedin" etykieta={p.linkedin} wartosc={dane.kontakt.linkedin} onZmiana={(v) => ustawKontakt('linkedin', v)} />
            <Pole id="f-github" etykieta={p.github} wartosc={dane.kontakt.github} onZmiana={(v) => ustawKontakt('github', v)} />
          </div>
        </Sekcja>

        <Sekcja tytul={k.sekcje.podsumowanie}>
          <PoleWieloliniowe
            id="f-podsumowanie"
            etykieta={p.podsumowanie}
            wiersze={5}
            wartosc={dane.podsumowanie}
            onZmiana={(v) => onZmiana((poprzednie) => ({ ...poprzednie, podsumowanie: v }))}
          />
        </Sekcja>

        <Sekcja tytul={k.sekcje.klauzula}>
          <PoleWieloliniowe
            id="f-klauzula"
            etykieta={p.klauzula}
            wiersze={3}
            podpowiedz={k.podpowiedzi.klauzula}
            wartosc={dane.klauzula}
            onZmiana={(v) => onZmiana((poprzednie) => ({ ...poprzednie, klauzula: v }))}
          />
        </Sekcja>
      </>
    );
  }

  if (zakladka === 'doswiadczenie') {
    return (
      <Sekcja tytul={k.sekcje.doswiadczenie}>
        <ol className="mb-3 space-y-3">
          {dane.doswiadczenie.map((wpis, i) => (
            <KartaWpisu
              key={wpis.id}
              tytul={k.zakladki.doswiadczenie}
              pozycja={i}
              liczba={dane.doswiadczenie.length}
              etykiety={etykietyAkcji}
              onWGore={() => onZmiana((prev) => ({ ...prev, doswiadczenie: przesun(prev.doswiadczenie, i, -1) }))}
              onWDol={() => onZmiana((prev) => ({ ...prev, doswiadczenie: przesun(prev.doswiadczenie, i, 1) }))}
              onUsun={() => onZmiana((prev) => ({ ...prev, doswiadczenie: prev.doswiadczenie.filter((w) => w.id !== wpis.id) }))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Pole id={`d-stanowisko-${wpis.id}`} etykieta={p.stanowisko} wartosc={wpis.stanowisko} onZmiana={(v) => ustawDoswiadczenie(wpis.id, 'stanowisko', v)} />
                <Pole id={`d-firma-${wpis.id}`} etykieta={p.firma} wartosc={wpis.firma} onZmiana={(v) => ustawDoswiadczenie(wpis.id, 'firma', v)} />
                <Pole id={`d-od-${wpis.id}`} etykieta={p.od} typ="month" wartosc={wpis.od} onZmiana={(v) => ustawDoswiadczenie(wpis.id, 'od', v)} />
                <div>
                  <Pole id={`d-do-${wpis.id}`} etykieta={p.do} typ="month" wartosc={wpis.trwa ? '' : wpis.do} onZmiana={(v) => ustawDoswiadczenie(wpis.id, 'do', v)} />
                  <label className="mt-2 flex items-center gap-2 text-sm text-ink-700">
                    <input
                      type="checkbox"
                      checked={wpis.trwa}
                      onChange={(e) => ustawDoswiadczenie(wpis.id, 'trwa', e.target.checked)}
                      className="size-4 rounded border-sand-300 text-steel-600"
                    />
                    {p.trwa}
                  </label>
                </div>
              </div>
              <PoleWieloliniowe
                id={`d-opis-${wpis.id}`}
                etykieta={p.opis}
                wiersze={4}
                podpowiedz={k.podpowiedzi.opis}
                wartosc={wpis.opis}
                onZmiana={(v) => ustawDoswiadczenie(wpis.id, 'opis', v)}
              />
            </KartaWpisu>
          ))}
        </ol>
        <PrzyciskDodaj onClick={() => onZmiana((prev) => ({ ...prev, doswiadczenie: [...prev.doswiadczenie, pustyDoswiadczenie()] }))}>
          {k.przyciski.dodajDoswiadczenie}
        </PrzyciskDodaj>
      </Sekcja>
    );
  }

  if (zakladka === 'edukacja') {
    return (
      <Sekcja tytul={k.sekcje.edukacja}>
        <ol className="mb-3 space-y-3">
          {dane.edukacja.map((wpis, i) => (
            <KartaWpisu
              key={wpis.id}
              tytul={k.zakladki.edukacja}
              pozycja={i}
              liczba={dane.edukacja.length}
              etykiety={etykietyAkcji}
              onWGore={() => onZmiana((prev) => ({ ...prev, edukacja: przesun(prev.edukacja, i, -1) }))}
              onWDol={() => onZmiana((prev) => ({ ...prev, edukacja: przesun(prev.edukacja, i, 1) }))}
              onUsun={() => onZmiana((prev) => ({ ...prev, edukacja: prev.edukacja.filter((w) => w.id !== wpis.id) }))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Pole id={`e-kierunek-${wpis.id}`} etykieta={p.kierunek} wartosc={wpis.kierunek} onZmiana={(v) => ustawEdukacje(wpis.id, 'kierunek', v)} />
                <Pole id={`e-uczelnia-${wpis.id}`} etykieta={p.uczelnia} wartosc={wpis.uczelnia} onZmiana={(v) => ustawEdukacje(wpis.id, 'uczelnia', v)} />
                <Pole id={`e-od-${wpis.id}`} etykieta={p.od} typ="month" wartosc={wpis.od} onZmiana={(v) => ustawEdukacje(wpis.id, 'od', v)} />
                <Pole id={`e-do-${wpis.id}`} etykieta={p.do} typ="month" wartosc={wpis.do} onZmiana={(v) => ustawEdukacje(wpis.id, 'do', v)} />
              </div>
              <PoleWieloliniowe id={`e-opis-${wpis.id}`} etykieta={p.opis} wiersze={2} wartosc={wpis.opis} onZmiana={(v) => ustawEdukacje(wpis.id, 'opis', v)} />
            </KartaWpisu>
          ))}
        </ol>
        <PrzyciskDodaj onClick={() => onZmiana((prev) => ({ ...prev, edukacja: [...prev.edukacja, pustaEdukacja()] }))}>
          {k.przyciski.dodajEdukacje}
        </PrzyciskDodaj>
      </Sekcja>
    );
  }

  if (zakladka === 'umiejetnosci') {
    return (
      <>
        <Sekcja tytul={k.sekcje.umiejetnosci}>
          <ol className="mb-3 space-y-3">
            {dane.umiejetnosci.map((wpis, i) => (
              <KartaWpisu
                key={wpis.id}
                tytul={k.zakladki.umiejetnosci}
                pozycja={i}
                liczba={dane.umiejetnosci.length}
                etykiety={etykietyAkcji}
                onWGore={() => onZmiana((prev) => ({ ...prev, umiejetnosci: przesun(prev.umiejetnosci, i, -1) }))}
                onWDol={() => onZmiana((prev) => ({ ...prev, umiejetnosci: przesun(prev.umiejetnosci, i, 1) }))}
                onUsun={() => onZmiana((prev) => ({ ...prev, umiejetnosci: prev.umiejetnosci.filter((w) => w.id !== wpis.id) }))}
              >
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Pole id={`u-nazwa-${wpis.id}`} etykieta={p.nazwa} wartosc={wpis.nazwa} onZmiana={(v) => ustawUmiejetnosc(wpis.id, 'nazwa', v)} />
                  <div>
                    <label htmlFor={`u-poziom-${wpis.id}`} className="mb-1 block text-sm font-medium text-ink-700">
                      {p.poziom}
                    </label>
                    <input
                      id={`u-poziom-${wpis.id}`}
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={wpis.poziom}
                      aria-describedby={`u-poziom-opis-${wpis.id}`}
                      aria-valuetext={String(wpis.poziom)}
                      onChange={(e) => ustawUmiejetnosc(wpis.id, 'poziom', Number(e.target.value))}
                      className="w-40 accent-steel-600"
                    />
                    <p id={`u-poziom-opis-${wpis.id}`} className="mt-1 text-xs text-ink-400">
                      {wpis.poziom} / 5
                    </p>
                  </div>
                </div>
              </KartaWpisu>
            ))}
          </ol>
          <PrzyciskDodaj onClick={() => onZmiana((prev) => ({ ...prev, umiejetnosci: [...prev.umiejetnosci, pustaUmiejetnosc()] }))}>
            {k.przyciski.dodajUmiejetnosc}
          </PrzyciskDodaj>
        </Sekcja>

        <Sekcja tytul={k.sekcje.jezyki}>
          <ol className="mb-3 space-y-3">
            {dane.jezyki.map((wpis, i) => (
              <KartaWpisu
                key={wpis.id}
                tytul={k.sekcje.jezyki}
                pozycja={i}
                liczba={dane.jezyki.length}
                etykiety={etykietyAkcji}
                onWGore={() => onZmiana((prev) => ({ ...prev, jezyki: przesun(prev.jezyki, i, -1) }))}
                onWDol={() => onZmiana((prev) => ({ ...prev, jezyki: przesun(prev.jezyki, i, 1) }))}
                onUsun={() => onZmiana((prev) => ({ ...prev, jezyki: prev.jezyki.filter((w) => w.id !== wpis.id) }))}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Pole id={`j-nazwa-${wpis.id}`} etykieta={p.nazwa} wartosc={wpis.nazwa} onZmiana={(v) => ustawJezyk(wpis.id, 'nazwa', v)} />
                  <Pole id={`j-poziom-${wpis.id}`} etykieta={p.poziom} wartosc={wpis.poziom} onZmiana={(v) => ustawJezyk(wpis.id, 'poziom', v)} />
                </div>
              </KartaWpisu>
            ))}
          </ol>
          <PrzyciskDodaj onClick={() => onZmiana((prev) => ({ ...prev, jezyki: [...prev.jezyki, pustyJezyk()] }))}>
            {k.przyciski.dodajJezyk}
          </PrzyciskDodaj>
        </Sekcja>
      </>
    );
  }

  return (
    <Sekcja tytul={k.sekcje.projekty}>
      <ol className="mb-3 space-y-3">
        {dane.projekty.map((wpis, i) => (
          <KartaWpisu
            key={wpis.id}
            tytul={k.zakladki.projekty}
            pozycja={i}
            liczba={dane.projekty.length}
            etykiety={etykietyAkcji}
            onWGore={() => onZmiana((prev) => ({ ...prev, projekty: przesun(prev.projekty, i, -1) }))}
            onWDol={() => onZmiana((prev) => ({ ...prev, projekty: przesun(prev.projekty, i, 1) }))}
            onUsun={() => onZmiana((prev) => ({ ...prev, projekty: prev.projekty.filter((w) => w.id !== wpis.id) }))}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Pole id={`p-nazwa-${wpis.id}`} etykieta={p.nazwa} wartosc={wpis.nazwa} onZmiana={(v) => ustawProjekt(wpis.id, 'nazwa', v)} />
              <Pole id={`p-link-${wpis.id}`} etykieta={p.link} wartosc={wpis.link} onZmiana={(v) => ustawProjekt(wpis.id, 'link', v)} />
            </div>
            <PoleWieloliniowe id={`p-opis-${wpis.id}`} etykieta={p.opis} wiersze={2} wartosc={wpis.opis} onZmiana={(v) => ustawProjekt(wpis.id, 'opis', v)} />
          </KartaWpisu>
        ))}
      </ol>
      <PrzyciskDodaj onClick={() => onZmiana((prev) => ({ ...prev, projekty: [...prev.projekty, pustyProjekt()] }))}>
        {k.przyciski.dodajProjekt}
      </PrzyciskDodaj>
    </Sekcja>
  );
}
