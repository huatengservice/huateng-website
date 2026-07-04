# Test Plan
## 華騰工程行 — Business Website

**Status:** Draft v1
**Companion to:** PRD.md, TECH_SPEC.md

---

## 1. Testing Philosophy
This is a marketing site, not a complex application — so testing should be 
proportionate: enough to catch real regressions (broken forms, broken links, 
layout breaks) without over-engineering test suites for a 5-page static site. 
The goal is confidence to merge PRs quickly, not 100% coverage for its own sake.

## 2. Testing Layers

### 2.1 Static Analysis (every commit)
- **ESLint** — catch code issues before they're committed
- **TypeScript compiler** (`tsc --noEmit`) — catch type errors
- **Prettier** (or equivalent) — consistent formatting, avoids noisy diffs in PRs

### 2.2 Unit Tests (Jest + React Testing Library)
Cover components with logic or conditional rendering, not static markup:
- `LanguageToggle` — switching locale updates displayed content
- `TestimonialCarousel` — rotates through items, pauses on hover/touch, 
  renders correct count
- `ContactForm` — validation (required fields, phone format), shows error 
  states, calls submit handler with correct data
- `TrustBadge` — renders certification text correctly per locale

Not worth unit testing: purely static components (Footer, simple cards) — 
these are better covered by visual/e2e checks.

### 2.3 End-to-End Tests (Playwright recommended)
Cover the critical user journeys, run against a deployed preview or local build:
1. Visitor can navigate to every page from the nav on both desktop and mobile viewport
2. Visitor can toggle language and see the page content change (zh-TW ↔ English)
3. Visitor can open the Calendly embed and it loads correctly
4. Visitor can submit the contact form with valid data and see a success state
5. Contact form shows validation errors for missing/invalid required fields
6. Click-to-call phone link has the correct `tel:` href
7. LINE link/QR is present and correctly formatted
8. Google Map embed loads on the Contact page
9. All internal links resolve (no broken links/404s)

### 2.4 Accessibility Checks (automated + spot manual)
- Run `axe-core` (via `@axe-core/playwright` or similar) against each page 
  as part of the e2e suite — catches contrast issues, missing alt text, 
  missing form labels, etc.
- Manual spot-check: keyboard-only navigation through the nav and contact form

### 2.5 Manual QA Checklist (before each merge to main / before launch)
- [ ] Visual check on real mobile device (not just browser devtools emulation)
- [ ] All placeholder content clearly identifiable as placeholder (no 
  accidentally-shipped lorem ipsum in production copy)
- [ ] Phone number, Calendly link, and map location are correct
- [ ] Both languages read naturally (no machine-translation artifacts)
- [ ] Cross-browser spot check (Chrome, Safari minimum)

## 3. CI Integration
Add a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every 
pull request:
1. Install dependencies
2. Run lint + type check
3. Run unit tests
4. Build the project (`next build`) — catches build-time errors before merge
5. (Optional, once e2e suite exists) Run Playwright tests against the Vercel 
   preview deployment URL for that PR

**Branch protection:** configure the GitHub repo so PRs cannot merge into 
`main` unless this CI workflow passes (Settings → Branches → branch protection 
rule on `main` requiring status checks to pass).

## 4. Definition of Done (per PR)
A PR is ready to merge when:
- [ ] CI passes (lint, type check, unit tests, build)
- [ ] Manual review of the Vercel preview deployment looks correct
- [ ] No console errors/warnings in the browser
- [ ] Responsive check done at mobile + desktop widths
- [ ] Commit messages clearly describe the change

## 5. Out of Scope for Testing (v1)
- Load/performance testing (traffic volume doesn't warrant it yet)
- Cross-device testing beyond the browsers/devices listed in TECH_SPEC.md
- Visual regression testing (screenshot diffing) — could be added later if 
  the design system grows more complex
