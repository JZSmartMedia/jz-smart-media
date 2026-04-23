'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const MAIN_CARDS = [
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
    description: 'Connect directly with the right person on our team.',
    badge: 'TEAM MEETING',
    badgeStyle: { background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)', color: '#fcd34d' },
    duration: '30 MIN',
    accent: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.10)',
    bgActive: 'rgba(245,158,11,0.06)',
  },
];

const TEAM_OPTIONS = [
  {
    id: 'alice',
    emoji: '🎨',
    label: 'Alice',
    sublabel: 'Social Media',
    namespace: 'alice-social-media',
    calLink: 'yarden-zemer/alice-social-media',
  },
  {
    id: 'edward',
    emoji: '🛠️',
    label: 'Edward',
    sublabel: 'Tech Support',
    namespace: 'edward-tech-support',
    calLink: 'yarden-zemer/edward-tech-support',
  },
  {
    id: 'dev',
    emoji: '💻',
    label: 'Development',
    sublabel: 'Dev Team',
    namespace: 'development',
    calLink: 'yarden-zemer/development',
  },
];

// All embeds that need a DOM slot
const ALL_EMBEDS = [
  { id: 'new',    namespace: '30-min-discovery-call',  calLink: 'yarden-zemer/30-min-discovery-call' },
  { id: 'existing', namespace: 'client-check-in',      calLink: 'yarden-zemer/client-check-in' },
  ...TEAM_OPTIONS.map((t) => ({ id: t.id, namespace: t.namespace, calLink: t.calLink })),
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
  const [selected, setSelected] = useState(null);     // 'new' | 'existing' | 'team'
  const [teamMember, setTeamMember] = useState(null); // 'alice' | 'edward' | 'dev'
  const initializedRef = useRef(new Set());

  useEffect(() => { bootstrapCal(); }, []);

  // Which embed is actually visible
  const activeEmbedId = selected === 'team' ? teamMember : selected;

  useEffect(() => {
    if (!activeEmbedId) return;
    if (initializedRef.current.has(activeEmbedId)) return;
    initializedRef.current.add(activeEmbedId);

    const embed = ALL_EMBEDS.find((e) => e.id === activeEmbedId);
    if (!embed) return;

    const { namespace, calLink } = embed;
    Cal('init', namespace, { origin: 'https://app.cal.com' });
    Cal.ns[namespace]('inline', {
      elementOrSelector: `#cal-${activeEmbedId}`,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink,
    });
    Cal.ns[namespace]('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  }, [activeEmbedId]);

  const handleMainSelect = (id) => {
    setSelected(id);
    if (id !== 'team') setTeamMember(null);
  };

  const selectedTeamOption = TEAM_OPTIONS.find((t) => t.id === teamMember);

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

        {/* Step 1 — Main cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
          {MAIN_CARDS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleMainSelect(opt.id)}
              aria-label={`Select ${opt.title}`}
              className="relative p-6 rounded-2xl border text-left transition-all duration-300 w-full"
              style={{
                background: selected === opt.id ? opt.bgActive : 'rgba(255,255,255,0.02)',
                borderColor: selected === opt.id ? opt.accent : 'rgba(255,255,255,0.08)',
                boxShadow: selected === opt.id ? `0 0 40px ${opt.glowColor}` : 'none',
              }}
            >
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

        {/* Step 2 — Team sub-options (only when "team" selected) */}
        <div
          className="max-w-4xl mx-auto overflow-hidden transition-all duration-500"
          style={{
            maxHeight: selected === 'team' ? '160px' : '0px',
            opacity: selected === 'team' ? 1 : 0,
            marginBottom: selected === 'team' ? '24px' : '0px',
          }}
        >
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
              Who would you like to meet with?
            </p>
            <div className="flex flex-wrap gap-3">
              {TEAM_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTeamMember(opt.id)}
                  aria-label={`Book with ${opt.label}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200"
                  style={{
                    background: teamMember === opt.id ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.03)',
                    borderColor: teamMember === opt.id ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                    boxShadow: teamMember === opt.id ? '0 0 20px rgba(245,158,11,0.12)' : 'none',
                  }}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white leading-none mb-0.5">{opt.label}</div>
                    <div className="text-xs text-gray-500">{opt.sublabel}</div>
                  </div>
                  {teamMember === opt.id && (
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center ml-1 flex-shrink-0"
                      style={{ background: '#f59e0b' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active selection label pill */}
        {activeEmbedId && (
          <div className="flex justify-center mb-8">
            <div
              className="px-5 py-2.5 rounded-full text-sm text-gray-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {selected === 'new' && '👋 New Client — 30-Min Discovery Call'}
              {selected === 'existing' && '🤝 Existing Client — Check-In'}
              {selected === 'team' && selectedTeamOption && `${selectedTeamOption.emoji} ${selectedTeamOption.label} — ${selectedTeamOption.sublabel}`}
            </div>
          </div>
        )}

        {/* Cal.com embeds — all in DOM, toggled via display */}
        <div className="max-w-4xl mx-auto">
          {!activeEmbedId && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-3">
              <div className="text-4xl opacity-40">📆</div>
              <p className="text-base">
                {selected === 'team'
                  ? 'Choose a team member above to see their availability'
                  : 'Select a meeting type above to see available times'}
              </p>
            </div>
          )}

          {ALL_EMBEDS.map((e) => (
            <div
              key={e.id}
              id={`cal-${e.id}`}
              style={{
                display: activeEmbedId === e.id ? 'block' : 'none',
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
