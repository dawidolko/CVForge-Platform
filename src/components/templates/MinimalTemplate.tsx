import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Minimal — white space and hairlines, no blocks of colour.
 *
 * The accent appears only in the name and in the rule under a heading. The
 * rest is typography: this layout is meant to be quiet.
 */
export function MinimalTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-[3mm] flex items-center gap-[3mm] text-[9pt] font-semibold uppercase tracking-[0.22em] text-[#6b6055]">
      <span>{children}</span>
      <span aria-hidden="true" className="h-[0.25mm] flex-1 bg-[#e2d9cb]" />
    </h2>
  );

  const Row = ({ meta, children }: { meta: string; children: React.ReactNode }) => (
    <li className="grid grid-cols-[26mm_1fr] gap-x-[5mm]">
      <span className="pt-[0.6mm] text-[8.5pt] leading-snug text-[#8d8175]">{meta}</span>
      <div>{children}</div>
    </li>
  );

  return (
    <div className="px-[20mm] py-[18mm] font-body text-[10pt] leading-[1.6] text-[#171310]">
      <header className="mb-[9mm]">
        <h1 className="font-display text-[22pt] font-light leading-tight tracking-[0.02em]" style={{ color: accent }}>
          {resume.contact.fullName}
        </h1>
        {resume.contact.jobTitle && (
          <p className="mt-[1.5mm] text-[11pt] font-normal tracking-wide text-[#6b6055]">{resume.contact.jobTitle}</p>
        )}
        {contacts.length > 0 && (
          <ul className="mt-[4mm] flex flex-wrap gap-x-[4mm] gap-y-[1mm] text-[8.5pt] text-[#8d8175]">
            {contacts.map((row, i) => (
              <li key={row.key} className="flex items-center gap-[4mm]">
                {i > 0 && <span aria-hidden="true" className="text-[#cbbfab]">·</span>}
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
        )}
      </header>

      {resume.summary.trim() && (
        <section className="mb-[7mm]">
          <p className="text-[10.5pt] leading-[1.7] text-[#3b332c]">{resume.summary}</p>
        </section>
      )}

      {hasContent(resume.experience, ['role', 'company', 'description']) && (
        <section className="mb-[7mm]">
          <Heading>{labels.experience}</Heading>
          <ol className="space-y-[5mm]">
            {resume.experience.map((entry) => (
              <Row key={entry.id} meta={dateRange(entry.from, entry.to, entry.current, labels.present)}>
                <h3 className="text-[10.5pt] font-semibold">{entry.role}</h3>
                {entry.company && <p className="text-[9.5pt] text-[#6b6055]">{entry.company}</p>}
                {descriptionLines(entry.description).length > 0 && (
                  <ul className="mt-[1.5mm] space-y-[1mm] text-[9.5pt]">
                    {descriptionLines(entry.description).map((line, i) => (
                      <li key={i} className="flex gap-[2.5mm]">
                        <span aria-hidden="true" style={{ color: accent }}>—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Row>
            ))}
          </ol>
        </section>
      )}

      {hasContent(resume.education, ['course', 'school']) && (
        <section className="mb-[7mm]">
          <Heading>{labels.education}</Heading>
          <ol className="space-y-[3.5mm]">
            {resume.education.map((entry) => (
              <Row key={entry.id} meta={dateRange(entry.from, entry.to, false, labels.present)}>
                <h3 className="text-[10pt] font-semibold">{entry.course}</h3>
                {entry.school && <p className="text-[9.5pt] text-[#6b6055]">{entry.school}</p>}
                {entry.description && <p className="mt-[0.8mm] text-[9pt] text-[#6b6055]">{entry.description}</p>}
              </Row>
            ))}
          </ol>
        </section>
      )}

      {hasContent(resume.projects, ['name', 'description']) && (
        <section className="mb-[7mm]">
          <Heading>{labels.projects}</Heading>
          <ol className="space-y-[3mm]">
            {resume.projects.map((entry) => (
              <Row key={entry.id} meta={entry.link}>
                <h3 className="text-[10pt] font-semibold">{entry.name}</h3>
                {entry.description && <p className="text-[9.5pt]">{entry.description}</p>}
              </Row>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[10mm]">
        {hasContent(resume.skills, ['name']) && (
          <section>
            <Heading>{labels.skills}</Heading>
            <p className="text-[9.5pt] leading-[1.8]">
              {resume.skills.map((entry) => entry.name).filter(Boolean).join(' · ')}
            </p>
          </section>
        )}

        {hasContent(resume.languages, ['name']) && (
          <section>
            <Heading>{labels.languages}</Heading>
            <ul className="space-y-[1mm] text-[9.5pt]">
              {resume.languages.map((entry) => (
                <li key={entry.id}>
                  {entry.name}
                  {entry.level && <span className="text-[#8d8175]"> — {entry.level}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {resume.clause.trim() && <p className="mt-[6mm] text-[7.5pt] leading-snug text-[#a39683]">{resume.clause}</p>}
    </div>
  );
}
