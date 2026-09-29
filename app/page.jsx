import Image from 'next/image';
import Link from 'next/link';
import { DM_Serif_Display, Manrope } from 'next/font/google';
import {
  MapPin, BarChart3, Globe, Phone, Sparkles,
  ShieldCheck, TrendingUp, Users, CheckCircle2, Lock,
  HardHat, Hammer, Droplets, Warehouse, KeyRound, Flame, Eye,
} from 'lucide-react';
import AuditForm from './home/AuditForm';
import Nav from './home/Nav';
import Reveal, { CountUp } from './home/Reveal';
import Testimonials from './home/Testimonials';
import RankVideo from './home/RankVideo';
import {
  GoogleG, MicrosoftSquares, MetaMark, YelpMark,
  CallRailMark, GoHighLevelMark, GoogleLSAMark, GA4Mark,
} from './home/BrandLogos';

import './home/home.css';

// Scoped to the homepage rather than the root layout, so /schedule, /careers
// and the legal pages don't download fonts they never render.
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

/* ── Content — identical substance to /v2, restructured for scanning ────── */

// Partner claims about JZ Smart Media's own standing. Confirm each is current
// before this goes public, and swap the marks for official badge artwork from
// each programme where one is issued.
const PARTNERS = [
  { Mark: GoogleG, title: 'Google Partner', sub: 'Google Ads & LSA management' },
  { Mark: YelpMark, title: 'Yelp Advertising Partner', sub: 'Yelp Ads management' },
  { Mark: MetaMark, title: 'Meta Business Partner', sub: 'Facebook & Instagram advertising' },
  { Mark: MicrosoftSquares, title: 'Microsoft Advertising Partner', sub: 'Bing search advertising' },
];

const TECHNOLOGY = [
  { Mark: CallRailMark, title: 'CallRail', sub: 'Call tracking & attribution' },
  { Mark: GoHighLevelMark, title: 'GoHighLevel', sub: 'CRM & automation' },
  { Mark: GoogleLSAMark, title: 'Google Local Services Ads', sub: 'Lead generation' },
  { Mark: GA4Mark, title: 'Google Analytics 4', sub: 'Reporting & insights' },
];

// Quotes published verbatim from the live jzsmartmedia.com homepage. Clients
// are identified by trade and market only — no company names anywhere on this
// page, including image filenames.
const TESTIMONIALS = [
  {
    name: 'Mike R.',
    role: 'Chimney company · Ohio',
    rating: 5,
    content: "Since working with JZ. Smart Media our call volume has more than tripled. They know exactly how to target homeowners ready to book. Best investment we've made in years.",
    image: '/images/project-chimney.webp',
  },
  {
    name: 'Steve C.',
    role: 'Roofing contractor',
    rating: 5,
    content: 'The Yelp ads changed our business. JZ handled everything — setup, reviews, optimization — and within 6 weeks we had consistent inbound leads every single day.',
    image: '/images/project-roofing.webp',
  },
  {
    name: 'David K.',
    role: 'Restoration company · Los Angeles',
    rating: 5,
    content: 'Their CRM and AI setup changed how we operate. Automated follow-ups, review requests, missed call recovery — we close deals we would have lost before.',
    image: '/images/project-restoration.webp',
  },
];

const SPECIALTIES = [
  [HardHat, 'Roofing'],
  [Hammer, 'Remodeling'],
  [Warehouse, 'Garage Door'],
  [Flame, 'Chimney'],
  [Droplets, 'Restoration'],
  [KeyRound, 'Locksmith'],
  [Sparkles, 'Cleaning'],
];

const TRUST = [
  { icon: ShieldCheck, title: 'Accounts stay yours', sub: 'We work inside your platforms' },
  { icon: Phone, title: 'Every call tracked', sub: 'By source, not one shared number' },
  { icon: MapPin, title: 'Home services only', sub: 'Roofing to chimney, nothing else' },
  { icon: Users, title: 'One accountable team', sub: 'Paid, local, web and automation' },
  { icon: Globe, title: 'Miami, serving nationwide', sub: 'Local specialists, US-wide' },
];

