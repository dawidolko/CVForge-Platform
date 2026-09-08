'use client';

import type { EducationEntry, ExperienceEntry, LanguageEntry, ProjectEntry, Resume, SkillEntry } from './resume';
import { emptyEducation, emptyExperience, emptyLanguage, emptyProject, emptySkill } from './resume';
import type { Content } from './content';
import { AddButton, EntryCard, Field, TextAreaField } from './FormFields';

export type FormTab = 'details' | 'experience' | 'education' | 'skills' | 'projects';

/*
 * Defined at module level on purpose.
 *
 * A component declared inside another component's body is a new type on every
 * render, so React unmounts and remounts its whole subtree - which meant every
 * input lost focus after a single keystroke. Keeping this out here is what
 * makes typing work.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h3 className="mb-3 font-display text-base font-bold text-ink">{title}</h3>
      {children}
    </section>
  );
}

/*
 * The form.
 *
 * Stateless by design: it receives the resume and an updater. All the truth
 * about the document lives in the builder, so the preview, the ATS check and
 * the export always look at exactly the same object.
 */
export function ResumeForm({
  resume,
  tab,
  content,
  onChange,
}: {
  resume: Resume;
  tab: FormTab;
  content: Content;
  onChange: (update: (previous: Resume) => Resume) => void;
}) {
  const b = content.builder;
  const f = b.fields;
  const actionLabels = { moveUp: b.buttons.moveUp, moveDown: b.buttons.moveDown, remove: b.buttons.remove };

  /** Moves an entry one place; out of range it does nothing. */
  function move<T>(list: T[], index: number, direction: -1 | 1): T[] {
    const target = index + direction;
    if (target < 0 || target >= list.length) return list;
    const copy = [...list];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    return copy;
  }

  const setContact = (field: keyof Resume['contact'], value: string) =>
    onChange((previous) => ({ ...previous, contact: { ...previous.contact, [field]: value } }));

  const setExperience = (id: string, field: keyof ExperienceEntry, value: string | boolean) =>
    onChange((previous) => ({
      ...previous,
      experience: previous.experience.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    }));

  const setEducation = (id: string, field: keyof EducationEntry, value: string) =>
    onChange((previous) => ({
      ...previous,
      education: previous.education.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    }));

  const setProject = (id: string, field: keyof ProjectEntry, value: string) =>
    onChange((previous) => ({
      ...previous,
      projects: previous.projects.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    }));

  const setSkill = (id: string, field: keyof SkillEntry, value: string | number) =>
    onChange((previous) => ({
      ...previous,
      skills: previous.skills.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    }));

  const setLanguage = (id: string, field: keyof LanguageEntry, value: string) =>
    onChange((previous) => ({
      ...previous,
      languages: previous.languages.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    }));

  if (tab === 'details') {
    return (
      <>
        <Section title={b.sections.contact}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="f-name" label={f.fullName} value={resume.contact.fullName} autoComplete="name" onChange={(v) => setContact('fullName', v)} />
            <Field id="f-title" label={f.jobTitle} value={resume.contact.jobTitle} autoComplete="organization-title" onChange={(v) => setContact('jobTitle', v)} />
            <Field id="f-email" label={f.email} type="email" autoComplete="email" value={resume.contact.email} onChange={(v) => setContact('email', v)} />
            <Field id="f-phone" label={f.phone} type="tel" autoComplete="tel" value={resume.contact.phone} onChange={(v) => setContact('phone', v)} />
            <Field id="f-location" label={f.location} value={resume.contact.location} onChange={(v) => setContact('location', v)} />
            <Field id="f-website" label={f.website} value={resume.contact.website} onChange={(v) => setContact('website', v)} />
            <Field id="f-linkedin" label={f.linkedin} value={resume.contact.linkedin} onChange={(v) => setContact('linkedin', v)} />
            <Field id="f-github" label={f.github} value={resume.contact.github} onChange={(v) => setContact('github', v)} />
          </div>
        </Section>

        <Section title={b.sections.summary}>
          <TextAreaField
            id="f-summary"
            label={f.summary}
            rows={5}
            value={resume.summary}
            onChange={(v) => onChange((previous) => ({ ...previous, summary: v }))}
          />
        </Section>

        <Section title={b.sections.clause}>
          <TextAreaField
            id="f-clause"
            label={f.clause}
            rows={3}
            hint={b.hints.clause}
            value={resume.clause}
            onChange={(v) => onChange((previous) => ({ ...previous, clause: v }))}
          />
        </Section>
      </>
    );
  }

  if (tab === 'experience') {
    return (
      <Section title={b.sections.experience}>
        <ol className="mb-3 space-y-3">
          {resume.experience.map((entry, index) => (
            <EntryCard
              key={entry.id}
              title={b.tabs.experience}
              index={index}
              total={resume.experience.length}
              labels={actionLabels}
              onMoveUp={() => onChange((p) => ({ ...p, experience: move(p.experience, index, -1) }))}
              onMoveDown={() => onChange((p) => ({ ...p, experience: move(p.experience, index, 1) }))}
              onRemove={() => onChange((p) => ({ ...p, experience: p.experience.filter((x) => x.id !== entry.id) }))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field id={`x-role-${entry.id}`} label={f.role} value={entry.role} onChange={(v) => setExperience(entry.id, 'role', v)} />
                <Field id={`x-company-${entry.id}`} label={f.company} value={entry.company} onChange={(v) => setExperience(entry.id, 'company', v)} />
                <Field id={`x-from-${entry.id}`} label={f.from} type="month" value={entry.from} onChange={(v) => setExperience(entry.id, 'from', v)} />
                <div>
                  <Field id={`x-to-${entry.id}`} label={f.to} type="month" value={entry.current ? '' : entry.to} onChange={(v) => setExperience(entry.id, 'to', v)} />
                  <label className="mt-2 flex items-center gap-2 text-sm text-ink-2">
                    <input
                      type="checkbox"
                      checked={entry.current}
                      onChange={(event) => setExperience(entry.id, 'current', event.target.checked)}
                      className="size-4 rounded border-line-strong text-saffron"
                    />
                    {f.current}
                  </label>
                </div>
              </div>
              <TextAreaField
                id={`x-desc-${entry.id}`}
                label={f.description}
                rows={4}
                hint={b.hints.description}
                value={entry.description}
                onChange={(v) => setExperience(entry.id, 'description', v)}
              />
            </EntryCard>
          ))}
        </ol>
        <AddButton onClick={() => onChange((p) => ({ ...p, experience: [...p.experience, emptyExperience()] }))}>
          {b.buttons.addExperience}
        </AddButton>
      </Section>
    );
  }

  if (tab === 'education') {
    return (
      <Section title={b.sections.education}>
        <ol className="mb-3 space-y-3">
          {resume.education.map((entry, index) => (
            <EntryCard
              key={entry.id}
              title={b.tabs.education}
              index={index}
              total={resume.education.length}
              labels={actionLabels}
              onMoveUp={() => onChange((p) => ({ ...p, education: move(p.education, index, -1) }))}
              onMoveDown={() => onChange((p) => ({ ...p, education: move(p.education, index, 1) }))}
              onRemove={() => onChange((p) => ({ ...p, education: p.education.filter((x) => x.id !== entry.id) }))}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field id={`e-course-${entry.id}`} label={f.course} value={entry.course} onChange={(v) => setEducation(entry.id, 'course', v)} />
                <Field id={`e-school-${entry.id}`} label={f.school} value={entry.school} onChange={(v) => setEducation(entry.id, 'school', v)} />
                <Field id={`e-from-${entry.id}`} label={f.from} type="month" value={entry.from} onChange={(v) => setEducation(entry.id, 'from', v)} />
                <Field id={`e-to-${entry.id}`} label={f.to} type="month" value={entry.to} onChange={(v) => setEducation(entry.id, 'to', v)} />
              </div>
              <TextAreaField id={`e-desc-${entry.id}`} label={f.description} rows={2} value={entry.description} onChange={(v) => setEducation(entry.id, 'description', v)} />
            </EntryCard>
          ))}
        </ol>
        <AddButton onClick={() => onChange((p) => ({ ...p, education: [...p.education, emptyEducation()] }))}>
          {b.buttons.addEducation}
        </AddButton>
      </Section>
    );
  }

  if (tab === 'skills') {
    return (
      <>
        <Section title={b.sections.skills}>
          <ol className="mb-3 space-y-3">
            {resume.skills.map((entry, index) => (
              <EntryCard
                key={entry.id}
                title={b.tabs.skills}
                index={index}
                total={resume.skills.length}
                labels={actionLabels}
                onMoveUp={() => onChange((p) => ({ ...p, skills: move(p.skills, index, -1) }))}
                onMoveDown={() => onChange((p) => ({ ...p, skills: move(p.skills, index, 1) }))}
                onRemove={() => onChange((p) => ({ ...p, skills: p.skills.filter((x) => x.id !== entry.id) }))}
              >
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Field id={`s-name-${entry.id}`} label={f.name} value={entry.name} onChange={(v) => setSkill(entry.id, 'name', v)} />
                  <div>
                    <label htmlFor={`s-level-${entry.id}`} className="mb-1 block text-sm font-medium text-ink-2">
                      {f.level}
                    </label>
                    <input
                      id={`s-level-${entry.id}`}
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={entry.level}
                      aria-describedby={`s-level-hint-${entry.id}`}
                      aria-valuetext={String(entry.level)}
                      onChange={(event) => setSkill(entry.id, 'level', Number(event.target.value))}
                      className="w-40 accent-saffron"
                    />
                    <p id={`s-level-hint-${entry.id}`} className="mt-1 text-xs text-ink-4">
                      {entry.level} / 5
                    </p>
                  </div>
                </div>
              </EntryCard>
            ))}
          </ol>
          <AddButton onClick={() => onChange((p) => ({ ...p, skills: [...p.skills, emptySkill()] }))}>
            {b.buttons.addSkill}
          </AddButton>
        </Section>

        <Section title={b.sections.languages}>
          <ol className="mb-3 space-y-3">
            {resume.languages.map((entry, index) => (
              <EntryCard
                key={entry.id}
                title={b.sections.languages}
                index={index}
                total={resume.languages.length}
                labels={actionLabels}
                onMoveUp={() => onChange((p) => ({ ...p, languages: move(p.languages, index, -1) }))}
                onMoveDown={() => onChange((p) => ({ ...p, languages: move(p.languages, index, 1) }))}
                onRemove={() => onChange((p) => ({ ...p, languages: p.languages.filter((x) => x.id !== entry.id) }))}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id={`l-name-${entry.id}`} label={f.name} value={entry.name} onChange={(v) => setLanguage(entry.id, 'name', v)} />
                  <Field id={`l-level-${entry.id}`} label={f.level} value={entry.level} onChange={(v) => setLanguage(entry.id, 'level', v)} />
                </div>
              </EntryCard>
            ))}
          </ol>
          <AddButton onClick={() => onChange((p) => ({ ...p, languages: [...p.languages, emptyLanguage()] }))}>
            {b.buttons.addLanguage}
          </AddButton>
        </Section>
      </>
    );
  }

  return (
    <Section title={b.sections.projects}>
      <ol className="mb-3 space-y-3">
        {resume.projects.map((entry, index) => (
          <EntryCard
            key={entry.id}
            title={b.tabs.projects}
            index={index}
            total={resume.projects.length}
            labels={actionLabels}
            onMoveUp={() => onChange((p) => ({ ...p, projects: move(p.projects, index, -1) }))}
            onMoveDown={() => onChange((p) => ({ ...p, projects: move(p.projects, index, 1) }))}
            onRemove={() => onChange((p) => ({ ...p, projects: p.projects.filter((x) => x.id !== entry.id) }))}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id={`p-name-${entry.id}`} label={f.name} value={entry.name} onChange={(v) => setProject(entry.id, 'name', v)} />
              <Field id={`p-link-${entry.id}`} label={f.link} value={entry.link} onChange={(v) => setProject(entry.id, 'link', v)} />
            </div>
            <TextAreaField id={`p-desc-${entry.id}`} label={f.description} rows={2} value={entry.description} onChange={(v) => setProject(entry.id, 'description', v)} />
          </EntryCard>
        ))}
      </ol>
      <AddButton onClick={() => onChange((p) => ({ ...p, projects: [...p.projects, emptyProject()] }))}>
        {b.buttons.addProject}
      </AddButton>
    </Section>
  );
}
