import type { ComponentType } from "react";
import AtsTwoEditor from "./AtsTwoEditor";

export const atsTwopageTemplate = {
  id: "ats-twopage",
  name: "ATS Detailed 2-Page Senior SWE",
  description:
    "Two-page, ATS-optimized Senior Software Engineer resume with full experience, projects, and keyword density for higher parse scores.",
  status: "ready" as const,
  previewAccent: "#1e3a5f",
  Editor: AtsTwoEditor as ComponentType<{ templateId?: string }>,
};

export { ATS_TWO_DEFAULT_CONTENT } from "./defaultContent";
export { default as AtsTwoEditor } from "./AtsTwoEditor";
export type { AtsTwoEditorProps } from "./AtsTwoEditor";
