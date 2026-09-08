import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Sidebar — a narrow coloured column beside the content.
 *
 * Contact, skills and languages move out of the way so the work history gets
 * full width. Fits more on one page, but parses less reliably than a single
 * column, which the ATS review says out loud.
 */
export function SidebarTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const AsideHeading = ({ children }: { children: string }) => (
    <h2 className="mb-[2.5mm] text-[9pt] font-bold uppercase tracking-[0.16em] text-white/70">{children}</h2>
  );

  const MainHeading = ({ children }: { children: string }) => (
    <h2 className="mb-[3mm] text-[10.5pt] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
      {children}
    </h2>
  );

  return (
    <div className="flex min-h-[297mm] font-body text-[10pt] leading-[1.5] text-[#171310]">
      <aside className="w-[62mm] shrink-0 px-[9mm] py-[14mm] text-white" style={{ background: accent }}>
        <h1 className="font-display text-[18pt] font-extrabold leading-[1.15] tracking-tight">{resume.contact.fullName}</h1>
        {resume.contact.jobTitle && <p className="mt-[1.5mm] text-[10pt] font-medium text-white/85">{resume.contact.jobTitle}</p>}

        {contacts.length > 0 && (
          <section className="mt-[8mm]">
            <AsideHeading>{labels.contact}</AsideHeading>
            <ul className="space-y-[1.6mm] text-[8.5pt] leading-snug text-white/90">
              {contacts.map((row) => (
                <li key={row.key} className="break-words">{row.value}</li>
              ))}
            </ul>
          </section>
        )}

        {hasContent(resume.skills, ['name']) && (
          <section className="mt-[7mm]">
            <AsideHeading>{labels.skills}</AsideHeading>
            <ul className="space-y-[2mm] text-[9pt]">
              {resume.skills.map((entry) => (
                <li key={entry.id}>
                  <span className="text-white/90">{entry.name}</span>
                  {settings.showSkillLevels && entry.name && (
                    <span className="mt-[1mm] flex gap-[0.8mm]" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span
                          key={step}
                          className="h-[1.2mm] flex-1 rounded-full"
                          style={{ background: step <= entry.level ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.28)' }}
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
          <section className="mt-[7mm]">
            <AsideHeading>{labels.languages}</AsideHeading>
            <ul className="space-y-[1.4mm] text-[9pt] text-white/90">
              {resume.languages.map((entry) => (
                <li key={entry.id} className="flex items-baseline justify-between gap-[2mm]">
                  <span>{entry.name}</span>
                  <span className="text-[8.5pt] text-white/70">{entry.level}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <div className="flex-1 px-[12mm] py-[14mm]">
        {resume.summary.trim() && (
          <section className="mb-[6mm]">
            <MainHeading>{labels.summary}</MainHeading>
            <p className="text-justify text-[9.5pt]">{resume.summary}</p>
          </section>
        )}

        {hasContent(resume.experience, ['role', 'company', 'description']) && (
          <section className="mb-[6mm]">
            <MainHeading>{labels.experience}</MainHeading>
            <ol className="space-y-[4mm]">
              {resume.experience.map((entry) => (
                <li key={entry.id} className="border-l-[0.6mm] border-[#e2d9cb] pl-[4mm]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-[3mm]">
                    <h3 className="text-[10.5pt] font-bold">{entry.role}</h3>
                    <span className="text-[8.5pt] font-medium text-[#6b6055]">
                      {dateRange(entry.from, entry.to, entry.current, labels.present)}
                    </span>
                  </div>
                  {entry.company && <p className="text-[9.5pt] font-medium" style={{ color: accent }}>{entry.company}</p>}
                  {descriptionLines(entry.description).length > 0 && (
                    <ul className="mt-[1.5mm] list-disc space-y-[0.8mm] pl-[4mm] text-[9.5pt] marker:text-[#8d8175]">
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
            <MainHeading>{labels.education}</MainHeading>
            <ol className="space-y-[3mm]">
              {resume.education.map((entry) => (
                <li key={entry.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-[3mm]">
                    <h3 className="text-[10pt] font-bold">{entry.course}</h3>
                    <span className="text-[8.5pt] font-medium text-[#6b6055]">
                      {dateRange(entry.from, entry.to, false, labels.present)}
                    </span>
                  </div>
                  {entry.school && <p className="text-[9.5pt]" style={{ color: accent }}>{entry.school}</p>}
                  {entry.description && <p className="mt-[0.8mm] text-[9pt] text-[#3b332c]">{entry.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {hasContent(resume.projects, ['name', 'description']) && (
          <section className="mb-[5mm]">
            <MainHeading>{labels.projects}</MainHeading>
            <ol className="space-y-[2.5mm]">
              {resume.projects.map((entry) => (
                <li key={entry.id}>
                  <h3 className="text-[10pt] font-bold">
                    {entry.name}
                    {entry.link && <span className="ml-[2mm] text-[8.5pt] font-normal text-[#6b6055]">{entry.link}</span>}
                  </h3>
                  {entry.description && <p className="text-[9pt]">{entry.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {resume.clause.trim() && (
          <p className="mt-[4mm] border-t border-[#e2d9cb] pt-[2.5mm] text-[7.5pt] leading-snug text-[#8d8175]">
            {resume.clause}
          </p>
        )}
      </div>
    </div>
  );
}
