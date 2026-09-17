import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

const GRADIENT = 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)';

/* ─── Building blocks used by the legal pages ───────────────────────────── */

export function Section({ id, n, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-14">
      <h2
        className="text-xl md:text-2xl font-black mb-5 flex items-baseline gap-3"
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', color: '#fff' }}
      >
        <span
          className="text-sm font-black bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT, fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-400">{children}</div>
    </section>
  );
}

export function P({ children }) {
  return <p>{children}</p>;
}

export function Bullets({ items }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: GRADIENT }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }) {
  return (
    <div
      className="px-5 py-4 rounded-xl text-[14px] leading-relaxed text-gray-300"
      style={{ background: 'rgba(102,126,234,0.07)', border: '1px solid rgba(102,126,234,0.2)' }}
    >
      {children}
    </div>
  );
}

export function Strong({ children }) {
  return <strong className="text-gray-200 font-semibold">{children}</strong>;
}

/* ─── Page shell ─────────────────────────────────────────────────────────── */

export default function LegalPage({ title, subtitle, updated, sections, otherHref, otherLabel, children }) {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: '#0a0a0a', fontFamily: 'var(--font-dm-sans), sans-serif' }}
    >
      {/* Header */}
      <header className="py-5 px-6 flex items-center justify-between max-w-5xl mx-auto border-b border-gray-800/60">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex items-baseline gap-1.5 select-none">
          <span
            className="text-2xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-none"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            JZ.
          </span>
          <span className="text-xs font-medium tracking-wide text-gray-400">Smart Media</span>
        </div>

        <div className="w-16" />
      </header>

      <main className="px-6 pt-14 pb-20 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase mb-5"
            style={{ background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.25)', color: '#a5b4fc' }}
          >
            Legal
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
          <p className="text-xs text-gray-600 mt-5">Last updated: {updated}</p>
        </div>

        <div className="grid lg:grid-cols-[210px_1fr] gap-12">
          {/* Table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-8">
              <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-600 mb-4">
                On this page
              </div>
              <ul className="space-y-2.5">
                {sections.map(({ id, title: sectionTitle }, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-[13px] text-gray-500 hover:text-gray-200 transition-colors leading-snug block"
                    >
                      <span className="text-gray-700 mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {sectionTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Body */}
          <article className="min-w-0">
            {children}

            {/* Contact */}
            <div
              className="mt-4 p-7 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,rgba(102,126,234,0.10),rgba(240,147,251,0.07))',
                border: '1px solid rgba(102,126,234,0.22)',
              }}
            >
              <h3
                className="text-lg font-black mb-2"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                Questions about this page?
              </h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Reach out and a real person will get back to you.
              </p>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:info@jzsmartmedia.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#667eea] flex-shrink-0" />
                  info@jzsmartmedia.com
                </a>
                <a
                  href="tel:+13527556501"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#667eea] flex-shrink-0" />
                  (352) 755-6501
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#667eea] flex-shrink-0" />
                  Miami, Florida, United States
                </div>
              </div>
            </div>

            <Link
              href={otherHref}
              className="inline-flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-gray-200 transition-colors"
            >
              Read our {otherLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm text-gray-500"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-baseline justify-center gap-1.5 mb-3">
          <span
            className="text-xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            JZ.
          </span>
          <span className="text-xs font-medium tracking-wide text-gray-500">Smart Media</span>
        </div>
        <p>© 2026 JZ Smart Media · Miami, FL · (352) 755-6501</p>
        <div className="flex items-center justify-center gap-5 mt-3 text-xs">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/schedule" className="hover:text-gray-300 transition-colors">Schedule</Link>
        </div>
      </footer>
    </div>
  );
}
