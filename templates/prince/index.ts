import type { ComponentType } from "react";
import PrinceEditor from "./PrinceEditor";

export type TemplateModule = {
  id: string;
  name: string;
  description: string;
  status: "ready" | "coming_soon";
  previewAccent: string;
  Editor: ComponentType<{ templateId?: string }>;
};

export const princeTemplate: TemplateModule = {
  id: "prince",
  name: "Prince — Two Column A4",
  description:
    "Two-column A4 resume with Source Sans, categorized skills, and print-matched pagination.",
  status: "ready",
  previewAccent: "#1f4e79",
  Editor: PrinceEditor as ComponentType<{ templateId?: string }>,
};

export { PRINCE_DEFAULT_CONTENT } from "./defaultContent";
export { default as PrinceEditor } from "./PrinceEditor";
export type { PrinceEditorProps } from "./PrinceEditor";
