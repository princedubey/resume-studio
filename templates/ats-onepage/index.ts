import type { ComponentType } from "react";
import AtsEditor from "./AtsEditor";

export const atsOnepageTemplate = {
  id: "ats-onepage",
  name: "ATS One-Page Senior SWE",
  description:
    "Single-column, ATS-friendly one-pager packed with Senior Software Engineer keywords and your full stack.",
  status: "ready" as const,
  previewAccent: "#0f766e",
  Editor: AtsEditor as ComponentType<{ templateId?: string }>,
};

export { ATS_DEFAULT_CONTENT } from "./defaultContent";
export { default as AtsEditor } from "./AtsEditor";
