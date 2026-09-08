/*
 * Every string on the site, in both languages.
 *
 * Copy lives here rather than in the components, because the Polish and the
 * English page must share one layout — the only difference between them should
 * be the words.
 */

import type { Locale, TemplateId } from './resume';

export type Content = {
  locale: Locale;
  path: string;
  otherLocale: { code: string; label: string; path: string };
  nav: { builder: string; templates: string; ats: string; faq: string };
  theme: { toLight: string; toDark: string; label: string };
  hero: { heading: string; lead: string; cta: string; ctaSecondary: string; badges: string[] };
  benefits: { title: string; body: string }[];
  templates: { title: string; intro: string; atsSafe: string; items: Record<TemplateId, { name: string; body: string }> };
  how: { title: string; intro: string; steps: { title: string; body: string }[] };
  builder: {
    title: string;
    intro: string;
    tabs: { details: string; experience: string; education: string; skills: string; projects: string };
    sections: {
      contact: string;
      summary: string;
      experience: string;
      education: string;
      skills: string;
      languages: string;
      projects: string;
      clause: string;
    };
    fields: Record<string, string>;
    buttons: {
      addExperience: string;
      addEducation: string;
      addProject: string;
      addSkill: string;
      addLanguage: string;
      remove: string;
      moveUp: string;
      moveDown: string;
      print: string;
      exportJson: string;
      importJson: string;
      clear: string;
      demo: string;
      openPreview: string;
      importPdf: string;
    };
    previewWindow: { print: string; downloadHtml: string; close: string; hint: string; blocked: string };
    pdf: { title: string; hint: string; reading: string; failed: string; filled: string; textLabel: string; copyHint: string; clear: string };
    appearance: { title: string; template: string; accent: string; fontSize: string; levels: string };
    preview: { title: string; body: string; zoomIn: string; zoomOut: string; fit: string; pageBreak: string; overflow: string };
    messages: {
      saved: string;
      cleared: string;
      imported: string;
      importFailed: string;
      confirmClear: string;
      demoLoaded: string;
    };
    hints: { description: string; clause: string; level: string };
  };
  ats: {
    title: string;
    intro: string;
    runOn: string;
    score: string;
    scoreGood: string;
    scoreOk: string;
    scoreBad: string;
    advertLabel: string;
    advertHint: string;
    advertPlaceholder: string;
    matched: string;
    missing: string;
    noKeywords: string;
    checks: Record<string, { title: string; pass: string; warn: string; fail: string }>;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  footer: { body: string; author: string; code: string; rights: string };
  common: { skipToContent: string; present: string; changeLanguage: string; openMenu: string };
};

const PL: Content = {
  locale: 'pl',
  path: '/pl/',
  otherLocale: { code: 'en', label: 'English', path: '/' },
  nav: { builder: 'Kreator', templates: 'Szablony', ats: 'Test ATS', faq: 'FAQ' },
  theme: { toLight: 'Włącz tryb jasny', toDark: 'Włącz tryb ciemny', label: 'Motyw' },
  hero: {
    heading: 'CV, które przejdzie przez robota i zainteresuje człowieka',
    lead: 'Wypełnij formularz, wybierz jeden z sześciu szablonów i wydrukuj gotowy arkusz A4. Osobna zakładka sprawdzi, czy dokument poradzi sobie w systemach rekrutacyjnych. Wszystko dzieje się w Twojej przeglądarce.',
    cta: 'Otwórz kreator',
    ctaSecondary: 'Sprawdź swoje CV pod ATS',
    badges: ['Bez konta', 'Dane nie opuszczają urządzenia', 'Podgląd 1:1 z wydrukiem'],
  },
  benefits: [
    {
      title: 'Podgląd jest wydrukiem',
      body: 'To ten sam arkusz A4, który trafia do drukarki — nie osobna makieta. Znacznik pokazuje, gdzie kończy się strona, zanim zobaczysz to na papierze.',
    },
    {
      title: 'Test pod systemy rekrutacyjne',
      body: 'Jedenaście reguł sprawdza to, na co patrzy parser i ranking: daty, punktory, liczby, czasowniki, układ. Wklej ogłoszenie, a zobaczysz, których słów brakuje.',
    },
    {
      title: 'Sześć układów, jedna treść',
      body: 'Szablon zmienia wyłącznie wygląd. Przełączanie nigdy nie gubi tego, co już wpisałeś — a przy każdym widać, czy jest bezpieczny dla parsera.',
    },
    {
      title: 'Dane zostają u Ciebie',
      body: 'Serwis nie ma backendu, więc nie ma dokąd ich wysłać. CV mieszka w pamięci przeglądarki; plik JSON przeniesie je na inny komputer.',
    },
  ],
  templates: {
    title: 'Szablony',
    intro: 'Każdy układ mieści ten sam komplet danych. Oznaczone jako bezpieczne dla ATS mają jedną kolumnę tekstu i standardowe nagłówki.',
    atsSafe: 'Bezpieczny dla ATS',
    items: {
      classic: { name: 'Klasyczny', body: 'Jedna kolumna, wyraźne nagłówki sekcji. Najbezpieczniejszy wybór przy długim opisie doświadczenia.' },
      sidebar: { name: 'Kolumnowy', body: 'Kolorowy pasek boczny na kontakt, umiejętności i języki. Mieści więcej, ale gorzej znosi automatyczne parsowanie.' },
      minimal: { name: 'Minimal', body: 'Dużo światła, cienkie linie, zero bloków koloru. Sprawdza się w projektowaniu i wszędzie, gdzie liczy się spokój.' },
      timeline: { name: 'Oś czasu', body: 'Kariera narysowana jako ciągła linia z przystankami. Dobre, gdy historią jest sam awans.' },
      compact: { name: 'Kompaktowy', body: 'Mniejsze pismo i ciaśniejsze odstępy — dla długiego stażu, który wciąż ma zmieścić się na jednej stronie.' },
      modern: { name: 'Nowoczesny', body: 'Kolorowy pas nagłówka i dwie kolumny pod nim. Tożsamość na górze, spokojna treść niżej.' },
    },
  },
  how: {
    title: 'Jak to działa',
    intro: 'Cztery kroki, żadnej rejestracji.',
    steps: [
      { title: 'Wypełnij formularz', body: 'Dane kontaktowe, podsumowanie, doświadczenie, wykształcenie i umiejętności. Kreator startuje z przykładem.' },
      { title: 'Wybierz układ i kolor', body: 'Sześć szablonów, sześć kolorów akcentu i regulacja wielkości pisma, gdy treści jest więcej niż miejsca.' },
      { title: 'Sprawdź test ATS', body: 'Zakładka pokazuje wynik i konkretne uwagi. Wklej ogłoszenie, żeby zobaczyć brakujące słowa kluczowe.' },
      { title: 'Drukuj albo zapisz PDF', body: 'Przycisk otwiera okno druku. Wybierz „Zapisz jako PDF”, ustaw marginesy na „brak” — arkusz ma własne.' },
    ],
  },
  builder: {
    title: 'Kreator CV',
    intro: 'Zmiany widać w podglądzie od razu. Praca zapisuje się w przeglądarce automatycznie.',
    tabs: { details: 'Dane', experience: 'Doświadczenie', education: 'Wykształcenie', skills: 'Umiejętności', projects: 'Projekty' },
    sections: {
      contact: 'Dane kontaktowe',
      summary: 'Podsumowanie zawodowe',
      experience: 'Doświadczenie zawodowe',
      education: 'Wykształcenie',
      skills: 'Umiejętności',
      languages: 'Języki obce',
      projects: 'Projekty',
      clause: 'Klauzula o przetwarzaniu danych',
    },
    fields: {
      fullName: 'Imię i nazwisko',
      jobTitle: 'Stanowisko',
      email: 'E-mail',
      phone: 'Telefon',
      location: 'Lokalizacja',
      website: 'Strona WWW',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      summary: 'Podsumowanie',
      company: 'Firma',
      from: 'Od',
      to: 'Do',
      current: 'Nadal tu pracuję',
      description: 'Opis',
      course: 'Kierunek / stopień',
      school: 'Uczelnia',
      name: 'Nazwa',
      link: 'Link',
      level: 'Poziom',
      clause: 'Treść klauzuli',
      role: 'Stanowisko',
    },
    buttons: {
      addExperience: 'Dodaj stanowisko',
      addEducation: 'Dodaj wykształcenie',
      addProject: 'Dodaj projekt',
      addSkill: 'Dodaj umiejętność',
      addLanguage: 'Dodaj język',
      remove: 'Usuń',
      moveUp: 'Przenieś wyżej',
      moveDown: 'Przenieś niżej',
      print: 'Drukuj / zapisz PDF',
      exportJson: 'Eksportuj JSON',
      importJson: 'Wczytaj JSON',
      clear: 'Wyczyść',
      demo: 'Wczytaj przykład',
      openPreview: 'Otwórz w nowej karcie',
      importPdf: 'Wczytaj swoje CV (PDF)',
    },
    previewWindow: {
      print: 'Drukuj / zapisz PDF',
      downloadHtml: 'Pobierz jako plik HTML',
      close: 'Zamknij',
      hint: 'Marginesy w oknie druku ustaw na „brak” — arkusz ma własne.',
      blocked: 'Przeglądarka zablokowała nowe okno. Zezwól na wyskakujące okna dla tej strony i spróbuj ponownie.',
    },
    pdf: {
      title: 'Twoje obecne CV',
      hint: 'Wczytaj PDF ze swoim CV. Wyciągniemy z niego tekst i uzupełnimy dane kontaktowe; resztę przeniesiesz do pól, bo automatyczne dzielenie treści na stanowiska bywa mylące.',
      reading: 'Czytam plik…',
      failed: 'Nie udało się odczytać tego PDF-a. Jeśli to skan, tekstu w nim nie ma.',
      filled: 'Uzupełniono pola: :fields',
      textLabel: 'Tekst wyciągnięty z pliku',
      copyHint: 'Zaznacz fragment i przenieś go do właściwego pola formularza.',
      clear: 'Zamknij podgląd pliku',
    },
    appearance: { title: 'Wygląd', template: 'Szablon', accent: 'Kolor akcentu', fontSize: 'Wielkość pisma', levels: 'Pokaż poziomy umiejętności' },
    preview: {
      title: 'Podgląd',
      body: 'Arkusz A4 — dokładnie to, co trafi na wydruk.',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      fit: 'Dopasuj',
      pageBreak: 'Koniec strony',
      overflow: 'Treść wychodzi poza jedną stronę — zmniejsz pismo albo skróć opisy.',
    },
    messages: {
      saved: 'Zapisano w przeglądarce.',
      cleared: 'Formularz wyczyszczony.',
      imported: 'Wczytano dane z pliku.',
      importFailed: 'Nie udało się wczytać pliku — to nie jest plik CVForge.',
      confirmClear: 'Wyczyścić cały formularz? Tej operacji nie da się cofnąć.',
      demoLoaded: 'Wczytano przykładowe dane.',
    },
    hints: {
      description: 'Każdy wiersz to osobne osiągnięcie. Zacznij od czasownika i podaj liczbę, jeśli ją masz.',
      clause: 'Wymagana przez wielu pracodawców w Polsce. Zostaw puste, jeśli aplikujesz za granicę.',
      level: 'Od 1 do 5 — używane tylko przez szablony, które pokazują paski.',
    },
  },
  ats: {
    title: 'Test ATS',
    intro: 'Zanim CV zobaczy człowiek, czyta je oprogramowanie. Poniższe reguły sprawdzają to, czego szuka parser i ranking. Analiza działa w Twojej przeglądarce — nic nie jest nigdzie wysyłane.',
    runOn: 'Wynik dla szablonu',
    score: 'Wynik',
    scoreGood: 'Dobrze — dokument powinien przejść bez problemów.',
    scoreOk: 'Do poprawy — kilka rzeczy warto uzupełnić.',
    scoreBad: 'Słabo — parser może pominąć istotne informacje.',
    advertLabel: 'Treść ogłoszenia (opcjonalnie)',
    advertHint: 'Wklej ogłoszenie, na które aplikujesz. Porównamy jego słownictwo z Twoim CV.',
    advertPlaceholder: 'Wklej tutaj opis stanowiska…',
    matched: 'Słowa obecne w CV',
    missing: 'Słowa, których brakuje',
    noKeywords: 'Wklej ogłoszenie powyżej, aby zobaczyć dopasowanie słów kluczowych.',
    checks: {
      contact: {
        title: 'Dane kontaktowe',
        pass: 'E-mail, telefon i lokalizacja są na miejscu — parser znajdzie je od razu.',
        warn: 'Uzupełniono :filled z 3 pól. Brakujące dane potrafią wypaść z automatycznego formularza.',
        fail: 'Brakuje podstawowych danych kontaktowych. Bez e-maila zgłoszenie bywa odrzucane automatycznie.',
      },
      jobTitle: {
        title: 'Stanowisko',
        pass: 'Stanowisko jest podane — to pierwsze, co system dopasowuje do wakatu.',
        warn: 'Stanowisko jest bardzo krótkie.',
        fail: 'Brak stanowiska. Większość systemów porównuje właśnie ten tekst z tytułem ogłoszenia.',
      },
      summary: {
        title: 'Podsumowanie',
        pass: 'Długość :length znaków — wystarczy na słowa kluczowe i nie nuży.',
        warn: 'Długość :length znaków. Celuj w 200–800: krótsze nie niesie słów kluczowych, dłuższe nie zostanie przeczytane.',
        fail: 'Brak podsumowania. To najlepsze miejsce na słowa kluczowe z ogłoszenia.',
      },
      dates: {
        title: 'Daty zatrudnienia',
        pass: 'Każde stanowisko ma datę rozpoczęcia.',
        warn: 'Część stanowisk nie ma dat.',
        fail: 'Stanowisk bez daty rozpoczęcia: :count. Bez dat system nie policzy stażu.',
      },
      bullets: {
        title: 'Opisy stanowisk',
        pass: 'Wszystkie :positions stanowiska mają opis w punktach.',
        warn: 'Opisano :described z :positions stanowisk.',
        fail: 'Stanowiska nie mają opisów — nie ma z czego wyciągnąć kompetencji.',
      },
      numbers: {
        title: 'Liczby w osiągnięciach',
        pass: 'Punktów z konkretną liczbą: :count. To zamienia obowiązek w osiągnięcie.',
        warn: 'Tylko jeden punkt zawiera liczbę. Dodaj skalę, procent albo czas.',
        fail: 'Żaden punkt nie zawiera liczby. „Skróciłem czas ładowania o połowę” waży więcej niż „optymalizacja”.',
      },
      verbs: {
        title: 'Czasowniki na początku',
        pass: ':strong z :total punktów zaczyna się od czasownika działania.',
        warn: 'Tylko :strong z :total punktów zaczyna się od czasownika. Zamiast „odpowiedzialny za” napisz, co zrobiłeś.',
        fail: 'Brak punktów do oceny.',
      },
      skills: {
        title: 'Umiejętności',
        pass: 'Wymieniono :count umiejętności — dobry zakres do dopasowania.',
        warn: 'Wymieniono :count umiejętności. Poniżej pięciu jest za mało do dopasowania, powyżej osiemnastu przestaje cokolwiek znaczyć.',
        fail: 'Brak wymienionych umiejętności.',
      },
      layout: {
        title: 'Układ dokumentu',
        pass: 'Jedna kolumna tekstu — parser odczyta sekcje w prawidłowej kolejności.',
        warn: 'Układ z paskiem bocznym wygląda lepiej dla człowieka, ale część systemów odczyta kolumny w złej kolejności. Do aplikacji przez portal wybierz szablon oznaczony jako bezpieczny.',
        fail: 'Układ utrudnia parsowanie.',
      },
      length: {
        title: 'Długość dokumentu',
        pass: 'Około :count słów — mieści się w typowej jednej stronie.',
        warn: 'Około :count słów. Poniżej 200 dokument wygląda na pusty, powyżej 700 nie mieści się na stronie.',
        fail: 'Dokument jest praktycznie pusty.',
      },
      characters: {
        title: 'Znaki specjalne',
        pass: 'Brak emoji i tabulatorów — tekst wyciągnie się czysto.',
        warn: 'Znaleziono :count znaków (emoji, tabulatory), które potrafią uszkodzić wyciąganie tekstu z PDF.',
        fail: 'Zbyt dużo znaków ryzykownych dla parsera.',
      },
      keywords: {
        title: 'Słowa z ogłoszenia',
        pass: 'CV zawiera :matched z :total najczęstszych słów ogłoszenia.',
        warn: 'CV zawiera :matched z :total słów ogłoszenia. Wpleć brakujące tam, gdzie są prawdziwe.',
        fail: 'CV zawiera tylko :matched z :total słów ogłoszenia — ranking oceni je jako słabo dopasowane.',
      },
    },
  },
  faq: {
    title: 'Pytania i odpowiedzi',
    items: [
      {
        question: 'Czy moje dane gdzieś trafiają?',
        answer: 'Nie. Serwis to zbiór statycznych plików bez backendu — nie ma dokąd ich wysłać. Treść CV zapisuje się wyłącznie w pamięci Twojej przeglądarki i znika, gdy wyczyścisz dane witryny. Test ATS też liczy się lokalnie.',
      },
      {
        question: 'Jak zapisać CV jako PDF?',
        answer: 'Kliknij „Drukuj / zapisz PDF”, a w oknie druku wybierz drukarkę „Zapisz jako PDF”. Marginesy ustaw na „brak” — arkusz ma już własne, wliczone w projekt.',
      },
      {
        question: 'Skąd wiadomo, że test ATS mówi prawdę?',
        answer: 'Każda reguła pisze wprost, czego szukała i co znalazła, więc możesz się z nią nie zgodzić. To nie jest symulacja konkretnego systemu — to lista rzeczy, na których parsery najczęściej się przewracają.',
      },
      {
        question: 'Który szablon wybrać?',
        answer: 'Do aplikacji przez portal rekrutacyjny — oznaczony jako bezpieczny dla ATS: Klasyczny, Minimal albo Kompaktowy. Gdy CV trafia prosto do człowieka, Kolumnowy, Oś czasu i Nowoczesny wyglądają lepiej.',
      },
      {
        question: 'Czy mogę wrócić do CV za tydzień?',
        answer: 'Tak. Praca zapisuje się automatycznie w tej przeglądarce. Aby przenieść ją na inny komputer, użyj „Eksportuj JSON” i wczytaj plik po drugiej stronie.',
      },
    ],
  },
  footer: { body: 'CVForge — kreator CV z testem ATS, działający w całości w przeglądarce.', author: 'Autor', code: 'Kod źródłowy', rights: 'Wszelkie prawa zastrzeżone.' },
  common: { skipToContent: 'Przejdź do treści', present: 'obecnie', changeLanguage: 'Zmień język', openMenu: 'Menu' },
};

const EN: Content = {
  locale: 'en',
  path: '/',
  otherLocale: { code: 'pl', label: 'Polski', path: '/pl/' },
  nav: { builder: 'Builder', templates: 'Templates', ats: 'ATS check', faq: 'FAQ' },
  theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode', label: 'Theme' },
  hero: {
    heading: 'A CV that gets past the robot and interests the human',
    lead: 'Fill in the form, pick one of six templates and print a finished A4 sheet. A separate tab checks how the document will fare in applicant tracking systems. All of it happens in your browser.',
    cta: 'Open the builder',
    ctaSecondary: 'Check your CV against ATS',
    badges: ['No account', 'No data leaves your device', 'Preview matches the print'],
  },
  benefits: [
    {
      title: 'The preview is the print',
      body: 'It is the same A4 sheet that goes to the printer, not a separate mock-up. A marker shows where the page ends before you find out on paper.',
    },
    {
      title: 'A check against tracking systems',
      body: 'Eleven rules test what the parser and the ranking look at: dates, bullets, numbers, verbs, layout. Paste the advert and see which words are missing.',
    },
    {
      title: 'Six layouts, one set of content',
      body: 'A template only changes the appearance. Switching never loses what you typed — and each one says whether it is safe for a parser.',
    },
    {
      title: 'Your data stays with you',
      body: 'The site has no backend, so there is nowhere to send it. Your CV lives in browser storage; a JSON file carries it to another computer.',
    },
  ],
  templates: {
    title: 'Templates',
    intro: 'Every layout holds the same data. The ones marked ATS-safe use a single text column and standard headings.',
    atsSafe: 'ATS-safe',
    items: {
      classic: { name: 'Classic', body: 'One column, clear section headings. The safest choice when the work history is long.' },
      sidebar: { name: 'Sidebar', body: 'A coloured column for contact, skills and languages. Fits more, but parses less reliably.' },
      minimal: { name: 'Minimal', body: 'Generous white space, hairline rules, no blocks of colour. Suits design roles and anywhere calm wins.' },
      timeline: { name: 'Timeline', body: 'The career drawn as one continuous line with stops. Good when the progression is the story.' },
      compact: { name: 'Compact', body: 'Smaller type and tighter leading — for a long career that still has to fit one page.' },
      modern: { name: 'Modern', body: 'A colour band across the header and two columns below it. Identity on top, quiet content underneath.' },
    },
  },
  how: {
    title: 'How it works',
    intro: 'Four steps, no sign-up.',
    steps: [
      { title: 'Fill in the form', body: 'Contact details, summary, experience, education and skills. The builder opens with an example.' },
      { title: 'Choose a layout and colour', body: 'Six templates, six accent colours and a type-size control for when there is more content than room.' },
      { title: 'Run the ATS check', body: 'The tab shows a score and specific notes. Paste a job advert to see which keywords are missing.' },
      { title: 'Print or save a PDF', body: 'The button opens the print dialog. Choose “Save as PDF” and set margins to none — the sheet carries its own.' },
    ],
  },
  builder: {
    title: 'CV builder',
    intro: 'Changes appear in the preview immediately. Your work is saved in the browser automatically.',
    tabs: { details: 'Details', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects' },
    sections: {
      contact: 'Contact details',
      summary: 'Professional summary',
      experience: 'Work experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      projects: 'Projects',
      clause: 'Data processing clause',
    },
    fields: {
      fullName: 'Full name',
      jobTitle: 'Job title',
      email: 'E-mail',
      phone: 'Phone',
      location: 'Location',
      website: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      summary: 'Summary',
      company: 'Company',
      from: 'From',
      to: 'To',
      current: 'I still work here',
      description: 'Description',
      course: 'Course / degree',
      school: 'Institution',
      name: 'Name',
      link: 'Link',
      level: 'Level',
      clause: 'Clause text',
      role: 'Job title',
    },
    buttons: {
      addExperience: 'Add a position',
      addEducation: 'Add education',
      addProject: 'Add a project',
      addSkill: 'Add a skill',
      addLanguage: 'Add a language',
      remove: 'Remove',
      moveUp: 'Move up',
      moveDown: 'Move down',
      print: 'Print / save PDF',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      clear: 'Clear',
      demo: 'Load the example',
      openPreview: 'Open in a new tab',
      importPdf: 'Import your CV (PDF)',
    },
    previewWindow: {
      print: 'Print / save PDF',
      downloadHtml: 'Download as an HTML file',
      close: 'Close',
      hint: 'Set margins to none in the print dialog - the sheet carries its own.',
      blocked: 'The browser blocked the new window. Allow pop-ups for this site and try again.',
    },
    pdf: {
      title: 'Your current CV',
      hint: 'Load a PDF of your CV. We extract the text and fill in the contact details; the rest you move into the fields yourself, because splitting prose into positions automatically tends to be wrong.',
      reading: 'Reading the file...',
      failed: 'Could not read that PDF. If it is a scan, there is no text in it.',
      filled: 'Filled in: :fields',
      textLabel: 'Text extracted from the file',
      copyHint: 'Select a fragment and move it into the matching form field.',
      clear: 'Close the file preview',
    },
    appearance: { title: 'Appearance', template: 'Template', accent: 'Accent colour', fontSize: 'Type size', levels: 'Show skill levels' },
    preview: {
      title: 'Preview',
      body: 'An A4 sheet — exactly what goes to print.',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      fit: 'Fit',
      pageBreak: 'Page ends',
      overflow: 'The content runs past one page — reduce the type size or shorten the descriptions.',
    },
    messages: {
      saved: 'Saved in this browser.',
      cleared: 'The form has been cleared.',
      imported: 'Data loaded from the file.',
      importFailed: 'Could not read the file — it is not a CVForge export.',
      confirmClear: 'Clear the whole form? This cannot be undone.',
      demoLoaded: 'Example data loaded.',
    },
    hints: {
      description: 'One achievement per line. Start with a verb and give a number where you have one.',
      clause: 'Required by many Polish employers. Leave it empty when applying abroad.',
      level: 'From 1 to 5 — used only by templates that draw the bars.',
    },
  },
  ats: {
    title: 'ATS check',
    intro: 'Before a person reads your CV, software does. These rules test what the parser and the ranking look for. The analysis runs in your browser — nothing is sent anywhere.',
    runOn: 'Result for template',
    score: 'Score',
    scoreGood: 'Good — the document should get through without trouble.',
    scoreOk: 'Needs work — a few things are worth filling in.',
    scoreBad: 'Weak — a parser may miss important information.',
    advertLabel: 'Job advert (optional)',
    advertHint: 'Paste the advert you are applying to. We compare its vocabulary with your CV.',
    advertPlaceholder: 'Paste the job description here…',
    matched: 'Words present in the CV',
    missing: 'Words that are missing',
    noKeywords: 'Paste an advert above to see the keyword match.',
    checks: {
      contact: {
        title: 'Contact details',
        pass: 'E-mail, phone and location are all there — the parser will find them immediately.',
        warn: ':filled of 3 fields filled in. Missing details tend to drop out of an auto-filled application form.',
        fail: 'Basic contact details are missing. Without an e-mail an application is often rejected automatically.',
      },
      jobTitle: {
        title: 'Job title',
        pass: 'A job title is present — it is the first thing a system matches against the vacancy.',
        warn: 'The job title is very short.',
        fail: 'No job title. Most systems compare exactly this text with the advert headline.',
      },
      summary: {
        title: 'Summary',
        pass: ':length characters — enough room for keywords without becoming a wall of text.',
        warn: ':length characters. Aim for 200–800: shorter carries no keywords, longer will not be read.',
        fail: 'No summary. It is the best place for the keywords from the advert.',
      },
      dates: {
        title: 'Employment dates',
        pass: 'Every position has a start date.',
        warn: 'Some positions have no dates.',
        fail: 'Positions without a start date: :count. Without dates a system cannot calculate your experience.',
      },
      bullets: {
        title: 'Position descriptions',
        pass: 'All :positions positions are described in bullet points.',
        warn: ':described of :positions positions described.',
        fail: 'Positions have no descriptions — there is nothing to extract skills from.',
      },
      numbers: {
        title: 'Numbers in achievements',
        pass: 'Bullets with a concrete figure: :count. That turns a duty into an achievement.',
        warn: 'Only one bullet contains a number. Add a scale, a percentage or a timeframe.',
        fail: 'No bullet contains a number. “Halved the load time” carries more weight than “optimisation”.',
      },
      verbs: {
        title: 'Bullets opening with a verb',
        pass: ':strong of :total bullets open with an action verb.',
        warn: 'Only :strong of :total bullets open with a verb. Instead of “responsible for”, write what you did.',
        fail: 'No bullets to assess.',
      },
      skills: {
        title: 'Skills',
        pass: ':count skills listed — a good range to match against.',
        warn: ':count skills listed. Below five is too little to match, above eighteen stops meaning anything.',
        fail: 'No skills listed.',
      },
      layout: {
        title: 'Document layout',
        pass: 'A single text column — the parser will read the sections in the right order.',
        warn: 'A sidebar layout reads better for a human, but some systems read the columns out of order. For portal applications pick a template marked ATS-safe.',
        fail: 'The layout makes parsing difficult.',
      },
      length: {
        title: 'Document length',
        pass: 'About :count words — within a typical single page.',
        warn: 'About :count words. Below 200 the document looks empty, above 700 it will not fit a page.',
        fail: 'The document is practically empty.',
      },
      characters: {
        title: 'Special characters',
        pass: 'No emoji or tabs — the text will extract cleanly.',
        warn: 'Found :count characters (emoji, tabs) that can break text extraction from a PDF.',
        fail: 'Too many characters that are risky for a parser.',
      },
      keywords: {
        title: 'Words from the advert',
        pass: 'The CV contains :matched of the :total most frequent words in the advert.',
        warn: 'The CV contains :matched of :total advert words. Work the missing ones in where they are true.',
        fail: 'The CV contains only :matched of :total advert words — the ranking will read it as a poor match.',
      },
    },
  },
  faq: {
    title: 'Questions and answers',
    items: [
      {
        question: 'Does my data go anywhere?',
        answer: 'No. The site is a set of static files with no backend — there is nowhere to send it. Your CV is stored only in your browser and disappears when you clear site data. The ATS check also runs locally.',
      },
      {
        question: 'How do I save the CV as a PDF?',
        answer: 'Click “Print / save PDF” and choose the “Save as PDF” destination. Set margins to none — the sheet already carries its own.',
      },
      {
        question: 'How do I know the ATS check is telling the truth?',
        answer: 'Every rule states what it looked for and what it found, so you can disagree with it. It does not simulate one particular system — it is a list of the things parsers most often trip over.',
      },
      {
        question: 'Which template should I pick?',
        answer: 'For applying through a recruitment portal, one marked ATS-safe: Classic, Minimal or Compact. When the CV goes straight to a person, Sidebar, Timeline and Modern look better.',
      },
      {
        question: 'Can I come back to my CV next week?',
        answer: 'Yes. Your work is saved automatically in this browser. To move it to another computer, use “Export JSON” and load the file on the other side.',
      },
    ],
  },
  footer: { body: 'CVForge — a CV builder with an ATS check, running entirely in your browser.', author: 'Author', code: 'Source code', rights: 'All rights reserved.' },
  common: { skipToContent: 'Skip to content', present: 'present', changeLanguage: 'Change language', openMenu: 'Menu' },
};

export const CONTENT: Record<Locale, Content> = { pl: PL, en: EN };

/** Fills :placeholders in a translated check message. */
export function fillValues(message: string, values: Record<string, string | number> = {}): string {
  return message.replace(/:([a-zA-Z]+)/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
