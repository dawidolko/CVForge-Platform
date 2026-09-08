/*
 * Applicant tracking system review.
 *
 * Most CVs are read by software before a person sees them. The parser wants
 * plain text in predictable places; the ranking wants the words from the job
 * advert. This module checks both, and every rule states what it looked for so
 * the score can be argued with rather than trusted blindly.
 *
 * Nothing here calls a service — the analysis runs on the text in the browser.
 */

import type { Resume, TemplateId } from './resume';
import { ATS_SAFE_TEMPLATES, descriptionLines } from './resume';

export type CheckStatus = 'pass' | 'warn' | 'fail';

export type CheckResult = {
  id: string;
  status: CheckStatus;
  /** Filled in by the caller from the translations. */
  detail?: string;
  /** Values interpolated into the translated message. */
  values?: Record<string, string | number>;
};

export type AtsReport = {
  score: number;
  checks: CheckResult[];
  keywords: { matched: string[]; missing: string[] } | null;
};

/*
 * Verbs that open a strong bullet point. Recruiters and parsers both reward a
 * line that starts with an action rather than "responsible for".
 */
const ACTION_VERBS = [
  // English
  'built', 'led', 'shipped', 'designed', 'migrated', 'automated', 'reduced', 'improved', 'launched',
  'created', 'developed', 'implemented', 'introduced', 'delivered', 'maintained', 'optimised', 'optimized',
  'refactored', 'tested', 'documented', 'mentored', 'owned', 'ran', 'scaled', 'integrated', 'rewrote',
  // Polish (also the feminine forms, which are just as common on a Polish CV)
  'zbudowałem', 'zbudowałam', 'stworzyłem', 'stworzyłam', 'wdrożyłem', 'wdrożyłam', 'rozwijam', 'rozwijałem',
  'rozwijałam', 'zaprojektowałem', 'zaprojektowałam', 'zautomatyzowałem', 'zautomatyzowałam', 'skróciłem',
  'skróciłam', 'poprawiłem', 'poprawiłam', 'przeprowadziłem', 'przeprowadziłam', 'wprowadziłem', 'wprowadziłam',
  'zoptymalizowałem', 'zoptymalizowałam', 'utrzymywałem', 'utrzymywałam', 'zwiększyłem', 'zwiększyłam',
  'budowałem', 'budowałam', 'prowadziłem', 'prowadziłam', 'odpowiadałem', 'odpowiadałam',
];

/* Words too common to count as keywords when comparing against a job advert. */
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'you', 'our', 'are', 'will', 'that', 'this', 'have', 'from', 'your', 'work',
  'team', 'about', 'they', 'them', 'who', 'was', 'not', 'but', 'all', 'can', 'his', 'her', 'has', 'been',
  'oraz', 'lub', 'dla', 'nie', 'jest', 'sie', 'się', 'przez', 'jako', 'this', 'jak', 'tym', 'que', 'praca',
  'nasz', 'nasze', 'będziesz', 'twoje', 'twoja', 'masz', 'znasz', 'umiesz', 'chcesz', 'poszukujemy', 'oferujemy',
]);

function plainText(resume: Resume): string {
  return [
    resume.contact.fullName,
    resume.contact.jobTitle,
    resume.summary,
    ...resume.experience.flatMap((entry) => [entry.role, entry.company, entry.description]),
    ...resume.education.flatMap((entry) => [entry.course, entry.school, entry.description]),
    ...resume.projects.flatMap((entry) => [entry.name, entry.description]),
    ...resume.skills.map((entry) => entry.name),
    ...resume.languages.map((entry) => entry.name),
  ]
    .join(' ')
    .toLowerCase();
}

/** Rough word count of everything that would be printed. */
export function wordCount(resume: Resume): number {
  return plainText(resume).split(/\s+/).filter(Boolean).length;
}

function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#. ]/gu, ' ')
    .split(/\s+/)
    .map((word) => word.replace(/^[.]+|[.]+$/g, ''))
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word) && !/^\d+$/.test(word));

  const counts = new Map<string, number>();
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([word]) => word);
}

/**
 * Runs the review. `jobAdvert` is optional: without it the keyword section is
 * skipped rather than guessed at.
 */
