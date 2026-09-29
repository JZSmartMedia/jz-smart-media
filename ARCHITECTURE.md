# JZ Smart Media — Architecture & Orientation

Read this before changing anything. It explains what each route is, why there
are three versions of the homepage, and where the data goes.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 ·
Supabase (Postgres + Storage) · Resend (email) · deployed as a static/hybrid
Next app.

---

## 1. Why there are three homepages

This is the first thing that confuses people. The site was rebuilt twice, and
both older versions were deliberately kept rather than deleted.

| Route | What it is | Status |
|---|---|---|
| `/` | **The live homepage.** Current design. | Active, indexed |
| `/v2` | First redesign attempt. Navy/teal, case studies, rank proof. | Frozen residue, `noindex` |
| `/legacy` | The original homepage. Black + purple gradient, Fraunces type. | Frozen residue, `noindex` |

**The history, in order:**

1. **`/legacy` was the original site.** Dark, purple-gradient, heavy animation.
   Its problem: the lead forms were not wired to anything — they showed a
   success message and discarded the submission. That was fixed before anything
   else (see §3).

2. **`/v2` was the first rebuild**, based on a design reference. It introduced
   the navy `#07111f` / teal `#69e2df` / indigo `#6e7fff` palette, DM Serif
   Display + Manrope typography, real client case studies and the ranking
   proof videos. It was built at `/v2` as a staging route so it could be
   reviewed live without touching the homepage.

3. **The current `/` is a restructured `/v2`** — same content and palette, but
   reorganised as a conversion landing page: trust bars, scannable card grids,
   alternating case-study layouts, scroll animations, testimonials. It was
   built at `/v2/premium`, reviewed, then promoted to `/`. The `/v2/premium`
   route no longer exists.

**Why the old ones were kept:** reference only. Both are statically prerendered
(no database access, no API calls on render), both are `noindex, nofollow`, and
neither is in `sitemap.xml`. They cost one prerendered HTML file each and
nothing at runtime. They do not compete with the homepage in search.

**Important:** `/v2` keeps its *own copies* of its stylesheet, form and nav
(`app/v2/v2.css`, `app/v2/AuditForm.jsx`, `app/v2/MobileNav.jsx`). This is
intentional — it is frozen, so changes to the live homepage cannot disturb it.
Do not try to deduplicate them.

---

## 2. Route map

```
/                     Homepage (active)          app/page.jsx + app/home/
/schedule             Booking page + interview form
/careers              Multi-step job application form
/privacy              Privacy Policy
/terms                Terms of Service
/legacy               Old homepage (residue, noindex)
/v2                   First redesign (residue, noindex)

/admin                Unified dashboard — tabbed, login-gated
/admin/login          Password login
/admin/leads          → redirects to /admin?tab=leads
/admin/applications   → redirects to /admin?tab=applications
```

### Homepage file layout

```
app/page.jsx          The page. Server component — content is in data arrays
                      at the top of the file, markup below.
app/home/
  home.css            Whole design system. Every rule is scoped under
                      `.v2-root` so it cannot leak into other pages.
  AuditForm.jsx       Lead form → POST /api/lead
  Nav.jsx             Sticky nav + mobile menu
  Reveal.jsx          Scroll-reveal wrapper + CountUp counter
  Testimonials.jsx    Client quote carousel
  RankVideo.jsx       Rank-grid video with cropped chrome (see §6)
  BrandLogos.jsx      Inline SVG partner/technology marks
```

The homepage is a **server component**. `Reveal`, `Testimonials`, `RankVideo`,
`Nav` and `AuditForm` are the only client components — keep it that way. The
content stays in the SSR HTML, which is what holds up LCP and lets crawlers
read the page.

---

## 3. Forms and where submissions go

There are three form paths. All of them send email first and persist second, so
a database problem never costs a submission.

| Form | Endpoint | Email | Stored in |
|---|---|---|---|
| Homepage audit form | `POST /api/lead` | Resend | `leads` |
| Careers application | `POST /api/apply` | Resend + attachments | `applications` + Storage |
| Interview booking (`/schedule`) | `POST /api/interview` | Resend | `interview_requests` |

### `/api/lead` in detail

Server-side validation, honeypot spam trap, then:

1. Sends a notification email via Resend to **ads@**, **yarden@** and
   **assistant@** jzsmartmedia.com, with `reply_to` set to the lead.
2. Inserts a row into `leads`, capturing IP, user-agent and referer.

If the Supabase insert fails it is logged and swallowed — the email has already
gone out, so the lead is not lost. If `RESEND_API_KEY` is missing the route
still returns success and logs a warning.

**`source` field** identifies which form produced the lead:

- `homepage-audit` — the current homepage
- `hero`, `contact` — the two forms on `/legacy`
- `v2-audit` — `/v2` (archived label)

`market` and `challenge` are only sent when filled, so the older forms keep
working even if those columns are missing.

