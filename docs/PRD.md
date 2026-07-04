# Product Requirements Document (PRD)
## 華騰工程行 — Business Website

**Status:** Draft v1
**Owner:** [You]
**Last updated:** 2026-07-02

---

## 1. Purpose & Background
華騰工程行 is a plumbing/electrical services business based in 桃園大溪, Taiwan, 
with a strong existing reputation (60+ five-star Google reviews) but no web 
presence today. Customers currently find the business only through Google 
Maps/word of mouth. This project builds a professional website to:
- Convert local search interest (e.g. "水電 附近", "24小時水電") into bookings
- Establish credibility upfront via the 甲級室內配線技術士 certification and 
  real customer testimonials
- Provide a low-friction booking path (Calendly) alongside traditional contact 
  methods (phone, LINE) common in the Taiwan market

## 2. Goals & Success Criteria
| Goal | How we'll know |
|---|---|
| Visitors can quickly understand what the business offers and why to trust it | Certification + testimonials visible above the fold or within one scroll on Home |
| Visitors can book or contact with minimal friction | Calendly, phone, and LINE all reachable within 1 click from any page |
| Site works well on mobile (majority of traffic) | Passes mobile usability checks, click-to-call works, no horizontal scroll issues |
| Site is discoverable via search | Basic on-page SEO (meta tags, semantic HTML, sitemap) in place at launch |
| Bilingual accessibility | zh-TW default with working English toggle on every page |

This is a marketing/lead-gen site, not e-commerce — there's no payment processing, 
user accounts, or inventory system involved.

## 3. Target Users
- **Primary:** Homeowners in/near 桃園大溪 needing repair, installation, or 
  emergency plumbing/electrical service, often searching urgently on mobile
- **Secondary:** Small business owners needing occasional commercial service 
  (renovation wiring/plumbing, maintenance contracts)
- **Tertiary:** English-speaking residents/expats needing service (hence the 
  English toggle)

## 4. Scope

### In scope (v1)
- 5-page site: Home, Services, Gallery, About, Contact/Booking
- Bilingual content (zh-TW default, English toggle)
- Calendly embed for booking
- Contact form (name, phone, service needed, message) — see open question below 
  on where submissions go
- Click-to-call, LINE contact/QR
- Testimonials carousel (curated real reviews) + link to full Google reviews
- Embedded Google Map + service area note
- Responsive/mobile-first design
- Placeholder photos (to be replaced with real photos later)
- Basic SEO (meta tags, sitemap.xml, robots.txt, semantic structure)

### Out of scope (v1) — candidates for later phases
- Live Google Reviews widget (auto-pulling reviews) — noted as future enhancement
- Blog/content marketing section
- Online payments
- Customer account/login system
- Multi-location support (single location for now)
- CMS integration (content is currently hardcoded/static; revisit if the 
  business wants to self-edit content later)

### Open question to resolve before/during build
- **Contact form backend:** a static Next.js site has no built-in form handler. 
  Decide: (a) a simple serverless function on Vercel forwarding to email, 
  (b) a third-party form service (e.g. Formspree, Web3Forms — free tiers 
  exist), or (c) skip the form and rely on Calendly + phone/LINE only. 
  **Recommendation:** start with a free form service (fastest, no backend 
  code to maintain) unless you want emails routed through your own domain.

## 5. Functional Requirements by Page

### Home
- Hero section: business name, one-line value prop, primary CTA (book/call)
- 甲級室內配線技術士 trust badge, prominent placement
- Snapshot of services (3-4 cards) linking to Services page
- Testimonials carousel (2-3 featured, links to full set on relevant page/section)
- Secondary CTA: view all Google reviews (external link)

### Services
- List of services: repair, installation, emergency/24hr call-out, renovation 
  wiring/plumbing (expand list with business input if more services exist)
- Each service: icon, short description
- CTA to Contact/Booking from this page

### Gallery
- Grid of before/after project photos (placeholders initially)
- Captions optional (e.g. type of job, general area — no client-identifying info)

### About
- Company story (placeholder copy until provided/approved)
- Explanation of 甲級室內配線技術士 certification and what it means for customers
- Team info (placeholder until provided)

### Contact/Booking
- Calendly embed (30-min call)
- Contact form (pending backend decision above)
- Phone number, click-to-call
- LINE contact/QR code (placeholder QR until real one provided)
- Embedded Google Map
- Service area note (no restrictions specified — state broad service area, 
  based in 桃園大溪)

### Global (all pages)
- Header nav + footer (phone, LINE, social links if any, address)
- Language toggle (zh-TW / English), persists across navigation
- Consistent use of logo (logo.svg)

## 6. Non-Functional Requirements
- **Performance:** Lighthouse performance score ≥ 90 on mobile for Home page
- **Accessibility:** WCAG 2.1 AA baseline — semantic HTML, sufficient color 
  contrast (verify navy/amber palette meets contrast ratios), alt text on 
  all images, keyboard-navigable nav and forms
- **Browser/device support:** Latest 2 versions of Chrome, Safari, Edge, 
  Firefox; iOS Safari and Android Chrome for mobile
- **SEO:** Unique meta title/description per page, Open Graph tags, sitemap.xml, 
  robots.txt, semantic heading structure
- **Security:** No sensitive data collected beyond contact form fields; 
  standard HTTPS via Vercel; no hardcoded secrets in repo

## 7. Assumptions
- Business has no existing brand guidelines beyond what's captured in the 
  Business Brief (name, style direction) — logo/colors proposed here are a 
  starting point, not final until approved
- Photos, LINE QR code, and final copy will be supplied and swapped in 
  post-launch
- No multi-location or multi-language beyond zh-TW/English is needed at this time

## 8. Milestones (rough, adjust as work proceeds)
1. Project scaffold + design system setup
2. Home page
3. Services page
4. Gallery page
5. About page
6. Contact/Booking page + Calendly + form integration
7. i18n pass (English content + toggle wired everywhere)
8. Testimonials carousel
9. QA pass: responsive, accessibility, performance, cross-browser
10. Launch to Vercel production

## 9. Stakeholders
- **Business owner:** [You] — final approval on content, branding, launch
- **Developer/AI pair:** Claude Code, building against this spec
