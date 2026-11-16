/**
 * JD overlay on the detailed 2-page resume (AI Engineer – Security).
 * Keeps real titles, stack, companies, and dates. Adds JD keywords
 * (LLM security, guardrails, IAM/secrets, SIEM, OWASP LLM, DevSecOps)
 * as natural extras — does not replace the Senior SWE identity.
 */
export const JD_AI_SECURITY_CONTENT = `
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
    <li contenteditable="true">Forward Deployed Senior Software Engineer with 7+ years owning production full-stack platforms, distributed backends, real-time systems, and AI applications for Microsoft, Dow Jones / News Corp / Wall Street Journal, and Autodesk.</li>
    <li contenteditable="true">Specialize in Python, FastAPI, Node.js, TypeScript, .NET Core (C#), Golang (Gin), Java / Spring Boot, React.js, Next.js, Vue.js, REST and GraphQL APIs, microservices, and LLM systems — LangChain, Hugging Face, Azure AI Foundry, Retrieval-Augmented Generation (RAG), and agentic workflows.</li>
    <li contenteditable="true">Hands-on hardening of AI/ML and LLM environments alongside delivery: AI guardrails, input/output filtering, prompt-injection and jailbreak test patterns, secrets management, IAM-aware cloud deployments (Azure / AWS), and CI/CD security gates — aligned with OWASP Top 10 for LLM Applications and secure-by-design MLOps / LLMOps practices.</li>
    <li contenteditable="true">Deliver measurable outcomes: up to 40% lower API latency, 25% lower operating cost, ~15% infrastructure savings, and 99.9% uptime while mentoring engineers and partnering with Platform, DevOps, and Application Security stakeholders.</li>
  </ul>
</section>

<section class="section" data-section="skills" data-block="skills">
  <h2 class="section-title" contenteditable="true">Skills</h2>
  <ul class="skills" id="skillsList">
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Languages:</strong> <span class="skill-value" contenteditable="true">Python, JavaScript, TypeScript, Go (Golang), C#, Java, SQL</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Backend &amp; APIs:</strong> <span class="skill-value" contenteditable="true">FastAPI, Node.js, Express.js, .NET Core / ASP.NET, Spring Boot, Golang Gin, REST (Representational State Transfer), GraphQL, gRPC, Microservices, API Design, System Design, API Gateways</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Frontend:</strong> <span class="skill-value" contenteditable="true">React.js, Next.js, Vue.js, React Native, Tailwind CSS, Shadcn UI</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AI / LLM:</strong> <span class="skill-value" contenteditable="true">OpenAI, Azure OpenAI, Azure AI Foundry, LangChain, LangGraph, RAG pipelines, Agentic AI, Generative AI, Prompt Engineering, Vector Search, Pinecone, Hugging Face, TensorFlow / PyTorch familiarity, MCP, Claude</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AI / LLM Security:</strong> <span class="skill-value" contenteditable="true">AI Guardrails, Prompt Injection / Jailbreak Testing, Insecure Output Handling, Sensitive Information Disclosure Controls, Data Leakage Prevention, Shadow AI Detection, Model Inventory, OWASP Top 10 for LLM Applications, AI Red Teaming, Secure GenAI / LLM API Integrations</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Data:</strong> <span class="skill-value" contenteditable="true">PostgreSQL, MongoDB, MySQL, SQL Server, Oracle, DynamoDB, Aggregation Pipelines, Schema Design, Query Optimization</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Cloud &amp; DevOps:</strong> <span class="skill-value" contenteditable="true">AWS (EC2, S3, Lambda, API Gateway, IAM, Secrets Manager, KMS), Azure (IAM, Key Vault), Docker, Kubernetes (K8s), CI/CD, Azure DevOps, GitHub, GitLab, Infrastructure as Code (IaC), DevSecOps, Jira</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Detection &amp; Ops:</strong> <span class="skill-value" contenteditable="true">Observability, Security Telemetry, Microsoft Sentinel, Splunk, SIEM / SOAR Integrations, AI Security Event Forwarding</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Core Competencies:</strong> <span class="skill-value" contenteditable="true">Technical Leadership, Mentoring, Code Review, Production Ownership, Stakeholder Alignment, Performance Tuning, Observability, Security, WebRTC, Real-time Systems, Secure-by-Design collaboration with AppSec / Platform teams</span></li>
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
        <li contenteditable="true">Own architecture and delivery for Microsoft MDX and Dream Demos platforms: lead full-stack and AI solutions with .NET Core (C#), Node.js, Python, FastAPI, React.js, Next.js, and Vue.js.</li>
        <li contenteditable="true">Design and deploy Agentic AI and Generative AI systems — tool calling, function calling, prompt engineering, context management, human-in-the-loop validation, and workflow orchestration using Azure AI services and LLM APIs.</li>
        <li contenteditable="true">Build end-to-end RAG pipelines: data ingestion, OCR, chunking, embeddings, semantic search, vector retrieval, reranking, context optimization, and response generation with LangChain / LangGraph and vector databases.</li>
        <li contenteditable="true">Ship secure cloud-native microservices with REST/GraphQL, MongoDB, PostgreSQL, Azure, AWS, Docker, Azure DevOps, Graph API, and WebRTC; mentor engineers and raise production reliability.</li>
        <li contenteditable="true">Improve production KPIs — ~40% lower API latency and ~25% lower operating cost — with guardrails, evaluation, observability, and cost/latency optimization across LLM layers.</li>
        <li contenteditable="true">Extend the same AI delivery work with practical GenAI security: input/output filtering, prompt-injection and jailbreak test cases, secrets and IAM hygiene for Azure OpenAI / Foundry integrations, and CI/CD checks before secure model / demo deployment; surface risk signals in logging pipelines usable by SIEM tools such as Microsoft Sentinel.</li>
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
        <li contenteditable="true">Led design and development of Dow Jones enterprise web applications with React.js, Next.js, and Vue.js for high-traffic financial / news workflows.</li>
        <li contenteditable="true">Designed scalable REST APIs, GraphQL services, and microservices using .NET Core, Node.js, Golang (Gin), Python, Java, and TypeScript — improved backend performance by ~25%.</li>
        <li contenteditable="true">Engineered AI-powered intelligent search and conversational features with FastAPI, OpenAI, Azure OpenAI, LangChain, and vector databases.</li>
        <li contenteditable="true">Owned MongoDB, SQL, and PostgreSQL schema design and aggregation pipelines; sustained 99.9% uptime and faster query response times.</li>
        <li contenteditable="true">Applied data-leakage and sensitive-output controls on LLM search paths (validation, least-privilege data access, insecure-output handling) and partnered with platform / security reviewers on release gates for GenAI features.</li>
        <li contenteditable="true">Partnered with distributed Agile teams on release trains, demos, and acceptance reviews that shortened stakeholder feedback loops.</li>
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
        <li contenteditable="true">Designed and maintained server-side logic and APIs using .NET Core, Node.js / Express, Golang, Java / Spring Boot, and Python for Autodesk SaaS workloads.</li>
        <li contenteditable="true">Deployed and managed AWS (EC2, S3, Lambda, API Gateway), reducing infrastructure cost by ~15% while improving scalability.</li>
        <li contenteditable="true">Built AI-powered Function Apps with FastAPI, OpenAI APIs, and LangChain for automated data processing and platform intelligence.</li>
        <li contenteditable="true">Managed MongoDB, PostgreSQL, and MySQL schemas, aggregations, CRUD, and secure data access for enterprise reliability.</li>
        <li contenteditable="true">Defined authentication, rate limiting, and REST contracts that shortened backend-to-frontend integration cycles.</li>
        <li contenteditable="true">Strengthened GenAI service integrations with API gateway patterns, IAM-aware AWS packaging, secrets management, and middleware validation suitable for DevSecOps / CI/CD promotion.</li>
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
        <li contenteditable="true">Built full-stack applications with React.js, Next.js, React Native, Node.js, Express.js, .NET Core, Java, and Golang; improved application performance by ~30%.</li>
        <li contenteditable="true">Integrated 250+ third-party APIs across business platforms; configured MySQL, MongoDB, and PostgreSQL for multi-client delivery.</li>
        <li contenteditable="true">Deployed on AWS (EC2, S3, Lambda) with high-availability practices achieving ~99.9% uptime.</li>
        <li contenteditable="true">Created reusable frontend/backend patterns that cut duplicate engineering effort across client projects (including e-commerce and marketplace workstreams with PCI-aware auth and payment-adjacent data handling).</li>
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
        <a class="project-name" href="https://partner.microsoft.com/en-us/asset/collection/industry-dream-demos-and-dream-demo-in-a-box" target="_blank" rel="noopener" contenteditable="true">Microsoft Dream Demos / MDX | Enterprise Data &amp; AI Demo Platform</a>
        <span class="job-dates" contenteditable="true">Jun 2025 – Present</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer / Forward Deployed Engineer · Client: Microsoft Partner / Industry Solutions</p>
      <ul class="project-bullets">
        <li contenteditable="true">Owned full-stack delivery for Microsoft Dream Demos and Microsoft Demo Experience (MDX) style enterprise demo platforms — clickable, story-driven Data &amp; AI scenarios (Azure OpenAI, Cognitive Search, Copilot-adjacent flows) used in partner and customer engagements without touching production tenants.</li>
        <li contenteditable="true">Built reusable backend and AI services in Python / FastAPI, Node.js, and .NET Core with REST / GraphQL; powered React.js, Next.js, and Vue.js demo UIs for industry walkthroughs deployable via Azure packaging patterns (ARM / DevOps) similar to “Demo in a Box” rollouts.</li>
        <li contenteditable="true">Implemented end-to-end RAG and agent accelerators on Azure AI Foundry / Azure OpenAI + LangChain / LangGraph: ingestion, chunking, embeddings, retrieval, reranking, tool calling, and evaluation harnesses reused across customer implementations.</li>
        <li contenteditable="true">Hardened GenAI paths with AI guardrails, input/output filtering, prompt-injection and jailbreak test cases, Azure IAM / Key Vault secrets hygiene, and CI/CD security gates; emitted security telemetry suitable for Microsoft Sentinel / SIEM handoff.</li>
        <li contenteditable="true">Cut API latency ~40% and operating cost ~25% through caching, context optimization, and LLM cost/latency controls while mentoring engineers on production reliability for demo and customer environments.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, Node.js, .NET Core, React.js, Next.js, Vue.js, Azure OpenAI, Azure AI Foundry, LangChain, LangGraph, RAG, PostgreSQL, MongoDB, Docker, Azure DevOps, REST, GraphQL, IAM, Key Vault, AI Guardrails</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.dowjones.com/professional/factiva/" target="_blank" rel="noopener" contenteditable="true">Dow Jones / Factiva Ecosystem | Financial Intelligence Search &amp; GenAI Research</a>
        <span class="job-dates" contenteditable="true">Dec 2024 – Jun 2025</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer · Client: Dow Jones / News Corp / Wall Street Journal</p>
      <ul class="project-bullets">
        <li contenteditable="true">Delivered enterprise web and API features for Dow Jones financial / news intelligence workflows — high-traffic React.js, Next.js, and Vue.js experiences backed by .NET Core, Node.js, Golang, Python, and TypeScript microservices.</li>
        <li contenteditable="true">Engineered AI-assisted search and conversational retrieval over licensed news corpora (Factiva-class research patterns: semantic search, summarization, traceable citations) using FastAPI, OpenAI / Azure OpenAI, LangChain, and vector databases.</li>
        <li contenteditable="true">Designed GraphQL and REST services with authN/Z, input validation, and least-privilege data access so GenAI outputs respect sensitive financial content and reduce data-leakage / insecure-output risk.</li>
        <li contenteditable="true">Owned MongoDB and PostgreSQL schema / aggregation work for high-read search paths; sustained 99.9% uptime targets and ~25% better backend performance through query and caching improvements.</li>
        <li contenteditable="true">Partnered with Agile release trains on demos and acceptance reviews; documented API contracts and GenAI release checks for platform and security reviewers before production promotion.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">React.js, Next.js, Vue.js, Node.js, Python, FastAPI, .NET Core, Golang, TypeScript, OpenAI, Azure OpenAI, LangChain, Vector Search, PostgreSQL, MongoDB, GraphQL, REST, Docker, API Security</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | Cloud SaaS Backend &amp; GenAI Workflow Services</a>
        <span class="job-dates" contenteditable="true">Aug 2023 – Aug 2024</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Backend Engineer · Client: Autodesk (via Eruvaka Technologies)</p>
      <ul class="project-bullets">
        <li contenteditable="true">Built production FastAPI and multi-language backend services (.NET Core, Node.js / Express, Golang, Java / Spring Boot) supporting Autodesk-style design and engineering SaaS workloads — content generation, search, and workflow automation.</li>
        <li contenteditable="true">Shipped AI-powered Function Apps and LLM integrations (OpenAI + LangChain) for automated data processing and platform intelligence, with authentication, JWT/OAuth-style access patterns, rate limiting, and secure REST contracts.</li>
        <li contenteditable="true">Deployed cloud-native processing on AWS (Lambda, API Gateway, EC2, S3) with IAM least privilege, secrets management, and Docker packaging; reduced infrastructure cost ~15% while improving scalable delivery.</li>
        <li contenteditable="true">Managed PostgreSQL, MongoDB, and MySQL schemas, aggregations, and secure CRUD paths; shortened backend-to-frontend integration cycles through clear API contracts and DevSecOps-friendly CI/CD packaging.</li>
        <li contenteditable="true">Collaborated with platform and application teams on secure-by-design service boundaries suitable for API gateway and middleware validation before promotion to higher environments.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, Node.js, .NET Core, Golang, Java / Spring Boot, OpenAI, LangChain, AWS Lambda, API Gateway, EC2, S3, IAM, Secrets Manager, Docker, PostgreSQL, MongoDB, MySQL, REST, CI/CD</span></p>
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
