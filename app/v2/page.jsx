import Image from 'next/image';
import Link from 'next/link';
import AuditForm from './AuditForm';
import MobileNav from './MobileNav';
import './v2.css';

const INDUSTRIES = [
  ['01', 'Roofing', 'High-ticket campaigns built around inspection requests, repair urgency and storm demand.'],
  ['02', 'Remodeling', 'Qualified project inquiries with service pages and forms that screen for fit.'],
  ['03', 'Restoration', 'Fast-response campaigns and routing for water, fire and mold emergencies.'],
  ['04', 'Garage Door', 'Call-first search and LSA strategies designed for immediate service intent.'],
  ['05', 'Locksmith', 'Local visibility, lead disputes and response speed managed as one system.'],
  ['06', 'Chimney', 'Seasonal demand planning that protects margin while the market gets crowded.'],
];

const SERVICES = [
  {
    n: '01',
    title: 'Google Ads + landing pages',
    body: 'Campaigns organized by service, intent and market, with pages built to turn the right searches into calls.',
    tags: ['Search campaigns', 'Call tracking', 'Landing pages'],
  },
  {
    n: '02',
    title: 'Local Services Ads',
    body: 'Profile setup, budget pacing, lead review and dispute management to protect spend and strengthen placement.',
    tags: ['Google Guarantee', 'Lead disputes', 'Budget pacing'],
  },
  {
    n: '03',
    title: 'Local SEO + Google Business Profile',
    body: 'Map visibility built through correct structure, service-area content, reviews, citations and ongoing optimization.',
    tags: ['GBP management', 'Local pages', 'Rank tracking'],
  },
  {
    n: '04',
    title: 'CRM, automation + AI',
    body: 'Missed-call recovery, lead follow-up, review requests and pipeline visibility so good leads do not disappear.',
    tags: ['GoHighLevel', 'SMS follow-up', 'AI workflows'],
  },
  {
    n: '05',
    title: 'Web, Yelp + conversion support',
    body: 'The supporting channels and digital assets your market needs—deployed when they improve the economics.',
    tags: ['Web development', 'Yelp Ads', 'Conversion rate'],
  },
];

const VIDEO_PROOFS = [
  {
    src: '/assets/roof-repair-rank-growth.mp4',
    poster: '/assets/roof-repair-rank-growth.jpg',
    eyebrow: 'Ranking proof 01',
    title: 'Roof Repair · San Francisco',
    note: 'Royal Roofing · tracked over time',
    label: 'Roof Repair San Francisco ranking progression',
  },
  {
    src: '/assets/roofing-contractor-rank-growth.mp4',
    poster: '/assets/roofing-contractor-rank-growth.jpg',
    eyebrow: 'Ranking proof 02',
    title: 'Roofing Contractor Near Me',
    note: 'Royal Roofing · tracked over time',
    label: 'Roofing Contractor Near Me ranking progression',
  },
  {
    src: '/assets/local-seo-rank-timeline.mp4',
    poster: '/assets/local-seo-rank-timeline.jpg',
    eyebrow: 'Ranking proof 03',
    title: 'From the starting grid forward',
    note: 'Play the full multi-date timeline',
    label: 'Local SEO ranking timeline',
  },
];

const LIVE_REPORTS = [
  {
    featured: true,
    badge: 'Featured live result',
    name: 'ASAP Water Damage Restoration Los Angeles',
    keyword: 'emergency water removal',
    rank: '2.16',
    solv: '87.76%',
    meta: ['8 tracked scans', '7 × 7 grid', 'Los Angeles, CA'],
    href: 'https://www.localrankingtracker.com/trend-report/4705d51b38527aa/e6deb3889e9a976/',
  },
  {
    badge: 'Live ranking report',
    name: 'OakTree Chimney Solutions',
    keyword: 'chimney repair',
    rank: '2.68',
    solv: '72.84%',
    meta: ['7 tracked scans', '9 × 9 grid', 'Fairlawn, OH'],
    href: 'https://www.localrankingtracker.com/trend-report/79ca1acce913f3e/e6deb3889e9a976/',
  },
  {
    badge: 'Live ranking report',
    name: 'Mia Remodeling Contractors',
    keyword: 'remodeling contractors',
    rank: '4.55',
    solv: '58.02%',
    meta: ['7 tracked scans', '9 × 9 grid', 'North Miami Beach, FL'],
    href: 'https://www.localrankingtracker.com/trend-report/b794fef14313fb1/e6deb3889e9a976/?scan_key=536930e3bcffb8d',
  },
  {
    badge: 'Live ranking report',
    name: 'ASAP Water Damage Restoration Los Angeles',
    keyword: 'water damage restoration los angeles',
    rank: '4.26',
    solv: '44.44%',
    meta: ['18 tracked scans', '9 × 9 grid', 'Los Angeles, CA'],
    href: 'https://www.localrankingtracker.com/trend-report/f9e51a0478a5c85/e6deb3889e9a976/',
  },
];

