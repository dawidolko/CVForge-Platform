import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Compact — for a long career that still has to fit one page.
 *
 * Smaller type, tighter leading and headings set on the same line as the
 * content. Still a single text flow, so it stays safe for parsers.
 */
export function CompactTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-[2mm] border-b-[0.3mm] border-[#e2d9cb] pb-[0.8mm] text-[8.5pt] font-bold uppercase tracking-[0.18em]"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="px-[14mm] py-[12mm] font-body text-[9pt] leading-[1.42] text-[#171310]">
      <header className="mb-[5mm] flex flex-wrap items-end justify-between gap-x-[6mm] gap-y-[1mm]">
        <div>
          <h1 className="font-display text-[19pt] font-bold leading-none tracking-tight">{resume.contact.fullName}</h1>
          {resume.contact.jobTitle && (
            <p className="mt-[1mm] text-[10pt] font-medium" style={{ color: accent }}>{resume.contact.jobTitle}</p>
          )}
        </div>
        {contacts.length > 0 && (
          <ul className="text-right text-[8pt] leading-[1.35] text-[#6b6055]">
            {contacts.map((row) => (
              <li key={row.key}>{row.value}</li>
            ))}
          </ul>
        )}
      </header>

      {resume.summary.trim() && (
        <section className="mb-[4mm]">
          <Heading>{labels.summary}</Heading>
          <p className="text-justify text-[8.5pt] leading-[1.45]">{resume.summary}</p>
        </section>
      )}

      {hasContent(resume.experience, ['role', 'company', 'description']) && (
        <section className="mb-[4mm]">
          <Heading>{labels.experience}</Heading>
          <ol className="space-y-[2.5mm]">
            {resume.experience.map((entry) => (
              <li key={entry.id}>
                <p className="flex flex-wrap items-baseline gap-x-[2mm]">
                  <span className="text-[9.5pt] font-bold">{entry.role}</span>
                  {entry.company && <span className="text-[9pt]" style={{ color: accent }}>· {entry.company}</span>}
                  <span className="ml-auto text-[8pt] text-[#8d8175]">
                    {dateRange(entry.from, entry.to, entry.current, labels.present)}
                  </span>
                </p>
                {descriptionLines(entry.description).length > 0 && (
                  <ul className="mt-[0.8mm] list-disc space-y-[0.4mm] pl-[4mm] text-[8.5pt] marker:text-[#cbbfab]">
                    {descriptionLines(entry.description).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[7mm]">
        {hasContent(resume.education, ['course', 'school']) && (
          <section className="mb-[4mm]">
            <Heading>{labels.education}</Heading>
            <ol className="space-y-[1.8mm]">
              {resume.education.map((entry) => (
                <li key={entry.id}>
                  <p className="text-[9pt] font-bold">{entry.course}</p>
                  <p className="text-[8.5pt] text-[#6b6055]">
                    {entry.school}
                    <span className="text-[#8d8175]"> · {dateRange(entry.from, entry.to, false, labels.present)}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {hasContent(resume.projects, ['name', 'description']) && (
          <section className="mb-[4mm]">
            <Heading>{labels.projects}</Heading>
            <ol className="space-y-[1.8mm]">
              {resume.projects.map((entry) => (
                <li key={entry.id}>
                  <p className="text-[9pt] font-bold">{entry.name}</p>
                  {entry.description && <p className="text-[8.5pt] text-[#3b332c]">{entry.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-x-[7mm]">
        {hasContent(resume.skills, ['name']) && (
          <section>
            <Heading>{labels.skills}</Heading>
            <p className="text-[8.5pt] leading-[1.6]">
              {resume.skills.map((entry) => entry.name).filter(Boolean).join(' · ')}
            </p>
          </section>
        )}

        {hasContent(resume.languages, ['name']) && (
          <section>
            <Heading>{labels.languages}</Heading>
            <p className="text-[8.5pt] leading-[1.6]">
              {resume.languages
                .filter((entry) => entry.name)
                .map((entry) => (entry.level ? `${entry.name} (${entry.level})` : entry.name))
                .join(' · ')}
            </p>
          </section>
        )}
      </div>

      {resume.clause.trim() && <p className="mt-[3.5mm] text-[7pt] leading-snug text-[#8d8175]">{resume.clause}</p>}
    </div>
  );
}
