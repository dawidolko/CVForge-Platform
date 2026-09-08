import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Modern — a full-width accent band, then two columns.
 *
 * The name is reversed out of the band, so the top of the page carries the
 * identity and the body stays quiet underneath.
 */
export function ModernTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-[2.5mm] flex items-center gap-[2mm] text-[9pt] font-bold uppercase tracking-[0.16em] text-[#3b332c]">
      <span aria-hidden="true" className="inline-block h-[2.4mm] w-[1.2mm] rounded-full" style={{ background: accent }} />
      {children}
    </h2>
  );

  return (
    <div className="font-body text-[10pt] leading-[1.5] text-[#171310]">
      {/* Accent band */}
      <header className="px-[16mm] py-[11mm] text-white" style={{ background: accent }}>
        <h1 className="font-display text-[24pt] font-extrabold leading-none tracking-tight">{resume.contact.fullName}</h1>
        {resume.contact.jobTitle && <p className="mt-[2mm] text-[11.5pt] font-medium text-white/85">{resume.contact.jobTitle}</p>}
        {contacts.length > 0 && (
          <ul className="mt-[4mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[8.5pt] text-white/80">
            {contacts.map((row) => (
              <li key={row.key}>{row.value}</li>
            ))}
          </ul>
        )}
      </header>

      <div className="px-[16mm] py-[10mm]">
        {resume.summary.trim() && (
          <section className="mb-[6mm]">
            <Heading>{labels.summary}</Heading>
            <p className="text-justify text-[9.5pt] leading-[1.6]">{resume.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-[1fr_52mm] gap-x-[8mm]">
          {/* Main column */}
          <div>
            {hasContent(resume.experience, ['role', 'company', 'description']) && (
              <section className="mb-[6mm]">
                <Heading>{labels.experience}</Heading>
                <ol className="space-y-[4mm]">
                  {resume.experience.map((entry) => (
                    <li key={entry.id}>
                      <h3 className="text-[10.5pt] font-bold">{entry.role}</h3>
                      <p className="text-[9pt]">
                        {entry.company && <span style={{ color: accent }}>{entry.company}</span>}
                        <span className="text-[#8d8175]">
                          {entry.company ? ' · ' : ''}
                          {dateRange(entry.from, entry.to, entry.current, labels.present)}
                        </span>
                      </p>
                      {descriptionLines(entry.description).length > 0 && (
                        <ul className="mt-[1.5mm] space-y-[0.9mm] text-[9.5pt]">
                          {descriptionLines(entry.description).map((line, i) => (
                            <li key={i} className="flex gap-[2.5mm]">
                              <span aria-hidden="true" className="mt-[1.7mm] size-[1.2mm] shrink-0 rounded-full" style={{ background: accent }} />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {hasContent(resume.projects, ['name', 'description']) && (
              <section className="mb-[5mm]">
                <Heading>{labels.projects}</Heading>
                <ol className="space-y-[2.5mm]">
                  {resume.projects.map((entry) => (
                    <li key={entry.id}>
                      <h3 className="text-[10pt] font-bold">{entry.name}</h3>
                      {entry.link && <p className="text-[8.5pt] text-[#8d8175]">{entry.link}</p>}
                      {entry.description && <p className="text-[9.5pt]">{entry.description}</p>}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* Side column */}
          <div>
            {hasContent(resume.skills, ['name']) && (
              <section className="mb-[5mm]">
                <Heading>{labels.skills}</Heading>
                <ul className="space-y-[1.6mm] text-[9pt]">
                  {resume.skills.map((entry) => (
                    <li key={entry.id}>
                      <span>{entry.name}</span>
                      {settings.showSkillLevels && entry.name && (
                        <span className="mt-[0.8mm] flex gap-[0.7mm]" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <span
                              key={step}
                              className="h-[1.1mm] flex-1 rounded-full"
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
                <ul className="space-y-[1.2mm] text-[9pt]">
                  {resume.languages.map((entry) => (
                    <li key={entry.id} className="flex items-baseline justify-between gap-[2mm]">
                      <span>{entry.name}</span>
                      <span className="text-[8.5pt] text-[#8d8175]">{entry.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasContent(resume.education, ['course', 'school']) && (
              <section>
                <Heading>{labels.education}</Heading>
                <ol className="space-y-[2.5mm] text-[9pt]">
                  {resume.education.map((entry) => (
                    <li key={entry.id}>
                      <p className="font-bold">{entry.course}</p>
                      <p className="text-[8.5pt] text-[#6b6055]">{entry.school}</p>
                      <p className="text-[8pt] text-[#8d8175]">{dateRange(entry.from, entry.to, false, labels.present)}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>

        {resume.clause.trim() && (
          <p className="mt-[5mm] border-t border-[#e2d9cb] pt-[2.5mm] text-[7.5pt] leading-snug text-[#8d8175]">
            {resume.clause}
          </p>
        )}
      </div>
    </div>
  );
}
