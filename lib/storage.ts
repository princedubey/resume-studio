export type ResumeVars = Record<string, string>;

export type ResumeDraft = {
  vars: ResumeVars;
  html: string;
  editMode: boolean;
  savedAt: number;
};

export type HistoryEntry = ResumeDraft & {
  id: string;
  label?: string;
};

export type NamedResume = {
  id: string;
  name: string;
  updatedAt: number;
  draft: ResumeDraft;
  history: HistoryEntry[];
};

export type ResumeLibrary = {
  activeId: string;
  resumes: NamedResume[];
};

const MAX_HISTORY = 10;

export function libraryKey(templateId: string) {
  return `resume-studio:${templateId}:library`;
}

/** Legacy single-draft keys */
export function draftKey(templateId: string) {
  return `resume-studio:${templateId}:draft`;
}

export function historyKey(templateId: string) {
  return `resume-studio:${templateId}:history`;
}

const LEGACY_KEYS = [
  "prince-resume-editor",
  "prince-resume-editor-v1",
  "prince-resume-editor-v2",
  "prince-resume-editor-v3",
];

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyDraft(html = "", vars: ResumeVars = {}, editMode = true): ResumeDraft {
  return { html, vars, editMode, savedAt: Date.now() };
}

function migrateLegacyDraft(templateId: string): ResumeDraft | null {
  const current = safeParse<ResumeDraft>(localStorage.getItem(draftKey(templateId)));
  if (current?.html) return current;

  if (templateId === "prince") {
    for (const key of LEGACY_KEYS) {
      const legacy = safeParse<Partial<ResumeDraft> & { html?: string }>(
        localStorage.getItem(key)
      );
      if (legacy?.html) {
        return {
          vars: legacy.vars || {},
          html: legacy.html,
          editMode: typeof legacy.editMode === "boolean" ? legacy.editMode : true,
          savedAt: Date.now(),
        };
      }
    }
  }
  return null;
}

export function loadLibrary(templateId: string, defaultHtml = ""): ResumeLibrary {
  if (typeof window === "undefined") {
    const id = "default";
    return {
      activeId: id,
      resumes: [
        {
          id,
          name: "My Resume",
          updatedAt: Date.now(),
          draft: emptyDraft(defaultHtml),
          history: [],
        },
      ],
    };
  }

  const existing = safeParse<ResumeLibrary>(localStorage.getItem(libraryKey(templateId)));
  if (existing?.resumes?.length && existing.activeId) {
    return existing;
  }

  const legacy = migrateLegacyDraft(templateId);
  const history = safeParse<HistoryEntry[]>(localStorage.getItem(historyKey(templateId))) || [];
  const id = newId();
  const library: ResumeLibrary = {
    activeId: id,
    resumes: [
      {
        id,
        name: "My Resume",
        updatedAt: Date.now(),
        draft: legacy || emptyDraft(defaultHtml),
        history,
      },
    ],
  };
  localStorage.setItem(libraryKey(templateId), JSON.stringify(library));
  return library;
}

export function saveLibrary(templateId: string, library: ResumeLibrary) {
  if (typeof window === "undefined") return;
  localStorage.setItem(libraryKey(templateId), JSON.stringify(library));
}

export function getActiveResume(library: ResumeLibrary): NamedResume {
  return (
    library.resumes.find((r) => r.id === library.activeId) || library.resumes[0]
  );
}

export function saveActiveDraft(
  templateId: string,
  library: ResumeLibrary,
  draft: Omit<ResumeDraft, "savedAt">,
  opts?: { pushHistory?: boolean; label?: string }
): ResumeLibrary {
  const active = getActiveResume(library);
  const payload: ResumeDraft = { ...draft, savedAt: Date.now() };
  let history = active.history || [];

  if (opts?.pushHistory && active.draft?.html && active.draft.html !== payload.html) {
    const entry: HistoryEntry = {
      ...active.draft,
      id: newId(),
      label: opts.label || "Autosave",
    };
    history = [entry, ...history].slice(0, MAX_HISTORY);
  } else if (opts?.pushHistory) {
    const entry: HistoryEntry = {
      ...payload,
      id: newId(),
      label: opts.label || "Checkpoint",
    };
    history = [entry, ...history].slice(0, MAX_HISTORY);
  }

  const next: ResumeLibrary = {
    ...library,
    resumes: library.resumes.map((r) =>
      r.id === active.id
        ? { ...r, draft: payload, history, updatedAt: Date.now() }
        : r
    ),
  };
  saveLibrary(templateId, next);
  // Keep legacy keys in sync for active draft (compat)
  localStorage.setItem(draftKey(templateId), JSON.stringify(payload));
  localStorage.setItem(historyKey(templateId), JSON.stringify(history));
  return next;
}