const SERVICES = [
  {
    icon: BarChart3,
    title: 'Google Ads + landing pages',
    body: 'Campaigns organized by service, intent and market, with pages built to turn the right searches into calls.',
    tags: ['Search campaigns', 'Call tracking', 'Landing pages'],
  },
  {
    icon: ShieldCheck,
    title: 'Local Services Ads',
    body: 'Profile setup, budget pacing, lead review and dispute management to protect spend and strengthen placement.',
    tags: ['Google Guarantee', 'Lead disputes', 'Budget pacing'],
  },
  {
    icon: MapPin,
    title: 'Local SEO + Google Business Profile',
    body: 'Map visibility built through correct structure, service-area content, reviews, citations and ongoing optimization.',
    tags: ['GBP management', 'Local pages', 'Rank tracking'],
  },
  {
    icon: Sparkles,
    title: 'CRM, automation + AI',
    body: 'Missed-call recovery, lead follow-up, review requests and pipeline visibility so good leads do not disappear.',
    tags: ['GoHighLevel', 'SMS follow-up', 'AI workflows'],
  },
  {
    icon: Globe,
    title: 'Web, Yelp + conversion support',
    body: 'The supporting channels and digital assets your market needs—deployed when they improve the economics.',
    tags: ['Web development', 'Yelp Ads', 'Conversion rate'],
  },
];

// Every figure below is drawn from the three documented case studies.
const RESULTS = [
  { icon: TrendingUp, count: 533, suffix: '%', label: 'Call growth', sub: 'Chimney, Fairlawn OH — 33 to 209 tracked calls' },
  { icon: Phone, count: 441, prefix: '+', label: 'Additional monthly calls', sub: 'Roofing, South San Francisco — 89 to 530' },
  { icon: MapPin, count: 100, suffix: '%', label: 'Top-3 map coverage', sub: '81 of 81 grid points, Fairlawn & Akron' },
  { icon: BarChart3, count: 6.3, decimals: 1, suffix: '×', label: 'Call volume', sub: 'Against the client’s own starting baseline' },
];

const INDUSTRIES = [
  [HardHat, 'Roofing', 'High-ticket campaigns built around inspection requests, repair urgency and storm demand.'],
  [Hammer, 'Remodeling', 'Qualified project inquiries with service pages and forms that screen for fit.'],
  [Droplets, 'Restoration', 'Fast-response campaigns and routing for water, fire and mold emergencies.'],
  [Warehouse, 'Garage Door', 'Call-first search and LSA strategies designed for immediate service intent.'],
  [KeyRound, 'Locksmith', 'Local visibility, lead disputes and response speed managed as one system.'],
  [Flame, 'Chimney', 'Seasonal demand planning that protects margin while the market gets crowded.'],
];

