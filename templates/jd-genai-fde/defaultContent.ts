/**
 * Two-column (Prince) JD overlay for Senior AI Engineer (FDE) — GenAI & Agentic Systems.
 * Keeps Senior SWE / FDE identity; layers Bedrock, agents, RAG, AWS AI/ML, customer-facing FDE.
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
      <p class="body-text" contenteditable="true" data-key="summary">Forward Deployed Senior Software Engineer with 7+ years turning real business problems into production GenAI and full-stack systems for Microsoft, Dow Jones, and Autodesk. Hands-on with LLMs (Claude, GPT), RAG, agentic workflows, React/Next.js, and Python/Node — shipping prototypes fast and hardening them with AWS, CI/CD, observability, and cost/latency tuning. Outcomes: ~40% lower API latency, ~25% lower cost, 99.9% availability.</p>
    </section>

    <section class="section" data-section="skills">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><path d="M2 10 L7 5"/><circle cx="8.5" cy="3.5" r="1.6"/></svg></span>
        <span class="title" contenteditable="true">Technical Skills</span>
        <span class="rule"></span>
      </div>
      <ul class="skills" id="skillsList">
        <li class="skill-row"><strong class="skill-label" contenteditable="true">GenAI &amp; Agents:</strong> <span class="skill-value" contenteditable="true">Claude, GPT, Llama, Prompt Engineering, RAG, Evals, Fine-tuning basics, LangGraph, LangChain, CrewAI, Bedrock Agents, MCP, Multi-agent Orchestration, Tool Use, Memory, Planning, Guardrails</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Full-Stack:</strong> <span class="skill-value" contenteditable="true">Python, TypeScript, JavaScript, React, Next.js, Node.js, FastAPI, REST, GraphQL, SQL/NoSQL, Docker</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">AWS AI / Cloud:</strong> <span class="skill-value" contenteditable="true">Bedrock, SageMaker, Lambda, ECS/EKS, API Gateway, Step Functions, DynamoDB, OpenSearch, S3, IAM, Well-Architected, Serverless</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Production:</strong> <span class="skill-value" contenteditable="true">Observability, Cost &amp; Latency Tuning, CI/CD, CDK / Terraform, LLMOps, Azure OpenAI / AI Foundry</span></li>
        <li class="skill-row"><strong class="skill-label" contenteditable="true">Also:</strong> <span class="skill-value" contenteditable="true">.NET Core, Golang, Vue.js, PostgreSQL, MongoDB, Pinecone, Azure DevOps</span></li>
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
        <li contenteditable="true">Microsoft AZ-900 | Claude Certified Architect</li>
        <li contenteditable="true">GSoC 2019 Contributor | Hackathon Winner</li>
        <li contenteditable="true">Promoted Lead FDE on Microsoft GenAI engagement</li>
      </ul>
    </section>

    <section class="section" data-section="education">
      <div class="section-head">
        <span class="icon"><svg viewBox="0 0 12 12"><path d="M1.5 6 L6 3.5 L10.5 6 L6 8.5 Z" fill="#111" stroke="none"/></svg></span>
        <span class="title" contenteditable="true">Education</span>
        <span class="rule"></span>
      </div>
      <p class="edu-degree" contenteditable="true">Bachelor of Computer Applications</p>
      <a class="edu-school" href="https://www.magadhuniversity.ac.in" target="_blank" rel="noopener" contenteditable="true">Magadh University</a>
      <p class="edu-meta" contenteditable="true">2015 – 2018 | Aurangabad, Bihar</p>
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
            <li contenteditable="true">Embed with customer and partner teams on Microsoft MDX / Dream Demos — scope GenAI use cases and ship production-ready demos and accelerators end to end.</li>
            <li contenteditable="true">Design agentic workflows (tool use, planning, memory, guardrails) and RAG pipelines (ingestion, chunking, embeddings, vector search, reranking, evals) with LangGraph / LangChain, Claude, Azure OpenAI / AI Foundry.</li>
            <li contenteditable="true">Deliver React/Next.js frontends and Python FastAPI / Node / TypeScript backends with REST/GraphQL; harden with observability, cost/latency tuning, Docker, and Azure DevOps CI/CD.</li>
            <li contenteditable="true">Feed field learnings into reusable accelerators; ~40% lower API latency, ~25% lower cost; promoted for FDE ownership.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Senior Software Engineer</h3>
          <a class="company" href="https://www.techmahindra.com" target="_blank" rel="noopener" contenteditable="true">Tech Mahindra (Dow Jones / News Corp)</a>
          <p class="meta" contenteditable="true">08/2024 – 06/2025 | Hyderabad · Remote</p>
          <ul class="job-bullets">
            <li contenteditable="true">Shipped React/Next.js/Vue TypeScript apps and FastAPI / Node / .NET microservices for Dow Jones financial intelligence workflows.</li>
            <li contenteditable="true">Built LLM-powered search and conversational retrieval (OpenAI / Azure OpenAI, LangChain, vector DBs) with eval-minded iteration and 99.9% uptime.</li>
            <li contenteditable="true">Whiteboarded with stakeholders and debugged with developers same-day; improved backend performance ~25%.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Backend Engineer</h3>
          <a class="company" href="https://www.eruvaka.com" target="_blank" rel="noopener" contenteditable="true">Eruvaka Technologies (Autodesk)</a>
          <p class="meta" contenteditable="true">01/2023 – 08/2024 | Hyderabad · Hybrid</p>
          <ul class="job-bullets">
            <li contenteditable="true">Productionized FastAPI GenAI / workflow services on AWS (Lambda, API Gateway, EC2, S3, IAM, Secrets Manager) with Docker and CI/CD.</li>
            <li contenteditable="true">Integrated OpenAI + LangChain for automation; modeled MySQL/PostgreSQL/MongoDB with secure multi-client access; ~15% infra savings.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Full Stack Developer</h3>
          <a class="company" href="https://www.google.com/search?q=King+of+Digital+Marketing+Pvt+Ltd" target="_blank" rel="noopener" contenteditable="true">King of Digital Marketing Pvt. Ltd.</a>
          <p class="meta" contenteditable="true">09/2020 – 01/2023 | New Delhi · Hybrid</p>
          <ul class="job-bullets">
            <li contenteditable="true">Built React/Next.js and Node/.NET apps; 250+ API integrations; AWS EC2/S3/Lambda at ~99.9% uptime across marketplace/e-commerce clients.</li>
          </ul>
          <div class="section-actions"><button type="button" data-act="add-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-job">Remove</button></div>
        </article>
        <article class="job" data-block="job">
          <h3 class="job-title" contenteditable="true">Software Developer Intern</h3>
          <a class="company" href="https://www.google.com/search?q=DevWebOIC+Tech+Solution" target="_blank" rel="noopener" contenteditable="true">DevWebOIC Tech Solution</a>
          <p class="meta" contenteditable="true">11/2019 – 07/2020 | New Delhi · Onsite</p>
          <ul class="job-bullets">
            <li contenteditable="true">Full-stack features with React, Python, Java, Node.js, and SQL alongside senior engineers.</li>
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
      <p class="project-summary" contenteditable="true">Customer-facing GenAI demos and reusable accelerators — agentic workflows, RAG, and full-stack apps from discovery to production packaging.</p>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Microsoft</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Senior Software Engineer / FDE</span></p>
      <ul class="project-bullets">
        <li contenteditable="true">Built multi-step agent flows with tool calling, guardrails, and human-in-the-loop; RAG evals for retrieval quality.</li>
        <li contenteditable="true">React/Next.js + FastAPI/Node services; Claude used daily for scaffolding, contracts, tests, and PR hardening.</li>
        <li contenteditable="true">CI/CD, Docker, observability; ~40% latency and ~25% cost improvements fed back into shared accelerators.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">Python, FastAPI, TypeScript, React, Next.js, LangGraph, LangChain, Claude, Azure OpenAI, RAG, Docker, CI/CD, MCP</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://www.dowjones.com/professional/factiva/" target="_blank" rel="noopener" contenteditable="true">Dow Jones | GenAI Search &amp; Enterprise Retrieval</a>
        <span class="project-dates" contenteditable="true">12/2024 – 06/2025</span>
      </div>
      <p class="project-summary" contenteditable="true">Full-stack financial intelligence search with LLM summarization and microservice APIs for licensed news workflows.</p>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Dow Jones</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Senior Software Engineer</span></p>
      <ul class="project-bullets">
        <li contenteditable="true">End-to-end RAG-style retrieval and conversational features with FastAPI, LangChain, and vector search.</li>
        <li contenteditable="true">Versioned REST/GraphQL services; 99.9% uptime and ~25% backend gains under high-read traffic.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">React, Next.js, Python, FastAPI, LangChain, OpenAI, PostgreSQL, MongoDB, GraphQL, Docker</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
    <article class="project" data-block="project">
      <div class="project-top">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | AWS GenAI Workflow Services</a>
        <span class="project-dates" contenteditable="true">08/2023 – 08/2024</span>
      </div>
      <p class="project-summary" contenteditable="true">Secure FastAPI GenAI services on AWS for content generation, search, and workflow automation in SaaS.</p>
      <p class="project-cr"><strong>Client:</strong> <span contenteditable="true">Autodesk</span> &nbsp;|&nbsp; <strong>Role:</strong> <span contenteditable="true">Backend Engineer</span></p>
      <ul class="project-bullets">
        <li contenteditable="true">Lambda, API Gateway, S3, IAM, Secrets Manager; ECS/Fargate-ready containers; OpenAI + LangChain integrations.</li>
        <li contenteditable="true">Auth, rate limiting, retries/timeouts; ~15% infrastructure cost reduction.</li>
      </ul>
      <p class="tech-stack"><strong>Tech Stack:</strong> <span contenteditable="true">Python, FastAPI, AWS Lambda, API Gateway, S3, IAM, Docker, MySQL, PostgreSQL, LangChain</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>
  </div>
</section>
`.trim();