---

## 4. Admin dashboard

`/admin` — one page, three tabs (Client Leads, Job Applications, Interview
Requests). Each tab swaps both the table and the stat tiles above it.

**Auth** is in [`middleware.js`](middleware.js), which gates every `/admin/*`
page and `/api/admin/*` endpoint. Nothing unauthenticated reaches the pages, so
they carry no auth checks of their own.

Login sets an httpOnly cookie holding a signed, expiring token —
`<expiry>.<HMAC-SHA256(expiry, ADMIN_SECRET)>` (see
[`lib/adminAuth.js`](lib/adminAuth.js)). Stateless, so there is no session
store. 7-day sessions. Web Crypto is used rather than `node:crypto` so the same
code runs in Edge middleware and Node route handlers.

`?secret=<ADMIN_SECRET>` still works for scripted JSON pulls, but prefer
logging in — a URL secret leaks through logs and `Referer` headers.

Login is rate limited to 8 attempts per 10 minutes per IP, in memory. **A
correct password is also rejected during a lockout** — restart the dev server if
you lock yourself out locally.

Nothing is hard-deleted from `leads` or `interview_requests`; `archived` is the
terminal status.

---

## 5. Database

Migrations live in `supabase/` and are run by hand in the Supabase SQL editor.
They are additive and safe to re-run.

| Table | Created by | Notes |
|---|---|---|
| `leads` | `supabase/leads.sql` | Also adds `market` / `challenge` columns |
| `interview_requests` | `supabase/interview_requests.sql` | Optional — the app degrades gracefully without it |
| `applications` | pre-existing | Careers form + session tracking |

If `interview_requests` does not exist, the Interviews tab explains how to
create it and the API returns `tableMissing: true` rather than a 500.

All tables have RLS enabled. The app uses the **service-role key**, which
bypasses RLS — so that key must never reach the browser. It is only read in
server code via `lib/supabase.js`.

### Environment variables

```
RESEND_API_KEY              Email delivery
SUPABASE_URL                Project URL
SUPABASE_SERVICE_ROLE_KEY   Service role (server only — never expose)
ADMIN_SECRET                Admin password / legacy URL secret
ANTHROPIC_API_KEY           Generates careers interview questions
```

---

## 6. Things that will bite you

**Client names are deliberately absent.** Case studies and testimonials are
attributed by trade and market only ("Chimney company · Ohio"), never by
company name. Image filenames were renamed for the same reason. Do not
reintroduce names — this was an explicit decision.

**The rank videos have cropped chrome.** The source recordings are 512×558 with
a dark bar top (business name + timestamp) and bottom (street address). The
frame shows only rows 24–534 via `aspect-ratio: 512/511` plus a scaled, offset
video. Native `<video controls>` **cannot** be used with that crop — the control
bar sits outside the visible box and gets clipped — which is why `RankVideo`
has a custom play button. The poster JPGs are permanently cropped on disk.

**Descendant CSS selectors have caused two bugs already.** `.v2p-result span`
and `.v2p-cred-text span` were catching nested `<span>`s inside `<strong>`,
shrinking numbers to label size and stacking star icons vertically. Prefer
direct-child (`>`) selectors or explicit classes inside these cards.

**Never set grid columns as an inline style.** Inline styles beat media
queries, so a responsive override silently fails. Use a class.

**Horizontal reveal animations cause mobile overflow.** `translate3d(34px…)`
pushes past the viewport until it resolves, producing a horizontal scrollbar.
Below 960px those variants animate vertically, and `.v2-root` has
`overflow-x: clip` as a guard. `clip` not `hidden` — `hidden` would break the
sticky nav.

**All SEO lives in the root layout,** not in any page: 114 keywords, the
JSON-LD block (MarketingAgency, FAQPage, OfferCatalog, WebSite + SearchAction,
23 Services, 10 cities) and the Google Search Console verification tag. This is
why swapping the homepage did not lose any of it. Do not move them into a page.

**Partner badges are recreations, not official artwork.** Google and Microsoft
use their standard published geometry; Meta, Yelp and the technology marks in
`BrandLogos.jsx` were drawn for this layout. If the agency is enrolled in those
partner programmes, each issues official badge files that should replace these.
The claims themselves need to be accurate and current.

**Hydration warnings in dev are usually a browser extension.** `bis_skin_checked`
attributes come from Bitdefender injecting into the DOM before React hydrates.
Test in a clean incognito window before investigating.

---

## 7. Local development

```bash
npm install
npm run dev     # http://localhost:3000 unless taken
npm run build   # always run before deploying
```

Requires `.env.local` with the variables in §5.

If the dev server refuses to start with *"Another next dev server is already
running"* and nothing is listening on the port, a stale lock is to blame:
kill the orphaned node process and `rm -rf .next/dev`. If routes start
404ing after an abrupt kill, clear the whole build cache with `rm -rf .next`.
