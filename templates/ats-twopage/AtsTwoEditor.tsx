"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createResume,
  deleteResume,
  formatHistoryTime,
  getActiveResume,
  loadLibrary,
  popActiveHistory,
  renameResume,
  saveActiveDraft,
  switchResume,
  type HistoryEntry,
  type NamedResume,
  type ResumeLibrary,
  type ResumeVars,
} from "@/lib/storage";
import { ATS_TWO_DEFAULT_CONTENT } from "./defaultContent";
import {
  DEFAULT_VARS,
  mountAtsTwoEditor,
  type AtsEngineApi,
  VAR_BINDINGS,
} from "./engine";
import "./styles.css";

const VAR_LABELS: Record<string, string> = {
  fontName: "Name",
  fontRole: "Role / subtitle",
  fontSection: "Section titles",
  fontJob: "Job / project titles",
  fontBody: "Body / description",
  fontMeta: "Dates / meta",
  gapSection: "Section gap",
  gapItem: "Job / block gap",
  gapBullet: "Bullet gap",
};

const VAR_RANGES: Record<string, { min: number; max: number; step: number }> = {
  fontName: { min: 20, max: 30, step: 1 },
  fontRole: { min: 11, max: 16, step: 0.5 },
  fontSection: { min: 10, max: 14, step: 0.5 },
  fontJob: { min: 10, max: 14, step: 0.5 },
  fontBody: { min: 9.5, max: 12.5, step: 0.1 },
  fontMeta: { min: 8, max: 11, step: 0.5 },
  gapSection: { min: 6, max: 16, step: 1 },
  gapItem: { min: 4, max: 14, step: 1 },
  gapBullet: { min: 1, max: 8, step: 1 },
};

export type AtsTwoEditorProps = {
  templateId?: string;
  /** JD-tailored HTML; defaults to the generic Senior SWE 2-page draft */
  defaultContent?: string;
  panelSubtitle?: string;
};

