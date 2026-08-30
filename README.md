# cheahhaoyi.github.io

> Central front-door hub for the multi-repo personal portfolio and technical documentation ecosystem of **Hao Yi Cheah** (Network Engineer &bull; CISSP &bull; CCNA &bull; RHCSA &rarr; AI Security).

[![Build & Deploy](https://github.com/CheahHaoYi/CheahHaoYi.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/CheahHaoYi/CheahHaoYi.github.io/actions/workflows/deploy.yml)
[![Astro: 5.x](https://img.shields.io/badge/Astro-5.x-BC52EE.svg)](https://astro.build/)
[![Design System: @cheahhaoyi/site-kit](https://img.shields.io/badge/Design%20System-%40cheahhaoyi%2Fsite--kit-7c3aed.svg)](https://github.com/CheahHaoYi/site-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](LICENSE)

---

## 1. Overview & Architecture

This repository is deployed to the domain root (`https://cheahhaoyi.github.io/`) via GitHub Pages. It acts as the primary navigational hub across a multi-repository portfolio:

```
                          [ https://cheahhaoyi.github.io/ ] (Root Hub - this repo)
                                          │
        ┌─────────────┬─────────────┬─────┴───────┬──────────────┬─────────────┐
        ▼             ▼             ▼             ▼              ▼             ▼
      /cissp        /ccna        /rhcsa    /systemdesign    /projects     /about
  (CISSP Notes)  (CCNA Notes) (RHCSA Notes)  (SysDesign)   (Projects Hub) (Bio/Vision)
```

### Architectural Principles:
1. **Critical Naming Constraint**: This repository must remain named `cheahhaoyi.github.io` (or `CheahHaoYi.github.io`) to ensure GitHub Pages serves it at the root domain (`https://cheahhaoyi.github.io/`) rather than under a subpath `/reponame/`.
2. **Root Domain Deployment (No `base` configuration)**: Unlike sibling repositories which require `base: "/<reponame>"`, this root hub configures `site: "https://cheahhaoyi.github.io"` with **no `base`** in `astro.config.mjs`.
3. **Shallow Hub Content**: This repository does *not* host deep certification study notes or full project write-ups. It hosts high-level biographies, timelines, teaser cards, and plain absolute links (`/cissp`, `/ccna`, `/rhcsa`, `/systemdesign`, `/projects`) to sibling properties.
4. **Single Source of Truth Design System**: Consumes typed Astro components, tokens, and layouts directly from [`@cheahhaoyi/site-kit`](https://github.com/CheahHaoYi/site-kit) without duplicating styles or introducing CSS frameworks.

---

## 2. Information Architecture

| Route | Purpose | Key Components |
|---|---|---|
| `/` | **Homepage / Hero**: Core positioning statement, transition thesis (*Network Engineering &rarr; AI Security*), certification portals grid, and featured project highlights. | `<Layout>`, `<Card variant="glass" doubleBezel={true}>`, `<Button>`, `<Badge>`, `<Tag>` |
| `/about` | **About & Philosophy**: Narrative on background (NUS Computer Engineering, DTU Exchange), security domain synergy matrix (CISSP, CCNA, RHCSA, System Design, AI), and academic coursework. | `<Layout>`, `<Table>`, `<Prose>`, `<Card>` |
| `/experience` | **Work History Timeline**: Chronological engineering history (Espressif Systems BSP & ESP-IDF development), roles, and technical skills. | `<Layout>`, `<Card variant="glass">`, `<Tag>` |
| `/projects` | **Projects Index**: Teaser catalog driven by `src/data/projects.ts` linking out to live demos, code repositories, and detail routes. | `<Layout>`, `<Card variant="glass">`, `<Button>` |
| `/contact` | **Contact & Disclosures**: Direct communication channels (Email, GitHub, LinkedIn) and vulnerability reporting instructions. | `<Layout>`, `<Card>`, `<Button>`, `<Callout>` |
| `/public/resume.pdf` | **Sanitized Official Resume**: Downloadable PDF served at `/resume.pdf`. | Exif-sanitized PDF |

---

## 3. Content Registry Pattern

To maintain clean separation between presentation and data, all cross-repo links, projects, and career timelines are centralized in `src/data/`:

- [`src/data/knowledgeAreas.ts`](src/data/knowledgeAreas.ts): Registry of certification domains and sub-sites (`CISSP`, `CCNA`, `RHCSA`, `System Design`, `AI Security`). Adding a new certification portal (e.g. `CCNP`, `OSCP`) requires editing this single file.ub-sites (`CISSP`, `CCNA`, `RHCSA`, `AI Security`). Adding a new certification portal (e.g. `CCNP`, `OSCP`) requires editing this single file.
- [`src/data/projects.ts`](src/data/projects.ts): Registry of engineering and research projects (`AI Security Guardrails`, `RISC-V CPU`, `DLLM IoT`, `Carpark ML`, `Sharpe Analysis`, `YAMOM`).
- [`src/data/experience.ts`](src/data/experience.ts): Chronological career history and technical impact.
- [`src/data/education.ts`](src/data/education.ts): Academic degrees, specializations, and completed coursework.
- [`src/data/navigation.ts`](src/data/navigation.ts): Global navigation links across all hub routes.

---

## 4. Architectural Decisions

### 4.1 Contact Strategy (Zero-Dependency Static Design)
GitHub Pages hosts purely static files. Rather than relying on unauthenticated third-party form-forwarding services (which introduce failure modes, quota exhaustion, or credential leakage), this site uses:
- Direct `mailto:hellohaoyicheah@gmail.com` link.
- Verified GitHub and LinkedIn profile links.

### 4.2 PDF Metadata Sanitization Protocol
> [!IMPORTANT]
> **Before committing any updated `public/resume.pdf`**, all author, creator, software, and device metadata MUST be stripped to protect personal privacy:
> ```bash
> exiftool -all= public/resume.pdf
> # or using mat2:
> mat2 --inplace public/resume.pdf
> ```

### 4.3 SEO & Future Sitemap Merge
- `@astrojs/sitemap` automatically generates `sitemap-index.xml` for all routes in this hub at build time.
- `public/robots.txt` points search engines directly to `https://cheahhaoyi.github.io/sitemap-index.xml`.
- *Future Enhancement*: A build-time action to fetch sitemaps from sibling certification repositories (`/cissp/sitemap-index.xml`, `/rhcsa/sitemap-index.xml`, etc.) and merge them into a unified portfolio sitemap.

---

## 5. Development & Local Setup

### Prerequisites
- Node.js 22+ (LTS)
- npm 10+

### Installation & Execution
```bash
# Clone the repository
git clone git@github.com:CheahHaoYi/CheahHaoYi.github.io.git
cd CheahHaoYi.github.io

# Install dependencies (fetches @cheahhaoyi/site-kit)
npm install

# Start local Astro dev server
npm run dev

# Run strict Astro & TypeScript typechecking
npm run check

# Build production static distribution (output to ./dist)
npm run build
```

---

## 6. CI/CD & Security Controls

Deployments are fully automated via GitHub Actions in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
- **Commit SHA Pinning**: All third-party GitHub Actions are pinned to immutable commit SHAs.
- **Gitleaks Secret Scanning**: Scans every commit and pull request for accidental credential leaks.
- **Least-Privilege Permissions**: Global `permissions: contents: read`; elevated `pages: write` and `id-token: write` restricted solely to the production deploy job.
- **Concurrency Management**: `concurrency: { group: 'pages', cancel-in-progress: false }` prevents concurrent deployment clobbering.
- **Automated Dependency Updates**: [`.github/dependabot.yml`](.github/dependabot.yml) monitors npm packages and GitHub Actions weekly.

---

## 7. License

MIT &copy; Hao Yi Cheah