const CASES = [
  {
    n: '01',
    title: 'Roofing — South San Francisco, CA',
    summary:
      'Two channels shared one tracking number, so no call could be attributed. We rebuilt the site around real services and locations, fixed listings across Yelp, Apple Maps and Angi, then separated tracking across GBP, LSA, Google Ads and Yelp.',
    points: [
      'Complete website rebuild with service and location pages',
      'Google Business Profile and citation clean-up',
      'Local Services Ads improved, Google Ads launched',
      'Call tracking separated by source',
    ],
    before: '89',
    after: '530',
    beforeLabel: 'Aug 2025',
    afterLabel: 'Jan 2026',
    stats: [['+441', 'calls/mo'], ['496%', 'growth'], ['~5 mo', 'to result']],
    img: {
      src: '/assets/case-roofing-ssf-call-growth.jpg',
      width: 1600,
      height: 900,
      alt: 'CallRail before and after: 89 calls in August 2025 rising to 530 in January 2026',
      caption: 'CallRail, calls longer than 60 seconds. Calls are not the same as booked jobs.',
    },
  },
  {
    n: '02',
    title: 'Chimney — Fairlawn, OH',
    summary:
      'A complete website and local foundation from scratch. We verified and optimized the Google Business Profile, expanded mapped visibility across the greater Akron area, and connected accurate tracking across every channel.',
    points: [
      'Website build and Google Business Profile verification',
      'Local SEO across Fairlawn and greater Akron',
      'Local Services Ads and Google Ads',
      'Call tracking across GBP, LSA, Ads and website',
    ],
    before: '33',
    after: '209',
    beforeLabel: 'Apr 2026',
    afterLabel: 'Sept 2026',
    stats: [['+176', 'calls'], ['533%', 'growth'], ['100%', 'top-3 coverage']],
    img: {
      src: '/assets/case-chimney-fairlawn-rank-grid.jpg',
      width: 1600,
      height: 978,
      alt: 'Rank grid across Fairlawn and Akron moving from 20+ at every point to top 2 at every point',
      caption: 'Every tracked point moved from 20+ into the top 3, with 72 at position #1.',
    },
  },
  {
    n: '03',
    title: 'Home services — Lower Manhattan & Brooklyn, NY',
    summary:
      'Every tracked point across Lower Manhattan, Jersey City and the Brooklyn waterfront sat outside position 20. We rebuilt local relevance around the profile and service area, then tracked the grid across multiple dates rather than one good day.',
    points: [
      'Google Business Profile and service-area rebuild',
      'Local SEO in a top-tier competitive market',
      'Citation and relevance clean-up',
      'Multi-date rank grid tracking',
    ],
    before: '20+',
    after: 'Top 3',
    beforeLabel: 'Every point',
    afterLabel: 'Every point',
    stats: [['42', 'points at #1'], ['49/49', 'in top 3'], ['100%', 'coverage']],
    img: {
      src: '/assets/case-manhattan-rank-grid.jpg',
      width: 1280,
      height: 783,
      alt: 'Rank grid across Lower Manhattan and Brooklyn moving from 20+ at every point to top 3',
      caption: 'Recorded across multiple tracking dates. Map position is not the same as calls or booked jobs.',
    },
  },
];

/**
 * Recorded rank grids for the case study 01 client. The source recordings carry
 * the business name and street address in bars top and bottom — those are
 * cropped out in RankVideo and in the poster images, so no client is named.
 * Ordered oldest first so the strip reads as the actual before → after sequence.
 */
const RANK_VIDEOS = [
  {
    src: '/assets/local-seo-rank-timeline.mp4',
    poster: '/assets/local-seo-rank-timeline.jpg',
    stage: 'before',
    stageLabel: 'Starting grid',
    title: 'Roof repair · San Francisco',
    date: 'Sept 10, 2025',
    note: 'Positions 6–16 across most of the service area',
  },
  {
    src: '/assets/roof-repair-rank-growth.mp4',
    poster: '/assets/roof-repair-rank-growth.jpg',
    stage: 'after',
    stageLabel: 'After',
    title: 'Roof repair · San Francisco',
    date: 'Dec 31, 2025',
    note: 'Top 3 across nearly every tracked point',
  },
  {
    src: '/assets/roofing-contractor-rank-growth.mp4',
    poster: '/assets/roofing-contractor-rank-growth.jpg',
    stage: 'after',
    stageLabel: 'Sustained',
    title: 'Roofing contractor near me',
    date: 'Jan 19, 2026',
    note: 'Holding top 3 on a second high-intent term',
  },
];

const STEPS = [
  ['01', 'Audit', 'We review your website, Google Ads, LSA, GBP, tracking and follow-up flow.'],
  ['02', '90-day plan', 'We prioritize the highest-impact fixes for your market, trade and budget.'],
  ['03', 'Build + launch', 'Tracking comes first, then campaigns, local assets and conversion systems.'],
  ['04', 'Optimize + scale', 'We review real calls, improve lead quality and shift budget toward booked jobs.'],
];

const WHY = [
  [MapPin, 'Home services only', 'Strategies shaped around service areas, seasonality, urgency and high-value local searches.'],
  [Eye, 'Radical transparency', 'Qualified calls, booked jobs and cost per result come before impressions and clicks.'],
  [ShieldCheck, 'Your accounts stay yours', 'We work inside your platforms. Your data, profiles and history remain under your control.'],
  [Users, 'One accountable team', 'Paid media, local SEO, websites and automation work toward the same outcome.'],
];

