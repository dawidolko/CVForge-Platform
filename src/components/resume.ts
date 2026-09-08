/*
 * The resume model.
 *
 * One shape describes a CV for every template: a template decides how the data
 * looks, never what it is. That is what makes switching layouts safe — nothing
 * typed can be lost by changing the design.
 */

export type Locale = 'pl' | 'en';

export type Contact = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
};

export type EducationEntry = {
  id: string;
  course: string;
  school: string;
  from: string;
  to: string;
  description: string;
};

export type ProjectEntry = {
  id: string;
  name: string;
  link: string;
  description: string;
};

export type SkillEntry = {
  id: string;
  name: string;
  level: number; // 1-5, only rendered by templates that draw it
};

export type LanguageEntry = {
  id: string;
  name: string;
  level: string; // free text, because scales differ between countries
};

export type Resume = {
  contact: Contact;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
  clause: string;
};

export type TemplateId = 'classic' | 'sidebar' | 'minimal' | 'timeline' | 'compact' | 'modern';

export const TEMPLATE_IDS: TemplateId[] = ['classic', 'sidebar', 'minimal', 'timeline', 'compact', 'modern'];

/**
 * Templates that parse reliably in applicant tracking systems: a single text
 * column, no sidebar and no decorative blocks between the reader and the text.
 */
export const ATS_SAFE_TEMPLATES: TemplateId[] = ['classic', 'minimal', 'compact'];

export type Settings = {
  template: TemplateId;
  accent: string;
  fontScale: number; // 0.9 - 1.1
  showSkillLevels: boolean;
};

export const ACCENTS = [
  { id: 'ink', value: '#171310' },
  { id: 'saffron', value: '#c2410c' },
  { id: 'moss', value: '#3f6212' },
  { id: 'ocean', value: '#155e75' },
  { id: 'berry', value: '#9f1239' },
  { id: 'violet', value: '#5b21b6' },
] as const;

export const DEFAULT_SETTINGS: Settings = {
  template: 'classic',
  accent: '#171310',
  fontScale: 1,
  showSkillLevels: true,
};

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyExperience(): ExperienceEntry {
  return { id: newId(), role: '', company: '', from: '', to: '', current: false, description: '' };
}

export function emptyEducation(): EducationEntry {
  return { id: newId(), course: '', school: '', from: '', to: '', description: '' };
}

export function emptyProject(): ProjectEntry {
  return { id: newId(), name: '', link: '', description: '' };
}

export function emptySkill(): SkillEntry {
  return { id: newId(), name: '', level: 3 };
}

export function emptyLanguage(): LanguageEntry {
  return { id: newId(), name: '', level: '' };
}

/*
 * Demo content.
 *
 * The builder opens filled in, because an empty form shows nothing of what the
 * templates can do. "Clear" leaves the bare skeleton behind.
 */
