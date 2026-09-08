/*
 * Model danych CV.
 *
 * Jeden ksztalt obsluguje wszystkie szablony — szablon decyduje wylacznie o
 * tym, jak dane wygladaja, nigdy o tym, jakie sa. Dzieki temu zmiana szablonu
 * nigdy nie gubi wpisanej tresci.
 */

export type Jezyk = 'pl' | 'en';

export type Kontakt = {
  imieNazwisko: string;
  stanowisko: string;
  email: string;
  telefon: string;
  lokalizacja: string;
  strona: string;
  linkedin: string;
  github: string;
};

export type Doswiadczenie = {
  id: string;
  stanowisko: string;
  firma: string;
  od: string;
  do: string;
  trwa: boolean;
  opis: string;
};

export type Edukacja = {
  id: string;
  kierunek: string;
  uczelnia: string;
  od: string;
  do: string;
  opis: string;
};

export type Projekt = {
  id: string;
  nazwa: string;
  link: string;
  opis: string;
};

export type Umiejetnosc = {
  id: string;
  nazwa: string;
  poziom: number; // 1-5, uzywane tylko przez szablony, ktore to pokazuja
};

export type JezykObcy = {
  id: string;
  nazwa: string;
  poziom: string; // np. C1, B2 — wpisywane recznie, bo skale bywaja rozne
};

export type DaneCV = {
  kontakt: Kontakt;
  podsumowanie: string;
  doswiadczenie: Doswiadczenie[];
  edukacja: Edukacja[];
  projekty: Projekt[];
  umiejetnosci: Umiejetnosc[];
  jezyki: JezykObcy[];
  klauzula: string;
};

export type IdSzablonu = 'klasyczny' | 'kolumnowy' | 'minimal';

export type Ustawienia = {
  szablon: IdSzablonu;
  akcent: string;
  rozmiarPisma: number; // mnoznik 0.9-1.1
  pokazPoziomy: boolean;
};

export const AKCENTY = [
  { id: 'granat', wartosc: '#16305c' },
  { id: 'miedz', wartosc: '#c26a36' },
  { id: 'zielen', wartosc: '#0f5d47' },
  { id: 'burgund', wartosc: '#8c2f39' },
  { id: 'grafit', wartosc: '#2b333f' },
  { id: 'fiolet', wartosc: '#5b21b6' },
] as const;

export const USTAWIENIA_STARTOWE: Ustawienia = {
  szablon: 'klasyczny',
  akcent: '#16305c',
  rozmiarPisma: 1,
  pokazPoziomy: true,
};

/** Krotki, stabilny identyfikator dla wierszy list. */
export function nowyId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function pustyDoswiadczenie(): Doswiadczenie {
  return { id: nowyId(), stanowisko: '', firma: '', od: '', do: '', trwa: false, opis: '' };
}

export function pustaEdukacja(): Edukacja {
  return { id: nowyId(), kierunek: '', uczelnia: '', od: '', do: '', opis: '' };
}

export function pustyProjekt(): Projekt {
  return { id: nowyId(), nazwa: '', link: '', opis: '' };
}

export function pustaUmiejetnosc(): Umiejetnosc {
  return { id: nowyId(), nazwa: '', poziom: 3 };
}

export function pustyJezyk(): JezykObcy {
  return { id: nowyId(), nazwa: '', poziom: '' };
}

/*
 * Dane pokazowe.
 *
 * Kreator startuje wypelniony, bo pusty formularz nie pokazuje, co szablony
 * potrafia. Przycisk "wyczysc" zostawia sam szkielet.
 */
