/**
 * Two-column (Prince) JD overlay for Senior AI Engineer (FDE) — GenAI & Agentic Systems.
 * Keeps Senior SWE / FDE identity; layers Bedrock, agents, RAG, AWS AI/ML, customer-facing FDE.
 * Content densified from other resumes so page 2 (projects) fills cleanly.
 */
export const JD_GENAI_FDE_CONTENT = `
<div class="grid">
  <div class="left" id="masterLeft">
    <h1 class="name" contenteditable="true" data-key="name">PRINCE DUBEY</h1>
    <p class="role" contenteditable="true" data-key="role">Senior Software Engineer | Forward Deployed Engineer</p>
    <div class="contacts">
      <div class="contact">
        <span class="icon"><svg viewBox="0 0 12 12"><rect x="1.5" y="2.5" width="9" height="7" rx="0.5"/><path d="M1.5 3.5 L6 7 L10.5 3.5"/></svg></span>
        <a class="contact-link" href="mailto:princedubey1998@gmail.com" contenteditable="true" data-key="email">princedubey1998@gmail.com</a>
      </div>
      <div class="contact">
        <span class="icon"><svg viewBox="0 0 12 12"><rect x="3.5" y="1.5" width="5" height="9" rx="1"/></svg></span>
        <a class="contact-link" href="tel:+916203720899" contenteditable="true" data-key="phone">+91 6203720899</a>
      </div>
      <div class="contact">
        <span class="icon"><svg viewBox="0 0 12 12"><path d="M6 1.5 C8.2 1.5 9.8 3.4 9.8 5.4 C9.8 8 6 10.5 6 10.5 C6 10.5 2.2 8 2.2 5.4 C2.2 3.4 3.8 1.5 6 1.5 Z"/><circle cx="6" cy="5.2" r="1.2"/></svg></span>
        <span contenteditable="true" data-key="location">Hyderabad / Bengaluru, India</span>
      </div>
      <div class="contact">
        <span class="icon"><svg viewBox="0 0 12 12"><text x="2.2" y="9" font-size="7" font-family="Source Sans 3, sans-serif" fill="#111" stroke="none" font-weight="700">in</text></svg></span>
        <a class="contact-link" href="https://www.linkedin.com/in/princedubey1998" target="_blank" rel="noopener" contenteditable="true" data-key="linkedin">linkedin.com/in/princedubey1998</a>
      </div>
      <div class="contact">
        <span class="icon"><svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4"/><circle cx="4.7" cy="5.5" r="0.5" fill="#111" stroke="none"/><circle cx="7.3" cy="5.5" r="0.5" fill="#111" stroke="none"/></svg></span>
        <a class="contact-link" href="https://github.com/princedubey" target="_blank" rel="noopener" contenteditable="true" data-key="github">github.com/princedubey</a>
      </div>
    </div>

    <section class="section" data-section="summary">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><circle cx="6" cy="4" r="2"/><path d="M2.5 10 C2.5 7.8 9.5 7.8 9.5 10"/></svg></span>
        <span class="title" contenteditable="true">Summary</span>
        <span class="rule"></span>
      </div>
      <p class="body-text" contenteditable="true" data-key="summary">Forward Deployed Senior Software Engineer with 7+ years embedding with customers to turn business problems into production GenAI and agentic systems — discovery → architecture → working code. Hands-on with LLMs (Claude, GPT, Llama), RAG, multi-agent orchestration, React/Next.js, and Python/Node on AWS (Bedrock, SageMaker, Lambda, ECS/EKS) and Azure. Outcomes across Microsoft, Dow Jones, and Autodesk: ~40% lower API latency, ~25% lower cost, 99.9% availability; field patterns fed back into reusable accelerators.</p>
    </section>

    <section class="section" data-section="skills">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><path d="M2 10 L7 5"/><circle cx="8.5" cy="3.5" r="1.6"/></svg></span>
        <span class="title" contenteditable="true">Technical Skills</span>
        <span class="rule"></span>
      </div>
      <ul class="skills" id="skillsList">
        <li class="skill-row"><strong class="skill-label" contenteditable="true">GenAI &amp; Agents:</strong> <span class="skill-value" contenteditable="true">Claude, GPT, Llama, Prompt Engineering, RAG (ingest → chunk → embed → retrieve → rerank → eval), Fine-tuning basics, LangGraph, LangChain, CrewAI, Strands, Bedrock Agents, MCP, Multi-agent Orchestration, Tool Use, Memory, Planning, Guardrails, Human-in-the-loop, Evals</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Languages:</strong> <span class="skill-value" contenteditable="true">Python, TypeScript, JavaScript, Go (Golang), C#, Java, SQL</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Full-Stack:</strong> <span class="skill-value" contenteditable="true">React, Next.js, Vue.js, Node.js, FastAPI, .NET Core, Express, Spring Boot / Gin, REST, GraphQL, OpenAPI, Microservices, Docker</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">AWS AI / Cloud:</strong> <span class="skill-value" contenteditable="true">Bedrock, SageMaker, Lambda, ECS/EKS, API Gateway, Step Functions, DynamoDB, OpenSearch, S3, IAM, EC2, Secrets Manager, CloudWatch, Well-Architected, Serverless, Networking</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Data:</strong> <span class="skill-value" contenteditable="true">PostgreSQL, MongoDB, MySQL, DynamoDB, Pinecone, Vector Search, Schema Design, Query Optimization</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Production:</strong> <span class="skill-value" contenteditable="true">Observability, Cost &amp; Latency Tuning, CI/CD, Azure DevOps, GitHub Actions, CDK / Terraform, LLMOps, Azure OpenAI / AI Foundry</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Delivery:</strong> <span class="skill-value" contenteditable="true">Customer Discovery, Stakeholder Alignment, Technical Leadership, Mentoring, Cross-team Architecture, Production Ownership</span></li>
      </ul>
    </section>

    <section class="section" data-section="achievements">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="2.2" fill="#111" stroke="none"/></svg></span>
        <span class="title" contenteditable="true">Achievements</span>
        <span class="rule"></span>
      </div>
      <p class="subhead" contenteditable="true">Awards &amp; Certifications</p>
      <ul class="awards" id="awardsList">
        <li contenteditable="true">AWS Certified Solutions Architect</li>
        <li contenteditable="true">Microsoft Azure Fundamentals (AZ-900)</li>
        <li contenteditable="true">Claude Certified Architect</li>
        <li contenteditable="true">Promoted Lead FDE on Microsoft GenAI engagement</li>
        <li contenteditable="true">GSoC 2019 Contributor | Hackathon Winner</li>
        <li contenteditable="true">Shipped high-traffic systems focused on performance &amp; scale</li>
      </ul>
    </section>

    <section class="section" data-section="education">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><path d="M1.5 6 L6 3.5 L10.5 6 L6 8.5 Z" fill="#111" stroke="none"/></svg></span>
        <span class="title" contenteditable="true">Education</span>
        <span class="rule"></span>
      </div>
      <p class="edu-degree" contenteditable="true">Bachelor of Computer Applications (BCA)</p>
      <a class="edu-school" href="https://www.magadhuniversity.ac.in" target="_blank" rel="noopener" contenteditable="true">Magadh University</a>
      <p class="edu-meta" contenteditable="true">2015 – 2018 | Aurangabad, Bihar · First Division</p>
    </section>
  </div>

  <div class="right">
    <section class="section" data-section="experience">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><rect x="2" y="4" width="8" height="5.5"/><path d="M4.5 4 V3 h3 v1"/></svg></span>
        <span class="title" contenteditable="true">Professional Experience</span>
        <span class="rule"></span>
      </div>
      <div id="jobsList">
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Senior Software Engineer / Forward Deployed Engineer</h3>
          <a class="company" href="https://www.microsoft.com" target="_blank" rel="noopener" contenteditable="true">WaferWire Cloud Technologies (Microsoft)</a>
          <p class="meta" contenteditable="true">06/2025 – Present | Redmond / India · Remote</p>
          <ul class="job-bullets">
            <li contenteditable="true">Embed with Microsoft client stakeholders — gather requirements, whiteboard architecture with CTOs / product owners, and scope high-impact GenAI use cases into shippable MDX / Dream Demo accelerators.</li>
            <li contenteditable="true">Design and build agentic workflows: multi-agent orchestration, tool use, memory, planning, guardrails, and human-in-the-loop validation (LangGraph / LangChain / MCP; Claude, GPT, Azure OpenAI / AI Foundry).</li>
            <li contenteditable="true">Own end-to-end RAG pipelines — ingestion, OCR/chunking, embeddings, vector search, reranking, context optimization, and evals — reused across partner and customer engagements.</li>
            <li contenteditable="true">Align API contracts and service boundaries across frontend, backend, platform, and DevOps; mentor engineers, run design reviews, and unblock integrations so prototypes harden into production.</li>
            <li contenteditable="true">Ship React/Next.js + Python FastAPI / Node / .NET / TypeScript with REST/GraphQL; CI/CD, Docker, observability, and cost/latency tuning — ~40% lower API latency, ~25% lower cost; promoted for FDE leadership.</li>
            <li contenteditable="true">Feed field insights back into shared platforms and reusable accelerators used across industry demo workstreams.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Senior Software Engineer</h3>
          <a class="company" href="https://www.techmahindra.com" target="_blank" rel="noopener" contenteditable="true">Tech Mahindra (Dow Jones / News Corp)</a>
          <p class="meta" contenteditable="true">08/2024 – 06/2025 | Hyderabad · Remote</p>
          <ul class="job-bullets">
            <li contenteditable="true">Partnered with Dow Jones product, editorial, and platform stakeholders to clarify requirements for financial intelligence search and GenAI retrieval — bridging business goals with engineering constraints.</li>
            <li contenteditable="true">Architected React/Next.js/Vue front ends and FastAPI / Node / .NET / Golang microservices; drove cross-team API design, GraphQL/REST contracts, and data ownership with backend and data teams.</li>
            <li contenteditable="true">Engineered LLM search / conversational features with OpenAI / Azure OpenAI, LangChain, and vector databases; applied output validation and least-privilege data access on GenAI paths.</li>
            <li contenteditable="true">Owned MongoDB / PostgreSQL schema and aggregation work for high-read search; facilitated Agile release reviews across distributed squads — ~25% backend gains and 99.9% uptime.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Backend Engineer</h3>
          <a class="company" href="https://www.eruvaka.com" target="_blank" rel="noopener" contenteditable="true">Eruvaka Technologies (Autodesk)</a>
          <p class="meta" contenteditable="true">01/2023 – 08/2024 | Hyderabad · Hybrid</p>
          <ul class="job-bullets">
            <li contenteditable="true">Worked with Autodesk product and platform teams to turn workflow-automation requirements into FastAPI GenAI services — auth, rate limits, OpenAPI contracts for frontend consumers.</li>
            <li contenteditable="true">Built AI-powered Function Apps with OpenAI / LangChain for automated data processing; multi-language backends (.NET, Node, Golang, Java / Spring Boot) for SaaS workloads.</li>
            <li contenteditable="true">Architected AWS delivery (Lambda, API Gateway, EC2, S3, IAM, Secrets Manager, CloudWatch) with Docker / CI/CD; collaborated with infra and app teams on failure handling and multi-client access; ~15% infra savings.</li>
            <li contenteditable="true">Managed PostgreSQL, MongoDB, and MySQL schemas and secure CRUD; shortened backend-to-frontend integration cycles through clear service boundaries.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Full Stack Developer</h3>
          <a class="company" href="https://www.google.com/search?q=King+of+Digital+Marketing+Pvt+Ltd" target="_blank" rel="noopener" contenteditable="true">King of Digital Marketing Pvt. Ltd.</a>
          <p class="meta" contenteditable="true">09/2020 – 01/2023 | New Delhi · Hybrid</p>
          <ul class="job-bullets">
            <li contenteditable="true">Led client requirement workshops for marketplace / e-commerce builds; coordinated designers, backend, and QA to ship React/Next.js + Node/.NET / Golang solutions with 250+ third-party integrations.</li>
            <li contenteditable="true">Configured MySQL / MongoDB / PostgreSQL for multi-client delivery; deployed on AWS (EC2, S3, Lambda) at ~99.9% uptime; reusable patterns cut duplicate effort ~30% performance gains.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Software Developer Intern</h3>
          <a class="company" href="https://www.google.com/search?q=DevWebOIC+Tech+Solution" target="_blank" rel="noopener" contenteditable="true">DevWebOIC Tech Solution</a>
          <p class="meta" contenteditable="true">11/2019 – 07/2020 | New Delhi · Onsite</p>
          <ul class="job-bullets">
            <li contenteditable="true">Built and debugged full-stack features with React, Python, Java, Node.js, and SQL; supported production fixes and requirement clarification across client web workstreams.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
      </div>
    </section>
  </div>
</div>

<section class="section" data-section="projects" id="projectsSection">
  <div class="section-head">
    <span class="icon"><svg viewBox="0 0 12 12"><rect x="2" y="4" width="8" height="5"/><path d="M2 5.5 H5 L6 7 H10"/></svg></span>
    <span class="title" contenteditable="true">Projects</span>
    <span class="rule"></span>
  </div>
  <div id="projectsList">
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://partner.microsoft.com/en-us/asset/collection/industry-dream-demos-and-dream-demo-in-a-box" target="_blank" rel="noopener" contenteditable="true">Microsoft Dream Demos / MDX | GenAI Agents &amp; RAG Accelerators</a>
        <span class="project-dates" contenteditable="true">06/2025 – Present</span>
      </div>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Microsoft</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Senior Software Engineer / FDE · Lead</span></p>
      <ul class="project-bullets">
        <li contenteditable="true"><strong>Motive:</strong> Microsoft partners needed repeatable, production-grade GenAI demos (agents + RAG) that could be scoped with customers in days and reused across industry engagements — not one-off prototypes.</li>
        <li contenteditable="true"><strong>Action:</strong> Led discovery with client stakeholders; owned architecture for multi-step / multi-agent systems (tool use, memory, planning, guardrails, human-in-the-loop) and full RAG (ingest → OCR/chunk → embed → retrieve → rerank → eval). Coordinated UI, backend, and DevOps on React/Next.js/Vue + FastAPI/Node/.NET contracts; mentored engineers; used Claude for scaffolding, tests, and PR hardening.</li>
        <li contenteditable="true"><strong>Action:</strong> Packaged accelerators with Docker / Azure DevOps CI/CD; applied IAM / Key Vault hygiene, input-output filtering, and eval harnesses so demos harden toward customer production patterns (Azure OpenAI / AI Foundry; Bedrock-ready agent patterns via LangGraph / MCP).</li>
        <li contenteditable="true"><strong>Result:</strong> Reusable accelerators adopted across MDX / Dream Demo workstreams; ~40% lower API latency and ~25% lower operating cost; field patterns fed into shared platforms; recognized with Lead FDE ownership.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">Python, FastAPI, TypeScript, React, Next.js, Vue.js, Node.js, .NET Core, LangGraph, LangChain, Claude, GPT, Azure OpenAI, Azure AI Foundry, Bedrock Agents (patterns), MCP, RAG, Pinecone / Vector Search, PostgreSQL, MongoDB, Docker, Azure DevOps, REST, GraphQL, OpenAPI, Guardrails, Evals</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://www.dowjones.com/professional/factiva/" target="_blank" rel="noopener" contenteditable="true">Dow Jones / Factiva | GenAI Search &amp; Enterprise Retrieval</a>
        <span class="project-dates" contenteditable="true">12/2024 – 06/2025</span>
      </div>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Dow Jones / News Corp / Wall Street Journal</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Senior Software Engineer</span></p>
      <ul class="project-bullets">
        <li contenteditable="true"><strong>Motive:</strong> Dow Jones needed faster, trustworthy research over licensed financial/news content — stakeholders required searchable GenAI summarization and conversational retrieval without sacrificing accuracy or uptime on high-read traffic.</li>
        <li contenteditable="true"><strong>Action:</strong> Gathered requirements with product and editorial partners; designed microservice boundaries and versioned REST/GraphQL APIs; built React/Next.js/Vue experiences and FastAPI + LangChain retrieval with vector search, citations, and graceful degradation on timeouts.</li>
        <li contenteditable="true"><strong>Action:</strong> Aligned data and platform teams on ownership and GenAI release gates (output validation, least-privilege access); owned MongoDB / PostgreSQL schema and caching for search paths; used LLM tooling for cross-service debugging and contract tests.</li>
        <li contenteditable="true"><strong>Result:</strong> Conversational / AI search paths with 99.9% uptime and ~25% backend performance improvement; shortened stakeholder feedback loops through demos and cross-squad acceptance reviews.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">React, Next.js, Vue.js, TypeScript, Python, FastAPI, Node.js, .NET Core, Golang, LangChain, OpenAI, Azure OpenAI, Vector Search, PostgreSQL, MongoDB, GraphQL, REST, OpenAPI, Docker, CI/CD, API Security</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | AWS GenAI Workflow &amp; SaaS Backend Services</a>
        <span class="project-dates" contenteditable="true">08/2023 – 08/2024</span>
      </div>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Autodesk</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Backend Engineer</span></p>
      <ul class="project-bullets">
        <li contenteditable="true"><strong>Motive:</strong> Autodesk SaaS teams needed secure GenAI-backed workflow, search, and content services that frontend apps could consume reliably under multi-client constraints.</li>
        <li contenteditable="true"><strong>Action:</strong> Translated product requirements into FastAPI service architecture on AWS (Lambda, API Gateway, EC2, S3, IAM, Secrets Manager, CloudWatch); partnered with platform and UI teams on auth, rate limiting, retries/timeouts, and OpenAPI contracts; integrated OpenAI / LangChain for automated processing.</li>
        <li contenteditable="true"><strong>Action:</strong> Delivered polyglot backends (.NET, Node/Express, Golang, Java / Spring Boot) alongside Python; managed MySQL / PostgreSQL / MongoDB ownership; Docker/CI/CD packaging with ECS/Fargate-ready containers and Step Functions–style workflow orchestration patterns.</li>
        <li contenteditable="true"><strong>Result:</strong> Production GenAI workflow APIs with clearer service ownership for consuming teams; ~15% infrastructure cost reduction and shorter backend-to-frontend integration cycles.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">Python, FastAPI, Node.js, .NET Core, Golang, Java / Spring Boot, OpenAI, LangChain, AWS Lambda, API Gateway, ECS/Fargate, EC2, S3, IAM, Secrets Manager, CloudWatch, Step Functions (patterns), DynamoDB / OpenSearch (retrieval patterns), Docker, MySQL, PostgreSQL, MongoDB, OpenAPI, CI/CD</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://www.nykaa.com" target="_blank" rel="noopener" contenteditable="true">Nykaa | High-Traffic E-Commerce Platform</a>
        <span class="project-dates" contenteditable="true">01/2022 – 11/2022</span>
      </div>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Nykaa</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Full Stack Developer</span></p>
      <ul class="project-bullets">
        <li contenteditable="true"><strong>Motive:</strong> Marketplace stakeholders needed reliable payments, auth, inventory, and logistics flows under peak commerce traffic without slowing feature delivery.</li>
        <li contenteditable="true"><strong>Action:</strong> Shipped React/Next.js + Node.js REST features with designers, backend, and QA; optimized MongoDB/MySQL queries and caching; deployed on AWS-backed services with multi-client config patterns.</li>
        <li contenteditable="true"><strong>Result:</strong> Production commerce paths with improved response times and reusable frontend/backend patterns later reused across other client workstreams.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">React.js, Next.js, Node.js, MongoDB, MySQL, AWS (EC2, S3, Lambda), REST APIs, CI/CD</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
  </div>
</section>
`.trim();