export const DEMO: Record<Locale, Resume> = {
  pl: {
    contact: {
      fullName: 'Anna Kowalska',
      jobTitle: 'Frontend Developer',
      email: 'anna.kowalska@example.com',
      phone: '+48 600 100 200',
      location: 'Rzeszów, Polska',
      website: 'annakowalska.dev',
      linkedin: 'linkedin.com/in/annakowalska',
      github: 'github.com/annakowalska',
    },
    summary:
      'Frontend developerka z czteroletnim doświadczeniem w budowie aplikacji dla e-commerce. Specjalizuję się w React i TypeScript, dbam o dostępność i wydajność. Ostatnio przeprowadziłam migrację sklepu z 40 tysiącami produktów na renderowanie po stronie serwera, co skróciło czas do pierwszego renderu o połowę.',
    experience: [
      {
        id: 'x1',
        role: 'Frontend Developer',
        company: 'Nordmark Commerce',
        from: '2023-04',
        to: '',
        current: true,
        description:
          'Rozwijam sklep na Next.js obsługujący 40 tys. produktów.\nPrzeprowadziłam migrację na renderowanie serwerowe — czas do pierwszego renderu spadł z 3,1 s do 1,4 s.\nWdrożyłam audyt dostępności: sklep spełnia WCAG 2.2 na poziomie AA.',
      },
      {
        id: 'x2',
        role: 'Junior Frontend Developer',
        company: 'Studio Kreska',
        from: '2021-09',
        to: '2023-03',
        current: false,
        description:
          'Budowałam strony dla klientów w React i Vue.\nWprowadziłam wspólną bibliotekę komponentów, która skróciła start nowego projektu z trzech dni do jednego.',
      },
    ],
    education: [
      {
        id: 'e1',
        course: 'Informatyka, studia inżynierskie',
        school: 'Uniwersytet Rzeszowski',
        from: '2018-10',
        to: '2022-02',
        description: 'Praca dyplomowa o wydajności renderowania w aplikacjach jednostronicowych.',
      },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Dostępny konfigurator produktu',
        link: 'github.com/annakowalska/konfigurator',
        description: 'Konfigurator obsługiwany w całości z klawiatury, z komunikatami dla czytników ekranu.',
      },
    ],
    skills: [
      { id: 's1', name: 'React', level: 5 },
      { id: 's2', name: 'TypeScript', level: 5 },
      { id: 's3', name: 'Next.js', level: 4 },
      { id: 's4', name: 'Testy (Vitest, Playwright)', level: 4 },
      { id: 's5', name: 'Dostępność (WCAG)', level: 4 },
      { id: 's6', name: 'Node.js', level: 3 },
    ],
    languages: [
      { id: 'l1', name: 'Polski', level: 'ojczysty' },
      { id: 'l2', name: 'Angielski', level: 'C1' },
      { id: 'l3', name: 'Niemiecki', level: 'A2' },
    ],
    clause:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w tym dokumencie na potrzeby procesu rekrutacji, zgodnie z RODO.',
  },
  en: {
    contact: {
      fullName: 'Anna Kowalska',
      jobTitle: 'Frontend Developer',
      email: 'anna.kowalska@example.com',
      phone: '+48 600 100 200',
      location: 'Rzeszów, Poland',
      website: 'annakowalska.dev',
      linkedin: 'linkedin.com/in/annakowalska',
      github: 'github.com/annakowalska',
    },
    summary:
      'Frontend developer with four years of experience building e-commerce applications. I specialise in React and TypeScript, and I care about accessibility and performance. Most recently I migrated a 40,000-product store to server-side rendering, halving the time to first render.',
    experience: [
      {
        id: 'x1',
        role: 'Frontend Developer',
        company: 'Nordmark Commerce',
        from: '2023-04',
        to: '',
        current: true,
        description:
          'Developed a Next.js storefront serving 40,000 products.\nMigrated the store to server-side rendering — time to first render dropped from 3.1 s to 1.4 s.\nRan an accessibility audit: the store now meets WCAG 2.2 level AA.',
      },
      {
        id: 'x2',
        role: 'Junior Frontend Developer',
        company: 'Studio Kreska',
        from: '2021-09',
        to: '2023-03',
        current: false,
        description:
          'Built client websites in React and Vue.\nIntroduced a shared component library that cut project setup from three days to one.',
      },
    ],
    education: [
      {
        id: 'e1',
        course: 'BEng Computer Science',
        school: 'University of Rzeszów',
        from: '2018-10',
        to: '2022-02',
        description: 'Thesis on rendering performance in single-page applications.',
      },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Accessible product configurator',
        link: 'github.com/annakowalska/configurator',
        description: 'A configurator fully operable from the keyboard, with live announcements for screen readers.',
      },
    ],
    skills: [
      { id: 's1', name: 'React', level: 5 },
      { id: 's2', name: 'TypeScript', level: 5 },
      { id: 's3', name: 'Next.js', level: 4 },
      { id: 's4', name: 'Testing (Vitest, Playwright)', level: 4 },
      { id: 's5', name: 'Accessibility (WCAG)', level: 4 },
      { id: 's6', name: 'Node.js', level: 3 },
    ],
    languages: [
      { id: 'l1', name: 'Polish', level: 'native' },
      { id: 'l2', name: 'English', level: 'C1' },
      { id: 'l3', name: 'German', level: 'A2' },
    ],
    clause:
      'I consent to the processing of the personal data contained in this document for the purposes of the recruitment process, in accordance with the GDPR.',
  },
};

export function emptyResume(): Resume {
  return {
    contact: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
    summary: '',
    experience: [emptyExperience()],
    education: [emptyEducation()],
    projects: [],
    skills: [emptySkill()],
    languages: [emptyLanguage()],
    clause: '',
  };
}

/**
 * Formats a date range for the sheet. Input is `YYYY-MM` from a month field;
 * empty values are skipped rather than printed as gaps.
 */
export function dateRange(from: string, to: string, current: boolean, presentLabel: string): string {
  const readable = (value: string) => {
    if (!value) return '';
    const [year, month] = value.split('-');
    return month ? `${month}.${year}` : year;
  };
  const start = readable(from);
  const end = current ? presentLabel : readable(to);
  if (!start && !end) return '';
  if (!end) return start;
  if (!start) return end;
  return `${start} — ${end}`;
}

/** Description lines become bullet points; blank lines are dropped. */
export function descriptionLines(description: string): string[] {
  return description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Contact rows in display order, without the empty ones. */
export function contactRows(resume: Resume): { key: string; value: string }[] {
  const c = resume.contact;
  return [
    { key: 'email', value: c.email },
    { key: 'phone', value: c.phone },
    { key: 'location', value: c.location },
    { key: 'website', value: c.website },
    { key: 'linkedin', value: c.linkedin },
    { key: 'github', value: c.github },
  ].filter((row) => row.value.trim().length > 0);
}

/** Whether a section has anything worth printing a heading for. */
export function hasContent(rows: { [key: string]: unknown }[], fields: string[]): boolean {
  return rows.some((row) => fields.some((field) => String(row[field] ?? '').trim().length > 0));
}
