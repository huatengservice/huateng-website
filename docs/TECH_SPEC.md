# Technical Specification
## 華騰工程行 — Business Website

**Status:** Draft v1
**Companion to:** PRD.md

---

## 1. Stack
- **Framework:** Next.js (App Router), latest stable version
- **Language:** TypeScript (recommended for maintainability; flag if you'd 
  prefer plain JavaScript instead)
- **Styling:** Tailwind CSS (fast to build with, easy to hand off/maintain, 
  pairs well with the design tokens below)
- **i18n:** `next-intl` or `next-i18next` for the zh-TW/English toggle 
  (decide during scaffold PR — next-intl has better App Router support as 
  of early 2026, verify current recommendation when building)
- **Hosting:** Vercel (free tier)
- **Forms:** Third-party form handler (Formspree, Web3Forms, or similar free 
  tier) unless a Vercel serverless function is preferred — see PRD open question
- **Image handling:** `next/image` for automatic optimization; placeholder 
  images via a placeholder service (e.g. Picsum) until real photos are supplied

## 2. Folder Structure (proposed)
```
/app
  /[locale]
    /page.tsx              → Home
    /services/page.tsx
    /gallery/page.tsx
    /about/page.tsx
    /contact/page.tsx
    /layout.tsx             → shared header/footer/nav
/components
  /Header.tsx
  /Footer.tsx
  /LanguageToggle.tsx
  /TestimonialCarousel.tsx
  /ServiceCard.tsx
  /ContactForm.tsx
  /CalendlyEmbed.tsx
  /TrustBadge.tsx           → 甲級證照 badge
/content
  /services.json            → service list (name, description, icon)
  /testimonials.json         → curated testimonial data
  /site-config.json          → phone, LINE, address, map coords, etc.
/public
  /images/                   → placeholder + real photos
  /logo.svg
/docs
  business-brief.md
  PRD.md
  TECH_SPEC.md
  TEST_PLAN.md
  SETUP.md
```

## 3. Data Model (static content, no database needed)
Since this is a static marketing site, content lives in JSON files under 
`/content` rather than a database or CMS. This keeps the build simple while 
still separating content from components, so future content edits (or a 
future CMS migration) don't require touching component code.

Example `services.json` shape:
```json
[
  {
    "id": "emergency",
    "icon": "zap",
    "name_zh": "24小時緊急維修",
    "name_en": "24-Hour Emergency Repair",
    "description_zh": "...",
    "description_en": "..."
  }
]
```

Example `testimonials.json` shape:
```json
[
  {
    "author": "Laura Liu",
    "rating": 5,
    "text_zh": "...",
    "text_en": "..."
  }
]
```

## 4. Third-Party Integrations
- **Calendly:** inline embed widget on Contact page (`https://calendly.com/huateng-service/30min`)
- **Google Maps:** embedded iframe on Contact page, pinned to 桃園大溪 location
- **LINE:** static QR code image + deep link (`line://ti/p/@yourlineid` once 
  LINE ID is provided) — placeholder until then
- **Google Reviews:** external link to Google Business profile for v1; 
  live widget (Elfsight/EmbedSocial) is a documented future enhancement, 
  not required now

## 5. Environment Variables
None required for v1 unless:
- A form service requires an API key → store in Vercel project environment 
  variables, never commit to the repo
- Google Maps uses an API-key-based embed rather than a plain iframe → same rule

## 6. SEO & Performance
- Per-page `<title>` and `<meta description>`, localized per language
- Open Graph tags for social sharing previews
- `sitemap.xml` and `robots.txt` generated via Next.js conventions
- Semantic HTML (proper heading hierarchy, `<nav>`, `<main>`, `<footer>`)
- Images served via `next/image` for automatic lazy-loading and sizing
- Target Lighthouse mobile performance score ≥ 90 (see PRD non-functional 
  requirements)

## 7. Browser/Device Support
Latest 2 versions of Chrome, Safari, Edge, Firefox; iOS Safari and Android 
Chrome for mobile (majority of expected traffic).

## 8. Deployment
- **During development:** no hosting connected yet — review each PR by 
  running locally (`npm run dev`), not via preview links
- **At the end, once the full site is built:** connect Vercel to the repo 
  (see SETUP.md) — this triggers the first deployment and, going forward, 
  every future push to `main` auto-deploys to production
- No manual deploy steps required once Vercel is connected

## 9. Open Technical Decisions
- [ ] TypeScript vs JavaScript — defaulting to TypeScript unless you object
- [ ] next-intl vs next-i18next — decide at scaffold time
- [ ] Form backend choice — see PRD section 4
- [ ] Whether to add a lightweight CMS later if the business wants to 
  self-edit content without a developer (e.g. Sanity, Contentful free tier) 
  — not needed for v1
