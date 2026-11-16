import type { ResumeDraft, ResumeVars } from "@/lib/storage";

export type EditorBindings = Array<[string, string, string]>;

export const DEFAULT_VARS: ResumeVars = {
  fontName: "28",
  fontRole: "17",
  fontSection: "16",
  fontJob: "14",
  fontBody: "12.2",
  fontMeta: "11.5",
  gapSection: "14",
  gapItem: "10",
  gapBullet: "5",
  colLeft: "32",
  colGap: "18",
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
  ["colLeft", "--col-left", "%"],
  ["colGap", "--col-gap", "px"],
];

export type PrinceEngineApi = {
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
      <h3 class="job-title" contenteditable="true">Job Title</h3>
      <a class="company" href="https://" target="_blank" rel="noopener" contenteditable="true">Company Name</a>
      <p class="meta" contenteditable="true">MM/YYYY – MM/YYYY  |  Location · Remote</p>
      <ul class="job-bullets"><li contenteditable="true">Describe impact, stack, and outcome.</li></ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>`;
}

function projectTemplate() {
  return `<article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://" target="_blank" rel="noopener" contenteditable="true">Project Name | Short Label</a>
        <span class="project-dates" contenteditable="true">MM/YYYY – MM/YYYY</span>
      </div>
      <p class="project-summary" contenteditable="true">One-line project summary.</p>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Client</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Role</span></p>
      <ul class="project-bullets"><li contenteditable="true">Key contribution.</li></ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">Tech list</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
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
  li.appendChild(strong);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(span);
  return li;
}

function createBulletLi(text = "") {
  const li = document.createElement("li");
  li.contentEditable = "true";
  li.textContent = text;
  return li;
}

