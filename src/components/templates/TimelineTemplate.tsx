import { contactRows, dateRange, descriptionLines, hasContent } from '../resume';
import type { TemplateProps } from './types';

/*
 * Timeline — the career drawn as one continuous line.
 *
 * Useful when the story is the progression itself: the eye follows the rail
 * downwards and every role is a marked stop on it.
 */
export function TimelineTemplate({ resume, settings, labels }: TemplateProps) {
  const accent = settings.accent;
  const contacts = contactRows(resume);

  const Heading = ({ children }: { children: string }) => (
    <h2 className="mb-[4mm] text-[9.5pt] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
      {children}
    </h2>
  );

  /* One stop on the rail: a dot on the line, content to the right of it. */
  const Stop = ({ meta, children, last }: { meta: string; children: React.ReactNode; last: boolean }) => (
    <li className="relative pb-[5mm] pl-[9mm]">
      <span
        aria-hidden="true"
        className="absolute left-0 top-[1.4mm] size-[3mm] rounded-full ring-[0.7mm] ring-white"
        style={{ background: accent }}
      />
      {!last && <span aria-hidden="true" className="absolute bottom-0 left-[1.35mm] top-[4.4mm] w-[0.3mm] bg-[#e2d9cb]" />}
      <p className="mb-[0.8mm] text-[8.5pt] font-medium uppercase tracking-wider text-[#8d8175]">{meta}</p>
      {children}
    </li>
  );

  return (
    <div className="px-[17mm] py-[15mm] font-body text-[10pt] leading-[1.55] text-[#171310]">
      <header className="mb-[8mm] border-b-[0.5mm] pb-[4mm]" style={{ borderColor: accent }}>
        <h1 className="font-display text-[23pt] font-bold leading-tight tracking-tight">{resume.contact.fullName}</h1>
        {resume.contact.jobTitle && (
          <p className="mt-[1mm] text-[11.5pt] font-medium" style={{ color: accent }}>{resume.contact.jobTitle}</p>
        )}
        {contacts.length > 0 && (
          <ul className="mt-[3mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[8.5pt] text-[#6b6055]">
            {contacts.map((row) => (
              <li key={row.key}>{row.value}</li>
            ))}
          </ul>
        )}
      </header>

      {resume.summary.trim() && <p className="mb-[7mm] text-[10pt] leading-[1.65] text-[#3b332c]">{resume.summary}</p>}

      {hasContent(resume.experience, ['role', 'company', 'description']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.experience}</Heading>
          <ol>
            {resume.experience.map((entry, i) => (
              <Stop
                key={entry.id}
                meta={dateRange(entry.from, entry.to, entry.current, labels.present)}
                last={i === resume.experience.length - 1}
              >
                <h3 className="text-[10.5pt] font-bold">{entry.role}</h3>
                {entry.company && <p className="text-[9.5pt] text-[#6b6055]">{entry.company}</p>}
                {descriptionLines(entry.description).length > 0 && (
                  <ul className="mt-[1.5mm] list-disc space-y-[0.8mm] pl-[4.5mm] text-[9.5pt] marker:text-[#cbbfab]">
                    {descriptionLines(entry.description).map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                )}
              </Stop>
            ))}
          </ol>
        </section>
      )}

      {hasContent(resume.education, ['course', 'school']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.education}</Heading>
          <ol>
            {resume.education.map((entry, i) => (
              <Stop
                key={entry.id}
                meta={dateRange(entry.from, entry.to, false, labels.present)}
                last={i === resume.education.length - 1}
              >
                <h3 className="text-[10pt] font-bold">{entry.course}</h3>
                {entry.school && <p className="text-[9.5pt] text-[#6b6055]">{entry.school}</p>}
                {entry.description && <p className="mt-[0.8mm] text-[9pt] text-[#6b6055]">{entry.description}</p>}
              </Stop>
            ))}
          </ol>
        </section>
      )}

      {hasContent(resume.projects, ['name', 'description']) && (
        <section className="mb-[6mm]">
          <Heading>{labels.projects}</Heading>
          <ol className="space-y-[2.5mm]">
            {resume.projects.map((entry) => (
              <li key={entry.id} className="border-l-[0.5mm] pl-[3.5mm]" style={{ borderColor: '#e2d9cb' }}>
                <h3 className="text-[10pt] font-bold">
                  {entry.name}
                  {entry.link && <span className="ml-[2mm] text-[8.5pt] font-normal text-[#8d8175]">{entry.link}</span>}
                </h3>
                {entry.description && <p className="text-[9.5pt]">{entry.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid grid-cols-2 gap-x-[8mm]">
        {hasContent(resume.skills, ['name']) && (
          <section>
            <Heading>{labels.skills}</Heading>
            <ul className="flex flex-wrap gap-[1.5mm]">
              {resume.skills.filter((entry) => entry.name).map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-full px-[2.5mm] py-[0.8mm] text-[8.5pt]"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {entry.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasContent(resume.languages, ['name']) && (
          <section>
            <Heading>{labels.languages}</Heading>
            <ul className="space-y-[1.2mm] text-[9.5pt]">
              {resume.languages.map((entry) => (
                <li key={entry.id} className="flex items-baseline justify-between gap-[3mm]">
                  <span>{entry.name}</span>
                  <span className="text-[8.5pt] text-[#8d8175]">{entry.level}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {resume.clause.trim() && (
        <p className="mt-[5mm] border-t border-[#e2d9cb] pt-[2.5mm] text-[7.5pt] leading-snug text-[#8d8175]">
          {resume.clause}
        </p>
      )}
    </div>
  );
}
