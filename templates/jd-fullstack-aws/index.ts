import type { ComponentType } from "react";
import JdFullstackAwsEditor from "./JdFullstackAwsEditor";

export const jdFullstackAwsTemplate = {
  id: "jd-fullstack-aws",
  name: "JD — Full-Stack AWS Microservices",
  description:
    "Senior SWE 2-pager tuned for React/TS + FastAPI microservices on AWS (EventBridge, ECS, DynamoDB, Claude pairing).",
  status: "ready" as const,
  previewAccent: "#0b3d5c",
  Editor: JdFullstackAwsEditor as ComponentType<{ templateId?: string }>,
};

export { JD_FULLSTACK_AWS_CONTENT } from "./defaultContent";
export { default as JdFullstackAwsEditor } from "./JdFullstackAwsEditor";
