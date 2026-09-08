/*
 * Cala tresc serwisu w dwoch jezykach.
 *
 * Teksty siedza tutaj, a nie w komponentach, bo wersja polska i angielska
 * musza miec identyczny uklad — roznica ma byc wylacznie w slowach.
 */

import type { Jezyk } from './daneCV';

export type Tresc = {
  jezyk: Jezyk;
  sciezka: string;
  drugiJezyk: { kod: string; etykieta: string; sciezka: string };
  nav: { kreator: string; szablony: string; jak: string; faq: string };
  hero: {
    naglowek: string;
    lead: string;
    cta: string;
    ctaDrugie: string;
    znaczniki: string[];
  };
  zalety: { tytul: string; opis: string }[];
  szablonyOpis: { tytul: string; wstep: string; lista: { id: string; nazwa: string; opis: string }[] };
  jak: { tytul: string; wstep: string; kroki: { tytul: string; opis: string }[] };
  kreator: {
    tytul: string;
    wstep: string;
    zakladki: { dane: string; doswiadczenie: string; edukacja: string; umiejetnosci: string; projekty: string };
    sekcje: {
      kontakt: string;
      podsumowanie: string;
      doswiadczenie: string;
      edukacja: string;
      umiejetnosci: string;
      jezyki: string;
      projekty: string;
      klauzula: string;
    };
    pola: Record<string, string>;
    przyciski: {
      dodajDoswiadczenie: string;
      dodajEdukacje: string;
      dodajProjekt: string;
      dodajUmiejetnosc: string;
      dodajJezyk: string;
      usun: string;
      wGore: string;
      wDol: string;
      drukuj: string;
      eksport: string;
      import: string;
      wyczysc: string;
      demo: string;
    };
    wyglad: { tytul: string; szablon: string; akcent: string; rozmiar: string; poziomy: string };
    podglad: { tytul: string; opis: string; strona: string };
    komunikaty: {
      zapisano: string;
      wyczyszczono: string;
      zaimportowano: string;
      bladImportu: string;
      potwierdzWyczysc: string;
      wczytanoDemo: string;
    };
    podpowiedzi: { opis: string; klauzula: string; poziom: string };
  };
  faq: { tytul: string; pozycje: { pytanie: string; odpowiedz: string }[] };
  stopka: { opis: string; autor: string; kod: string; prawa: string };
  wspolne: { przejdzDoTresci: string; teraz: string; zmienJezyk: string };
};

