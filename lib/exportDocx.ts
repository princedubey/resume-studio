import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
} from "docx";

function textOf(el: Element | null | undefined): string {
  return (el?.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Build a .docx from resume master HTML (ATS / Prince contenteditable markup).
 */
export async function buildResumeDocxBlob(html: string): Promise<Blob> {
  const root = document.createElement("div");
  root.innerHTML = html;
  root.querySelectorAll(".section-actions").forEach((n) => n.remove());

  const children: Paragraph[] = [];

  const name = textOf(root.querySelector(".name, [data-key='name'], h1"));
  if (name) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [
          new TextRun({ text: name.toUpperCase(), bold: true, size: 32, font: "Calibri" }),
        ],
      })
    );
  }

  const role = textOf(root.querySelector(".role, [data-key='role']"));
  if (role) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: role, bold: true, size: 22, font: "Calibri" })],
      })
    );
  }

  const contact = textOf(root.querySelector(".contact-line, .contact"));
  if (contact) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [new TextRun({ text: contact, size: 18, font: "Calibri" })],
      })
    );
  }

  const sectionTitle = (title: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 180, after: 80 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333", space: 4 },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          font: "Calibri",
        }),
      ],
    });

  const bodyPara = (text: string) =>
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text, size: 20, font: "Calibri" })],
    });

  const bullet = (text: string) =>
    new Paragraph({
      spacing: { after: 40 },
      indent: { left: 288 },
      children: [new TextRun({ text: `• ${text}`, size: 20, font: "Calibri" })],
    });

  root.querySelectorAll(".section").forEach((section) => {
    const title = textOf(section.querySelector(".section-title, h2"));
    if (title) children.push(sectionTitle(title));

    // Summary / body paragraphs
    section.querySelectorAll(":scope > .body-text, :scope > p.body-text").forEach((p) => {
      const t = textOf(p);
      if (t) children.push(bodyPara(t));
    });

    // Summary bullets / awards / certs / generic lists (not job/project nested)
    section.querySelectorAll(":scope > .summary-bullets > li, :scope > .awards > li, :scope > ul.awards > li").forEach((li) => {
      const t = textOf(li);
      if (t) children.push(bullet(t));
    });

    // Skills rows
    section.querySelectorAll(".skill-row").forEach((row) => {
      const label = textOf(row.querySelector(".skill-label"));
      const value = textOf(row.querySelector(".skill-value"));
      const line = [label, value].filter(Boolean).join(" ");
      if (line) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: label ? `${label} ` : "", bold: true, size: 20, font: "Calibri" }),
              new TextRun({ text: value, size: 20, font: "Calibri" }),
            ],
          })
        );
      }
    });

    // Jobs
    section.querySelectorAll(".job").forEach((job) => {
      const jobTitle = textOf(job.querySelector(".job-title"));
      const dates = textOf(job.querySelector(".job-dates"));
      const head = [jobTitle, dates].filter(Boolean).join("  |  ");
      if (head) {
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({ text: jobTitle, bold: true, size: 20, font: "Calibri" }),
              ...(dates
                ? [new TextRun({ text: `  |  ${dates}`, size: 18, font: "Calibri", color: "555555" })]
                : []),
            ],
          })
        );
      }
      const company = textOf(job.querySelector(".company"));
      const meta = textOf(job.querySelector(".company-line .meta, .meta"));
      const companyLine = [company, meta].filter(Boolean).join(" ");
      if (companyLine) children.push(bodyPara(companyLine));
      job.querySelectorAll(".job-bullets li").forEach((li) => {
        const t = textOf(li);
        if (t) children.push(bullet(t));
      });
    });

    // Projects
    section.querySelectorAll(".project").forEach((project) => {
      const pname = textOf(project.querySelector(".project-name"));
      const dates = textOf(project.querySelector(".job-dates"));
      if (pname) {
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({ text: pname, bold: true, size: 20, font: "Calibri" }),
              ...(dates
                ? [new TextRun({ text: `  |  ${dates}`, size: 18, font: "Calibri", color: "555555" })]
                : []),
            ],
          })
        );
      }
      const meta = textOf(project.querySelector(".project-meta"));
      if (meta) children.push(bodyPara(meta));
      project.querySelectorAll(".project-bullets li").forEach((li) => {
        const t = textOf(li);
        if (t) children.push(bullet(t));
      });
      const tech = textOf(project.querySelector(".tech-stack"));
      if (tech) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: tech, italics: true, size: 18, font: "Calibri" })],
          })
        );
      }
    });

    // Education
    section.querySelectorAll(".edu-block").forEach((edu) => {
      const degree = textOf(edu.querySelector(".edu-degree"));
      const dates = textOf(edu.querySelector(".job-dates"));
      if (degree) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: degree, bold: true, size: 20, font: "Calibri" }),
              ...(dates
                ? [new TextRun({ text: `  |  ${dates}`, size: 18, font: "Calibri", color: "555555" })]
                : []),
            ],
          })
        );
      }
      const school = textOf(edu.querySelector(".edu-school"));
      const meta = textOf(edu.querySelector(".meta"));
      const line = [school, meta].filter(Boolean).join(" ");
      if (line) children.push(bodyPara(line));
    });

    // Fallback: any remaining top-level list items in section not already handled
    if (
      !section.querySelector(".job, .project, .skill-row, .summary-bullets, .awards, .edu-block")
    ) {
      section.querySelectorAll(":scope > ul > li").forEach((li) => {
        const t = textOf(li);
        if (t) children.push(bullet(t));
      });
    }
  });

  if (children.length === 0) {
    children.push(bodyPara("Resume content is empty."));
  }

  const doc = new Document({
    creator: "Resume Studio",
    title: name || "Resume",
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 }, // 0.5"
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export async function downloadResumeDocx(html: string, fileBaseName: string) {
  const blob = await buildResumeDocxBlob(html);
  const safe = (fileBaseName || "resume").replace(/[^\w\-]+/g, "_").replace(/_+/g, "_");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safe}.docx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
