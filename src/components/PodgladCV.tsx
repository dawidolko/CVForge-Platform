'use client';

import { useEffect, useRef, useState } from 'react';
import type { DaneCV, Ustawienia } from './daneCV';
import type { Tresc } from './tresc';
import { SzablonKlasyczny } from './szablony/SzablonKlasyczny';
import { SzablonKolumnowy } from './szablony/SzablonKolumnowy';
import { SzablonMinimal } from './szablony/SzablonMinimal';

/*
 * Podglad arkusza A4.
 *
 * Arkusz ma stale 210mm szerokosci — tak samo na ekranie i na wydruku. Zeby
 * zmiescil sie w kolumnie interfejsu, skalujemy go transformem i rezerwujemy
 * tyle wysokosci, ile zajmuje po przeskalowaniu. Gdybysmy zamiast tego zmienili
 * jego szerokosc, podglad przestalby odpowiadac wydrukowi — a to jedyna rzecz,
 * ktora ten ekran ma gwarantowac.
 */
export function PodgladCV({ dane, ustawienia, t }: { dane: DaneCV; ustawienia: Ustawienia; t: Tresc }) {
  const kontener = useRef<HTMLDivElement>(null);
  const [skala, setSkala] = useState(1);

  useEffect(() => {
    const el = kontener.current;
    if (!el) return;

    const przelicz = () => {
      // 210mm w pikselach przy 96 dpi.
      const szerokoscArkusza = (210 / 25.4) * 96;
      const dostepna = el.clientWidth;
      setSkala(Math.min(1, dostepna / szerokoscArkusza));
    };

    przelicz();
    const obserwator = new ResizeObserver(przelicz);
    obserwator.observe(el);
    return () => obserwator.disconnect();
  }, []);

  const wysokoscArkusza = (297 / 25.4) * 96;

  const wspolne = { dane, ustawienia, t };
  const szablon =
    ustawienia.szablon === 'kolumnowy' ? (
      <SzablonKolumnowy {...wspolne} />
    ) : ustawienia.szablon === 'minimal' ? (
      <SzablonMinimal {...wspolne} />
    ) : (
      <SzablonKlasyczny {...wspolne} />
    );

  return (
    <div ref={kontener} className="w-full">
      <div style={{ height: wysokoscArkusza * skala }}>
        <div
          className="arkusz origin-top-left"
          style={{ transform: `scale(${skala})`, fontSize: `${ustawienia.rozmiarPisma}em` }}
        >
          {szablon}
        </div>
      </div>
    </div>
  );
}