const PL: Tresc = {
  jezyk: 'pl',
  sciezka: '/pl/',
  drugiJezyk: { kod: 'en', etykieta: 'English', sciezka: '/' },
  nav: { kreator: 'Kreator', szablony: 'Szablony', jak: 'Jak to działa', faq: 'FAQ' },
  hero: {
    naglowek: 'CV, które mieści się na jednej stronie A4',
    lead: 'Wypełnij formularz, wybierz szablon i wydrukuj gotowy dokument. Wszystko dzieje się w Twojej przeglądarce — dane nie trafiają na żaden serwer, bo tu nie ma serwera.',
    cta: 'Otwórz kreator',
    ctaDrugie: 'Zobacz szablony',
    znaczniki: ['Bez konta', 'Bez wysyłania danych', 'Podgląd 1:1 z wydrukiem'],
  },
  zalety: [
    {
      tytul: 'Podgląd jest wydrukiem',
      opis: 'To, co widzisz, to ten sam arkusz A4, który trafia do drukarki — nie osobna makieta. Nie ma niespodzianek po kliknięciu „Drukuj”.',
    },
    {
      tytul: 'Dane zostają u Ciebie',
      opis: 'Serwis jest statyczny i nie ma backendu. Treść CV trzymana jest w pamięci przeglądarki; możesz ją wyeksportować do pliku JSON i wczytać na innym komputerze.',
    },
    {
      tytul: 'Trzy układy, jedna treść',
      opis: 'Szablon zmienia wyłącznie wygląd. Przełączanie między układami nigdy nie gubi tego, co już wpisałeś.',
    },
    {
      tytul: 'Zaprojektowane pod czytanie',
      opis: 'Szerokość kolumny, wielkość pisma i odstępy są dobrane tak, żeby rekruter przeczytał dokument, a nie odszyfrował go.',
    },
  ],
  szablonyOpis: {
    tytul: 'Szablony',
    wstep: 'Każdy układ mieści ten sam komplet danych. Wybierz ten, który pasuje do branży i ilości treści.',
    lista: [
      {
        id: 'klasyczny',
        nazwa: 'Klasyczny',
        opis: 'Jedna kolumna, wyraźne nagłówki sekcji. Najbezpieczniejszy wybór, dobrze radzi sobie z systemami ATS i długim opisem doświadczenia.',
      },
      {
        id: 'kolumnowy',
        nazwa: 'Kolumnowy',
        opis: 'Wąski pasek boczny na kontakt, umiejętności i języki, szeroka kolumna na doświadczenie. Mieści więcej treści na jednej stronie.',
      },
      {
        id: 'minimal',
        nazwa: 'Minimal',
        opis: 'Dużo światła, cienkie linie, żadnych bloków koloru. Sprawdza się w projektowaniu i wszędzie tam, gdzie liczy się spokój.',
      },
    ],
  },
  jak: {
    tytul: 'Jak to działa',
    wstep: 'Cztery kroki, żadnej rejestracji.',
    kroki: [
      { tytul: 'Wypełnij formularz', opis: 'Dane kontaktowe, podsumowanie, doświadczenie, wykształcenie i umiejętności. Kreator startuje z przykładem, żeby było widać, jak to wygląda.' },
      { tytul: 'Wybierz układ i kolor', opis: 'Trzy szablony, sześć kolorów akcentu i regulacja wielkości pisma, gdy treści jest więcej niż miejsca.' },
      { tytul: 'Sprawdź podgląd', opis: 'Arkusz A4 po prawej pokazuje dokładnie to, co wyjdzie z drukarki — łącznie z marginesami.' },
      { tytul: 'Drukuj albo zapisz PDF', opis: 'Przycisk „Drukuj” otwiera okno druku przeglądarki. Wybierz „Zapisz jako PDF”, żeby dostać plik do wysłania.' },
    ],
  },
  kreator: {
    tytul: 'Kreator CV',
    wstep: 'Zmiany widać w podglądzie od razu. Praca zapisuje się w przeglądarce automatycznie.',
    zakladki: { dane: 'Dane', doswiadczenie: 'Doświadczenie', edukacja: 'Wykształcenie', umiejetnosci: 'Umiejętności', projekty: 'Projekty' },
    sekcje: {
      kontakt: 'Dane kontaktowe',
      podsumowanie: 'Podsumowanie zawodowe',
      doswiadczenie: 'Doświadczenie zawodowe',
      edukacja: 'Wykształcenie',
      umiejetnosci: 'Umiejętności',
      jezyki: 'Języki obce',
      projekty: 'Projekty',
      klauzula: 'Klauzula o przetwarzaniu danych',
    },
    pola: {
      imieNazwisko: 'Imię i nazwisko',
      stanowisko: 'Stanowisko',
      email: 'E-mail',
      telefon: 'Telefon',
      lokalizacja: 'Lokalizacja',
      strona: 'Strona WWW',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      podsumowanie: 'Podsumowanie',
      firma: 'Firma',
      od: 'Od',
      do: 'Do',
      trwa: 'Nadal tu pracuję',
      opis: 'Opis',
      kierunek: 'Kierunek / stopień',
      uczelnia: 'Uczelnia',
      nazwa: 'Nazwa',
      link: 'Link',
      poziom: 'Poziom',
      klauzula: 'Treść klauzuli',
    },
    przyciski: {
      dodajDoswiadczenie: 'Dodaj stanowisko',
      dodajEdukacje: 'Dodaj wykształcenie',
      dodajProjekt: 'Dodaj projekt',
      dodajUmiejetnosc: 'Dodaj umiejętność',
      dodajJezyk: 'Dodaj język',
      usun: 'Usuń',
      wGore: 'Przenieś wyżej',
      wDol: 'Przenieś niżej',
      drukuj: 'Drukuj / zapisz PDF',
      eksport: 'Eksportuj JSON',
      import: 'Wczytaj JSON',
      wyczysc: 'Wyczyść',
      demo: 'Wczytaj przykład',
    },
    wyglad: { tytul: 'Wygląd', szablon: 'Szablon', akcent: 'Kolor akcentu', rozmiar: 'Wielkość pisma', poziomy: 'Pokaż poziomy umiejętności' },
    podglad: { tytul: 'Podgląd', opis: 'Arkusz A4 — dokładnie to, co trafi na wydruk.', strona: 'Strona A4' },
    komunikaty: {
      zapisano: 'Zapisano w przeglądarce.',
      wyczyszczono: 'Formularz wyczyszczony.',
      zaimportowano: 'Wczytano dane z pliku.',
      bladImportu: 'Nie udało się wczytać pliku — to nie jest plik CVForge.',
      potwierdzWyczysc: 'Wyczyścić cały formularz? Tej operacji nie da się cofnąć.',
      wczytanoDemo: 'Wczytano przykładowe dane.',
    },
    podpowiedzi: {
      opis: 'Każdy wiersz to osobne osiągnięcie. Zacznij od czasownika i podaj liczbę, jeśli ją masz.',
      klauzula: 'Wymagana przez wielu pracodawców w Polsce. Zostaw puste, jeśli aplikujesz za granicę.',
      poziom: 'Od 1 do 5 — używane tylko przez szablony, które pokazują paski.',
    },
  },
  faq: {
    tytul: 'Pytania i odpowiedzi',
    pozycje: [
      {
        pytanie: 'Czy moje dane gdzieś trafiają?',
        odpowiedz: 'Nie. Serwis to zbiór statycznych plików bez backendu — nie ma dokąd ich wysłać. Treść CV zapisuje się wyłącznie w pamięci Twojej przeglądarki i znika, gdy wyczyścisz dane witryny.',
      },
      {
        pytanie: 'Jak zapisać CV jako PDF?',
        odpowiedz: 'Kliknij „Drukuj / zapisz PDF”, a w oknie druku przeglądarki wybierz drukarkę „Zapisz jako PDF”. Marginesy ustaw na „brak” — arkusz ma już własne, wliczone w projekt.',
      },
      {
        pytanie: 'Czy CV zmieści się na jednej stronie?',
        odpowiedz: 'Zależy od ilości treści. Podgląd pokazuje granicę strony, a suwak wielkości pisma pozwala zejść o 10 procent, gdy brakuje dosłownie kilku linijek.',
      },
      {
        pytanie: 'Czy dokument przejdzie przez systemy ATS?',
        odpowiedz: 'Szablon Klasyczny jest pod to zaprojektowany: jedna kolumna, prawdziwy tekst zamiast grafiki, standardowe nagłówki sekcji. Układ kolumnowy wygląda lepiej dla człowieka, ale bywa gorzej parsowany.',
      },
      {
        pytanie: 'Czy mogę wrócić do CV za tydzień?',
        odpowiedz: 'Tak. Praca zapisuje się automatycznie w tej przeglądarce. Jeśli chcesz przenieść ją na inny komputer, użyj „Eksportuj JSON” i wczytaj plik po drugiej stronie.',
      },
    ],
  },
  stopka: {
    opis: 'CVForge — kreator CV działający w całości w przeglądarce.',
    autor: 'Autor',
    kod: 'Kod źródłowy',
    prawa: 'Wszelkie prawa zastrzeżone.',
  },
  wspolne: { przejdzDoTresci: 'Przejdź do treści', teraz: 'obecnie', zmienJezyk: 'Zmień język' },
};

