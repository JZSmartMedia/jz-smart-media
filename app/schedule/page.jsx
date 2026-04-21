'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BOOKINGS = [
  {
    id: 'new',
    emoji: '👋',
    title: 'New Client',
    description: "Let's talk about your goals and how we can help grow your business.",
    badge: 'DISCOVERY CALL',
    badgeStyle: { background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', color: '#a5b4fc' },
    duration: '30 MIN',
    accent: '#667eea',
    glowColor: 'rgba(102,126,234,0.12)',
    bgActive: 'rgba(102,126,234,0.08)',
    namespace: '30-min-discovery-call',
    calLink: 'yarden-zemer/30-min-discovery-call',
  },
  {
    id: 'existing',
    emoji: '🤝',
    title: 'Existing Client',
    description: 'Book your regular check-in — review progress, updates, and next steps.',
    badge: 'CHECK-IN',
    badgeStyle: { background: 'rgba(67,233,123,0.12)', border: '1px solid rgba(67,233,123,0.25)', color: '#6ee7b7' },
    duration: 'RECURRING',
    accent: '#43e97b',
    glowColor: 'rgba(67,233,123,0.10)',
    bgActive: 'rgba(67,233,123,0.06)',
    namespace: 'client-check-in',
    calLink: 'yarden-zemer/client-check-in',
  },
  {
    id: 'team',
    emoji: '🧑‍💼',
    title: 'Book with Our Team',
    description: 'Connect directly with the right person — account management, social media, tech support, or development.',
    badge: 'TEAM MEETING',
    badgeStyle: { background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)', color: '#fcd34d' },
    duration: '30 MIN',
    accent: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.10)',
    bgActive: 'rgba(245,158,11,0.06)',
    namespace: 'book-with-team',
    calLink: 'yarden-zemer/book-with-team',
  },
];

function bootstrapCal() {
  if (typeof window === 'undefined') return;
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ['initNamespace', namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');
}

export default function SchedulePage() {
  const [selected, setSelected] = useState(null);
  const initializedRef = useRef(new Set());

  useEffect(() => { bootstrapCal(); }, []);

  useEffect(() => {
    if (!selected) return;
    if (initializedRef.current.has(selected)) return;
    initializedRef.current.add(selected);

    const booking = BOOKINGS.find((b) => b.id === selected);
    if (!booking) return;

    const { namespace, calLink } = booking;
    Cal('init', namespace, { origin: 'https://app.cal.com' });
    Cal.ns[namespace]('inline', {
      elementOrSelector: `#cal-${selected}`,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink,
    });
    Cal.ns[namespace]('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  }, [selected]);

  const selectedBooking = BOOKINGS.find((b) => b.id === selected);

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

      {/* Main */}
      <main className="px-6 pt-14 pb-20 max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              Schedule a Meeting
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether you're just getting started or we're already working together
            — pick a time and we'll handle the rest.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: '📅', label: 'Live calendar sync' },
              { icon: '✅', label: 'Instant confirmation' },
              { icon: '✉️', label: 'Email + calendar invite' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selection cards — 3 col on md+ */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {BOOKINGS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              aria-label={`Select ${opt.title}`}
              className="relative p-6 rounded-2xl border text-left transition-all duration-300 w-full"
              style={{
                background: selected === opt.id ? opt.bgActive : 'rgba(255,255,255,0.02)',
                borderColor: selected === opt.id ? opt.accent : 'rgba(255,255,255,0.08)',
                boxShadow: selected === opt.id ? `0 0 40px ${opt.glowColor}` : 'none',
              }}
            >
              {/* Radio indicator */}
              <div
                className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                style={{ borderColor: selected === opt.id ? opt.accent : '#4b5563' }}
              >
                {selected === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: opt.accent }} />
                )}
              </div>

              <div className="text-3xl mb-3">{opt.emoji}</div>
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                {opt.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{opt.description}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide" style={opt.badgeStyle}>
                  {opt.badge}
                </span>
                <span
                  className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide text-gray-400"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {opt.duration}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected label pill */}
        {selected && (
          <div className="flex justify-center mb-8">
            <div
              className="px-5 py-2.5 rounded-full text-sm text-gray-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {selectedBooking?.emoji} {selectedBooking?.title}
            </div>
          </div>
        )}

        {/* Cal.com embeds — all in DOM, toggled via display */}
        <div className="max-w-4xl mx-auto">
          {!selected && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-3">
              <div className="text-4xl opacity-40">📆</div>
              <p className="text-base">Select a meeting type above to see available times</p>
            </div>
          )}

          {BOOKINGS.map((b) => (
            <div
              key={b.id}
              id={`cal-${b.id}`}
              style={{
                display: selected === b.id ? 'block' : 'none',
                width: '100%',
                height: '700px',
                overflow: 'scroll',
                borderRadius: '1rem',
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm text-gray-500 mt-4"
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
        <p className="mt-1">
          <a href="mailto:info@jzsmartmedia.com" className="hover:text-gray-400 transition-colors">
            info@jzsmartmedia.com
          </a>
        </p>
      </footer>
    </div>
  );
}
