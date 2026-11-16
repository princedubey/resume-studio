import type { ComponentType } from "react";
import { atsOnepageTemplate } from "./ats-onepage";
import { atsTwopageTemplate } from "./ats-twopage";
import { jdAiSecurityTemplate } from "./jd-ai-security";
import { princeTemplate } from "./prince";

const editors: Record<string, ComponentType<{ templateId?: string }>> = {
  [princeTemplate.id]: princeTemplate.Editor,
  [atsOnepageTemplate.id]: atsOnepageTemplate.Editor,
  [atsTwopageTemplate.id]: atsTwopageTemplate.Editor,
  [jdAiSecurityTemplate.id]: jdAiSecurityTemplate.Editor,
};

export function getTemplateEditor(id: string) {
  return editors[id] || null;
}
