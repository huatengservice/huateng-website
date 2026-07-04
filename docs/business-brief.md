# Business Brief: 華騰工程行 (Hua Teng Engineering)

## Business Overview
- **Name:** 華騰工程行 (Hua Teng Engineering)
- **Industry:** Residential & commercial plumbing and electrical repair/installation services
- **Location:** 桃園大溪 (Daxi District, Taoyuan), Taiwan
- **Service area:** No area restrictions specified — serves broadly, based in 桃園大溪
- **Phone:** 0938-969-739
- **Calendly:** https://calendly.com/huateng-service/30min (for booking a short call)
- **Target customers:** Homeowners and small businesses needing repairs, installations, or emergency service
- **Reputation:** Strong local reputation — 60+ five-star Google reviews
- **Logo:** See logo.svg (navy circular badge, water-drop + lightning-bolt icon, amber accent) — 
  classic/professional style matching brand direction below

## Note on testimonial content
Source reviews (from screenshots) mention a business name directly in some text. 
Since our business name is 華騰工程行, all testimonial copy has been paraphrased 
to remove direct name-mentions from the original reviews, so there's no naming 
inconsistency on the site. If 華安水電行 is actually the same business under a 
prior/other name, flag this so the note can be removed.

## Placeholder Photos (until real photos are provided)
Use simulated/placeholder images for now (e.g. generic royalty-free plumbing/
electrical work photos or a placeholder image service like Lorem Picsum / 
Unsplash Source), clearly swappable later. Do not use screenshots or scraped 
images from the Google review screenshots — those are other people's photos 
and shouldn't appear on the live site.

## Key Differentiator (lead with this)
The team holds **甲級室內配線技術士** (Class A Electrical Technician License) — the highest 
certification level in Taiwan for indoor wiring. This level is typically held only by 
instructors or business owners running their own engineering firm, not typical technicians. 
This should be featured prominently:
- Home page trust badge
- Detailed explanation on the About page (what the certification means, why it matters to customers)

## Brand & Design Direction
- **Style:** Classic & professional — trustworthy, established, not flashy
- **Color palette:** Deep navy/charcoal as primary (signals stability, good for contract work), 
  warm amber/orange as accent for CTAs (signals speed/responsiveness) — open to refinement
- **Logo concept:** Simple, professional mark incorporating a water drop and/or lightning 
  bolt motif, paired with the 華安 name
- **Layout:** Clean, mobile-first (most customers search urgently from phone — 
  e.g. "水電 附近" / "24小時水電")

## Site Structure (5 pages)
1. **Home** — hero with value prop, 甲級證照 trust badge, primary CTA to book, 
   snapshot of services with links out, 2-3 featured testimonials
2. **Services** — detailed list (repair, installation, emergency/24hr call-out, 
   renovation wiring/plumbing, etc.), each with icon + short description
3. **Gallery** — before/after photos of past jobs (placeholders until real photos provided)
4. **About** — company story, explanation of 甲級 certification, team info
5. **Contact/Booking** — booking form, Calendly embed (free tier), phone number, 
   LINE contact/QR code, embedded Google Map + service area list

## Testimonials (real, paraphrased from actual Google reviews)
Use as an auto-rotating carousel (pauses on hover/touch — NOT a fast marquee), 
featuring 6-8 of these, with a "查看全部 Google 評論" button linking to the 
Google Business page:

1. **Laura Liu** ★★★★★ — Master was thorough, came to survey the site the same 
   day they called, gave a clear quote and appointment time
2. **王應明** ★★★★★ — Water tower issue assessed on-site, materials ready, 
   installed quickly
3. **Leon Chang** ★★★★★ — Great attitude, clean work, toilet installed 
   beautifully, very reasonable pricing
4. **江雁寧** ★★★★★ — Called and a technician was dispatched shortly after — 
   fast and fairly priced
5. **ANITA GU** ★★★★★ — Thought a burnt-out meter couldn't be fixed same-day, 
   but the team got it done fast
6. **Sherry Tseng** ★★★★★ — Owner is patient and gives professional advice; 
   stocking and installation were efficient
7. **happy happy** ★★★★★ — Professional and courteous, honest quote with no 
   upselling, fast workmanship, left the site clean
8. **Sabrina** ★★★★★ — Called in the morning about a clogged drain, technician 
   arrived by afternoon, fast service

Note: These are paraphrased. Exact original wording can be swapped in later 
since they are reviews of our own business.

## Language
- Traditional Chinese (zh-TW) as default
- English toggle accessible from every page
- Placeholder copy for services/company story can be drafted in both languages 
  and edited later — but testimonials and 甲級證照 messaging should stay accurate 
  to what's documented here, not replaced with generic filler

## Required Functionality
- Contact form (name, phone, service needed, message)
- Calendly embed for booking a short call (free tier)
- Responsive, mobile-first design
- Click-to-call phone button, prominent on mobile
- Language toggle (zh-TW / English) on every page
- Optional/future: live Google Reviews widget (e.g. Elfsight, EmbedSocial) to 
  auto-pull all reviews instead of manual updates — not required for v1

## Still Needed From Me
- [ ] Real business photos (team, vehicles, completed jobs) — using placeholders until then
- [ ] LINE ID / QR code
- [ ] Confirmation on the 華安 vs 華騰 naming question above

## Companion Documents
This brief covers business content and decisions. For full project scope, 
see these companion docs (same project knowledge / repo `/docs` folder):
- `PRD.md` — Product Requirements Document
- `TECH_SPEC.md` — Technical architecture and implementation spec
- `TEST_PLAN.md` — Testing strategy
- `SETUP.md` — GitHub + Vercel connection guide

## Development Process (SDLC)
This project should be built using standard professional practice, including 
automated testing (see TEST_PLAN.md):
- **Stack:** Next.js
- **Hosting:** Vercel (free tier)
- **Repo:** GitHub repo already created by user (get exact repo URL/name before starting)
- Version-controlled from the start — no work outside git
- Small, reviewable commits — not large monolithic changes
- Logical PR boundaries, e.g.:
  1. Project scaffold (Next.js init, folder structure, base layout, nav/footer)
  2. Home page
  3. Services page
  4. Gallery page
  5. About page (incl. 甲級證照 section)
  6. Contact/Booking page (form + Calendly embed)
  7. i18n / language toggle (zh-TW / English)
  8. Testimonials carousel component
  9. Polish pass (responsive QA, click-to-call, meta/SEO tags)
- Clear, descriptive commit messages per change
- Deploy to Vercel after each merged PR (or connect repo to Vercel for 
  automatic preview deployments per PR — recommended)
