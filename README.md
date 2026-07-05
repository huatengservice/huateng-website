# 華騰工程行 — Business Website

Marketing website for 華騰工程行 (Hua Teng Engineering), a plumbing & electrical
services business in 桃園大溪 (Daxi, Taoyuan), Taiwan.

繁體中文 site built with Next.js App Router, TypeScript, Tailwind CSS, and
next-intl (English version removed at the owner's request 2026-07 — restore
from git history if needed). See `/docs` for the business brief, PRD, tech
spec, and test plan.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Quality checks

```bash
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Jest unit tests
npm run format:check # Prettier
npm run build        # production build
```

All of the above run in CI (GitHub Actions) on every PR.

## Content editing

Business content lives in JSON files, separate from components:

- `content/site-config.json` — phone, Calendly URL, LINE ID, map embed, addresses
- `content/services.json` — service list (zh/en names, descriptions)
- `content/testimonials.json` — curated Google-review testimonials (zh/en)
- `messages/zh-TW.json` — all UI copy

## Deployment

Hosted on Vercel. Every push to `main` deploys to production automatically
once the repo is connected.