const EN: Tresc = {
  jezyk: 'en',
  sciezka: '/',
  drugiJezyk: { kod: 'pl', etykieta: 'Polski', sciezka: '/pl/' },
  nav: { kreator: 'Builder', szablony: 'Templates', jak: 'How it works', faq: 'FAQ' },
  hero: {
    naglowek: 'A CV that fits on a single A4 sheet',
    lead: 'Fill in the form, pick a template and print the finished document. Everything happens in your browser — your data never reaches a server, because there is no server.',
    cta: 'Open the builder',
    ctaDrugie: 'See the templates',
    znaczniki: ['No account', 'No data leaves your device', 'Preview matches the print'],
  },
  zalety: [
    {
      tytul: 'The preview is the print',
      opis: 'What you see is the same A4 sheet that goes to the printer, not a separate mock-up. Nothing shifts when you hit Print.',
    },
    {
      tytul: 'Your data stays with you',
      opis: 'The site is static and has no backend. Your CV lives in browser storage; export it to a JSON file to carry it to another computer.',
    },
    {
      tytul: 'Three layouts, one set of content',
      opis: 'A template only changes the appearance. Switching layouts never loses what you have already typed.',
    },
    {
      tytul: 'Designed to be read',
      opis: 'Column width, type size and spacing are set so a recruiter reads the document rather than decoding it.',
    },
  ],
  szablonyOpis: {
    tytul: 'Templates',
    wstep: 'Every layout holds the same set of data. Pick the one that suits your field and how much you have to say.',
    lista: [
      {
        id: 'klasyczny',
        nazwa: 'Classic',
        opis: 'One column, clear section headings. The safest choice — it handles applicant tracking systems and long work histories well.',
      },
      {
        id: 'kolumnowy',
        nazwa: 'Two-column',
        opis: 'A narrow sidebar for contact details, skills and languages; a wide column for experience. Fits more on a single page.',
      },
      {
        id: 'minimal',
        nazwa: 'Minimal',
        opis: 'Generous white space, hairline rules, no blocks of colour. Suits design roles and anywhere a calm document wins.',
      },
    ],
  },
  jak: {
    tytul: 'How it works',
    wstep: 'Four steps, no sign-up.',
    kroki: [
      { tytul: 'Fill in the form', opis: 'Contact details, summary, experience, education and skills. The builder starts with an example so you can see the shape of it.' },
      { tytul: 'Choose a layout and colour', opis: 'Three templates, six accent colours and a type-size control for when there is more content than room.' },
      { tytul: 'Check the preview', opis: 'The A4 sheet on the right shows exactly what the printer will produce, margins included.' },
      { tytul: 'Print or save a PDF', opis: 'The Print button opens your browser print dialog. Choose “Save as PDF” to get a file you can send.' },
    ],
  },
  kreator: {
    tytul: 'CV builder',
    wstep: 'Changes appear in the preview immediately. Your work is saved in the browser automatically.',
    zakladki: { dane: 'Details', doswiadczenie: 'Experience', edukacja: 'Education', umiejetnosci: 'Skills', projekty: 'Projects' },
    sekcje: {
      kontakt: 'Contact details',
      podsumowanie: 'Professional summary',
      doswiadczenie: 'Work experience',
      edukacja: 'Education',
      umiejetnosci: 'Skills',
      jezyki: 'Languages',
      projekty: 'Projects',
      klauzula: 'Data processing clause',
    },
    pola: {
      imieNazwisko: 'Full name',
      stanowisko: 'Job title',
      email: 'E-mail',
      telefon: 'Phone',
      lokalizacja: 'Location',
      strona: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      podsumowanie: 'Summary',
      firma: 'Company',
      od: 'From',
      do: 'To',
      trwa: 'I still work here',
      opis: 'Description',
      kierunek: 'Course / degree',
      uczelnia: 'Institution',
      nazwa: 'Name',
      link: 'Link',
      poziom: 'Level',
      klauzula: 'Clause text',
    },
    przyciski: {
      dodajDoswiadczenie: 'Add a position',
      dodajEdukacje: 'Add education',
      dodajProjekt: 'Add a project',
      dodajUmiejetnosc: 'Add a skill',
      dodajJezyk: 'Add a language',
      usun: 'Remove',
      wGore: 'Move up',
      wDol: 'Move down',
      drukuj: 'Print / save PDF',
      eksport: 'Export JSON',
      import: 'Import JSON',
      wyczysc: 'Clear',
      demo: 'Load the example',
    },
    wyglad: { tytul: 'Appearance', szablon: 'Template', akcent: 'Accent colour', rozmiar: 'Type size', poziomy: 'Show skill levels' },
    podglad: { tytul: 'Preview', opis: 'An A4 sheet — exactly what goes to print.', strona: 'A4 page' },
    komunikaty: {
      zapisano: 'Saved in this browser.',
      wyczyszczono: 'The form has been cleared.',
      zaimportowano: 'Data loaded from the file.',
      bladImportu: 'Could not read the file — it is not a CVForge export.',
      potwierdzWyczysc: 'Clear the whole form? This cannot be undone.',
      wczytanoDemo: 'Example data loaded.',
    },
    podpowiedzi: {
      opis: 'One achievement per line. Start with a verb and give a number where you have one.',
      klauzula: 'Required by many Polish employers. Leave it empty when applying abroad.',
      poziom: 'From 1 to 5 — used only by templates that draw the bars.',
    },
  },
  faq: {
    tytul: 'Questions and answers',
    pozycje: [
      {
        pytanie: 'Does my data go anywhere?',
        odpowiedz: 'No. The site is a set of static files with no backend — there is nowhere to send it. Your CV is stored only in your browser and disappears when you clear site data.',
      },
      {
        pytanie: 'How do I save the CV as a PDF?',
        odpowiedz: 'Click “Print / save PDF” and pick the “Save as PDF” destination in your browser print dialog. Set margins to none — the sheet already carries its own.',
      },
      {
        pytanie: 'Will the CV fit on one page?',
        odpowiedz: 'It depends on how much you write. The preview shows the page boundary, and the type-size control gives you ten per cent of room when you are a few lines over.',
      },
      {
        pytanie: 'Will it get through applicant tracking systems?',
        odpowiedz: 'The Classic template is built for it: a single column, real text rather than graphics, standard section headings. The two-column layout reads better for a human but parses less reliably.',
      },
      {
        pytanie: 'Can I come back to my CV next week?',
        odpowiedz: 'Yes. Your work is saved automatically in this browser. To move it to another computer, use “Export JSON” and load the file on the other side.',
      },
    ],
  },
  stopka: {
    opis: 'CVForge — a CV builder that runs entirely in your browser.',
    autor: 'Author',
    kod: 'Source code',
    prawa: 'All rights reserved.',
  },
  wspolne: { przejdzDoTresci: 'Skip to content', teraz: 'present', zmienJezyk: 'Change language' },
};

export const TRESC: Record<Jezyk, Tresc> = { pl: PL, en: EN };
