import type { ComponentType } from "react";
import JdAiSecurityEditor from "./JdAiSecurityEditor";

export const jdAiSecurityTemplate = {
  id: "jd-ai-security",
  name: "JD — AI Engineer Security",
  description:
    "2-page ATS resume tailored for AI Engineer – Security / GenAI · LLM Security (from your detailed resume + this JD).",
  status: "ready" as const,
  previewAccent: "#7f1d1d",
  Editor: JdAiSecurityEditor as ComponentType<{ templateId?: string }>,
};

export { JD_AI_SECURITY_CONTENT } from "./defaultContent";
export { default as JdAiSecurityEditor } from "./JdAiSecurityEditor";
