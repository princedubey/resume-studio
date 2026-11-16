export type TemplateStatus = "ready" | "coming_soon";

export type TemplateMeta = {
  id: string;
  name: string;
  description: string;
  status: TemplateStatus;
  previewAccent: string;
};

export const TEMPLATE_CATALOG: TemplateMeta[] = [
  {
    id: "prince",
    name: "Prince — Two Column A4",
    description:
      "Two-column A4 resume with Source Sans, categorized skills, and print-matched pagination.",
    status: "ready",
    previewAccent: "#1f4e79",
  },
  {
    id: "ats-onepage",
    name: "ATS One-Page Senior SWE",
    description:
      "Single-column, ATS-friendly one-pager packed with Senior Software Engineer keywords and your stack.",
    status: "ready",
    previewAccent: "#0f766e",
  },
  {
    id: "ats-twopage",
    name: "ATS Detailed 2-Page Senior SWE",
    description:
      "Two-page ATS resume with full experience, projects, and keyword density for higher parse scores.",
    status: "ready",
    previewAccent: "#1e3a5f",
  },
  {
    id: "jd-ai-security",
    name: "JD — AI Engineer Security",
    description:
      "Your Senior SWE 2-pager with AI Security JD keywords layered in (guardrails, LLM threats, IAM, SIEM) — titles and core stack unchanged.",
    status: "ready",
    previewAccent: "#7f1d1d",
  },
  {
    id: "jd-fullstack-aws",
    name: "JD — Full-Stack AWS Microservices",
    description:
      "Senior SWE 2-pager for React/TS + FastAPI microservices on AWS (Vite, EventBridge, ECS, DynamoDB, Auth0, Claude pairing).",
    status: "ready",
    previewAccent: "#0b3d5c",
  },
  {
    id: "classic-serif",
    name: "Classic Serif",
    description: "Single-column editorial layout — coming soon.",
    status: "coming_soon",
    previewAccent: "#2c2c2c",
  },
];

/** @deprecated use TEMPLATE_CATALOG */
export const templates = TEMPLATE_CATALOG;

export function getTemplateMeta(id: string): TemplateMeta | undefined {
  return TEMPLATE_CATALOG.find((t) => t.id === id);
}

/** @deprecated use getTemplateMeta */
export function getTemplate(id: string): TemplateMeta | undefined {
  return getTemplateMeta(id);
}
