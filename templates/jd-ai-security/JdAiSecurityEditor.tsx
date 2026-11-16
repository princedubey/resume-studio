"use client";

import AtsTwoEditor from "../ats-twopage/AtsTwoEditor";
import { JD_AI_SECURITY_CONTENT } from "./defaultContent";

/** JD clone of the 2-page ATS engine — content tailored for AI Engineer – Security. */
export default function JdAiSecurityEditor() {
  return (
    <AtsTwoEditor
      templateId="jd-ai-security"
      defaultContent={JD_AI_SECURITY_CONTENT}
      panelSubtitle="Senior SWE 2-page resume tuned for this AI Security role. Core titles and stack stay; GenAI security, IAM/secrets, SIEM, and DevSecOps are integrated naturally. Use Reset content to reload the latest draft."
    />
  );
}
