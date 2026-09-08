import type { Resume, Settings } from '../resume';

/** Section headings and the "present" word, handed to a template as plain strings. */
export type TemplateLabels = {
  contact: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  projects: string;
  present: string;
};

export type TemplateProps = {
  resume: Resume;
  settings: Settings;
  labels: TemplateLabels;
};
