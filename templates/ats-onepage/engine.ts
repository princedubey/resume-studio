import { normalizeContactHeader } from "@/lib/contactHeader";
import type { ResumeDraft, ResumeVars } from "@/lib/storage";

export type EditorBindings = Array<[string, string, string]>;

export const DEFAULT_VARS: ResumeVars = {
  fontName: "22",
  fontRole: "13",
  fontSection: "12",
  fontJob: "11.5",
  fontBody: "10.2",
  fontMeta: "9.5",
  gapSection: "10",
  gapItem: "8",
  gapBullet: "3",
};

export const VAR_BINDINGS: EditorBindings = [
  ["fontName", "--font-name", "px"],
  ["fontRole", "--font-role", "px"],
  ["fontSection", "--font-section", "px"],
  ["fontJob", "--font-job", "px"],
  ["fontBody", "--font-body", "px"],
  ["fontMeta", "--font-meta", "px"],
  ["gapSection", "--gap-section", "px"],
  ["gapItem", "--gap-item", "px"],
  ["gapBullet", "--gap-bullet", "px"],
];

export type AtsEngineApi = {
  destroy: () => void;
  paginate: () => void;
  print: () => void;
  getState: () => Omit<ResumeDraft, "savedAt">;
  setVars: (vars: ResumeVars) => void;
  setEditMode: (on: boolean) => void;
  addJob: () => void;
  addSkill: () => void;
  addAward: () => void;
  addProject: () => void;
  resetContent: (defaultHtml: string) => void;
  applyHtml: (html: string) => void;
};

export type MountOptions = {
  defaultHtml: string;
  initial?: Partial<ResumeDraft> | null;
  onChange?: (state: Omit<ResumeDraft, "savedAt">) => void;
  onStatus?: (text: string) => void;
};

function jobTemplate() {
  return `<article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Job Title</h3>
        <span class="job-dates" contenteditable="true">MM/YYYY – MM/YYYY</span>
      </div>
      <p class="company-line"><a class="company" href="https://" target="_blank" rel="noopener" contenteditable="true">Company Name</a> <span class="meta" contenteditable="true">| Location · Remote</span></p>
      <ul class="job-bullets"><li contenteditable="true">Impact, stack, and outcome.</li></ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>`;
}

function createSkillRow(label = "Category:", value = "") {
  const li = document.createElement("li");
  li.className = "skill-row";
  const strong = document.createElement("strong");
  strong.className = "skill-label";
  strong.contentEditable = "true";
  strong.textContent = label;
  const span = document.createElement("span");
  span.className = "skill-value";
  span.contentEditable = "true";
  span.textContent = value;
  li.append(strong, document.createTextNode(" "), span);
  return li;
}

function stripActions(html: string) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  tmp.querySelectorAll(".section-actions").forEach((n) => n.remove());
  return tmp.innerHTML;
}

