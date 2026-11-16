/**
 * JD overlay: Full-Stack React (TS) + Python FastAPI microservices on AWS.
 * Keeps Senior SWE titles, companies, and core stack. Layers missing JD tech
 * (Vite, Auth0, EventBridge, ECS Fargate, DynamoDB/Aurora, CDK, CircleCI,
 * OpenTelemetry, multi-tenancy, Claude-as-pairing) into skills, bullets, projects.
 */
export const JD_FULLSTACK_AWS_CONTENT = `
<header class="ats-header">
  <h1 class="name" contenteditable="true" data-key="name">PRINCE DUBEY</h1>
  <p class="role" contenteditable="true" data-key="role">Senior Software Engineer | Forward Deployed Engineer | Full-Stack · AI · Cloud</p>
  <p class="contact-line">
    <a class="contact-link" href="mailto:princedubey1998@gmail.com" contenteditable="true" data-key="email">princedubey1998@gmail.com</a>
    <span aria-hidden="true"> · </span>
    <a class="contact-link" href="tel:+916203720899" contenteditable="true" data-key="phone">+91 6203720899</a>
    <span aria-hidden="true"> · </span>
    <a class="contact-link" href="https://www.linkedin.com/in/princedubey1998" target="_blank" rel="noopener" contenteditable="true" data-key="linkedin">linkedin.com/in/princedubey1998</a>
    <span aria-hidden="true"> · </span>
    <a class="contact-link" href="https://github.com/princedubey" target="_blank" rel="noopener" contenteditable="true" data-key="github">github.com/princedubey</a>
    <span aria-hidden="true"> · </span>
    <span contenteditable="true" data-key="location">Hyderabad, India</span>
  </p>
</header>

<section class="section" data-section="summary" data-block="summary">
  <h2 class="section-title" contenteditable="true">Professional Summary</h2>
  <ul class="summary-bullets">
    <li contenteditable="true">Forward Deployed Senior Software Engineer with 7+ years shipping production full-stack systems — React / TypeScript UIs and Python FastAPI (and Node.js / .NET) microservices — for Microsoft, Dow Jones / News Corp / Wall Street Journal, and Autodesk.</li>
    <li contenteditable="true">Design independently deployable front-end modules and clear service boundaries: OpenAPI / REST contracts, versioning, authentication, owned data stores, and sync REST plus async event patterns; engineer for failure with retries, idempotency, timeouts, and graceful degradation.</li>
    <li contenteditable="true">Hands-on AWS (Lambda, API Gateway, ECS / Fargate-style container delivery, S3, Secrets Manager, CloudWatch) plus DynamoDB and MySQL / Aurora-class relational modeling; CI/CD, containers, observability, and Claude / LLM tools as a daily pairing partner for scaffolding, tests, PR review, and incident write-ups.</li>
    <li contenteditable="true">Deliver measurable outcomes: up to 40% lower API latency, 25% lower operating cost, ~15% infrastructure savings, and 99.9% uptime while mentoring, reviewing code, and documenting designs for the team.</li>
  </ul>
</section>

<section class="section" data-section="skills" data-block="skills">
  <h2 class="section-title" contenteditable="true">Skills</h2>
  <ul class="skills" id="skillsList">
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Languages:</strong> <span class="skill-value" contenteditable="true">TypeScript, Python, JavaScript, Go (Golang), C#, Java, SQL</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Front End:</strong> <span class="skill-value" contenteditable="true">React.js, Next.js, Vite, Vue.js, React Native, Shared Design Systems, Accessibility (a11y), Performance, Micro-frontends / Module Federation patterns, Component &amp; E2E Testing, Per-tenant Feature Flags</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Back End &amp; APIs:</strong> <span class="skill-value" contenteditable="true">Python FastAPI, Node.js, Express.js, .NET Core, Spring Boot, Golang Gin, REST, OpenAPI Contracts, API Versioning, Auth0 / OAuth / JWT, GraphQL, Microservices, Service Boundaries, Data Ownership</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Microservices &amp; Messaging:</strong> <span class="skill-value" contenteditable="true">Service Decomposition, Synchronous REST, Asynchronous Events, EventBridge, Event-driven Design, Retries, Idempotency, Timeouts, Circuit Breakers, Graceful Degradation, Eventual Consistency</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AWS &amp; Cloud:</strong> <span class="skill-value" contenteditable="true">Lambda, ECS Fargate, API Gateway, EventBridge, Step Functions, S3, SES, Secrets Manager, CloudWatch, IAM, EC2, Docker, Azure</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Data:</strong> <span class="skill-value" contenteditable="true">MySQL / Aurora, DynamoDB (single-table patterns), PostgreSQL, MongoDB, SQL Server, Schema Design, Query Optimization, Multi-tenant Data Isolation</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Infrastructure &amp; Quality:</strong> <span class="skill-value" contenteditable="true">AWS CDK, CloudFormation, CircleCI, GitHub Actions, Azure DevOps, SonarCloud, Automated Tests, CI/CD, Containers, Code Review, Design Docs</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Observability &amp; Ops:</strong> <span class="skill-value" contenteditable="true">OpenTelemetry, Logs / Metrics / Traces, CloudWatch, Alerting, SLOs, Runbooks, Incident Follow-up</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AI / LLM (daily workflow):</strong> <span class="skill-value" contenteditable="true">Claude, OpenAI, Azure OpenAI, LangChain, LangGraph, RAG, Agentic AI, Prompt Engineering — used for scaffolding, API contracts, tests, PR hardening, log/incident summarization, and React prototyping</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Core Competencies:</strong> <span class="skill-value" contenteditable="true">Multi-tenancy, Feature-flag Rollouts, Technical Leadership, Mentoring, Production Ownership, Stakeholder Alignment, Marketplace / E-commerce Domains</span></li>
  </ul>
</section>

<section class="section" data-section="experience">
  <h2 class="section-title" contenteditable="true">Work Experience</h2>
  <div id="jobsList">
    <article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Senior Software Engineer / Forward Deployed Engineer</h3>
        <span class="job-dates" contenteditable="true">Jun 2025 – Present</span>
      </div>
      <p class="company-line"><a class="company" href="https://www.microsoft.com" target="_blank" rel="noopener" contenteditable="true">WaferWire Cloud Technologies (Microsoft)</a> <span class="meta" contenteditable="true">| Redmond, WA, United States · Remote / India</span></p>
      <ul class="job-bullets">
        <li contenteditable="true">Own architecture and delivery for Microsoft MDX / Dream Demos platforms: ship React / TypeScript (Next.js) and Vue modules as independently deployable demo units with shared UI patterns, accessibility, and performance budgets.</li>
        <li contenteditable="true">Design and run Python FastAPI (plus Node.js / .NET) microservices with clear OpenAPI contracts, versioning, authentication, and well-defined data ownership across MongoDB / PostgreSQL stores.</li>
        <li contenteditable="true">Draw service boundaries for RAG / agent backends — sync REST for request paths and async / event-style handoffs where services must stay loosely coupled; apply retries, idempotency, timeouts, and graceful degradation on LLM and API layers.</li>
        <li contenteditable="true">Build end-to-end RAG and agent pipelines with LangChain / LangGraph and Azure AI Foundry; use Claude and other LLMs daily to scaffold services, draft contracts/tests, harden PRs, and summarize operational issues.</li>
        <li contenteditable="true">Run what we ship: Azure DevOps CI/CD, Docker packaging, observability and cost/latency dashboards; mentor engineers, review code, and write short design notes for reusable accelerators.</li>
        <li contenteditable="true">Improve production KPIs — ~40% lower API latency and ~25% lower operating cost — while sustaining high reliability for partner and customer demo environments.</li>
        <li contenteditable="true">Promoted for technical ownership; recognized as Lead Senior Software Engineer / Forward Deployed Engineer on Microsoft client engagement.</li>
      </ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>

    <article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Senior Software Engineer</h3>
        <span class="job-dates" contenteditable="true">Aug 2024 – Jun 2025</span>
      </div>
      <p class="company-line"><a class="company" href="https://www.techmahindra.com" target="_blank" rel="noopener" contenteditable="true">Tech Mahindra (Dow Jones / News Corp / Wall Street Journal)</a> <span class="meta" contenteditable="true">| Hyderabad, India · Remote</span></p>
      <ul class="job-bullets">
        <li contenteditable="true">Led React.js / Next.js / Vue.js TypeScript front ends for high-traffic Dow Jones financial and news workflows — admin and user-facing modules with shared components and performance focus.</li>
        <li contenteditable="true">Designed scalable REST / GraphQL microservices in Python (FastAPI), .NET Core, Node.js, Golang, and TypeScript with API versioning, auth, and clear ownership of MongoDB / PostgreSQL / SQL data; improved backend performance ~25%.</li>
        <li contenteditable="true">Engineered AI-powered search and conversational features with FastAPI, OpenAI / Azure OpenAI, LangChain, and vector databases — treating LLM tools as part of the delivery loop for contracts, tests, and debugging across services.</li>
        <li contenteditable="true">Sustained 99.9% uptime with caching, query tuning, and failure-aware API design (timeouts, validation, least-privilege access) for licensed content and GenAI retrieval paths.</li>
        <li contenteditable="true">Partnered with Agile release trains on demos, acceptance reviews, code review, and documentation that shortened feedback loops across distributed teams.</li>
      </ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>

    <article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Backend Engineer</h3>
        <span class="job-dates" contenteditable="true">Jan 2023 – Aug 2024</span>
      </div>
      <p class="company-line"><a class="company" href="https://www.eruvaka.com" target="_blank" rel="noopener" contenteditable="true">Eruvaka Technologies Pvt. Ltd. (Autodesk)</a> <span class="meta" contenteditable="true">| Hyderabad, India · Hybrid</span></p>
      <ul class="job-bullets">
        <li contenteditable="true">Designed and maintained Python FastAPI and multi-language APIs (.NET Core, Node.js / Express, Golang, Java / Spring Boot) for Autodesk SaaS workloads with authentication, rate limiting, and stable REST contracts.</li>
        <li contenteditable="true">Deployed on AWS — Lambda, API Gateway, EC2, S3, IAM, Secrets Manager — with Docker packaging; reduced infrastructure cost ~15% while improving scalable delivery (ECS / Fargate-ready container patterns).</li>
        <li contenteditable="true">Built AI-powered Function Apps with FastAPI, OpenAI, and LangChain for automated processing; modeled data across MySQL, PostgreSQL, and MongoDB with secure multi-client access patterns.</li>
        <li contenteditable="true">Practiced service decomposition and failure handling on cloud APIs (retries, idempotent writes where needed, timeouts); CI/CD and automated checks as everyday habits.</li>
        <li contenteditable="true">Documented API contracts and operational notes; collaborated with platform teams so front-end and service ownership stayed clear.</li>
      </ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>

    <article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Full Stack Developer</h3>
        <span class="job-dates" contenteditable="true">Sep 2020 – Jan 2023</span>
      </div>
      <p class="company-line"><a class="company" href="https://www.google.com/search?q=King+of+Digital+Marketing+Pvt+Ltd" target="_blank" rel="noopener" contenteditable="true">King of Digital Marketing Pvt. Ltd.</a> <span class="meta" contenteditable="true">| New Delhi, India · Hybrid</span></p>
      <ul class="job-bullets">
        <li contenteditable="true">Built production React / Next.js (TypeScript) and React Native UIs plus Node.js / .NET / Java / Golang backends; improved application performance ~30%.</li>
        <li contenteditable="true">Integrated 250+ third-party APIs; configured MySQL, MongoDB, and PostgreSQL for multi-client (multi-tenant-style) delivery with per-client configuration.</li>
        <li contenteditable="true">Deployed on AWS (EC2, S3, Lambda) with high-availability practices achieving ~99.9% uptime; reusable front-end/back-end patterns across marketplace and e-commerce workstreams.</li>
        <li contenteditable="true">Raised team quality through shared components, code review, and documenting patterns before inventing new ones.</li>
      </ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>

    <article class="job" data-block="job">
      <div class="job-head">
        <h3 class="job-title" contenteditable="true">Software Developer Intern</h3>
        <span class="job-dates" contenteditable="true">Nov 2019 – Jul 2020</span>
      </div>
      <p class="company-line"><a class="company" href="https://www.google.com/search?q=DevWebOIC+Tech+Solution" target="_blank" rel="noopener" contenteditable="true">DevWebOIC Tech Solution</a> <span class="meta" contenteditable="true">| New Delhi, India · Onsite</span></p>
      <ul class="job-bullets">
        <li contenteditable="true">Built and debugged full-stack features using React.js, Python, Java, Node.js, and SQL with senior engineers.</li>
        <li contenteditable="true">Supported production issue resolution and feature delivery across web application workstreams.</li>
      </ul>
      <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
    </article>
  </div>
</section>

<section class="section" data-section="projects" id="projectsSection">
  <h2 class="section-title" contenteditable="true">Projects</h2>
  <div id="projectsList">
    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://partner.microsoft.com/en-us/asset/collection/industry-dream-demos-and-dream-demo-in-a-box" target="_blank" rel="noopener" contenteditable="true">Microsoft Dream Demos / MDX | React Modules &amp; FastAPI AI Services</a>
        <span class="job-dates" contenteditable="true">Jun 2025 – Present</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer / Forward Deployed Engineer · Client: Microsoft Partner / Industry Solutions</p>
      <ul class="project-bullets">
        <li contenteditable="true">Shipped independently deployable React / TypeScript (Next.js) and Vue demo modules with shared design-system components, accessibility, and performance budgets for industry Data &amp; AI walkthroughs.</li>
        <li contenteditable="true">Owned Python FastAPI and Node.js / .NET microservices with OpenAPI-style contracts, auth, versioning, and clear data ownership for RAG / agent backends on Azure OpenAI / AI Foundry + LangChain / LangGraph.</li>
        <li contenteditable="true">Defined service boundaries between UI, orchestration, and retrieval services; applied retries, idempotent job patterns, timeouts, and graceful degradation when LLM or downstream APIs failed.</li>
        <li contenteditable="true">Used Claude daily to draft scaffolding, API contracts, unit/contract tests, and PR self-reviews; wired CI/CD, Docker, logs/metrics, and runbook-style notes for reusable accelerators.</li>
        <li contenteditable="true">Cut API latency ~40% and operating cost ~25% via caching, context optimization, and observability-driven tuning across demo and customer environments.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">TypeScript, React, Next.js, Vite patterns, Python, FastAPI, Node.js, .NET, OpenAPI / REST, LangChain, Azure OpenAI, Docker, Azure DevOps CI/CD, Claude, Observability</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.dowjones.com/professional/factiva/" target="_blank" rel="noopener" contenteditable="true">Dow Jones / Factiva Ecosystem | Full-Stack Search &amp; Microservice APIs</a>
        <span class="job-dates" contenteditable="true">Dec 2024 – Jun 2025</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer · Client: Dow Jones / News Corp / Wall Street Journal</p>
      <ul class="project-bullets">
        <li contenteditable="true">Delivered React / Next.js / Vue TypeScript front ends for financial intelligence workflows — high-read UX with shared components and careful performance on large result sets.</li>
        <li contenteditable="true">Built Python FastAPI and polyglot microservices (Node.js, .NET, Golang) exposing versioned REST / GraphQL APIs with auth, validation, and owned MongoDB / PostgreSQL / SQL data models.</li>
        <li contenteditable="true">Integrated GenAI search / summarization over licensed news with LangChain and vector retrieval; designed failure modes so retrieval timeouts and bad model outputs degrade gracefully.</li>
        <li contenteditable="true">Sustained 99.9% uptime and ~25% backend gains through query/caching work, automated tests in the delivery pipeline, and code review / design notes across Agile trains.</li>
        <li contenteditable="true">Used LLM tooling to explore cross-service request paths, draft contract tests, and tighten error handling before human review.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">TypeScript, React, Next.js, Vue, Python, FastAPI, Node.js, .NET, Golang, REST, GraphQL, OpenAPI, PostgreSQL, MongoDB, LangChain, Docker, CI/CD, Claude / OpenAI</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | AWS Microservices &amp; GenAI Workflow APIs</a>
        <span class="job-dates" contenteditable="true">Aug 2023 – Aug 2024</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Backend Engineer · Client: Autodesk (via Eruvaka Technologies)</p>
      <ul class="project-bullets">
        <li contenteditable="true">Shipped FastAPI GenAI and workflow services with authentication, rate limiting, OpenAPI-friendly REST contracts, and owned MySQL / PostgreSQL / MongoDB data — plus .NET / Node / Golang companions where needed.</li>
        <li contenteditable="true">Ran workloads on AWS Lambda, API Gateway, EC2, and S3 with IAM and Secrets Manager; containerized for ECS / Fargate-style promotion; cut infra cost ~15%.</li>
        <li contenteditable="true">Modeled multi-client configuration and secure data access; applied retries/timeouts on third-party and LLM calls so one bad dependency did not take down the path.</li>
        <li contenteditable="true">Automated tests and CI/CD for services; CloudWatch-oriented logging for operations; short design docs and API notes for front-end and platform partners.</li>
        <li contenteditable="true">Prototyped and refined integrations with OpenAI / LangChain while reviewing PRs for error handling and isolation gaps before merge.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, AWS Lambda, API Gateway, ECS/Fargate patterns, S3, IAM, Secrets Manager, CloudWatch, Docker, MySQL, PostgreSQL, MongoDB, OpenAPI, REST, CI/CD, OpenAI, LangChain</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
  </div>
</section>

<section class="section" data-section="education" data-block="education">
  <h2 class="section-title" contenteditable="true">Education</h2>
  <div class="edu-block">
    <div class="job-head">
      <p class="edu-degree" contenteditable="true">Bachelor of Computer Applications (BCA) — Computer Science</p>
      <span class="job-dates" contenteditable="true">2015 – 2018</span>
    </div>
    <p class="company-line"><a class="edu-school" href="https://www.magadhuniversity.ac.in" target="_blank" rel="noopener" contenteditable="true">Magadh University</a> <span class="meta" contenteditable="true">| Aurangabad, Bihar · First Division · 75%</span></p>
  </div>
</section>

<section class="section" data-section="achievements" data-block="achievements">
  <h2 class="section-title" contenteditable="true">Certifications &amp; Achievements</h2>
  <ul class="awards" id="awardsList">
    <li contenteditable="true">AWS Certified Solutions Architect</li>
    <li contenteditable="true">Microsoft Azure Fundamentals (AZ-900)</li>
    <li contenteditable="true">Claude Certified Architect</li>
    <li contenteditable="true">Promoted to Lead Senior Software Engineer / Forward Deployed Engineer on Microsoft engagement at WaferWire.</li>
    <li contenteditable="true">Google Summer of Code (GSoC) 2019 Contributor</li>
    <li contenteditable="true">Hackathon Winner | Delivered high-traffic production systems focused on performance and scalability</li>
  </ul>
</section>
`.trim();
