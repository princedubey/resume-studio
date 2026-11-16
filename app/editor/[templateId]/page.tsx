import { notFound } from "next/navigation";
import { getTemplateEditor } from "@/templates/load";
import { getTemplateMeta } from "@/templates/registry";

type PageProps = {
  params: Promise<{ templateId: string }>;
};

export function generateStaticParams() {
  return [
    { templateId: "prince" },
    { templateId: "ats-onepage" },
    { templateId: "ats-twopage" },
    { templateId: "jd-ai-security" },
    { templateId: "jd-fullstack-aws" },
  ];
}

export default async function EditorPage({ params }: PageProps) {
  const { templateId } = await params;
  const meta = getTemplateMeta(templateId);
  if (!meta || meta.status !== "ready") notFound();

  const Editor = getTemplateEditor(templateId);
  if (!Editor) notFound();

  return <Editor templateId={templateId} />;
}