export function createResume(
  templateId: string,
  library: ResumeLibrary,
  name: string,
  defaultHtml: string,
  defaultVars: ResumeVars = {}
): ResumeLibrary {
  const id = newId();
  const resume: NamedResume = {
    id,
    name: name.trim() || "Untitled resume",
    updatedAt: Date.now(),
    draft: emptyDraft(defaultHtml, defaultVars, true),
    history: [],
  };
  const next: ResumeLibrary = {
    activeId: id,
    resumes: [resume, ...library.resumes],
  };
  saveLibrary(templateId, next);
  return next;
}

export function renameResume(
  templateId: string,
  library: ResumeLibrary,
  resumeId: string,
  name: string
): ResumeLibrary {
  const next: ResumeLibrary = {
    ...library,
    resumes: library.resumes.map((r) =>
      r.id === resumeId ? { ...r, name: name.trim() || r.name, updatedAt: Date.now() } : r
    ),
  };
  saveLibrary(templateId, next);
  return next;
}

export function deleteResume(
  templateId: string,
  library: ResumeLibrary,
  resumeId: string
): ResumeLibrary {
  if (library.resumes.length <= 1) return library;
  const resumes = library.resumes.filter((r) => r.id !== resumeId);
  const activeId =
    library.activeId === resumeId ? resumes[0].id : library.activeId;
  const next = { activeId, resumes };
  saveLibrary(templateId, next);
  return next;
}

export function switchResume(
  templateId: string,
  library: ResumeLibrary,
  resumeId: string
): ResumeLibrary {
  if (!library.resumes.some((r) => r.id === resumeId)) return library;
  const next = { ...library, activeId: resumeId };
  saveLibrary(templateId, next);
  const active = getActiveResume(next);
  localStorage.setItem(draftKey(templateId), JSON.stringify(active.draft));
  localStorage.setItem(historyKey(templateId), JSON.stringify(active.history || []));
  return next;
}

export function popActiveHistory(
  templateId: string,
  library: ResumeLibrary
): { library: ResumeLibrary; entry: HistoryEntry } | null {
  const active = getActiveResume(library);
  if (!active.history?.length) return null;
  const [latest, ...rest] = active.history;
  const next: ResumeLibrary = {
    ...library,
    resumes: library.resumes.map((r) =>
      r.id === active.id
        ? { ...r, history: rest, draft: latest, updatedAt: Date.now() }
        : r
    ),
  };
  saveLibrary(templateId, next);
  localStorage.setItem(draftKey(templateId), JSON.stringify(latest));
  localStorage.setItem(historyKey(templateId), JSON.stringify(rest));
  return { library: next, entry: latest };
}

export function clearDraft(templateId: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(draftKey(templateId));
}

export function formatHistoryTime(ts: number) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(ts);
  }
}

// Back-compat shims used by older call sites
export function loadDraft(templateId: string): ResumeDraft | null {
  if (typeof window === "undefined") return null;
  const lib = loadLibrary(templateId);
  return getActiveResume(lib).draft;
}

export function saveDraft(templateId: string, draft: Omit<ResumeDraft, "savedAt">) {
  const lib = loadLibrary(templateId);
  saveActiveDraft(templateId, lib, draft);
}

export function loadHistory(templateId: string): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  return getActiveResume(loadLibrary(templateId)).history || [];
}

export function pushHistory(
  templateId: string,
  draft: Omit<ResumeDraft, "savedAt">,
  label?: string
): HistoryEntry[] {
  const lib = loadLibrary(templateId);
  const next = saveActiveDraft(templateId, lib, draft, { pushHistory: true, label });
  return getActiveResume(next).history;
}

export function popHistory(templateId: string): HistoryEntry | null {
  const result = popActiveHistory(templateId, loadLibrary(templateId));
  return result?.entry || null;
}