export const DANE_DEMO: Record<Jezyk, DaneCV> = {
  pl: {
    kontakt: {
      imieNazwisko: 'Anna Kowalska',
      stanowisko: 'Frontend Developer',
      email: 'anna.kowalska@example.com',
      telefon: '+48 600 100 200',
      lokalizacja: 'Rzeszów, Polska',
      strona: 'annakowalska.dev',
      linkedin: 'linkedin.com/in/annakowalska',
      github: 'github.com/annakowalska',
    },
    podsumowanie:
      'Frontend developerka z czteroletnim doświadczeniem w budowie aplikacji dla e-commerce. Specjalizuję się w React i TypeScript, dbam o dostępność i wydajność. Ostatnio przeprowadziłam migrację sklepu z 40 tysiącami produktów na renderowanie po stronie serwera, co skróciło czas do pierwszego renderu o połowę.',
    doswiadczenie: [
      {
        id: 'd1',
        stanowisko: 'Frontend Developer',
        firma: 'Nordmark Commerce',
        od: '2023-04',
        do: '',
        trwa: true,
        opis: 'Rozwój sklepu na Next.js obsługującego 40 tys. produktów.\nMigracja na renderowanie serwerowe — czas do pierwszego renderu spadł z 3,1 s do 1,4 s.\nWdrożenie audytu dostępności: sklep spełnia WCAG 2.2 na poziomie AA.',
      },
      {
        id: 'd2',
        stanowisko: 'Junior Frontend Developer',
        firma: 'Studio Kreska',
        od: '2021-09',
        do: '2023-03',
        trwa: false,
        opis: 'Budowa stron dla klientów w React i Vue.\nWprowadzenie wspólnej biblioteki komponentów, która skróciła start nowego projektu z trzech dni do jednego.',
      },
    ],
    edukacja: [
      {
        id: 'e1',
        kierunek: 'Informatyka, studia inżynierskie',
        uczelnia: 'Uniwersytet Rzeszowski',
        od: '2018-10',
        do: '2022-02',
        opis: 'Praca dyplomowa o wydajności renderowania w aplikacjach jednostronicowych.',
      },
    ],
    projekty: [
      {
        id: 'p1',
        nazwa: 'Dostępny konfigurator produktu',
        link: 'github.com/annakowalska/konfigurator',
        opis: 'Konfigurator obsługiwany w całości z klawiatury, z komunikatami dla czytników ekranu.',
      },
    ],
    umiejetnosci: [
      { id: 'u1', nazwa: 'React', poziom: 5 },
      { id: 'u2', nazwa: 'TypeScript', poziom: 5 },
      { id: 'u3', nazwa: 'Next.js', poziom: 4 },
      { id: 'u4', nazwa: 'Testy (Vitest, Playwright)', poziom: 4 },
      { id: 'u5', nazwa: 'Dostępność (WCAG)', poziom: 4 },
      { id: 'u6', nazwa: 'Node.js', poziom: 3 },
    ],
    jezyki: [
      { id: 'j1', nazwa: 'Polski', poziom: 'ojczysty' },
      { id: 'j2', nazwa: 'Angielski', poziom: 'C1' },
      { id: 'j3', nazwa: 'Niemiecki', poziom: 'A2' },
    ],
    klauzula:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w tym dokumencie na potrzeby procesu rekrutacji, zgodnie z RODO.',
  },
  en: {
    kontakt: {
      imieNazwisko: 'Anna Kowalska',
      stanowisko: 'Frontend Developer',
      email: 'anna.kowalska@example.com',
      telefon: '+48 600 100 200',
      lokalizacja: 'Rzeszów, Poland',
      strona: 'annakowalska.dev',
      linkedin: 'linkedin.com/in/annakowalska',
      github: 'github.com/annakowalska',
    },
    podsumowanie:
      'Frontend developer with four years of experience building e-commerce applications. I specialise in React and TypeScript, and I care about accessibility and performance. Most recently I migrated a 40,000-product store to server-side rendering, halving the time to first render.',
    doswiadczenie: [
      {
        id: 'd1',
        stanowisko: 'Frontend Developer',
        firma: 'Nordmark Commerce',
        od: '2023-04',
        do: '',
        trwa: true,
        opis: 'Developing a Next.js storefront serving 40,000 products.\nMigrated to server-side rendering — time to first render dropped from 3.1 s to 1.4 s.\nRan an accessibility audit: the store now meets WCAG 2.2 level AA.',
      },
      {
        id: 'd2',
        stanowisko: 'Junior Frontend Developer',
        firma: 'Studio Kreska',
        od: '2021-09',
        do: '2023-03',
        trwa: false,
        opis: 'Built client websites in React and Vue.\nIntroduced a shared component library that cut project setup from three days to one.',
      },
    ],
    edukacja: [
      {
        id: 'e1',
        kierunek: 'BEng Computer Science',
        uczelnia: 'University of Rzeszów',
        od: '2018-10',
        do: '2022-02',
        opis: 'Thesis on rendering performance in single-page applications.',
      },
    ],
    projekty: [
      {
        id: 'p1',
        nazwa: 'Accessible product configurator',
        link: 'github.com/annakowalska/configurator',
        opis: 'A configurator fully operable from the keyboard, with live announcements for screen readers.',
      },
    ],
    umiejetnosci: [
      { id: 'u1', nazwa: 'React', poziom: 5 },
      { id: 'u2', nazwa: 'TypeScript', poziom: 5 },
      { id: 'u3', nazwa: 'Next.js', poziom: 4 },
      { id: 'u4', nazwa: 'Testing (Vitest, Playwright)', poziom: 4 },
      { id: 'u5', nazwa: 'Accessibility (WCAG)', poziom: 4 },
      { id: 'u6', nazwa: 'Node.js', poziom: 3 },
    ],
    jezyki: [
      { id: 'j1', nazwa: 'Polish', poziom: 'native' },
      { id: 'j2', nazwa: 'English', poziom: 'C1' },
      { id: 'j3', nazwa: 'German', poziom: 'A2' },
    ],
    klauzula:
      'I consent to the processing of the personal data contained in this document for the purposes of the recruitment process, in accordance with the GDPR.',
  },
};

/** Szkielet bez tresci — po kliknieciu "wyczysc". */
export function pusteCV(): DaneCV {
  return {
    kontakt: {
      imieNazwisko: '',
      stanowisko: '',
      email: '',
      telefon: '',
      lokalizacja: '',
      strona: '',
      linkedin: '',
      github: '',
    },
    podsumowanie: '',
    doswiadczenie: [pustyDoswiadczenie()],
    edukacja: [pustaEdukacja()],
    projekty: [],
    umiejetnosci: [pustaUmiejetnosc()],
    jezyki: [pustyJezyk()],
    klauzula: '',
  };
}

/**
 * Formatuje zakres dat do postaci widocznej w CV.
 * Wejscie to `YYYY-MM` z pola typu month; puste wartosci sa pomijane.
 */
export function zakresDat(od: string, doKiedy: string, trwa: boolean, teraz: string): string {
  const czytelna = (v: string) => {
    if (!v) return '';
    const [rok, miesiac] = v.split('-');
    return miesiac ? `${miesiac}.${rok}` : rok;
  };
  const start = czytelna(od);
  const koniec = trwa ? teraz : czytelna(doKiedy);
  if (!start && !koniec) return '';
  if (!koniec) return start;
  if (!start) return koniec;
  return `${start} — ${koniec}`;
}
