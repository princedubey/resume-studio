/**
 * JD overlay: Full-Stack React (TS) + Python FastAPI microservices on AWS.
 * Page 1 matches the user’s saved edits (role, summary, skills).
 * Experience / projects stay trimmed for a clean 2-page fit.
 */
export const JD_FULLSTACK_AWS_CONTENT = `
<header class="ats-header">
  <h1 class="name" contenteditable="true" data-key="name">PRINCE DUBEY</h1>
  <p class="role" contenteditable="true" data-key="role">Senior Software Engineer</p>
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
    <li contenteditable="true">Senior Software Engineer with 7+ years of experience across product-based companies and enterprise client engagements, leading technical discovery, stakeholder collaboration, solution architecture, and end-to-end product development.</li>
    <li contenteditable="true">Proven track record delivering scalable enterprise platforms and AI-powered solutions for Microsoft, Dow Jones, and Autodesk, bridging business and engineering teams to solve complex challenges and achieve measurable outcomes, including 40% lower API latency, 25% reduced operational costs, and 99.9% platform availability.</li>
  </ul>
</section>

<section class="section" data-section="skills" data-block="skills">
  <h2 class="section-title" contenteditable="true">Skills</h2>
  <ul class="skills" id="skillsList">
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Languages:</strong> <span class="skill-value" contenteditable="true">TypeScript, Python, JavaScript, Golang, C#, Java, SQL</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Front End:</strong> <span class="skill-value" contenteditable="true">React.js, Next.js, Vite, Vue.js, Shared Design Systems, Accessibility (a11y), Performance, Micro-frontends, Module Federation patterns, Component &amp; E2E Testing, Per-tenant Feature Flags</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Back End &amp; APIs:</strong> <span class="skill-value" contenteditable="true">Python FastAPI, Node.js, Express.js, .NET Core, Spring Boot, Golang Gin, REST, OpenAPI Contracts, API Versioning, Auth0 / OAuth / JWT, GraphQL, Microservices, Service Boundaries, Data Ownership</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Cloud:</strong> <span class="skill-value" contenteditable="true">Lambda, ECS Fargate, API Gateway, EventBridge, Step Functions, S3, SES, Secrets Manager, CloudWatch, IAM, EC2, Docker, Azure</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Database:</strong> <span class="skill-value" contenteditable="true">MySQL, DynamoDB, PostgreSQL, MongoDB, SQL Server, Schema Design, Query Optimization, Multi-tenant Data Isolation</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Infrastructure &amp; Quality:</strong> <span class="skill-value" contenteditable="true">AWS CDK, CloudFormation, CircleCI, GitHub Actions, Azure DevOps, SonarCloud, CI/CD, Containers</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Observability &amp; Ops:</strong> <span class="skill-value" contenteditable="true">OpenTelemetry, CloudWatch, Alerting, SLOs, Runbooks, Incident Follow-up</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AI / LLM:</strong> <span class="skill-value" contenteditable="true">OpenAI, Azure OpenAI, Azure AI Foundry, LangChain, LangGraph, RAG pipelines, Agentic AI, Generative AI, Prompt Engineering, Vector Search, Pinecone, Hugging Face, MCP, Claude</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Core Competencies:</strong> <span class="skill-value" contenteditable="true">Multi-tenancy, Feature-flag Rollouts, Technical Leadership, Mentoring, Production Ownership, Stakeholder Alignment</span></li>
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
        <li contenteditable="true">Own Microsoft MDX / Dream Demos delivery: React / TypeScript (Next.js) and Vue modules as independently deployable units with shared UI patterns, accessibility, and performance budgets.</li>
        <li contenteditable="true">Design Python FastAPI (plus Node.js / .NET) microservices with OpenAPI contracts, versioning, auth, and clear data ownership; sync REST plus async event-style boundaries with retries, idempotency, timeouts, and graceful degradation.</li>
        <li contenteditable="true">Ship RAG / agent pipelines (LangChain / LangGraph, Azure AI Foundry); use Claude daily for scaffolding, contracts/tests, and PR hardening; Azure DevOps CI/CD, Docker, and observability.</li>
        <li contenteditable="true">Cut API latency ~40% and cost ~25%; promoted to Lead Senior Software Engineer / Forward Deployed Engineer on the Microsoft engagement.</li>
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
        <li contenteditable="true">Led React / Next.js / Vue TypeScript front ends for high-traffic Dow Jones financial and news workflows with shared components and performance focus.</li>
        <li contenteditable="true">Built versioned REST / GraphQL microservices (Python FastAPI, .NET, Node.js, Golang) with owned MongoDB / PostgreSQL data; ~25% better backend performance and 99.9% uptime.</li>
        <li contenteditable="true">Delivered AI search / conversational features with FastAPI, OpenAI / Azure OpenAI, and LangChain; partnered on Agile release reviews, code review, and docs.</li>
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
        <li contenteditable="true">Built FastAPI and multi-language APIs (.NET, Node.js, Golang, Spring Boot) for Autodesk SaaS with auth, rate limiting, and stable REST / OpenAPI contracts.</li>
        <li contenteditable="true">Deployed on AWS (Lambda, API Gateway, EC2, S3, IAM, Secrets Manager) with Docker / ECS-Fargate-ready packaging; ~15% lower infra cost.</li>
        <li contenteditable="true">Shipped OpenAI / LangChain Function Apps; modeled MySQL / PostgreSQL / MongoDB with multi-client access, retries/timeouts, and CI/CD as everyday habits.</li>
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
        <li contenteditable="true">Shipped React / Next.js (TypeScript) and React Native UIs with Node.js / .NET backends; ~30% better app performance; 250+ third-party API integrations.</li>
        <li contenteditable="true">Configured MySQL / MongoDB / PostgreSQL for multi-client delivery; AWS (EC2, S3, Lambda) at ~99.9% uptime across marketplace and e-commerce workstreams.</li>
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
        <li contenteditable="true">Built and debugged full-stack features with React.js, Python, Java, Node.js, and SQL; supported production fixes with senior engineers.</li>
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
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer / Forward Deployed Engineer · Client: Microsoft</p>
      <ul class="project-bullets">
        <li contenteditable="true">Shipped independently deployable React / TypeScript (Next.js) demo modules with shared design-system components, a11y, and performance budgets.</li>
        <li contenteditable="true">Owned FastAPI / Node / .NET microservices with OpenAPI contracts and RAG / agent backends (LangChain, Azure OpenAI); failure-aware boundaries and Claude-assisted tests / PR review.</li>
        <li contenteditable="true">CI/CD + observability; ~40% lower API latency and ~25% lower operating cost across demo and customer environments.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">TypeScript, React, Next.js, Vite, Python, FastAPI, Node.js, .NET, OpenAPI, LangChain, Azure OpenAI, Docker, Azure DevOps, Claude</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.dowjones.com/professional/factiva/" target="_blank" rel="noopener" contenteditable="true">Dow Jones / Factiva Ecosystem | Full-Stack Search &amp; Microservice APIs</a>
        <span class="job-dates" contenteditable="true">Dec 2024 – Jun 2025</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer · Client: Dow Jones / News Corp / Wall Street Journal</p>
      <ul class="project-bullets">
        <li contenteditable="true">Delivered React / Next.js / Vue TypeScript front ends and FastAPI / polyglot microservices with versioned REST / GraphQL and owned SQL / MongoDB models.</li>
        <li contenteditable="true">Integrated GenAI search / summarization with LangChain; graceful degradation on timeouts; 99.9% uptime and ~25% backend gains.</li>
        <li contenteditable="true">Used LLM tooling for cross-service debugging, contract tests, and error-handling review before merge.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">TypeScript, React, Next.js, Vue, Python, FastAPI, Node.js, .NET, Golang, REST, GraphQL, OpenAPI, PostgreSQL, MongoDB, LangChain, Docker, CI/CD</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | AWS Microservices &amp; GenAI Workflow APIs</a>
        <span class="job-dates" contenteditable="true">Aug 2023 – Aug 2024</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Backend Engineer · Client: Autodesk (via Eruvaka Technologies)</p>
      <ul class="project-bullets">
        <li contenteditable="true">Shipped FastAPI GenAI / workflow services with auth, rate limiting, and OpenAPI REST; MySQL / PostgreSQL / MongoDB data ownership.</li>
        <li contenteditable="true">Ran on AWS Lambda, API Gateway, EC2, S3 with IAM / Secrets Manager; ECS/Fargate-ready containers; ~15% infra savings.</li>
        <li contenteditable="true">Multi-client config, retries/timeouts, CI/CD, CloudWatch logging, and short design docs for platform partners.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, AWS Lambda, API Gateway, ECS/Fargate, S3, IAM, Secrets Manager, CloudWatch, Docker, MySQL, PostgreSQL, MongoDB, OpenAPI, CI/CD, LangChain</span></p>
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
