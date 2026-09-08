'use client';

import { useEffect, useRef, useState } from 'react';
import type { Resume, Settings, TemplateId } from './resume';
import { ACCENTS, ATS_SAFE_TEMPLATES, DEFAULT_SETTINGS, DEMO, TEMPLATE_IDS, emptyResume } from './resume';
import type { Content } from './content';
import { ResumeForm, type FormTab } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { AtsPanel } from './AtsPanel';
import { clearStorage, exportJson, importJson, loadResume, loadSettings, saveResume, saveSettings } from './storage';

type Tab = FormTab | 'ats';

/*
 * The builder — the single owner of resume state.
 *
 * The form, the preview and the ATS review are all stateless, so there is no
 * way for them to disagree about the document. Saving is debounced, otherwise
 * every keystroke would write to localStorage.
 */
export function Builder({ content }: { content: Content }) {
  const [resume, setResume] = useState<Resume>(() => DEMO[content.locale]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [tab, setTab] = useState<Tab>('details');
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  /*
   * Saved work wins over the demo, but it is only read after mount: the server
   * knows nothing about localStorage, and a mismatch between the built HTML and
   * the first render in the browser would break hydration.
   */
  useEffect(() => {
    const savedResume = loadResume();
    if (savedResume) setResume(savedResume);
    const savedSettings = loadSettings();
    if (savedSettings) setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => saveResume(resume), 400);
    return () => clearTimeout(timer);
  }, [resume, ready]);

  useEffect(() => {
    if (!ready) return;
    saveSettings(settings);
  }, [settings, ready]);

  /** Messages clear themselves; otherwise they would sit on screen forever. */
  function announce(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const result = await importJson(file);
    if (result.ok) {
      setResume(result.resume);
      if (result.settings) setSettings({ ...DEFAULT_SETTINGS, ...result.settings });
      announce(content.builder.messages.imported);
    } else {
      announce(content.builder.messages.importFailed);
    }
    event.target.value = '';
  }

  const b = content.builder;
  const tabs: { id: Tab; label: string }[] = [
    { id: 'details', label: b.tabs.details },
    { id: 'experience', label: b.tabs.experience },
    { id: 'education', label: b.tabs.education },
    { id: 'skills', label: b.tabs.skills },
    { id: 'projects', label: b.tabs.projects },
    { id: 'ats', label: content.nav.ats },
  ];

  const templateLabels = {
    contact: b.sections.contact,
    summary: b.sections.summary,
    experience: b.sections.experience,
    education: b.sections.education,
    skills: b.sections.skills,
    languages: b.sections.languages,
    projects: b.sections.projects,
    present: content.common.present,
  };

  const actionButton =
    'rounded-lg border border-line bg-paper px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-saffron hover:text-saffron';

  return (
    <section id="builder" className="scroll-mt-20 border-t border-line bg-surface-2/50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-8 max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{b.title}</h2>
          <p className="mt-3 text-ink-3">{b.intro}</p>
        </header>

        {/* Actions */}
        <div className="no-print mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-saffron-2"
          >
            {b.buttons.print}
          </button>
          <button type="button" onClick={() => exportJson(resume, settings)} className={actionButton}>
            {b.buttons.exportJson}
          </button>
          <button type="button" onClick={() => fileInput.current?.click()} className={actionButton}>
            {b.buttons.importJson}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="sr-only"
            aria-label={b.buttons.importJson}
          />
          <button
            type="button"
            onClick={() => {
              setResume(DEMO[content.locale]);
              announce(b.messages.demoLoaded);
            }}
            className={actionButton}
          >
            {b.buttons.demo}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!window.confirm(b.messages.confirmClear)) return;
              setResume(emptyResume());
              clearStorage();
              announce(b.messages.cleared);
            }}
            className={actionButton}
          >
            {b.buttons.clear}
          </button>

          <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm font-medium text-saffron">
            {message}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
          {/* Form column */}
          <div>
            <div className="no-print mb-5 flex flex-wrap gap-1 border-b border-line" role="tablist" aria-label={b.title}>
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={tab === item.id}
                  aria-controls="tab-panel"
                  onClick={() => setTab(item.id)}
                  className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    tab === item.id ? 'border-saffron text-saffron' : 'border-transparent text-ink-3 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
              {tab === 'ats' ? (
                <AtsPanel resume={resume} template={settings.template} content={content} />
              ) : (
                <ResumeForm resume={resume} tab={tab} content={content} onChange={setResume} />
              )}
            </div>
          </div>

          {/* Preview column */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="no-print mb-4 rounded-xl border border-line bg-paper p-4">
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-ink-3">
                {b.appearance.title}
              </h3>

              <div className="space-y-3">
                <div>
                  <label htmlFor="a-template" className="mb-1 block text-sm font-medium text-ink-2">
                    {b.appearance.template}
                  </label>
                  <select
                    id="a-template"
                    value={settings.template}
                    onChange={(event) => setSettings((s) => ({ ...s, template: event.target.value as TemplateId }))}
                    className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
                  >
                    {TEMPLATE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {content.templates.items[id].name}
                        {ATS_SAFE_TEMPLATES.includes(id) ? ` · ${content.templates.atsSafe}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="mb-1.5 block text-sm font-medium text-ink-2">{b.appearance.accent}</legend>
                  <div className="flex flex-wrap gap-2">
                    {ACCENTS.map((colour) => (
                      <button
                        key={colour.id}
                        type="button"
                        onClick={() => setSettings((s) => ({ ...s, accent: colour.value }))}
                        aria-pressed={settings.accent === colour.value}
                        aria-label={colour.id}
                        className={`size-8 rounded-full transition-transform hover:scale-110 ${
                          settings.accent === colour.value ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''
                        }`}
                        style={{ background: colour.value }}
                      />
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="a-size" className="mb-1 block text-sm font-medium text-ink-2">
                    {b.appearance.fontSize}
                  </label>
                  <input
                    id="a-size"
                    type="range"
                    min={0.9}
                    max={1.1}
                    step={0.02}
                    value={settings.fontScale}
                    aria-valuetext={`${Math.round(settings.fontScale * 100)}%`}
                    onChange={(event) => setSettings((s) => ({ ...s, fontScale: Number(event.target.value) }))}
                    className="w-full accent-saffron"
                  />
                  <p className="mt-1 text-xs text-ink-4">{Math.round(settings.fontScale * 100)}%</p>
                </div>

                <label className="flex items-center gap-2 text-sm text-ink-2">
                  <input
                    type="checkbox"
                    checked={settings.showSkillLevels}
                    onChange={(event) => setSettings((s) => ({ ...s, showSkillLevels: event.target.checked }))}
                    className="size-4 rounded border-line-strong text-saffron"
                  />
                  {b.appearance.levels}
                </label>
              </div>
            </div>

            <h3 className="no-print mb-2 font-display text-sm font-bold uppercase tracking-wider text-ink-3">
              {b.preview.title}
            </h3>
            <p className="no-print mb-3 text-xs text-ink-4">{b.preview.body}</p>
            <ResumePreview resume={resume} settings={settings} content={content} labels={templateLabels} />
          </div>
        </div>
      </div>
    </section>
  );
}
