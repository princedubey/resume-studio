"use client";

import PrinceEditor from "../prince/PrinceEditor";
import { JD_GENAI_FDE_CONTENT } from "./defaultContent";

/** Two-column Prince layout tailored for Senior AI Engineer (FDE) — GenAI & Agentic Systems. */
export default function JdGenaiFdeEditor() {
  return (
    <PrinceEditor
      templateId="jd-genai-fde"
      defaultContent={JD_GENAI_FDE_CONTENT}
      panelSubtitle="Two-column resume for Senior AI Engineer (FDE) / GenAI & Agentic Systems. Titles stay Senior SWE + FDE; Bedrock, agents, RAG, AWS AI/ML, and customer-facing delivery are woven in. Use Reset content to reload the latest JD draft."
    />
  );
}
