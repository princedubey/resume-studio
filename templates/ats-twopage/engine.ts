import { normalizeContactHeader } from "@/lib/contactHeader";
import type { ResumeDraft, ResumeVars } from "@/lib/storage";

export type EditorBindings = Array<[string, string, string]>;

export const DEFAULT_VARS: ResumeVars = {
  fontName: "24",
  fontRole: "13.5",
  fontSection: "12.5",
  fontJob: "12",
  fontBody: "10.5",
  fontMeta: "10",
  gapSection: "11",
  gapItem: "9",
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

export type LinkSelection = { label: string; href: string } | null;

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
  setSelectedLinkHref: (href: string) => void;
};

export type MountOptions = {
  defaultHtml: string;
  initial?: Partial<ResumeDraft> | null;
  onChange?: (state: Omit<ResumeDraft, "savedAt">) => void;
  onStatus?: (text: string) => void;
  onLinkSelect?: (info: LinkSelection) => void;
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

export function mountAtsTwoEditor(root: HTMLElement, options: MountOptions): AtsEngineApi {
  const masterInner = root.querySelector<HTMLElement>("#masterInner")!;
  const sheetsEl = root.querySelector<HTMLElement>("#sheets")!;
  const statusEl = root.querySelector<HTMLElement>("#pageStatus");

  let paginating = false;
  let pageTimer: ReturnType<typeof setTimeout> | undefined;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let editMode = options.initial?.editMode ?? true;
  let vars: ResumeVars = { ...DEFAULT_VARS, ...(options.initial?.vars || {}) };
  /** Stable selection — sheets DOM is rebuilt on paginate, master is not. */
  type LinkPath =
    | { type: "key"; key: string }
    | { type: "company"; index: number }
    | { type: "project-name"; index: number }
    | { type: "edu-school" };
  let selectedPath: LinkPath | null = null;
  let selectedLabel = "";

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

  function pathFromSheetAnchor(anchor: HTMLAnchorElement): LinkPath | null {
    const key = anchor.dataset.key;
    if (key) return { type: "key", key };
    if (anchor.classList.contains("company")) {
      const job = anchor.closest(".job");
      if (!job) return null;
      const index = qa<HTMLElement>("#sheets .job").indexOf(job as HTMLElement);
      return index >= 0 ? { type: "company", index } : null;
    }
    if (anchor.classList.contains("project-name")) {
      const project = anchor.closest(".project");
      if (!project) return null;
      const index = qa<HTMLElement>("#sheets .project").indexOf(project as HTMLElement);
      return index >= 0 ? { type: "project-name", index } : null;
    }
    if (anchor.classList.contains("edu-school")) return { type: "edu-school" };
    return null;
  }

  function resolveMasterLink(path: LinkPath): HTMLAnchorElement | null {
    if (path.type === "key") {
      return root.querySelector(`#masterInner a[data-key="${path.key}"]`);
    }
    if (path.type === "company") {
      return root.querySelectorAll("#masterInner #jobsList .job .company")[
        path.index
      ] as HTMLAnchorElement | undefined ?? null;
    }
    if (path.type === "project-name") {
      return root.querySelectorAll("#masterInner #projectsList .project .project-name")[
        path.index
      ] as HTMLAnchorElement | undefined ?? null;
    }
    return root.querySelector("#masterInner a.edu-school");
  }

  function resolveSheetLink(path: LinkPath): HTMLAnchorElement | null {
    if (path.type === "key") {
      return root.querySelector(`#sheets a[data-key="${path.key}"]`);
    }
    if (path.type === "company") {
      return root.querySelectorAll("#sheets .job .company")[path.index] as
        | HTMLAnchorElement
        | undefined ?? null;
    }
    if (path.type === "project-name") {
      return root.querySelectorAll("#sheets .project .project-name")[path.index] as
        | HTMLAnchorElement
        | undefined ?? null;
    }
    return root.querySelector("#sheets a.edu-school");
  }

  function writeHref(el: HTMLAnchorElement, href: string) {
    el.setAttribute("href", href || "https://");
    if (href.startsWith("http")) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  }

  function emitLinkSelect(anchor: HTMLAnchorElement | null) {
    if (!anchor) {
      selectedPath = null;
      selectedLabel = "";
      options.onLinkSelect?.(null);
      return;
    }
    const path = pathFromSheetAnchor(anchor);
    if (!path) {
      selectedPath = null;
      selectedLabel = "";
      options.onLinkSelect?.(null);
      return;
    }
    selectedPath = path;
    selectedLabel =
      (anchor.textContent || "").replace(/\u00a0/g, " ").trim() || "Selected link";
    const href = anchor.getAttribute("href") || "";
    options.onLinkSelect?.({ label: selectedLabel, href });
  }

  function applyHrefToSelected(raw: string) {
    if (!selectedPath) return;
    const master = resolveMasterLink(selectedPath);
    if (!master) return;

    let href = raw.trim();
    if (href && !/^(https?:|mailto:|tel:)/i.test(href)) {
      href = "https://" + href.replace(/^\/+/, "");
    }
    const finalHref = href || "https://";
    writeHref(master, finalHref);
    const sheet = resolveSheetLink(selectedPath);
    if (sheet) writeHref(sheet, finalHref);
    // Do not call onLinkSelect here — React already owns the typed value;
    // re-emitting would fight the controlled input while focused.
    scheduleSave();
  }

  function isEditingLinkBox() {
    const el = document.activeElement as HTMLElement | null;
    return !!(el?.closest?.(".link-box"));
  }

  function projectTemplate() {
    return `<article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://" target="_blank" rel="noopener" contenteditable="true">Project Name | Short Label</a>
        <span class="job-dates" contenteditable="true">MM/YYYY – MM/YYYY</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Title · Client: Name</p>
      <ul class="project-bullets"><li contenteditable="true">Key contribution and outcome.</li></ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Stack list</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
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

  function shouldDeferPaginate() {
    return isEditingInSheets() || isEditingLinkBox();
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
      if (sheetNode.classList.contains("project-meta")) return mProj.querySelector(".project-meta");
      if (sheetNode.closest(".tech-stack") && sheetNode.tagName === "SPAN")
        return mProj.querySelector(".tech-stack span");
      if (sheetNode.closest(".project-bullets")) {
        const liIndex = [...project.querySelectorAll(".project-bullets li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mProj.querySelectorAll(".project-bullets li")[liIndex] as HTMLElement;
      }
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
      if (sheetNode.closest(".summary-bullets")) {
        const i = [...section.querySelectorAll(".summary-bullets li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mSec.querySelectorAll(".summary-bullets li")[i] as HTMLElement;
      }
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
        const list = sheetNode.closest(".awards")!;
        const items = [...list.querySelectorAll("li")];
        const li = sheetNode.closest("li");
        const i = li ? items.indexOf(li) : -1;
        const mList = (list.id && mSec.querySelector(`#${list.id}`)) || mSec.querySelector(".awards");
        return (mList?.querySelectorAll("li")[i] as HTMLElement) || null;
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
    if (!list || !list.matches(".skills, .awards, .job-bullets, .project-bullets, .summary-bullets"))
      return;
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

      const header = masterInner.querySelector(".ats-header");
      const summary = masterInner.querySelector('[data-section="summary"]');
      const skills = masterInner.querySelector('[data-section="skills"]');
      const expHead = masterInner.querySelector('[data-section="experience"] > .section-title');
      const jobs = [...masterInner.querySelectorAll("#jobsList .job")];
      const projSec = masterInner.querySelector("#projectsSection");
      const projHead = projSec?.querySelector(".section-title");
      const projects = [...masterInner.querySelectorAll("#projectsList .project")];
      const education = masterInner.querySelector('[data-section="education"]');
      const achievements = masterInner.querySelector('[data-section="achievements"]');

      type Unit = { html: string; kind: string };
      const units: Unit[] = [];
      if (header) units.push({ html: stripActions(header.outerHTML), kind: "header" });
      if (summary) units.push({ html: stripActions(summary.outerHTML), kind: "summary" });
      if (skills) units.push({ html: stripActions(skills.outerHTML), kind: "skills" });

      const jobChunks = jobs.map((j) => stripActions(j.outerHTML));
      if (jobChunks.length && expHead) {
        units.push({
          html: `<section class="section" data-section="experience">${expHead.outerHTML}<div id="jobsList">${jobChunks[0]}</div></section>`,
          kind: "exp-start",
        });
        for (let i = 1; i < jobChunks.length; i++) {
          units.push({
            html: `<section class="section" data-section="experience"><div id="jobsList">${jobChunks[i]}</div></section>`,
            kind: "job",
          });
        }
      }

      const projChunks = projects.map((p) => stripActions(p.outerHTML));
      if (projChunks.length && projHead) {
        units.push({
          html: `<section class="section" data-section="projects" id="projectsSection">${projHead.outerHTML}<div id="projectsList">${projChunks[0]}</div></section>`,
          kind: "proj-start",
        });
        for (let i = 1; i < projChunks.length; i++) {
          units.push({
            html: `<section class="section" data-section="projects"><div id="projectsList">${projChunks[i]}</div></section>`,
            kind: "project",
          });
        }
      }

      if (education) units.push({ html: stripActions(education.outerHTML), kind: "education" });
      const certifications = masterInner.querySelector('[data-section="certifications"]');
      if (certifications)
        units.push({ html: stripActions(certifications.outerHTML), kind: "certifications" });
      if (achievements) units.push({ html: stripActions(achievements.outerHTML), kind: "achievements" });

      const probe = document.createElement("section");
      probe.className = "sheet";
      probe.style.cssText = "position:absolute;left:-10000px;top:0;visibility:hidden;";
      probe.innerHTML = `<div class="sheet-inner"></div>`;
      root.appendChild(probe);
      const probeInner = probe.querySelector(".sheet-inner") as HTMLElement;
      const usable = probeInner.clientHeight;

      const fits = (html: string) => {
        probeInner.innerHTML = html;
        probeInner.querySelectorAll(".section-actions").forEach((n) => {
          (n as HTMLElement).style.display = "none";
        });
        return probeInner.scrollHeight <= usable + 0.5;
      };

      const pages: string[] = [];
      let i = 0;
      while (i < units.length && pages.length < 2) {
        const packed: string[] = [];
        while (i < units.length) {
          const trial = packed.concat([units[i].html]).join("");
          if (fits(trial) || packed.length === 0) {
            packed.push(units[i].html);
            i++;
            if (!fits(trial) && packed.length === 1) break;
          } else break;
        }
        pages.push(packed.join(""));
      }

      // If anything remains, force onto page 2 (may warn overflow)
      if (i < units.length) {
        const rest = units.slice(i).map((u) => u.html).join("");
        if (pages.length < 2) pages.push(rest);
        else pages[1] += rest;
      }
      if (!pages.length) pages.push("");

      probe.remove();
      sheetsEl.innerHTML = "";
      const masterJobs = [...masterInner.querySelectorAll("#jobsList .job")];
      const masterProjects = [...masterInner.querySelectorAll("#projectsList .project")];
      const total = pages.length;

      pages.forEach((html, idx) => {
        const sheet = document.createElement("section");
        sheet.className = "sheet";
        sheet.innerHTML = `<div class="sheet-label">Page ${idx + 1} / ${total} · ATS Detail</div><div class="sheet-inner"></div>`;
        const inner = sheet.querySelector(".sheet-inner")!;
        inner.innerHTML = html;
        inner.querySelectorAll(".job").forEach((jobEl) => {
          const title = jobEl.querySelector(".job-title")?.textContent || "";
          const company = jobEl.querySelector(".company")?.textContent || "";
          const m = masterJobs.find(
            (mj) =>
              (mj.querySelector(".job-title")?.textContent || "") === title &&
              (mj.querySelector(".company")?.textContent || "") === company
          );
          const actions = m?.querySelector(".section-actions");
          if (actions && !jobEl.querySelector(".section-actions")) {
            jobEl.appendChild(actions.cloneNode(true));
          }
        });
        inner.querySelectorAll(".project").forEach((projEl) => {
          const name = projEl.querySelector(".project-name")?.textContent || "";
          const m = masterProjects.find(
            (mp) => (mp.querySelector(".project-name")?.textContent || "") === name
          );
          const actions = m?.querySelector(".section-actions");
          if (actions && !projEl.querySelector(".section-actions")) {
            projEl.appendChild(actions.cloneNode(true));
          }
        });
        sheetsEl.appendChild(sheet);
      });

      setEditMode(editMode);

      // Overflow check on last page
      const last = sheetsEl.querySelector(".sheet:last-child .sheet-inner") as HTMLElement | null;
      const overflow = !!(last && last.scrollHeight > last.clientHeight + 1);
      const statusText = overflow
        ? `${total} A4 pages · last page overflows — tighten fonts/gaps`
        : `${total} A4 page${total > 1 ? "s" : ""} · ATS detailed · print-ready`;
      if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.classList.toggle("warn", overflow);
      }
      options.onStatus?.(statusText);
    } finally {
      paginating = false;
    }
  }

  function schedulePaginate() {
    clearTimeout(pageTimer);
    pageTimer = setTimeout(() => {
      if (shouldDeferPaginate()) return;
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
      if (!shouldDeferPaginate()) schedulePaginate();
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
        if (act === "add-project-bullet") {
          const li = document.createElement("li");
          li.contentEditable = "true";
          li.textContent = "New contribution";
          mProj.querySelector(".project-bullets")?.appendChild(li);
        }
        if (act === "remove-project") mProj.remove();
      }
      scheduleSave();
      schedulePaginate();
      return;
    }
    const a = target.closest("#sheets a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    if (editMode && !(e.metaKey || e.ctrlKey)) {
      emitLinkSelect(a);
      return;
    }
    normalizeHrefFromText(a);
    const href = a.getAttribute("href");
    if (!href || href === "#" || href === "https://") return;
    e.preventDefault();
    window.open(href, "_blank", "noopener");
  };

  const onFocusIn = (e: FocusEvent) => {
    const a = (e.target as HTMLElement)?.closest?.("#sheets a[href]") as HTMLAnchorElement | null;
    if (a) emitLinkSelect(a);
  };

  sheetsEl.addEventListener("input", onInput);
  sheetsEl.addEventListener("focusout", onFocusOut);
  sheetsEl.addEventListener("focusin", onFocusIn);
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
      sheetsEl.removeEventListener("focusin", onFocusIn);
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
      emitLinkSelect(null);
      vars = { ...DEFAULT_VARS };
      applyCssVars();
      setEditMode(true);
      scheduleSave();
      schedulePaginate();
    },
    applyHtml(html) {
      masterInner.innerHTML = html;
      normalizeContactHeader(masterInner);
      emitLinkSelect(null);
      scheduleSave();
      schedulePaginate();
    },
    setSelectedLinkHref(href) {
      applyHrefToSelected(href);
    },
  };
}
