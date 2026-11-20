import type { ComponentType } from "react";
import JdGenaiFdeEditor from "./JdGenaiFdeEditor";

export const jdGenaiFdeTemplate = {
  id: "jd-genai-fde",
  name: "JD — GenAI FDE (Two Column)",
  description:
    "Two-column Prince layout for Senior AI Engineer (FDE) — GenAI, agents, RAG, Bedrock/AWS, customer-facing delivery.",
  status: "ready" as const,
  previewAccent: "#b45309",
  Editor: JdGenaiFdeEditor as ComponentType<{ templateId?: string }>,
};

export { JD_GENAI_FDE_CONTENT } from "./defaultContent";
export { default as JdGenaiFdeEditor } from "./JdGenaiFdeEditor";