export function reviewResume(resume: Resume, template: TemplateId, jobAdvert: string): AtsReport {
  const checks: CheckResult[] = [];
  const text = plainText(resume);
  const bullets = resume.experience.flatMap((entry) => descriptionLines(entry.description));

  // 1. Contact details the parser looks for first.
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.contact.email.trim());
  const contactFields = [hasEmail, resume.contact.phone.trim().length > 0, resume.contact.location.trim().length > 0];
  const contactFilled = contactFields.filter(Boolean).length;
  checks.push({
    id: 'contact',
    status: contactFilled === 3 ? 'pass' : contactFilled >= 2 ? 'warn' : 'fail',
    values: { filled: contactFilled },
  });

  // 2. A job title is what most systems match against the vacancy.
  checks.push({
    id: 'jobTitle',
    status: resume.contact.jobTitle.trim().length > 2 ? 'pass' : 'fail',
  });

  // 3. A summary that is long enough to carry keywords, short enough to read.
  const summaryLength = resume.summary.trim().length;
  checks.push({
    id: 'summary',
    status: summaryLength >= 200 && summaryLength <= 800 ? 'pass' : summaryLength > 0 ? 'warn' : 'fail',
    values: { length: summaryLength },
  });

  // 4. Every position needs a start date, or the timeline cannot be parsed.
  const withoutDates = resume.experience.filter((entry) => entry.role.trim() && !entry.from.trim()).length;
  checks.push({
    id: 'dates',
    status: withoutDates === 0 ? 'pass' : 'fail',
    values: { count: withoutDates },
  });

  // 5. Positions described as bullet points rather than a wall of prose.
  const described = resume.experience.filter((entry) => descriptionLines(entry.description).length > 0).length;
  const positions = resume.experience.filter((entry) => entry.role.trim()).length;
  checks.push({
    id: 'bullets',
    status: positions > 0 && described === positions ? 'pass' : described > 0 ? 'warn' : 'fail',
    values: { described, positions },
  });

  // 6. Numbers turn a duty into an achievement.
  const quantified = bullets.filter((line) => /\d/.test(line)).length;
  checks.push({
    id: 'numbers',
    status: quantified >= 2 ? 'pass' : quantified === 1 ? 'warn' : 'fail',
    values: { count: quantified },
  });

  // 7. Bullets that open with an action verb.
  const strongOpenings = bullets.filter((line) => {
    const first = line.toLowerCase().split(/\s+/)[0]?.replace(/[^\p{L}]/gu, '') ?? '';
    return ACTION_VERBS.includes(first);
  }).length;
  checks.push({
    id: 'verbs',
    status: bullets.length === 0 ? 'fail' : strongOpenings / bullets.length >= 0.5 ? 'pass' : 'warn',
    values: { strong: strongOpenings, total: bullets.length },
  });

  // 8. Enough named skills to match against, not so many they mean nothing.
  const skills = resume.skills.filter((entry) => entry.name.trim()).length;
  checks.push({
    id: 'skills',
    status: skills >= 5 && skills <= 18 ? 'pass' : skills > 0 ? 'warn' : 'fail',
    values: { count: skills },
  });

  // 9. Layout: a sidebar reads better for a human, worse for a parser.
  checks.push({
    id: 'layout',
    status: ATS_SAFE_TEMPLATES.includes(template) ? 'pass' : 'warn',
  });

  // 10. Overall length.
  const words = wordCount(resume);
  checks.push({
    id: 'length',
    status: words >= 200 && words <= 700 ? 'pass' : words > 0 ? 'warn' : 'fail',
    values: { count: words },
  });

  // 11. Characters that routinely break text extraction.
  const risky = (resume.summary + bullets.join(' ')).match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\t]/gu) ?? [];
  checks.push({
    id: 'characters',
    status: risky.length === 0 ? 'pass' : 'warn',
    values: { count: risky.length },
  });

  // 12. Keywords from the advert, when one was pasted in.
  let keywords: AtsReport['keywords'] = null;
  if (jobAdvert.trim().length > 60) {
    const wanted = extractKeywords(jobAdvert);
    const matched = wanted.filter((word) => text.includes(word));
    const missing = wanted.filter((word) => !text.includes(word));
    keywords = { matched, missing };
    const ratio = wanted.length > 0 ? matched.length / wanted.length : 0;
    checks.push({
      id: 'keywords',
      status: ratio >= 0.5 ? 'pass' : ratio >= 0.25 ? 'warn' : 'fail',
      values: { matched: matched.length, total: wanted.length },
    });
  }

  // A pass is a full point, a warning half, a failure none.
  const points = checks.reduce((total, check) => total + (check.status === 'pass' ? 1 : check.status === 'warn' ? 0.5 : 0), 0);
  const score = Math.round((points / checks.length) * 100);

  return { score, checks, keywords };
}