const STEPS = [
  ['Step 01', 'Audit', 'We review your website, Google Ads, LSA, GBP, tracking and follow-up flow.'],
  ['Step 02', '90-day plan', 'We prioritize the highest-impact fixes for your market, trade and budget.'],
  ['Step 03', 'Build + launch', 'Tracking comes first, then campaigns, local assets and conversion systems.'],
  ['Step 04', 'Optimize + scale', 'We review real calls, improve lead quality and shift budget toward booked jobs.'],
];

const ABOUT_POINTS = [
  ['Home services only', 'Strategies shaped around service areas, seasonality, urgency and high-value local searches.'],
  ['Radical transparency', 'Qualified calls, booked jobs and cost per result come before impressions and clicks.'],
  ['Your accounts stay yours', 'We work inside your platforms. Your data, profiles and history remain under your control.'],
  ['One accountable team', 'Paid media, local SEO, websites and automation work toward the same outcome.'],
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

export default function V2Page() {
  return (
    <div className="v2-root">
      <a className="skip" href="#main">Skip to content</a>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="site-nav">
        <div className="wrap nav-inner">
          <Link href="/v2" className="brand-lockup">
            <Image
              className="brand-monogram"
              src="/assets/jz-monogram-refined.png"
              alt="JZ Smart Media"
              width={509}
              height={360}
              priority
            />
            <span className="brand-name">SMART MEDIA</span>
          </Link>
          <MobileNav />
        </div>
      </nav>

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Home service growth specialists</p>
              <h1>
                More calls. <span>More booked jobs.</span> Less guesswork.
              </h1>
              <p className="lead">
                Google Ads, Local Services Ads, local SEO and follow-up systems managed as one
                revenue engine for home service companies.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#audit">
                  Get your free growth audit <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-secondary" href="#results">See a client result</a>
              </div>
              <div className="microproof">
                <span><i aria-hidden="true" />Home services only</span>
                <span><i aria-hidden="true" />Accounts stay in your name</span>
                <span><i aria-hidden="true" />Based in Miami, serving nationwide</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src="/assets/jz-contractor-hero-v2.png"
                  alt="Home service contractor in a navy uniform outside a modern home"
                  fill
                  sizes="(max-width: 960px) 100vw, 55vw"
                  priority
                />
              </div>
              <div className="visual-stamp">Search to call to booked job</div>
              <div className="visual-card">
                <small>One account · one month</small>
                <strong>239 <em>tracked calls</em></strong>
                <span>Google Ads · LSA · Google Maps</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Proof bar ──────────────────────────────────────────────────── */}
        <section className="proofbar" style={{ padding: 0 }}>
          <div className="wrap proof-grid">
            <div className="proof-cell proof-intro">
              Built for contractors who want revenue visibility—not another marketing dashboard.
            </div>
            <div className="proof-cell">
              <strong>Google Ads</strong>
              <span>high-intent demand capture</span>
            </div>
            <div className="proof-cell">
              <strong>LSA + Maps</strong>
              <span>local visibility and trust</span>
            </div>
            <div className="proof-cell">
              <strong>CRM + AI</strong>
              <span>faster follow-up and fewer missed leads</span>
            </div>
          </div>
        </section>

        {/* ── Industries ─────────────────────────────────────────────────── */}
        <section id="industries">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Industry focus</p>
                <h2 style={{ marginTop: 18 }}>We know how local service buyers search.</h2>
              </div>
              <p className="lead">
                Every trade has a different urgency, sales cycle and lead-quality problem. Your
                strategy should reflect that.
              </p>
            </div>
            <div className="industry-grid">
              {INDUSTRIES.map(([num, title, body]) => (
                <article className="industry" key={num}>
                  <span className="num">{num}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── The real problem ───────────────────────────────────────────── */}
        <section className="problem">
          <div className="wrap problem-grid">
            <div>
              <p className="eyebrow">The real problem</p>
              <h2 style={{ marginTop: 18 }}>Clicks don&rsquo;t pay your team.</h2>
            </div>
            <div>
              <p className="problem-copy">
                You need to know which campaigns generated qualified calls, which calls became
                jobs, and <span>where the next dollar should go.</span>
              </p>
              <p className="problem-note">
                That means your ads, local presence, call tracking and follow-up cannot live in
                separate silos. We connect them around the number that matters: booked revenue.
              </p>
            </div>
          </div>
        </section>

        {/* ── One connected system ───────────────────────────────────────── */}
        <section className="system" id="services">
          <div className="wrap system-grid">
            <div className="system-intro">
              <p className="eyebrow">One connected system</p>
              <h2 style={{ marginTop: 18 }}>Everything between the search and the booked job.</h2>
              <p className="lead">
                A focused mix of acquisition, local visibility and conversion infrastructure—managed
                by one team.
              </p>
              <a className="btn btn-primary" href="#audit">
                Find the leaks in your funnel <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <div className="service-list">
              {SERVICES.map(({ n, title, body, tags }) => (
                <article className="service" key={n}>
                  <span className="n">{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className="service-tags">
                      {tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Client result ──────────────────────────────────────────────── */}
        <section className="case" id="results">
          <div className="wrap">
            <div className="case-card">
              <div className="case-copy">
                <p className="eyebrow">Client result</p>
                <h2>OakTree Chimney Solutions</h2>
                <p>
                  A coordinated Google Ads, local SEO and Google Business Profile strategy built to
                  capture seasonal demand and convert it into qualified calls.
                </p>
              </div>
              <div className="case-metrics">
                <div className="metric">
                  <strong>+340%</strong>
                  <span>Lead increase</span>
                  <small>within the reported 90-day period</small>
                </div>
                <div className="metric">
                  <strong>−62%</strong>
                  <span>Cost per lead</span>
                  <small>compared with the prior benchmark</small>
                </div>
              </div>
            </div>
            <p className="disclaimer">
              Client-specific result based on account and client reporting. Results vary by market,
              budget, competition and sales follow-up.
            </p>

            {/* CallRail proof */}
            <div className="call-proof-card">
              <div className="call-proof-copy">
                <p className="eyebrow">One month · one account</p>
                <strong>239</strong>
                <h3>Tracked calls in August</h3>
                <p>
                  Calls attributed across Google Business Profile, Google Ads, Local Services Ads
                  and website tracking.
                </p>
                <p className="call-proof-note">
                  CallRail account screenshot · August 1–31, 2026. Calls are not the same as booked jobs.
                </p>
              </div>
              <div className="call-proof-visual">
                <Image
                  src="/assets/callrail-239-calls-august.png"
                  alt="CallRail dashboard showing 239 tracked calls for August"
                  width={1960}
                  height={802}
                  sizes="(max-width: 960px) 100vw, 65vw"
                />
              </div>
            </div>

            {/* Ranking videos */}
            <div className="video-proof-head">
              <h3>Watch the rankings move.</h3>
              <p>
                Recorded local rank grids across multiple tracking dates—not a single hand-picked
                screenshot.
              </p>
            </div>
            <div className="video-proof-grid">
              {VIDEO_PROOFS.map(({ src, poster, eyebrow, title, note, label }) => (
                <article className="video-proof-card" key={src}>
                  <div className="video-frame">
                    <video controls playsInline preload="metadata" poster={poster} aria-label={label}>
                      <source src={src} type="video/mp4" />
                      Your browser does not support this video.
                    </video>
                  </div>
                  <div className="video-proof-copy">
                    <span>{eyebrow}</span>
                    <strong>{title}</strong>
                    <small>{note}</small>
                  </div>
                </article>
              ))}
            </div>

            {/* Live ranking reports */}
            <div className="live-report-grid">
              {LIVE_REPORTS.map((r) => (
                <article
                  className={`live-report-card${r.featured ? ' featured' : ''}`}
                  key={`${r.name}-${r.keyword}`}
                >
                  <div className="live-report-copy">
                    <span className="live-report-badge">{r.badge}</span>
                    <h4>{r.name}</h4>
                    <p className="live-report-keyword">&ldquo;{r.keyword}&rdquo;</p>
                    <div className="live-report-scores">
                      <div className="live-report-score">
                        <strong>{r.rank}</strong>
                        <span>Average rank</span>
                      </div>
                      <div className="live-report-score">
                        <strong>{r.solv}</strong>
                        <span>Share of local voice</span>
                      </div>
                    </div>
                    <div className="live-report-meta">
                      {r.meta.map((m) => <span key={m}>{m}</span>)}
                    </div>
                  </div>
                  <a
                    className="btn btn-secondary live-report-action"
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the live report <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ────────────────────────────────────────────────────── */}
        <section className="process" id="process">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">How we work</p>
                <h2 style={{ marginTop: 18 }}>Clarity first. Then execution.</h2>
              </div>
              <p className="lead">
                You should know what is broken, what we are changing and how success will be
                measured before more money is spent.
              </p>
            </div>
            <div className="steps">
              {STEPS.map(([n, title, body]) => (
                <article className="step" key={n}>
                  <span className="n">{n}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why JZ ─────────────────────────────────────────────────────── */}
        <section id="about">
          <div className="wrap about-grid">
            <div className="about-copy">
              <p className="eyebrow">Why JZ Smart Media</p>
              <h2 style={{ marginTop: 18 }}>Built for the messy reality of local service marketing.</h2>
              <p className="lead">
                We work across the full customer journey—from the search and the map listing to the
                answered call, the follow-up and the review. That is how we find problems a
                channel-only agency misses.
              </p>
              <div className="about-points" style={{ marginTop: 32 }}>
                {ABOUT_POINTS.map(([title, body]) => (
                  <div className="about-point" key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-photo">
              <Image
                src="/assets/jz-operations.jpg"
                alt="Home service professional preparing equipment beside a service vehicle"
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="faq">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Frequently asked</p>
                <h2 style={{ marginTop: 18 }}>Questions before we start.</h2>
              </div>
            </div>
            <div className="faq-list">
              {FAQS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p className="answer">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audit form ─────────────────────────────────────────────────── */}
        <section className="audit" id="audit">
          <div className="wrap audit-grid">
            <div>
              <p className="eyebrow">Free growth audit</p>
              <h2 style={{ marginTop: 18 }}>See what&rsquo;s costing you calls.</h2>
              <p className="lead">
                We will review your acquisition and follow-up system, show you the biggest gaps and
                explain what we would fix first.
              </p>
              <ul className="audit-list">
                {AUDIT_CHECKS.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <AuditForm />
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link href="/v2" className="brand-lockup-full">
                <Image
                  src="/assets/jz-logo-refined.png"
                  alt="JZ Smart Media"
                  width={895}
                  height={900}
                  style={{ width: 154, height: 'auto' }}
                />
              </Link>
              <div className="footer-contact">
                <a href="mailto:yarden@jzsmartmedia.com">yarden@jzsmartmedia.com</a>
                <a href="tel:+13527556501">(352) 755-6501</a>
                <span>Miami, FL · Serving businesses nationwide</span>
              </div>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#results">Results</a>
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

      {/* ── Mobile sticky bar ────────────────────────────────────────────── */}
      <div className="mobile-bar">
        <a className="btn btn-secondary" href="tel:+13527556501">Call us</a>
        <a className="btn btn-primary" href="#audit">Free audit</a>
      </div>
    </div>
  );
}
