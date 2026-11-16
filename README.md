# Resume Studio

Local-first multi-template resume editor built with Next.js. Edit on real A4 pages, print/PDF from the browser, and keep the last 10 draft versions in `localStorage`.

## Templates

| ID | Name | Status |
| --- | --- | --- |
| `prince` | Prince — Two Column A4 | Ready |
| `ats-onepage` | ATS One-Page Senior SWE | Ready |
| `ats-twopage` | ATS Detailed 2-Page Senior SWE | Ready |
| `jd-ai-security` | JD — AI Engineer Security | Ready |
| `classic-serif` | Classic Serif | Coming soon |

### Add another template

1. Create `templates/<id>/` (Editor component + styles + default content).
2. Export a module from `templates/<id>/index.ts`.
3. Add metadata in `templates/registry.ts`.
4. Register the editor in `templates/load.ts`.

## Develop

```bash
cd /Applications/WORKSPACE/resume-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Prince** → **Open editor**.

## Build & deploy

```bash
npm run build
npm start
```

Deploy on Vercel by importing this folder (or connecting a GitHub repo). No environment variables required for v1.

## Notes

- Drafts and history are per-browser: `resume-studio:<templateId>:draft` / `:history`.
- The Prince editor migrates older standalone HTML keys (`prince-resume-editor-v3`, etc.) when present.
- Use **Print / Save PDF** (browser print → Save as PDF).
- **Enter** adds a bullet/skill row; **Backspace** on an empty one removes it.