export function mountPrinceEditor(root: HTMLElement, options: MountOptions): PrinceEngineApi {
  const masterInner = root.querySelector<HTMLElement>("#masterInner")!;
  const sheetsEl = root.querySelector<HTMLElement>("#sheets")!;
  const statusEl = root.querySelector<HTMLElement>("#pageStatus");

  let paginating = false;
  let pageTimer: ReturnType<typeof setTimeout> | undefined;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let editMode = options.initial?.editMode ?? true;
  let vars: ResumeVars = { ...DEFAULT_VARS, ...(options.initial?.vars || {}) };
  const defaultHtml = options.defaultHtml;

  if (options.initial?.html) {
    masterInner.innerHTML = options.initial.html;
  } else {
    masterInner.innerHTML = defaultHtml;
  }

  const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
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
      const val = vars[id] ?? DEFAULT_VARS[id];
      root.style.setProperty(cssVar, val + unit);
    }
  }

  function cleanupEmptyUnderlines(scope: ParentNode | null) {
    (scope || root).querySelectorAll(".company, .edu-school, .project-name").forEach((el) => {
      const t = (el.textContent || "").replace(/\u00a0/g, " ").trim();
      (el as HTMLElement).style.textDecoration = t ? "" : "none";
      if (!t) (el as HTMLElement).style.borderBottom = "none";
    });
  }

  function normalizeHrefFromText(el: HTMLAnchorElement) {
    const key = el.dataset.key || "";
    const raw = (el.textContent || "").replace(/\u00a0/g, " ").trim();
    if (!raw) return;
    let href = el.getAttribute("href") || "";
    if (key === "email" || raw.includes("@")) {
      href = "mailto:" + raw.replace(/^mailto:/i, "");
    } else if (key === "phone" || /^\+?\d[\d\s-]{6,}$/.test(raw)) {
      href = "tel:" + raw.replace(/[^\d+]/g, "");
    } else if (key === "linkedin" || /linkedin\.com/i.test(raw)) {
      href = raw.startsWith("http") ? raw : "https://" + raw.replace(/^\/+/, "");
      if (!/linkedin\.com/i.test(href)) href = "https://www.linkedin.com/in/" + raw;
    } else if (key === "github" || /github\.com/i.test(raw)) {
      href = raw.startsWith("http") ? raw : "https://" + raw.replace(/^\/+/, "");
    } else if (
      el.classList.contains("company") ||
      el.classList.contains("project-name") ||
      el.classList.contains("edu-school")
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
      .querySelectorAll<HTMLAnchorElement>(
        "a.contact-link, a.company, a.project-name, a.edu-school, .contact a"
      )
      .forEach(normalizeHrefFromText);
  }

  function normalizeLegacyLinks(scope: HTMLElement) {
    scope.querySelectorAll("p.company").forEach((p) => {
      const a = document.createElement("a");
      a.className = "company";
      a.contentEditable = "true";
      a.textContent = p.textContent;
      a.href = "https://www.google.com/search?q=" + encodeURIComponent((p.textContent || "").trim());
      a.target = "_blank";
      a.rel = "noopener";
      p.replaceWith(a);
    });
    scope.querySelectorAll("h3.project-name").forEach((h) => {
      const a = document.createElement("a");
      a.className = "project-name";
      a.contentEditable = "true";
      a.textContent = h.textContent;
      a.href = "https://www.google.com/search?q=" + encodeURIComponent((h.textContent || "").trim());
      a.target = "_blank";
      a.rel = "noopener";
      h.replaceWith(a);
    });
    scope.querySelectorAll("p.edu-school").forEach((p) => {
      const a = document.createElement("a");
      a.className = "edu-school";
      a.contentEditable = "true";
      a.textContent = p.textContent;
      a.href = "https://www.magadhuniversity.ac.in";
      a.target = "_blank";
      a.rel = "noopener";
      p.replaceWith(a);
    });
    syncAllLinkHrefs(scope);
  }

  function setEditMode(on: boolean) {
    editMode = on;
    root.classList.toggle("edit-mode", on);
    root.querySelectorAll("#master [contenteditable], #sheets [contenteditable]").forEach((el) => {
      el.setAttribute("contenteditable", on ? "true" : "false");
    });
  }

  function stripActions(html: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    tmp.querySelectorAll(".section-actions").forEach((n) => n.remove());
    return tmp.innerHTML;
  }

  function makeSheet(n: number, total: number) {
    const sheet = document.createElement("section");
    sheet.className = "sheet";
    sheet.dataset.page = String(n);
    sheet.innerHTML = `<div class="sheet-label">Page ${n} / ${total}</div><div class="sheet-inner"></div>`;
    return sheet;
  }

  function isEditingInSheets() {
    const el = document.activeElement;
    return !!(el && el.closest && el.closest("#sheets [contenteditable], #sheets [contenteditable] *"));
  }

  function findMasterTwin(sheetNode: HTMLElement): HTMLElement | null {
    if (sheetNode.dataset?.key) {
      return q(`#masterInner [data-key="${sheetNode.dataset.key}"]`);
    }

    const job = sheetNode.closest(".job");
    if (job && (sheetNode.matches(".job-title, .company, .meta") || sheetNode.closest(".job-bullets"))) {
      const jobs = qa<HTMLElement>("#sheets .job");
      const masterJobs = qa<HTMLElement>("#masterInner #jobsList .job");
      const ji = jobs.indexOf(job as HTMLElement);
      const mJob = masterJobs[ji];
      if (!mJob) return null;
      if (sheetNode.classList.contains("job-title")) return mJob.querySelector(".job-title");
      if (sheetNode.classList.contains("company")) return mJob.querySelector(".company");
      if (sheetNode.classList.contains("meta")) return mJob.querySelector(".meta");
      if (sheetNode.closest(".job-bullets")) {
        const liIndex = [...job.querySelectorAll(".job-bullets li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mJob.querySelectorAll<HTMLElement>(".job-bullets li")[liIndex] || null;
      }
    }

    const project = sheetNode.closest(".project");
    if (project) {
      const projects = qa<HTMLElement>("#sheets .project");
      const masterProjects = qa<HTMLElement>("#masterInner #projectsList .project");
      const pi = projects.indexOf(project as HTMLElement);
      const mProj = masterProjects[pi];
      if (!mProj) return null;
      if (sheetNode.classList.contains("project-name")) return mProj.querySelector(".project-name");
      if (sheetNode.classList.contains("project-dates")) return mProj.querySelector(".project-dates");
      if (sheetNode.classList.contains("project-summary")) return mProj.querySelector(".project-summary");
      if (sheetNode.closest(".tech-stack") && sheetNode.tagName === "SPAN") {
        return mProj.querySelector(".tech-stack span");
      }
      if (sheetNode.closest(".project-cr") && sheetNode.tagName === "SPAN") {
        const spans = [...project.querySelectorAll(".project-cr span")];
        const mspans = [...mProj.querySelectorAll<HTMLElement>(".project-cr span")];
        return mspans[spans.indexOf(sheetNode)] || null;
      }
      if (sheetNode.closest(".project-bullets")) {
        const liIndex = [...project.querySelectorAll(".project-bullets li")].indexOf(
          sheetNode.closest("li") || sheetNode
        );
        return mProj.querySelectorAll<HTMLElement>(".project-bullets li")[liIndex] || null;
      }
    }

    const section = sheetNode.closest(".section") as HTMLElement | null;
    if (section?.dataset.section) {
      const mSec = q<HTMLElement>(`#masterInner .section[data-section="${section.dataset.section}"]`);
      if (!mSec) return null;
      if (sheetNode.classList.contains("title")) return mSec.querySelector(".title");
      if (sheetNode.classList.contains("body-text")) return mSec.querySelector(".body-text");
      if (sheetNode.classList.contains("subhead")) return mSec.querySelector(".subhead");
      if (sheetNode.classList.contains("edu-degree")) return mSec.querySelector(".edu-degree");
      if (sheetNode.classList.contains("edu-school")) return mSec.querySelector(".edu-school");
      if (sheetNode.classList.contains("edu-meta")) return mSec.querySelector(".edu-meta");
      if (sheetNode.closest(".skills")) {
        const li = sheetNode.closest("li") || sheetNode;
        const i = [...section.querySelectorAll(".skills li")].indexOf(li);
        const mLi = mSec.querySelectorAll<HTMLElement>(".skills li")[i];
        if (!mLi) return null;
        if (sheetNode.classList.contains("skill-label")) return mLi.querySelector(".skill-label") || mLi;
        if (sheetNode.classList.contains("skill-value")) return mLi.querySelector(".skill-value") || mLi;
        return mLi;
      }
      if (sheetNode.closest(".awards")) {
        const i = [...section.querySelectorAll(".awards li")].indexOf(sheetNode.closest("li") || sheetNode);
        return mSec.querySelectorAll<HTMLElement>(".awards li")[i] || null;
      }
    }

    if (sheetNode.classList.contains("name")) return q("#masterInner .name");
    if (sheetNode.classList.contains("role")) return q("#masterInner .role");
    return null;
  }

  function textIsEmpty(el: Element | null) {
    return !(el && (el.textContent || "").replace(/\u00a0/g, " ").replace(/\u200b/g, "").trim());
  }

  function placeCaret(el: HTMLElement | null, atEnd = true) {
    if (!el) return;
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

  function focusListRow(row: HTMLElement | null, atEnd = true) {
    if (!row) return;
    placeCaret(
      (row.querySelector(".skill-value, .skill-label") as HTMLElement) || row,
      atEnd
    );
  }

  function skillLabelBare(row: HTMLElement) {
    return (row.querySelector(".skill-label")?.textContent || "").replace(/:$/, "").trim();
  }

  function handleListEditingKeys(e: KeyboardEvent) {
    if (!editMode) return;
    if (e.key !== "Enter" && e.key !== "Backspace") return;
    const target = e.target as HTMLElement;
    const editable = target.closest?.("#sheets [contenteditable]") as HTMLElement | null;
    if (!editable) return;
    const row = editable.closest("li");
    if (!row) return;
    const list = row.parentElement;
    if (!list || !list.matches(".skills, .awards, .job-bullets, .project-bullets")) return;
    const isSkill = list.classList.contains("skills");

    if (e.key === "Enter") {
      e.preventDefault();
      const sheetNew = isSkill ? createSkillRow("Category:", "") : createBulletLi("");
      const mRow = masterListItem(row);
      row.after(sheetNew);
      if (mRow) mRow.after(isSkill ? createSkillRow("Category:", "") : createBulletLi(""));
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
    const skillLabelEmptyAtStart =
      isSkill &&
      editable.classList.contains("skill-label") &&
      !skillLabelBare(row) &&
      textIsEmpty(row.querySelector(".skill-value")) &&
      caretAtStart(editable);
    if (!(bulletEmpty || skillValueEmptyAtStart || skillLabelEmptyAtStart)) return;

    e.preventDefault();
    const siblings = [...list.children] as HTMLElement[];
    if (siblings.length <= 1) {
      if (isSkill) {
        const label = row.querySelector(".skill-label");
        const value = row.querySelector(".skill-value");
        if (label) label.textContent = "Category:";
        if (value) value.textContent = "";
        const mRow = masterListItem(row);
        if (mRow) {
          const a = mRow.querySelector(".skill-label");
          const b = mRow.querySelector(".skill-value");
          if (a) a.textContent = "Category:";
          if (b) b.textContent = "";
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
    if (mRow) mRow.remove();
    focusListRow(focusTarget, true);
    scheduleSave();
  }

  function paginate() {
    if (paginating) return;
    paginating = true;
    try {
      cleanupEmptyUnderlines(masterInner);
      const left = masterInner.querySelector(".left");
      const expHeadEl = masterInner.querySelector('[data-section="experience"] .section-head');
      const projHeadEl = masterInner.querySelector("#projectsSection .section-head");
      if (!left || !expHeadEl || !projHeadEl) return;

      const leftHTML = stripActions(left.outerHTML);
      const expHead = expHeadEl.outerHTML;
      const jobs = [...masterInner.querySelectorAll("#jobsList .job")].map((j) =>
        stripActions(j.outerHTML)
      );
      const projHead = projHeadEl.outerHTML;
      const projects = [...masterInner.querySelectorAll("#projectsList .project")].map((p) =>
        stripActions(p.outerHTML)
      );

      const probe = document.createElement("section");
      probe.className = "sheet";
      probe.style.cssText = "position:absolute;left:-10000px;top:0;visibility:hidden;";
      probe.innerHTML = `<div class="sheet-inner"></div>`;
      root.appendChild(probe);
      const probeInner = probe.querySelector(".sheet-inner")!;
      const usable = probeInner.clientHeight;

      const fits = (html: string) => {
        probeInner.innerHTML = html;
        probeInner.querySelectorAll(".section-actions").forEach((n) => {
          (n as HTMLElement).style.display = "none";
        });
        return probeInner.scrollHeight <= usable + 0.5;
      };

      const page1Grid = (jobSlice: string[], extraBelow = "") =>
        `<div class="grid">${leftHTML}<div class="right"><section class="section" data-section="experience">${expHead}<div id="jobsList">${jobSlice.join("")}</div></section></div></div>${extraBelow}`;

      let used = 0;
      for (; used < jobs.length; used++) {
        if (!fits(page1Grid(jobs.slice(0, used + 1)))) break;
      }
      if (used === 0 && jobs.length) used = 1;
      const page1Jobs = jobs.slice(0, used);
      let restJobs = jobs.slice(used);
      let restProjects = projects.slice();

      let page1Projects: string[] = [];
      if (restProjects.length) {
        const packed: string[] = [];
        for (let i = 0; i < restProjects.length; i++) {
          const trial = packed.concat([restProjects[i]]);
          const below = `<section class="section" data-section="projects">${projHead}<div id="projectsList">${trial.join("")}</div></section>`;
          if (fits(page1Grid(page1Jobs, below))) packed.push(restProjects[i]);
          else break;
        }
        page1Projects = packed;
        restProjects = restProjects.slice(packed.length);
      }

      const pages: { html: string }[] = [];
      let page1Html = page1Grid(page1Jobs);
      if (page1Projects.length) {
        page1Html += `<section class="section" data-section="projects">${projHead}<div id="projectsList">${page1Projects.join("")}</div></section>`;
      }
      pages.push({ html: page1Html });

      type Unit = { type: "job" | "project"; raw: string };
      const units: Unit[] = [];
      restJobs.forEach((j) => units.push({ type: "job", raw: j }));
      restProjects.forEach((p) => units.push({ type: "project", raw: p }));

      let idx = 0;
      while (idx < units.length) {
        let jobBucket: string[] = [];
        let projBucket: string[] = [];
        let expHeadOn = false;
        let projHeadOn = false;
        let count = 0;
        while (idx < units.length) {
          const u = units[idx];
          const nextJobs = jobBucket.slice();
          const nextProjs = projBucket.slice();
          let nextExp: boolean = expHeadOn;
          let nextProj: boolean = projHeadOn;
          if (u.type === "job") {
            nextExp = true;
            nextJobs.push(u.raw);
          } else {
            nextProj = true;
            nextProjs.push(u.raw);
          }
          let html = "";
          if (nextJobs.length)
            html += `<section class="section" data-section="experience">${nextExp ? expHead : ""}<div id="jobsList">${nextJobs.join("")}</div></section>`;
          if (nextProjs.length)
            html += `<section class="section" data-section="projects">${nextProj ? projHead : ""}<div id="projectsList">${nextProjs.join("")}</div></section>`;
          if (fits(html) || count === 0) {
            jobBucket = nextJobs;
            projBucket = nextProjs;
            expHeadOn = nextExp;
            projHeadOn = nextProj;
            idx++;
            count++;
            if (!fits(html) && count === 1) break;
          } else break;
        }
        let html = "";
        if (jobBucket.length)
          html += `<section class="section" data-section="experience">${expHeadOn ? expHead : ""}<div id="jobsList">${jobBucket.join("")}</div></section>`;
        if (projBucket.length)
          html += `<section class="section" data-section="projects">${projHeadOn ? projHead : ""}<div id="projectsList">${projBucket.join("")}</div></section>`;
        pages.push({ html });
      }

      probe.remove();

      const masterJobs = [...masterInner.querySelectorAll("#jobsList .job")];
      const masterProjects = [...masterInner.querySelectorAll("#projectsList .project")];
      const total = pages.length;
      sheetsEl.innerHTML = "";
      pages.forEach((p, i) => {
        const sheet = makeSheet(i + 1, total);
        const inner = sheet.querySelector(".sheet-inner")!;
        inner.innerHTML = p.html;
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
      const statusText =
        total === 1
          ? "1 A4 page · preview matches print size"
          : `${total} A4 pages · app preview = print layout`;
      if (statusEl) statusEl.textContent = statusText;
      options.onStatus?.(statusText);
    } finally {
      paginating = false;
    }
  }

  function schedulePaginate(force = false) {
    clearTimeout(pageTimer);
    pageTimer = setTimeout(() => {
      if (isEditingInSheets()) return;
      paginate();
    }, force ? 80 : 200);
  }

  function getState(): Omit<ResumeDraft, "savedAt"> {
    return {
      vars: { ...vars },
      html: masterInner.innerHTML,
      editMode,
    };
  }

  // Event wiring
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
    cleanupEmptyUnderlines(q("#master"));
    syncAllLinkHrefs(q("#master"));
    scheduleSave();
  };

  const onFocusOut = (e: FocusEvent) => {
    const leaving = (e.target as HTMLElement)?.closest?.("[contenteditable]");
    if (!leaving) return;
    setTimeout(() => {
      if (!isEditingInSheets()) schedulePaginate(true);
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
          li.textContent = "New bullet";
          mProj.querySelector(".project-bullets")?.appendChild(li);
        }
        if (act === "remove-project") mProj.remove();
      }
      scheduleSave();
      schedulePaginate(true);
      return;
    }

    const a = target.closest("#sheets a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const wantOpen = !editMode || e.metaKey || e.ctrlKey;
    if (!wantOpen) return;
    normalizeHrefFromText(a);
    const href = a.getAttribute("href");
    if (!href || href === "#" || href === "https://") return;
    e.preventDefault();
    e.stopPropagation();
    window.open(href, "_blank", "noopener");
  };

  const onResize = () => schedulePaginate();

  sheetsEl.addEventListener("input", onInput);
  sheetsEl.addEventListener("focusout", onFocusOut);
  sheetsEl.addEventListener("click", onClick, true);
  sheetsEl.addEventListener("keydown", handleListEditingKeys);
  window.addEventListener("resize", onResize);

  normalizeLegacyLinks(masterInner);
  applyCssVars();
  setEditMode(editMode);
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
      window.removeEventListener("resize", onResize);
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
      masterInner.querySelector("#skillsList")?.appendChild(createSkillRow("Category:", "Skill items"));
      scheduleSave();
      schedulePaginate();
    },
    addAward() {
      const li = document.createElement("li");
      li.contentEditable = "true";
      li.textContent = "New award / certification";
      masterInner.querySelector("#awardsList")?.appendChild(li);
      scheduleSave();
      schedulePaginate();
    },
    addProject() {
      masterInner.querySelector("#projectsList")?.insertAdjacentHTML("beforeend", projectTemplate());
      scheduleSave();
      schedulePaginate();
    },
    resetContent(html) {
      masterInner.innerHTML = html;
      normalizeLegacyLinks(masterInner);
      vars = { ...DEFAULT_VARS };
      applyCssVars();
      setEditMode(true);
      scheduleSave();
      schedulePaginate(true);
    },
    applyHtml(html) {
      masterInner.innerHTML = html;
      normalizeLegacyLinks(masterInner);
      scheduleSave();
      schedulePaginate(true);
    },
  };
}
