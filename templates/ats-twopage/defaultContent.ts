/**
 * Detailed 2-page ATS resume — optimized for parse score + Senior SWE screens.
 * Practices applied: standard headings, plain contact in body, MMM YYYY dates,
 * acronyms expanded once, skills mirrored in bullets, quantified results,
 * seniority language (own/lead/design/mentor), no tables/columns/icons.
 */
export const ATS_TWO_DEFAULT_CONTENT = `
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
    <li contenteditable="true">Specialize in Python, FastAPI, Node.js, TypeScript, .NET Core (C#), Golang (Gin), Java / Spring Boot, React.js, Next.js, Vue.js, REST and GraphQL APIs, microservices, and LLM systems — LangChain, Azure AI Foundry, Retrieval-Augmented Generation (RAG), and agentic workflows.</li>
    <li contenteditable="true">Deliver measurable outcomes: up to 40% lower API latency, 25% lower operating cost, ~15% infrastructure savings, and 99.9% uptime while mentoring engineers and leading architecture decisions across Agile teams.</li>
  </ul>
</section>

<section class="section" data-section="skills" data-block="skills">
  <h2 class="section-title" contenteditable="true">Skills</h2>
  <ul class="skills" id="skillsList">
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Languages:</strong> <span class="skill-value" contenteditable="true">Python, JavaScript, TypeScript, Go (Golang), C#, Java, SQL</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Backend &amp; APIs:</strong> <span class="skill-value" contenteditable="true">FastAPI, Node.js, Express.js, .NET Core / ASP.NET, Spring Boot, Golang Gin, REST (Representational State Transfer), GraphQL, gRPC, Microservices, API Design, System Design</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Frontend:</strong> <span class="skill-value" contenteditable="true">React.js, Next.js, Vue.js, React Native, Tailwind CSS, Shadcn UI</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">AI / LLM:</strong> <span class="skill-value" contenteditable="true">OpenAI, Azure OpenAI, Azure AI Foundry, LangChain, LangGraph, RAG pipelines, Agentic AI, Generative AI, Prompt Engineering, Vector Search, Pinecone, Hugging Face, MCP, Claude</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Data:</strong> <span class="skill-value" contenteditable="true">PostgreSQL, MongoDB, MySQL, SQL Server, Oracle, DynamoDB, Aggregation Pipelines, Schema Design, Query Optimization</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Cloud &amp; DevOps:</strong> <span class="skill-value" contenteditable="true">AWS (EC2, S3, Lambda, API Gateway), Azure, Docker, Kubernetes (K8s), CI/CD (Continuous Integration / Continuous Delivery), Azure DevOps, GitHub, GitLab, Jira</span></li>
    <li class="skill-row"><strong class="skill-label" contenteditable="true">Core Competencies:</strong> <span class="skill-value" contenteditable="true">Technical Leadership, Mentoring, Code Review, Production Ownership, Stakeholder Alignment, Performance Tuning, Observability, Security, WebRTC, Real-time Systems</span></li>
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
        <li contenteditable="true">Created reusable frontend/backend patterns that cut duplicate engineering effort across client projects (including e-commerce and marketplace workstreams).</li>
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
        <a class="project-name" href="https://partner.microsoft.com" target="_blank" rel="noopener" contenteditable="true">Microsoft Dream Demos / MDX | Enterprise AI &amp; Web Apps</a>
        <span class="job-dates" contenteditable="true">Jun 2025 – Present</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer / Forward Deployed Engineer · Client: Microsoft</p>
      <ul class="project-bullets">
        <li contenteditable="true">Architect reusable AI and backend services with Python, FastAPI, Node.js, .NET, REST/GraphQL for React.js, Next.js, and Vue.js experiences.</li>
        <li contenteditable="true">Deliver RAG/agent accelerators, evaluation frameworks, and Azure DevOps CI/CD packaging reused across enterprise customer implementations.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, Node.js, .NET, React, Next.js, Vue.js, PostgreSQL, MongoDB, Docker, Azure, REST, GraphQL, LangChain, Azure AI Foundry</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.dowjones.com" target="_blank" rel="noopener" contenteditable="true">Dow Jones / News Corp | Financial Intelligence &amp; Search Platform</a>
        <span class="job-dates" contenteditable="true">Dec 2024 – Jun 2025</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Senior Software Engineer · Client: Dow Jones / Wall Street Journal ecosystem</p>
      <ul class="project-bullets">
        <li contenteditable="true">Built full-stack search and conversational retrieval for financial news workflows with React, Next.js, Node.js, Python, FastAPI, and GraphQL microservices.</li>
        <li contenteditable="true">Tuned MongoDB/PostgreSQL and caching for high-read traffic with 99.9% uptime targets.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">React.js, Next.js, Vue.js, Node.js, Python, FastAPI, PostgreSQL, MongoDB, REST, GraphQL, Docker, OpenAI, LangChain</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.autodesk.com" target="_blank" rel="noopener" contenteditable="true">Autodesk | AI Design &amp; Engineering SaaS Backend</a>
        <span class="job-dates" contenteditable="true">Aug 2023 – Aug 2024</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Backend Engineer · Client: Autodesk</p>
      <ul class="project-bullets">
        <li contenteditable="true">Delivered FastAPI services with authentication, rate limiting, and secure REST for content generation, search, and workflow automation.</li>
        <li contenteditable="true">Ran cloud-native processing on AWS Lambda, API Gateway, EC2, and S3 with Docker-friendly packaging.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">Python, FastAPI, AWS, Docker, PostgreSQL, MongoDB, REST, OpenAI, LangChain</span></p>
      <div class="section-actions"><button type="button" data-act="add-project-bullet">+ Bullet</button><button type="button" class="danger" data-act="remove-project">Remove</button></div>
    </article>

    <article class="project" data-block="project">
      <div class="job-head">
        <a class="project-name" href="https://www.nykaa.com" target="_blank" rel="noopener" contenteditable="true">Nykaa | E-Commerce Platform</a>
        <span class="job-dates" contenteditable="true">Jan 2022 – Nov 2022</span>
      </div>
      <p class="project-meta" contenteditable="true">Role: Full Stack Developer · Client: Nykaa</p>
      <ul class="project-bullets">
        <li contenteditable="true">Shipped high-traffic commerce features for payments, authentication, inventory, and logistics with React.js, Next.js, Node.js, and REST APIs.</li>
        <li contenteditable="true">Improved performance via MongoDB/MySQL query optimization and caching on AWS-backed services.</li>
      </ul>
      <p class="tech-stack"><strong>Tech:</strong> <span contenteditable="true">React.js, Next.js, Node.js, MongoDB, MySQL, AWS, REST APIs</span></p>
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

<section class="section" data-section="certifications" data-block="certifications">
  <h2 class="section-title" contenteditable="true">Certifications</h2>
  <ul class="awards" id="certsList">
    <li contenteditable="true">AWS Certified Solutions Architect</li>
    <li contenteditable="true">Microsoft Azure Fundamentals (AZ-900)</li>
    <li contenteditable="true">Claude Certified Architect</li>
  </ul>
</section>

<section class="section" data-section="achievements" data-block="achievements">
  <h2 class="section-title" contenteditable="true">Achievements</h2>
  <ul class="awards" id="awardsList">
    <li contenteditable="true">Promoted to Lead Senior Software Engineer / Forward Deployed Engineer on Microsoft engagement at WaferWire.</li>
    <li contenteditable="true">Google Summer of Code (GSoC) 2019 Contributor</li>
    <li contenteditable="true">Hackathon Winner | Delivered high-traffic production systems focused on performance and scalability</li>
  </ul>
</section>
`.trim();
