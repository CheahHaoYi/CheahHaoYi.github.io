# AGENTS.md — AI Coding Agent Manual for Root Portfolio (`cheahhaoyi.github.io`)

This document provides mandatory architectural invariants, coding rules, component patterns, and validation protocols for AI coding agents operating on the root portfolio hub repository.

---

## 1. Core Architectural Invariants

### 1.1 Critical Repository Naming & Root Path Rule
- **Repository Name**: This repository MUST remain named `cheahhaoyi.github.io` (or `CheahHaoYi.github.io`). GitHub Pages uses this exact name to serve the site at the root domain (`https://cheahhaoyi.github.io/`). Never rename this repository or introduce subpath prefixes.
- **Astro Base Path**: `astro.config.mjs` MUST NOT contain a `base` property. It must only configure `site: "https://cheahhaoyi.github.io"`. Sibling repositories require `base: "/<reponame>"`, but this repository is the root exception.

### 1.2 Multi-Repo Scope Boundaries
- **Shallow Content Only**: This repository does *not* own detailed study notes, course write-ups, or full project documentation. It provides introductory bios, timelines, overview cards, and links out.
- **Cross-Repo Links**: Sibling sites are deployed independently at root subpaths (e.g. `/cissp`, `/ccna`, `/rhcsa`, `/projects`). Links to these properties must be written as absolute paths (`href="/cissp"`).

### 1.3 Design System & Component Governance
- All UI components must be imported directly from `@cheahhaoyi/site-kit`:
  ```astro
  ---
  import { Layout, Prose, Button, Card, CodeBlock, Callout, Table, Badge, Tag, Breadcrumbs } from '@cheahhaoyi/site-kit';
  ---
  ```
- **No CSS Frameworks**: Do not install or import TailwindCSS, UnoCSS, Bootstrap, or CSS-in-JS libraries.
- **Tokens Only**: Use standard CSS variables defined in `@cheahhaoyi/site-kit` (`var(--color-accent-primary)`, `var(--space-4)`, `var(--radius-lg)`). Never hardcode hex values like `#7c3aed` or `#120e24` in component styles.
- **Light Mode Default**: All pages must render with Light Mode as the primary default foundation, with full dark mode parity handled automatically via `<Layout />`.

---

## 2. Content Registry Pattern

Never hardcode project titles, certification links, work history, or coursework directly inside `.astro` template markup. Centralize all content in `src/data/`:

| File | Purpose | Interface / Exports |
|---|---|---|
| [`src/data/knowledgeAreas.ts`](src/data/knowledgeAreas.ts) | Certification hubs & portals | `KnowledgeArea[]` (`name`, `slug`, `path`, `description`, `tags`, `status`, `badge`, `iosColor`) |
| [`src/data/projects.ts`](src/data/projects.ts) | Project teasers & showcases | `Project[]` (`name`, `description`, `tags`, `repoUrl`, `demoUrl`, `detailPath`, `featured`) |
| [`src/data/experience.ts`](src/data/experience.ts) | Career timeline & roles | `ExperienceItem[]` (`company`, `role`, `period`, `location`, `responsibilities`, `skills`) |
| [`src/data/education.ts`](src/data/education.ts) | Academic degrees & coursework | `EducationItem[]` (`institution`, `degree`, `period`, `highlights`, `coursework`) |
| [`src/data/navigation.ts`](src/data/navigation.ts) | Main site navigation links | `NavLink[]` (`label`, `href`) |

---

## 3. Contact & Security Policies

### 3.1 Contact Policy
- The contact interface uses direct `mailto:hellohaoyicheah@gmail.com` and profile links (GitHub, LinkedIn).
- Do NOT replace this with unauthenticated third-party form delivery endpoints unless explicitly requested by the user.

### 3.2 PDF Metadata Stripping Policy
- Whenever `public/resume.pdf` is added or modified, metadata MUST be stripped before committing:
  ```bash
  exiftool -all= public/resume.pdf
  # or
  mat2 --inplace public/resume.pdf
  ```

---

## 4. Verification & Validation Protocol

Before completing any task, agents must execute and verify:

```bash
# 1. Typecheck and Astro template diagnostics (0 errors, 0 warnings required)
npm run check

# 2. Build static production artifact
npm run build
```

### Verification Checklist:
- [x] `npm run check` returns `0 errors` and `0 warnings`.
- [x] `npm run build` succeeds and writes static routes to `dist/`.
- [x] All pages (`/`, `/about`, `/experience`, `/projects`, `/contact`) render cleanly.
- [x] `sitemap-index.xml` and `robots.txt` exist in `dist/`.
- [x] `public/resume.pdf` is present and accessible at `/resume.pdf`.
- [x] Navigation links are consistent across all layouts.
- [x] Gitleaks secret scanner and SHA-pinned actions are configured in `.github/workflows/deploy.yml`.