export function mountAtsEditor(root: HTMLElement, options: MountOptions): AtsEngineApi {
  const masterInner = root.querySelector<HTMLElement>("#masterInner")!;
  const sheetsEl = root.querySelector<HTMLElement>("#sheets")!;
  const statusEl = root.querySelector<HTMLElement>("#pageStatus");

  let paginating = false;
  let pageTimer: ReturnType<typeof setTimeout> | undefined;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let editMode = options.initial?.editMode ?? true;
  let vars: ResumeVars = { ...DEFAULT_VARS, ...(options.initial?.vars || {}) };

  masterInner.innerHTML = options.initial?.html || options.defaultHtml;
  normalizeContactHeader(masterInner);

  // Ensure older saved drafts get a Projects section
  if (!masterInner.querySelector("#projectsList")) {
    const tmp = document.createElement("div");
    tmp.innerHTML = options.defaultHtml;
    const fresh = tmp.querySelector("#projectsSection");
    const edu = masterInner.querySelector('[data-section="education"]');
    if (fresh && edu) edu.before(fresh.cloneNode(true));
    else if (fresh) masterInner.appendChild(fresh.cloneNode(true));
  }

  const qa = <T extends Element>(sel: string) => [...root.querySelectorAll<T>(sel)];

  function emitChange() {
    options.onChange?.(getState());
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(emitChange, 250);
  }
  function applyCssVars() {
    for (const [id, cssVar, unit] of VAR_BINDINGS) {
      root.style.setProperty(cssVar, (vars[id] ?? DEFAULT_VARS[id]) + unit);
    }
  }
  function getState(): Omit<ResumeDraft, "savedAt"> {
    return { vars: { ...vars }, html: masterInner.innerHTML, editMode };
  }

  function normalizeHrefFromText(el: HTMLAnchorElement) {
    const key = el.dataset.key || "";
    const raw = (el.textContent || "").replace(/\u00a0/g, " ").trim();
    if (!raw) return;
    let href = el.getAttribute("href") || "";
    if (key === "email" || raw.includes("@")) href = "mailto:" + raw.replace(/^mailto:/i, "");
    else if (key === "phone" || /^\+?\d[\d\s-]{6,}$/.test(raw))
      href = "tel:" + raw.replace(/[^\d+]/g, "");
    else if (key === "linkedin" || /linkedin\.com/i.test(raw)) {
      href = raw.startsWith("http") ? raw : "https://" + raw.replace(/^\/+/, "");
    } else if (key === "github" || /github\.com/i.test(raw)) {
      href = raw.startsWith("http") ? raw : "https://" + raw.replace(/^\/+/, "");
    } else if (
      el.classList.contains("company") ||
      el.classList.contains("edu-school") ||
      el.classList.contains("project-name")
    ) {
      if (!href || href === "https://" || href === "#") {
        href = "https://www.google.com/search?q=" + encodeURIComponent(raw);
      }
    }
    el.setAttribute("href", href);
    if (href.startsWith("http")) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  }

  function syncAllLinkHrefs(scope: ParentNode | null) {
    (scope || root)
      .querySelectorAll("a.contact-link, a.company, a.edu-school, a.project-name")
      .forEach((a) => normalizeHrefFromText(a as HTMLAnchorElement));
  }

  function projectTemplate() {
    return `<article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://" target="_blank" rel="noopener" contenteditable="true">Project Name | Short Label</a>
        <span class="job-dates" contenteditable="true">MM/YYYY – MM/YYYY</span>
      </div>
      <p class="project-line" contenteditable="true">Stack and impact in one line.</p>
      <div class="section-actions"><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>`;
  }

  function setEditMode(on: boolean) {
    editMode = on;
    root.classList.toggle("edit-mode", on);
    root.querySelectorAll("#master [contenteditable], #sheets [contenteditable]").forEach((el) => {
      el.setAttribute("contenteditable", on ? "true" : "false");
    });
  }

  function isEditingInSheets() {
    const el = document.activeElement as HTMLElement | null;
    return !!(el?.closest?.("#sheets [contenteditable], #sheets [contenteditable] *"));
  }

  function findMasterTwin(sheetNode: HTMLElement): HTMLElement | null {
    if (sheetNode.dataset?.key) {
      return root.querySelector(`#masterInner [data-key="${sheetNode.dataset.key}"]`);
    }
    const job = sheetNode.closest(".job");
    if (job) {
      const jobs = qa<HTMLElement>("#sheets .job");
      const masterJobs = qa<HTMLElement>("#masterInner #jobsList .job");
      const mJob = masterJobs[jobs.indexOf(job as HTMLElement)];
      if (!mJob) return null;
      if (sheetNode.classList.contains("job-title")) return mJob.querySelector(".job-title");
      if (sheetNode.classList.contains("job-dates")) return mJob.querySelector(".job-dates");
      if (sheetNode.classList.contains("company")) return mJob.querySelector(".company");
      if (sheetNode.classList.contains("meta")) return mJob.querySelector(".meta");
      if (sheetNode.closest(".job-bullets")) {
        const i = [...job.querySelectorAll(".job-bullets li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mJob.querySelectorAll(".job-bullets li")[i] as HTMLElement;
      }
    }

    const project = sheetNode.closest(".project");
    if (project) {
      const projects = qa<HTMLElement>("#sheets .project");
      const masterProjects = qa<HTMLElement>("#masterInner #projectsList .project");
      const mProj = masterProjects[projects.indexOf(project as HTMLElement)];
      if (!mProj) return null;
      if (sheetNode.classList.contains("project-name")) return mProj.querySelector(".project-name");
      if (sheetNode.classList.contains("job-dates")) return mProj.querySelector(".job-dates");
      if (sheetNode.classList.contains("project-line")) return mProj.querySelector(".project-line");
    }
    const section = sheetNode.closest(".section") as HTMLElement | null;
    if (section?.dataset.section) {
      const mSec = root.querySelector(
        `#masterInner .section[data-section="${section.dataset.section}"]`
      ) as HTMLElement | null;
      if (!mSec) return null;
      if (sheetNode.classList.contains("section-title")) return mSec.querySelector(".section-title");
      if (sheetNode.classList.contains("body-text")) return mSec.querySelector(".body-text");
      if (sheetNode.classList.contains("edu-degree")) return mSec.querySelector(".edu-degree");
      if (sheetNode.classList.contains("edu-school")) return mSec.querySelector(".edu-school");
      if (sheetNode.classList.contains("job-dates") && sheetNode.closest(".edu-block"))
        return mSec.querySelector(".job-dates");
      if (sheetNode.classList.contains("meta") && sheetNode.closest(".edu-block"))
        return mSec.querySelector(".meta");
      if (sheetNode.closest(".skills")) {
        const li = sheetNode.closest("li") || sheetNode;
        const i = [...section.querySelectorAll(".skills li")].indexOf(li);
        const mLi = mSec.querySelectorAll(".skills li")[i] as HTMLElement | undefined;
        if (!mLi) return null;
        if (sheetNode.classList.contains("skill-label"))
          return mLi.querySelector(".skill-label") || mLi;
        if (sheetNode.classList.contains("skill-value"))
          return mLi.querySelector(".skill-value") || mLi;
        return mLi;
      }
      if (sheetNode.closest(".awards")) {
        const i = [...section.querySelectorAll(".awards li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mSec.querySelectorAll(".awards li")[i] as HTMLElement;
      }
    }
    if (sheetNode.classList.contains("name")) return root.querySelector("#masterInner .name");
    if (sheetNode.classList.contains("role")) return root.querySelector("#masterInner .role");
    return null;
  }

  function textIsEmpty(el: Element | null | undefined) {
    return !(el && (el.textContent || "").replace(/\u00a0/g, " ").replace(/\u200b/g, "").trim());
  }
  function placeCaret(el: HTMLElement, atEnd = true) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(!atEnd);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
  function caretAtStart(el: HTMLElement) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || !el.contains(sel.anchorNode)) return false;
    const pre = sel.getRangeAt(0).cloneRange();
    pre.selectNodeContents(el);
    pre.setEnd(sel.anchorNode!, sel.anchorOffset);
    return pre.toString().length === 0;
  }
  function masterListItem(sheetLi: HTMLElement) {
    const probe =
      (sheetLi.querySelector(".skill-label, .skill-value") as HTMLElement) || sheetLi;
    const twin = findMasterTwin(probe);
    if (!twin) return null;
    return (twin.closest("li") as HTMLElement) || (twin.tagName === "LI" ? twin : null);
  }
  function focusListRow(row: HTMLElement, atEnd = true) {
    placeCaret(
      (row.querySelector(".skill-value, .skill-label") as HTMLElement) || row,
      atEnd
    );
  }

  function handleListEditingKeys(e: KeyboardEvent) {
    if (!editMode) return;
    if (e.key !== "Enter" && e.key !== "Backspace") return;
    const editable = (e.target as HTMLElement).closest?.(
      "#sheets [contenteditable]"
    ) as HTMLElement | null;
    if (!editable) return;
    const row = editable.closest("li");
    if (!row) return;
    const list = row.parentElement;
    if (!list || !list.matches(".skills, .awards, .job-bullets")) return;
    const isSkill = list.classList.contains("skills");

    if (e.key === "Enter") {
      e.preventDefault();
      const sheetNew = isSkill
        ? createSkillRow("Category:", "")
        : (() => {
            const li = document.createElement("li");
            li.contentEditable = "true";
            li.textContent = "";
            return li;
          })();
      const mRow = masterListItem(row);
      row.after(sheetNew);
      if (mRow)
        mRow.after(
          isSkill
            ? createSkillRow("Category:", "")
            : (() => {
                const li = document.createElement("li");
                li.contentEditable = "true";
                li.textContent = "";
                return li;
              })()
        );
      focusListRow(sheetNew, false);
      scheduleSave();
      return;
    }

    const bulletEmpty = !isSkill && textIsEmpty(row);
    const skillValueEmptyAtStart =
      isSkill &&
      editable.classList.contains("skill-value") &&
      textIsEmpty(editable) &&
      caretAtStart(editable);
    const labelBare = (row.querySelector(".skill-label")?.textContent || "")
      .replace(/:$/, "")
      .trim();
    const skillLabelEmptyAtStart =
      isSkill &&
      editable.classList.contains("skill-label") &&
      !labelBare &&
      textIsEmpty(row.querySelector(".skill-value")) &&
      caretAtStart(editable);
    if (!(bulletEmpty || skillValueEmptyAtStart || skillLabelEmptyAtStart)) return;
    e.preventDefault();
    const siblings = [...list.children] as HTMLElement[];
    if (siblings.length <= 1) {
      if (isSkill) {
        row.querySelector(".skill-label")!.textContent = "Category:";
        row.querySelector(".skill-value")!.textContent = "";
        const mRow = masterListItem(row);
        if (mRow) {
          mRow.querySelector(".skill-label")!.textContent = "Category:";
          mRow.querySelector(".skill-value")!.textContent = "";
        }
        focusListRow(row, false);
      } else {
        row.textContent = "";
        const mRow = masterListItem(row);
        if (mRow) mRow.textContent = "";
        placeCaret(row, false);
      }
      scheduleSave();
      return;
    }
    const idx = siblings.indexOf(row);
    const focusTarget = siblings[idx - 1] || siblings[idx + 1];
    const mRow = masterListItem(row);
    row.remove();
    mRow?.remove();
    if (focusTarget) focusListRow(focusTarget, true);
    scheduleSave();
  }

  function paginate() {
    if (paginating) return;
    paginating = true;
    try {
      syncAllLinkHrefs(masterInner);
      const html = stripActions(masterInner.innerHTML);
      sheetsEl.innerHTML = "";
      const sheet = document.createElement("section");
      sheet.className = "sheet";
      sheet.innerHTML = `<div class="sheet-label">1 A4 page · ATS</div><div class="sheet-inner"></div>`;
      const inner = sheet.querySelector(".sheet-inner")!;
      inner.innerHTML = html;

      // Restore action bars
      const masterJobs = [...masterInner.querySelectorAll("#jobsList .job")];
      const masterProjects = [...masterInner.querySelectorAll("#projectsList .project")];
      inner.querySelectorAll(".job").forEach((jobEl, i) => {
        const actions = masterJobs[i]?.querySelector(".section-actions");
        if (actions && !jobEl.querySelector(".section-actions")) {
          jobEl.appendChild(actions.cloneNode(true));
        }
      });
      inner.querySelectorAll(".project").forEach((projEl, i) => {
        const actions = masterProjects[i]?.querySelector(".section-actions");
        if (actions && !projEl.querySelector(".section-actions")) {
          projEl.appendChild(actions.cloneNode(true));
        }
      });
      sheetsEl.appendChild(sheet);
      setEditMode(editMode);

      const usable = (sheet.querySelector(".sheet-inner") as HTMLElement).clientHeight;
      const needed = (sheet.querySelector(".sheet-inner") as HTMLElement).scrollHeight;
      const fits = needed <= usable + 1;
      const statusText = fits
        ? "1 A4 page · fits print · ATS-friendly layout"
        : "Overflows 1 page — tighten fonts/gaps or shorten bullets";
      if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.classList.toggle("warn", !fits);
      }
      options.onStatus?.(statusText);
    } finally {
      paginating = false;
    }
  }

  function schedulePaginate() {
    clearTimeout(pageTimer);
    pageTimer = setTimeout(() => {
      if (isEditingInSheets()) return;
      paginate();
    }, 120);
  }

  const onInput = (e: Event) => {
    const t = e.target as HTMLElement;
    if (!t.closest?.("[contenteditable]")) return;
    const node = (t.closest("[contenteditable]") as HTMLElement) || t;
    const twin = findMasterTwin(node);
    if (twin) {
      twin.innerHTML = node.innerHTML;
      if (node.tagName === "A" && twin.tagName === "A") {
        if (node.getAttribute("href")) twin.setAttribute("href", node.getAttribute("href")!);
        normalizeHrefFromText(twin as HTMLAnchorElement);
        normalizeHrefFromText(node as HTMLAnchorElement);
      }
    }
    syncAllLinkHrefs(masterInner);
    scheduleSave();
  };

  const onFocusOut = (e: FocusEvent) => {
    if (!(e.target as HTMLElement)?.closest?.("[contenteditable]")) return;
    setTimeout(() => {
      if (!isEditingInSheets()) schedulePaginate();
    }, 0);
  };

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("button[data-act]") as HTMLButtonElement | null;
    if (btn) {
      e.preventDefault();
      const act = btn.dataset.act;
      const job = btn.closest(".job");
      const project = btn.closest(".project");
      if (job) {
        const jobs = qa<HTMLElement>("#sheets .job");
        const masterJobs = qa<HTMLElement>("#masterInner #jobsList .job");
        const mJob = masterJobs[jobs.indexOf(job as HTMLElement)];
        if (!mJob) return;
        if (act === "add-bullet") {
          const li = document.createElement("li");
          li.contentEditable = "true";
          li.textContent = "New bullet";
          mJob.querySelector(".job-bullets")?.appendChild(li);
        }
        if (act === "remove-job") mJob.remove();
      }
      if (project) {
        const projects = qa<HTMLElement>("#sheets .project");
        const masterProjects = qa<HTMLElement>("#masterInner #projectsList .project");
        const mProj = masterProjects[projects.indexOf(project as HTMLElement)];
        if (!mProj) return;
        if (act === "remove-project") mProj.remove();
      }
      scheduleSave();
      schedulePaginate();
      return;
    }
    const a = target.closest("#sheets a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    if (editMode && !(e.metaKey || e.ctrlKey)) return;
    normalizeHrefFromText(a);
    const href = a.getAttribute("href");
    if (!href || href === "#" || href === "https://") return;
    e.preventDefault();
    window.open(href, "_blank", "noopener");
  };

  sheetsEl.addEventListener("input", onInput);
  sheetsEl.addEventListener("focusout", onFocusOut);
  sheetsEl.addEventListener("click", onClick, true);
  sheetsEl.addEventListener("keydown", handleListEditingKeys);
  window.addEventListener("resize", schedulePaginate);

  applyCssVars();
  setEditMode(editMode);
  scheduleSave();
  paginate();
  if (document.fonts?.ready) document.fonts.ready.then(() => schedulePaginate());

  return {
    destroy() {
      clearTimeout(pageTimer);
      clearTimeout(saveTimer);
      sheetsEl.removeEventListener("input", onInput);
      sheetsEl.removeEventListener("focusout", onFocusOut);
      sheetsEl.removeEventListener("click", onClick, true);
      sheetsEl.removeEventListener("keydown", handleListEditingKeys);
      window.removeEventListener("resize", schedulePaginate);
    },
    paginate,
    print() {
      paginate();
      setTimeout(() => window.print(), 80);
    },
    getState,
    setVars(next) {
      vars = { ...vars, ...next };
      applyCssVars();
      schedulePaginate();
      scheduleSave();
    },
    setEditMode(on) {
      setEditMode(on);
      scheduleSave();
    },
    addJob() {
      masterInner.querySelector("#jobsList")?.insertAdjacentHTML("beforeend", jobTemplate());
      scheduleSave();
      schedulePaginate();
    },
    addSkill() {
      masterInner
        .querySelector("#skillsList")
        ?.appendChild(createSkillRow("Category:", "Skill items"));
      scheduleSave();
      schedulePaginate();
    },
    addAward() {
      const li = document.createElement("li");
      li.contentEditable = "true";
      li.textContent = "New certification / achievement";
      masterInner.querySelector("#awardsList")?.appendChild(li);
      scheduleSave();
      schedulePaginate();
    },
    addProject() {
      masterInner
        .querySelector("#projectsList")
        ?.insertAdjacentHTML("beforeend", projectTemplate());
      scheduleSave();
      schedulePaginate();
    },
    resetContent(html) {
      masterInner.innerHTML = html;
      normalizeContactHeader(masterInner);
      vars = { ...DEFAULT_VARS };
      applyCssVars();
      setEditMode(true);
      scheduleSave();
      schedulePaginate();
    },
    applyHtml(html) {
      masterInner.innerHTML = html;
      normalizeContactHeader(masterInner);
      scheduleSave();
      schedulePaginate();
    },
  };
}
