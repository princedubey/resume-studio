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
import { PRINCE_DEFAULT_CONTENT } from "./defaultContent";
import {
  DEFAULT_VARS,
  mountPrinceEditor,
  type PrinceEngineApi,
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
  colLeft: "Left column width",
  colGap: "Column gap",
};

const VAR_RANGES: Record<string, { min: number; max: number; step: number }> = {
  fontName: { min: 20, max: 40, step: 1 },
  fontRole: { min: 12, max: 24, step: 1 },
  fontSection: { min: 12, max: 22, step: 1 },
  fontJob: { min: 11, max: 18, step: 1 },
  fontBody: { min: 10, max: 15, step: 0.5 },
  fontMeta: { min: 9, max: 14, step: 0.5 },
  gapSection: { min: 8, max: 28, step: 1 },
  gapItem: { min: 6, max: 22, step: 1 },
  gapBullet: { min: 2, max: 12, step: 1 },
  colLeft: { min: 28, max: 40, step: 1 },
  colGap: { min: 10, max: 28, step: 1 },
};

export default function PrinceEditor({ templateId = "prince" }: { templateId?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<PrinceEngineApi | null>(null);
  const libraryRef = useRef<ResumeLibrary | null>(null);

  const [library, setLibrary] = useState<ResumeLibrary | null>(null);
  const [vars, setVars] = useState<ResumeVars>(DEFAULT_VARS);
  const [editMode, setEditMode] = useState(true);
  const [status, setStatus] = useState("Building pages…");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [resumeName, setResumeName] = useState("My Resume");

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
    api.applyHtml(resume.draft.html || PRINCE_DEFAULT_CONTENT);
    setResumeName(resume.name);
    setHistory(resume.history || []);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lib = loadLibrary(templateId, PRINCE_DEFAULT_CONTENT);
    libraryRef.current = lib;
    setLibrary(lib);

    const resume = getActiveResume(lib);
    const initialVars = { ...DEFAULT_VARS, ...(resume.draft.vars || {}) };
    setVars(initialVars);
    setEditMode(resume.draft.editMode ?? true);
    setHistory(resume.history || []);
    setResumeName(resume.name);

    const api = mountPrinceEditor(root, {
      defaultHtml: PRINCE_DEFAULT_CONTENT,
      initial: resume.draft.html
        ? resume.draft
        : { html: PRINCE_DEFAULT_CONTENT, vars: initialVars, editMode: true, savedAt: Date.now() },
      onStatus: setStatus,
      onChange: (state) => {
        persistState(state);
        setVars(state.vars);
        setEditMode(state.editMode);
      },
    });
    apiRef.current = api;
    setReady(true);

    return () => {
      api.destroy();
      apiRef.current = null;
    };
  }, [templateId, persistState]);

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
      PRINCE_DEFAULT_CONTENT,
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
    () => ["gapSection", "gapItem", "gapBullet", "colLeft", "colGap"],
    []
  );

  return (
    <div ref={rootRef} className={`prince-editor${editMode ? " edit-mode" : ""}`}>
      <aside className="panel">
        <p className="back-link">
          <Link href="/">← Templates</Link>
        </p>
        <h1>Resume Designer</h1>
        <p className="sub">
          Each resume keeps its own content and designer settings (fonts, gaps, layout).
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
              apiRef.current?.resetContent(PRINCE_DEFAULT_CONTENT);
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
