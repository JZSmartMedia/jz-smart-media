# JZ Smart Media — Agency Website

Marketing agency website for **JZ Smart Media**, a Miami-based digital marketing agency specializing in home service businesses. Built with Next.js 15 App Router.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion + GSAP + ScrollTrigger |
| Fonts | Fraunces (headings) · DM Sans (body) via `next/font` |
| Theme | next-themes (dark/light, defaults to dark) |
| Scheduling | Cal.com inline embed |
| Icons | lucide-react + inline SVG for brand icons |

---

## Pages

| Route | Description |
|---|---|
| `/` | Main landing page — hero, services, portfolio, process, testimonials, contact |
| `/schedule` | Booking page — Cal.com embeds for new clients (discovery call) and existing clients (check-in) |

---

## Key Features

- **Services carousel** — 6 service cards with local images, paginated on mobile
- **Portfolio gallery** — 3 project case studies with result metrics
- **Lead capture form** — inline in hero and contact section
- **Cal.com scheduling** — two embedded calendars (`yarden-zemer/30-min-discovery-call`, `yarden-zemer/client-check-in`)
- **WhatsApp float button** — links to `+1 (352) 755-6501`
- **Dark / light mode** — toggle in nav, persisted via next-themes
- **SEO** — meta tags, JSON-LD `MarketingAgency` schema, OG/Twitter cards, sitemap, robots

---

## Project Structure

```
app/
  layout.jsx          # Root layout — fonts, theme provider, global metadata, JSON-LD
  page.jsx            # Main landing page
  globals.css         # Global styles
  robots.js           # Generates /robots.txt
  sitemap.js          # Generates /sitemap.xml
  schedule/
    layout.jsx        # Schedule page metadata
    page.jsx          # Cal.com scheduling page

public/
  images/             # Service + portfolio images (webp)
  favicon.ico
```

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Used as `metadataBase` for absolute OG/Twitter URLs. Set to `https://jzsmartmedia.com` in production. |

---

## Deployment

Hosted on **Vercel**. Pushes to `main` deploy automatically.

> Before deploying, set `NEXT_PUBLIC_SITE_URL=https://jzsmartmedia.com` in the Vercel project environment variables.

---

## Business Info

| | |
|---|---|
| Business | JZ Smart Media |
| Location | Miami, FL (serves nationwide) |
| Phone | (352) 755-6501 |
| Email | info@jzsmartmedia.com |
