"use client";

import AtsTwoEditor from "../ats-twopage/AtsTwoEditor";
import { JD_FULLSTACK_AWS_CONTENT } from "./defaultContent";

/** JD clone of the 2-page ATS engine — React/TS + FastAPI + AWS microservices. */
export default function JdFullstackAwsEditor() {
  return (
    <AtsTwoEditor
      templateId="jd-fullstack-aws"
      defaultContent={JD_FULLSTACK_AWS_CONTENT}
      panelSubtitle="Senior SWE 2-page resume tuned for React/TypeScript + Python FastAPI microservices on AWS. Core titles and stack stay; Vite, Auth0, EventBridge, ECS/Fargate, DynamoDB/Aurora, CDK, OpenTelemetry, multi-tenancy, and Claude-as-pairing are integrated naturally. Use Reset content to reload the latest draft."
    />
  );
}
