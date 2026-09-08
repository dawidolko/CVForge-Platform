import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Classic — one column, ruled headings.
 *
 * Deliberately plain: real text instead of graphics and standard section names,
 * so an applicant tracking system can parse it without guessing.
 */
export function ClassicTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2
      className="mb-[3mm] border-b pb-[1.5mm] text-[10.5pt] font-bold uppercase tracking-[0.14em]"
      style={{ color: accent, borderColor: accent }}
    >
      {children}
    </h2>
  );

  return (
    <div className="px-[16mm] py-[15mm] font-body text-[10pt] leading-[1.5] text-[#171310]">
      <header className="mb-[7mm]">
        <h1 className="font-display text-[24pt] font-extrabold leading-tight tracking-tight" style={{ color: accent }}>
          {resume.contact.fullName}
        </h1>
        {resume.contact.jobTitle && <p className="mt-[1mm] text-[12pt] font-medium text-[#3b332c]">{resume.contact.jobTitle}</p>}
        {contacts.length > 0 && (
          <ul className="mt-[3mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[9pt] text-[#6b6055]">
            {contacts.map((row) => (
              <li key={row.key}>{row.value}</li>
            ))}
          </ul>
        )}
      </header>

      {resume.summary.trim() && (
        <section className="mb-[6mm]">
          <Heading>{labels.summary}</Heading>
          <p className="text-justify">{resume.summary}</p>
        </section>
      )}

      {hasContent(resume.experience, ['role', 'company', 'description']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.experience}</Heading>
          <ol className="space-y-[4mm]">
            {resume.experience.map((entry) => (
              <li key={entry.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-[4mm]">
                  <h3 className="text-[11pt] font-bold">{entry.role}</h3>
                  <span className="text-[9pt] font-medium text-[#6b6055]">
                    {dateRange(entry.from, entry.to, entry.current, labels.present)}
                  </span>
                </div>
                {entry.company && <p className="text-[10pt] font-medium" style={{ color: accent }}>{entry.company}</p>}
                {descriptionLines(entry.description).length > 0 && (
                  <ul className="mt-[1.5mm] list-disc space-y-[0.8mm] pl-[5mm] marker:text-[#8d8175]">
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

      {hasContent(resume.education, ['course', 'school']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.education}</Heading>
          <ol className="space-y-[3mm]">
            {resume.education.map((entry) => (
              <li key={entry.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-[4mm]">
                  <h3 className="text-[10.5pt] font-bold">{entry.course}</h3>
                  <span className="text-[9pt] font-medium text-[#6b6055]">
                    {dateRange(entry.from, entry.to, false, labels.present)}
                  </span>
                </div>
                {entry.school && <p className="text-[10pt]" style={{ color: accent }}>{entry.school}</p>}
                {entry.description && <p className="mt-[1mm] text-[9.5pt] text-[#3b332c]">{entry.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {hasContent(resume.projects, ['name', 'description']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.projects}</Heading>
          <ol className="space-y-[2.5mm]">
            {resume.projects.map((entry) => (
              <li key={entry.id}>
                <h3 className="text-[10.5pt] font-bold">
                  {entry.name}
                  {entry.link && <span className="ml-[2mm] text-[9pt] font-normal text-[#6b6055]">{entry.link}</span>}
                </h3>
                {entry.description && <p className="text-[9.5pt]">{entry.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[8mm]">
        {hasContent(resume.skills, ['name']) && (
          <section className="mb-[5mm]">
            <Heading>{labels.skills}</Heading>
            <ul className="space-y-[1.2mm]">
              {resume.skills.map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-[3mm]">
                  <span>{entry.name}</span>
                  {settings.showSkillLevels && entry.name && (
                    <span className="flex shrink-0 gap-[0.8mm]" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span
                          key={step}
                          className="h-[1.4mm] w-[3.5mm] rounded-full"
                          style={{ background: step <= entry.level ? accent : '#e2d9cb' }}
                        />
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasContent(resume.languages, ['name']) && (
          <section className="mb-[5mm]">
            <Heading>{labels.languages}</Heading>
            <ul className="space-y-[1.2mm]">
              {resume.languages.map((entry) => (
                <li key={entry.id} className="flex items-baseline justify-between gap-[3mm]">
                  <span>{entry.name}</span>
                  <span className="text-[9pt] font-medium text-[#6b6055]">{entry.level}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {resume.clause.trim() && (
        <p className="mt-[4mm] border-t border-[#e2d9cb] pt-[2.5mm] text-[7.5pt] leading-snug text-[#8d8175]">
          {resume.clause}
        </p>
      )}
    </div>
  );
}