export default function AtsTwoEditor({
  templateId = "ats-twopage",
  defaultContent = ATS_TWO_DEFAULT_CONTENT,
  panelSubtitle = "Detailed 2-page ATS resume tuned from your LinkedIn + ATS research: standard headings, mirrored skills, quantified bullets, MMM YYYY dates. Reset content to load the latest draft.",
}: AtsTwoEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AtsEngineApi | null>(null);
  const libraryRef = useRef<ResumeLibrary | null>(null);

  const [library, setLibrary] = useState<ResumeLibrary | null>(null);
  const [vars, setVars] = useState<ResumeVars>(DEFAULT_VARS);
  const [editMode, setEditMode] = useState(true);
  const [status, setStatus] = useState("Building pages…");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [resumeName, setResumeName] = useState("My Resume");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const [linkSelected, setLinkSelected] = useState(false);

  const active: NamedResume | null = library ? getActiveResume(library) : null;

  const unitFor = useCallback((id: string) => {
    const binding = VAR_BINDINGS.find(([key]) => key === id);
    return binding?.[2] || "px";
  }, []);

  const persistState = useCallback(
    (
      state: { vars: ResumeVars; html: string; editMode: boolean },
      opts?: { pushHistory?: boolean; label?: string }
    ) => {
      const lib = libraryRef.current;
      if (!lib) return;
      const next = saveActiveDraft(templateId, lib, state, opts);
      libraryRef.current = next;
      setLibrary(next);
      setHistory(getActiveResume(next).history || []);
    },
    [templateId]
  );

  const applyResumeToEditor = useCallback((resume: NamedResume) => {
    const api = apiRef.current;
    if (!api) return;
    const nextVars = { ...DEFAULT_VARS, ...(resume.draft.vars || {}) };
    api.setVars(nextVars);
    setVars(nextVars);
    api.setEditMode(resume.draft.editMode ?? true);
    setEditMode(resume.draft.editMode ?? true);
    api.applyHtml(resume.draft.html || defaultContent);
    setResumeName(resume.name);
    setHistory(resume.history || []);
  }, [defaultContent]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lib = loadLibrary(templateId, defaultContent);
    libraryRef.current = lib;
    setLibrary(lib);

    const resume = getActiveResume(lib);
    const initialVars = { ...DEFAULT_VARS, ...(resume.draft.vars || {}) };
    setVars(initialVars);
    setEditMode(resume.draft.editMode ?? true);
    setHistory(resume.history || []);
    setResumeName(resume.name);

    const api = mountAtsTwoEditor(root, {
      defaultHtml: defaultContent,
      initial: resume.draft.html
        ? resume.draft
        : { html: defaultContent, vars: initialVars, editMode: true, savedAt: Date.now() },
      onStatus: setStatus,
      onChange: (state) => {
        persistState(state);
        setVars(state.vars);
        setEditMode(state.editMode);
      },
      onLinkSelect: (info) => {
        if (!info) {
          setLinkSelected(false);
          setLinkLabel("");
          setLinkHref("");
          return;
        }
        setLinkSelected(true);
        setLinkLabel(info.label);
        setLinkHref(info.href);
      },
    });
    apiRef.current = api;
    setReady(true);

    return () => {
      api.destroy();
      apiRef.current = null;
    };
  }, [templateId, defaultContent, persistState]);

  const snapshot = useCallback(
    (label?: string) => {
      const api = apiRef.current;
      if (!api) return;
      persistState(api.getState(), { pushHistory: true, label });
    },
    [persistState]
  );

  const onVarChange = (id: string, value: string) => {
    const next = { ...vars, [id]: value };
    setVars(next);
    apiRef.current?.setVars({ [id]: value });
    // Engine setVars schedules onChange → persistState (includes designer vars)
  };

  const restoreEntry = (entry: HistoryEntry) => {
    const api = apiRef.current;
    if (!api) return;
    snapshot("Before restore");
    api.setVars(entry.vars);
    setVars({ ...DEFAULT_VARS, ...entry.vars });
    api.setEditMode(entry.editMode);
    setEditMode(entry.editMode);
    api.applyHtml(entry.html);
  };

  const undoLast = () => {
    const lib = libraryRef.current;
    if (!lib) return;
    const result = popActiveHistory(templateId, lib);
    if (!result) return;
    libraryRef.current = result.library;
    setLibrary(result.library);
    setHistory(getActiveResume(result.library).history || []);
    const api = apiRef.current;
    if (!api) return;
    const entry = result.entry;
    api.setVars(entry.vars);
    setVars({ ...DEFAULT_VARS, ...entry.vars });
    api.setEditMode(entry.editMode);
    setEditMode(entry.editMode);
    api.applyHtml(entry.html);
  };

  const onSwitchResume = (resumeId: string) => {
    const lib = libraryRef.current;
    const api = apiRef.current;
    if (!lib || !api) return;
    // Save current designer + content before switching
    const flushed = saveActiveDraft(templateId, lib, api.getState());
    const next = switchResume(templateId, flushed, resumeId);
    libraryRef.current = next;
    setLibrary(next);
    applyResumeToEditor(getActiveResume(next));
  };

  const onNewResume = () => {
    const name = window.prompt("Name for this resume", "New resume");
    if (name === null) return;
    const lib = libraryRef.current;
    const api = apiRef.current;
    if (!lib || !api) return;
    const flushed = saveActiveDraft(templateId, lib, api.getState());
    const next = createResume(
      templateId,
      flushed,
      name,
      defaultContent,
      DEFAULT_VARS
    );
    libraryRef.current = next;
    setLibrary(next);
    applyResumeToEditor(getActiveResume(next));
  };

  const onRenameResume = (name?: string) => {
    if (!active) return;
    const nextName = (name ?? resumeName).trim();
    if (!nextName || nextName === active.name) {
      setResumeName(active.name);
      return;
    }
    const lib = libraryRef.current;
    if (!lib) return;
    const next = renameResume(templateId, lib, active.id, nextName);
    libraryRef.current = next;
    setLibrary(next);
    setResumeName(getActiveResume(next).name);
  };

  const onDeleteResume = () => {
    if (!active || !library || library.resumes.length <= 1) return;
    if (!confirm(`Delete “${active.name}”? This cannot be undone.`)) return;
    const next = deleteResume(templateId, library, active.id);
    libraryRef.current = next;
    setLibrary(next);
    applyResumeToEditor(getActiveResume(next));
  };

  const fontControls = useMemo(
    () => ["fontName", "fontRole", "fontSection", "fontJob", "fontBody", "fontMeta"],
    []
  );
  const gapControls = useMemo(
    () => ["gapSection", "gapItem", "gapBullet"],
    []
  );

  return (
    <div ref={rootRef} className={`ats2-editor${editMode ? " edit-mode" : ""}`}>
      <aside className="panel">
        <p className="back-link">
          <Link href="/">← Templates</Link>
        </p>
        <h1>Resume Designer</h1>
        <p className="sub">{panelSubtitle}</p>

        <h2>ATS score tips</h2>
        <p className="hint" style={{ marginTop: 0 }}>
          Tailor keywords to each job description. Prefer DOCX when the portal asks. Avoid tables /
          two columns for apply. Repeat must-have skills in both Skills and Work Experience. Aim
          ~75–90+ on checkers — then apply; “100” is not a real universal score.
        </p>

        <h2>This resume</h2>
        <div className="resume-picker">
          <label htmlFor="resumeSelect">Active resume</label>
          <select
            id="resumeSelect"
            value={active?.id || ""}
            onChange={(e) => onSwitchResume(e.target.value)}
            disabled={!ready || !library}
          >
            {(library?.resumes || []).map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            onBlur={() => onRenameResume(resumeName)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLInputElement).blur();
              }
            }}
            aria-label="Resume name"
            disabled={!ready}
          />
        </div>
        <div className="row-btns">
          <button type="button" onClick={onNewResume} disabled={!ready}>
            + New resume
          </button>
          <button
            type="button"
            className="danger"
            onClick={onDeleteResume}
            disabled={!ready || (library?.resumes.length || 0) <= 1}
          >
            Delete
          </button>
        </div>

        <h2>Fonts</h2>
        {fontControls.map((id) => {
          const range = VAR_RANGES[id];
          return (
            <div className="ctrl" key={id}>
              <label htmlFor={id}>{VAR_LABELS[id]}</label>
              <output>
                {vars[id]}
                {unitFor(id)}
              </output>
              <input
                id={id}
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={vars[id]}
                onChange={(e) => onVarChange(id, e.target.value)}
                disabled={!ready}
              />
            </div>
          );
        })}

        <h2>Gaps & layout</h2>
        {gapControls.map((id) => {
          const range = VAR_RANGES[id];
          return (
            <div className="ctrl" key={id}>
              <label htmlFor={id}>{VAR_LABELS[id]}</label>
              <output>
                {vars[id]}
                {unitFor(id)}
              </output>
              <input
                id={id}
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={vars[id]}
                onChange={(e) => onVarChange(id, e.target.value)}
                disabled={!ready}
              />
            </div>
          );
        })}

        <h2>Editing</h2>
        <label className="toggle">
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => {
              setEditMode(e.target.checked);
              apiRef.current?.setEditMode(e.target.checked);
            }}
          />
          Edit mode (Cmd/Ctrl+click opens links)
        </label>
        <h2>Link URL</h2>
        <div className="link-box">
          <div className="target">
            {linkSelected
              ? linkLabel
              : "Click a company, project, school, or contact link on the resume"}
          </div>
          <input
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={linkHref}
            placeholder="https://…"
            disabled={!ready || !linkSelected}
            onChange={(e) => {
              const next = e.target.value;
              setLinkHref(next);
              apiRef.current?.setSelectedLinkHref(next);
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text");
              if (!text) return;
              e.preventDefault();
              const next = text.trim();
              setLinkHref(next);
              apiRef.current?.setSelectedLinkHref(next);
            }}
            aria-label="Link URL"
          />
        </div>
        <div className="row-btns">
          <button type="button" onClick={() => apiRef.current?.addJob()}>
            + Job
          </button>
          <button type="button" onClick={() => apiRef.current?.addSkill()}>
            + Skill
          </button>
          <button type="button" onClick={() => apiRef.current?.addAward()}>
            + Award
          </button>
          <button type="button" onClick={() => apiRef.current?.addProject()}>
            + Project
          </button>
        </div>
        <div className="row-btns">
          <button type="button" className="primary" onClick={() => apiRef.current?.print()}>
            Print / Save PDF
          </button>
          <button
            type="button"
            onClick={() => {
              snapshot("Manual save");
              alert(`Saved “${resumeName}” (content + designer settings + history).`);
            }}
          >
            Save now
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                !confirm(
                  "Reset this resume’s content and fonts to defaults? Current draft is snapshotted first."
                )
              )
                return;
              snapshot("Before reset");
              apiRef.current?.resetContent(defaultContent);
              setVars({ ...DEFAULT_VARS });
              setEditMode(true);
            }}
          >
            Reset content
          </button>
        </div>

        <h2>Version history</h2>
        <div className="row-btns">
          <button type="button" onClick={undoLast} disabled={!history.length}>
            Undo last
          </button>
          <button type="button" onClick={() => snapshot("Checkpoint")}>
            Checkpoint
          </button>
        </div>
        <div className="history-list">
          {history.length === 0 && (
            <p className="hint" style={{ margin: 0 }}>
              No snapshots yet. Save now — keeps last 10 versions for this resume.
            </p>
          )}
          {history.map((entry) => (
            <div className="history-item" key={entry.id}>
              <div className="meta">
                <div>{entry.label || "Snapshot"}</div>
                <div>{formatHistoryTime(entry.savedAt)}</div>
              </div>
              <button type="button" onClick={() => restoreEntry(entry)}>
                Restore
              </button>
            </div>
          ))}
        </div>

        <p className="hint">
          Designer fonts/gaps autosave with this resume. Switch resumes anytime — each keeps its
          own settings.
        </p>
      </aside>

      <main className="workspace">
        <div className="page-status" id="pageStatus">
          {status}
        </div>
        <div id="sheets" />
      </main>

      <div id="master" aria-hidden="true">
        <div className="sheet-inner" id="masterInner" />
      </div>
    </div>
  );
}