const FAQS = [
  ['Do I need a long-term contract?', 'We recommend enough time to implement, collect clean data and optimize. The exact engagement and commitment are explained before you sign, based on the work required.'],
  ['Who owns my ad accounts and tracking?', 'You do. We work inside your accounts so your history, data and assets stay with your business.'],
  ['What budget do I need?', 'It depends on your trade, market and growth target. Your audit will include a realistic recommendation—and we will tell you if the economics do not make sense yet.'],
  ['What will I see in reporting?', 'Qualified calls, lead quality, booked jobs when that data is available, cost by channel and the actions we are taking next. Traffic metrics stay in context.'],
  ['Do you serve companies outside Miami?', 'Yes. JZ Smart Media is based in Miami and works with home service companies across the United States.'],
];

const AUDIT_CHECKS = [
  'Google Ads and search-term waste',
  'LSA profile, budget and lead quality',
  'Map visibility across your service area',
  'Tracking, missed calls and follow-up gaps',
];

export default function HomePage() {
  return (
    <div className={`v2-root ${dmSerif.variable} ${manrope.variable}`}>
      {/* Without JS the reveal wrappers would stay at opacity 0 — force them visible. */}
      <noscript>
        <style>{`.v2p-reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <a className="skip" href="#main">Skip to content</a>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="site-nav">
        <div className="wrap nav-inner">
          <Link href="/" className="brand-lockup">
            <Image className="brand-monogram" src="/assets/jz-monogram-refined.png"
              alt="JZ Smart Media" width={509} height={360} priority />
            <span className="brand-name">SMART MEDIA</span>
          </Link>
          <Nav />
        </div>
      </nav>

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <header className="v2p-hero">
          <div className="wrap v2p-hero-grid">
            <div>
              <Reveal variant="up" delay={0}>
                <p className="eyebrow">Home service growth specialists</p>
              </Reveal>
              <Reveal variant="up" delay={90}>
                <h1>More calls. <span>More booked jobs.</span> Less guesswork.</h1>
              </Reveal>
              <Reveal variant="up" delay={180}>
                <p className="lead">
                  Google Ads, Local Services Ads, local SEO and follow-up systems managed as one
                  revenue engine — so you can see which channel produced every call.
                </p>
              </Reveal>
              <Reveal variant="up" delay={270}>
                <div className="v2p-hero-actions">
                  <a className="btn btn-primary" href="#audit">
                    Get your free growth audit <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-secondary" href="#work">See our work</a>
                </div>
              </Reveal>
              <Reveal variant="up" delay={360}>
                <div className="v2p-reassure">
                  <span><CheckCircle2 size={15} aria-hidden="true" />No obligation</span>
                  <span><Lock size={15} aria-hidden="true" />Your data stays yours</span>
                  <span><Phone size={15} aria-hidden="true" />Reply within one business day</span>
                </div>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={200} className="v2p-hero-visual">
              <Image
                src="/assets/jz-dashboard-hero.jpg"
                alt="JZ Smart Media lead reporting dashboard on a laptop and phone"
                width={1122}
                height={1402}
                sizes="(max-width: 960px) 100vw, 48vw"
                priority
              />
              <div className="v2p-hero-badge">
                <small>One account · one month</small>
                <strong>239</strong>
                <em>tracked calls · GBP, Ads, LSA</em>
              </div>
              <p className="v2p-hero-caption">Reporting view · illustrative</p>
            </Reveal>
          </div>
        </header>

        {/* ── Credentials ────────────────────────────────────────────────── */}
        <section className="v2p-section tight" style={{ paddingTop: 0, paddingBottom: 'clamp(22px, 2.6vw, 34px)' }}>
          <div className="wrap">
            <Reveal variant="up" className="v2p-creds">
              <p className="v2p-bar-label">Platform partners &amp; certifications</p>
              <div className="v2p-logos">
                {PARTNERS.map(({ Mark, title, sub }, i) => (
                  <Reveal variant="up" delay={i * 90} className="v2p-logo" key={title}>
                    <span className="v2p-logo-mark"><Mark size={26} /></span>
                    <b>{title}</b>
                    <span>{sub}</span>
                  </Reveal>
                ))}
              </div>

              <div className="v2p-divider" />

              <p className="v2p-bar-label">Technology we work with</p>
              <div className="v2p-logos tech">
                {TECHNOLOGY.map(({ Mark, title, sub }, i) => (
                  <Reveal variant="up" delay={i * 90} className="v2p-logo" key={title}>
                    <span className="v2p-logo-mark"><Mark size={24} /></span>
                    <span>
                      <b>{title}</b>
                      <span>{sub}</span>
                    </span>
                  </Reveal>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ── The problem ────────────────────────────────────────────────── */}
        <section className="v2p-section v2p-light">
          <div className="wrap v2p-head-split" style={{ marginBottom: 0 }}>
            <Reveal variant="left">
              <p className="eyebrow">The real problem</p>
              <h2>Clicks don&rsquo;t pay your team.</h2>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <p>
                You need to know which campaigns generated qualified calls, which calls became
                jobs, and where the next dollar should go.
              </p>
              <p style={{ marginTop: 14 }}>
                That means your ads, local presence, call tracking and follow-up cannot live in
                separate silos. We connect them around the number that matters: booked revenue.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────────────────────── */}
        <section className="v2p-section v2p-deep" id="services">
          <div className="wrap">
            <div className="v2p-head-split">
              <Reveal variant="left">
                <p className="eyebrow">What we do</p>
                <h2>Everything between the search and the booked job.</h2>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p>
                  A focused mix of acquisition, local visibility and conversion infrastructure —
                  managed by one team, measured against one number.
                </p>
              </Reveal>
            </div>

            <div className="v2p-cards grid32">
              {SERVICES.map(({ icon: Icon, title, body, tags }, i) => (
                <Reveal as="article" variant="up" delay={(i % 3) * 110} className="v2p-card" key={title}>
                  <div className="v2p-card-icon"><Icon size={21} aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="v2p-card-tags">
                    {tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Results band ───────────────────────────────────────────────── */}
        <section className="v2p-section" id="results">
          <div className="wrap">
            <div className="v2p-head-split">
              <Reveal variant="left">
                <p className="eyebrow">Real results for local businesses</p>
                <h2>Data-driven marketing. Measurable growth.</h2>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p>
                  Every number below comes from a named client account with the tracking screenshot
                  behind it — not an average across a portfolio.
                </p>
              </Reveal>
            </div>

            <div className="v2p-results">
              {RESULTS.map(({ icon: Icon, count, prefix, suffix, decimals, label, sub }, i) => (
                <Reveal variant="up" delay={i * 110} className="v2p-result" key={label}>
                  <div className="v2p-result-icon"><Icon size={19} aria-hidden="true" /></div>
                  <strong>
                    <CountUp value={count} prefix={prefix} suffix={suffix} decimals={decimals} />
                  </strong>
                  <span>{label}</span>
                  <small>{sub}</small>
                </Reveal>
              ))}
            </div>
            <p className="disclaimer">
              Client-specific results based on account and client reporting. Results vary by market,
              budget, competition and sales follow-up. Calls are not the same as booked jobs.
            </p>
          </div>
        </section>

        {/* ── Case studies ───────────────────────────────────────────────── */}
        <section className="v2p-section v2p-deep" id="work">
          <div className="wrap">
            <Reveal variant="up" className="v2p-head center">
              <p className="eyebrow">Our work</p>
              <h2>Three builds, start to finish.</h2>
              <p>
                What was broken, what we changed, and what happened to the phone — with the
                tracking behind each claim.
              </p>
            </Reveal>

            {CASES.map(({ n, title, summary, points, before, after, beforeLabel, afterLabel, stats, img }, i) => (
              <div
                key={n}
                className={`v2p-split${i % 2 === 1 ? ' reverse' : ''}`}
                style={{ marginTop: i === 0 ? 0 : 'clamp(46px, 6vw, 84px)' }}
              >
                <Reveal variant={i % 2 === 1 ? 'right' : 'left'}>
                  <p className="eyebrow">Case study {n}</p>
                  <h3 style={{ marginTop: 16, fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>{title}</h3>
                  <p style={{ marginTop: 16, color: 'var(--muted)', lineHeight: 1.7 }}>{summary}</p>

                  <ul className="v2p-checklist">
                    {points.map((p) => (
                      <li key={p}><CheckCircle2 size={17} aria-hidden="true" />{p}</li>
                    ))}
                  </ul>

                  <div className="case-study-metrics" style={{ marginTop: 26, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="case-study-beforeafter" style={{ gridColumn: '1 / -1' }}>
                      <div style={{ textAlign: 'center' }}>
                        <b>{before}</b><em>{beforeLabel}</em>
                      </div>
                      <i aria-hidden="true">→</i>
                      <div style={{ textAlign: 'center' }}>
                        <b className="after">{after}</b><em>{afterLabel}</em>
                      </div>
                    </div>
                    {stats.map(([value, label]) => (
                      <div className="case-study-metric" key={label}>
                        <strong style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal
                  as="figure"
                  variant={i % 2 === 1 ? 'left' : 'right'}
                  delay={140}
                  className="v2p-split-visual"
                  style={{ margin: 0 }}
                >
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height}
                    sizes="(max-width: 960px) 100vw, 560px" />
                  <figcaption>{img.caption}</figcaption>
                </Reveal>
              </div>
            ))}

            {/* Rank videos belong to case study 01 — same client, same market,
                and the dates line up with its call growth. */}
            <div className="v2p-videos">
              <Reveal variant="up" className="v2p-videos-head">
                <h4>Watch the rankings move — case study 01.</h4>
                <p>
                  Recorded rank grids across multiple tracking dates, not a single hand-picked
                  screenshot. The map moved first; the calls followed.
                </p>
              </Reveal>

              <div className="v2p-video-grid">
                {RANK_VIDEOS.map(({ src, poster, stage, stageLabel, title, date, note }, i) => (
                  <Reveal variant="up" delay={i * 110} className="v2p-video-card" key={src}>
                    <div style={{ position: 'relative' }}>
                      <span className={`v2p-video-stage ${stage}`}>{stageLabel}</span>
                      <RankVideo
                        src={src}
                        poster={poster}
                        label={`${title}, rank grid recorded ${date}`}
                      />
                    </div>
                    <div className="v2p-video-meta">
                      <b>{title}</b>
                      <em>{date}</em>
                      <span>{note}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="disclaimer">
                Recorded for the case study 01 client, South San Francisco. Map position is not the
                same as calls or booked jobs.
              </p>
            </div>
          </div>
        </section>

        {/* ── Testimonials + specialities ────────────────────────────────── */}
        <section className="v2p-section">
          <div className="wrap">
            <Reveal variant="up" className="v2p-head center">
              <p className="eyebrow">Trust &amp; expertise</p>
              <h2>Built for local service businesses across the U.S.</h2>
              <p>
                Proven platform partnerships, documented results and industry-specific expertise —
                in the words of the owners we work for.
              </p>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <Testimonials items={TESTIMONIALS} />
            </Reveal>

            <p className="v2p-bar-label" style={{ marginTop: 46 }}>Industries we specialize in</p>
            <div className="v2p-ind-strip">
              {SPECIALTIES.map(([Icon, label], i) => (
                <Reveal variant="up" delay={i * 70} className="v2p-ind" key={label}>
                  <Icon size={24} aria-hidden="true" />
                  <b>{label}</b>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries ─────────────────────────────────────────────────── */}
        <section className="v2p-section">
          <div className="wrap">
            <div className="v2p-head-split">
              <Reveal variant="left">
                <p className="eyebrow">Industry focus</p>
                <h2>We know how local service buyers search.</h2>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p>
                  Every trade has a different urgency, sales cycle and lead-quality problem. Your
                  strategy should reflect that.
                </p>
              </Reveal>
            </div>
            <div className="v2p-cards three">
              {INDUSTRIES.map(([Icon, title, body], i) => (
                <Reveal as="article" variant="up" delay={(i % 3) * 110} className="v2p-card" key={title}>
                  <div className="v2p-card-icon"><Icon size={21} aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ────────────────────────────────────────────────────── */}
        <section className="v2p-section v2p-light" id="process">
          <div className="wrap">
            <div className="v2p-head-split">
              <Reveal variant="left">
                <p className="eyebrow">Our process</p>
                <h2>Clarity first. Then execution.</h2>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p>
                  You should know what is broken, what we are changing and how success will be
                  measured before more money is spent.
                </p>
              </Reveal>
            </div>
            <div className="v2p-steps">
              {STEPS.map(([n, title, body], i) => (
                <Reveal variant="up" delay={i * 130} className="v2p-step" key={n}>
                  <div className="v2p-step-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  {i < STEPS.length - 1 && <div className="v2p-step-arrow" aria-hidden="true">→</div>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why JZ ─────────────────────────────────────────────────────── */}
        <section className="v2p-section v2p-deep" id="about">
          <div className="wrap v2p-split">
            <Reveal variant="left">
              <p className="eyebrow">Why JZ Smart Media</p>
              <h2 style={{ marginTop: 18, fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)' }}>
                Built for the messy reality of local service marketing.
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                We work across the full customer journey — from the search and the map listing to
                the answered call, the follow-up and the review. That is how we find problems a
                channel-only agency misses.
              </p>
              <a className="btn btn-primary" href="#audit" style={{ marginTop: 26 }}>
                Find the leaks in your funnel <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
            <div className="v2p-cards two">
              {WHY.map(([Icon, title, body], i) => (
                <Reveal as="article" variant="up" delay={i * 110} className="v2p-card" key={title} style={{ padding: '24px 22px' }}>
                  <div className="v2p-card-icon"><Icon size={20} aria-hidden="true" /></div>
                  <h3 style={{ fontSize: '1.02rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.86rem' }}>{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="v2p-section">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="v2p-head center">
              <p className="eyebrow">Frequently asked</p>
              <h2>Questions before we start.</h2>
            </div>
            <div className="faq-list" style={{ marginTop: 0 }}>
              {FAQS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p className="answer">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Operating principles ───────────────────────────────────────── */}
        {/* Sits here as the last reassurance before the form, rather than
            stacked under the credentials bar where the two read as duplicates. */}
        <section className="v2p-section tight" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Reveal variant="up" className="v2p-trust">
              <p className="v2p-trust-label">How we work with home service companies</p>
              <div className="v2p-trust-row">
                {TRUST.map(({ icon: Icon, title, sub }, i) => (
                  <Reveal variant="up" delay={i * 80} className="v2p-trust-item" key={title}>
                    <Icon size={22} aria-hidden="true" />
                    <b>{title}</b>
                    <span>{sub}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Final CTA + form ───────────────────────────────────────────── */}
        <section className="v2p-section" id="audit">
          <div className="wrap">
            <div className="v2p-cta">
              <div className="v2p-cta-grid">
                <div>
                  <p className="eyebrow" style={{ color: '#bfeeed' }}>Free growth audit</p>
                  <h2 style={{ marginTop: 16 }}>See what&rsquo;s costing you calls.</h2>
                  <p>
                    We review your acquisition and follow-up system, show you the biggest gaps and
                    explain what we would fix first — before you spend another dollar.
                  </p>
                  <ul className="v2p-cta-points" style={{ marginTop: 26 }}>
                    {AUDIT_CHECKS.map((c) => (
                      <li key={c}><CheckCircle2 size={17} aria-hidden="true" />{c}</li>
                    ))}
                  </ul>
                </div>
                <AuditForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link href="/" className="brand-lockup-full">
                <Image src="/assets/jz-logo-refined.png" alt="JZ Smart Media"
                  width={895} height={900} style={{ width: 154, height: 'auto' }} />
              </Link>
              <div className="footer-contact">
                <a href="mailto:yarden@jzsmartmedia.com">yarden@jzsmartmedia.com</a>
                <a href="tel:+13527556501">(352) 755-6501</a>
                <span>Miami, FL · Serving businesses nationwide</span>
              </div>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#work">Our Work</a>
              <a href="#audit">Contact</a>
              <Link href="/schedule">Schedule</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} JZ Smart Media. All rights reserved. Client results are not
            guarantees of future performance.
          </p>
        </div>
      </footer>

      <div className="mobile-bar">
        <a className="btn btn-secondary" href="tel:+13527556501">Call us</a>
        <a className="btn btn-primary" href="#audit">Free audit</a>
      </div>
    </div>
  );
}
