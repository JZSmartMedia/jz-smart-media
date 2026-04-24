'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, UserPlus, Users, Building2,
  CalendarDays, CheckCircle2, Mail,
  Megaphone, Headphones, Code2, BarChart2,
} from 'lucide-react';

const MAIN_CARDS = [
  {
    id: 'new',
    icon: UserPlus,
    iconGradient: 'from-[#667eea] to-[#764ba2]',
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
    icon: Users,
    iconGradient: 'from-[#43e97b] to-[#38f9d7]',
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
    icon: Building2,
    iconGradient: 'from-[#f59e0b] to-[#f97316]',
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
    icon: Megaphone,
    iconGradient: 'from-[#ec4899] to-[#a855f7]',
    label: 'Alice',
    sublabel: 'Account Operations',
    description: 'General account management, client support & daily requests',
    namespace: 'alice-social-media',
    calLink: 'yarden-zemer/alice-social-media',
  },
  {
    id: 'edward',
    icon: Headphones,
    iconGradient: 'from-[#3b82f6] to-[#06b6d4]',
    label: 'Edward',
    sublabel: 'Tech Support',
    description: 'CRM setup, tracking, AI responses & automations',
    namespace: 'edward-tech-support',
    calLink: 'yarden-zemer/edward-tech-support',
  },
  {
    id: 'dev',
    icon: Code2,
    iconGradient: 'from-[#667eea] to-[#764ba2]',
    label: 'Development',
    sublabel: 'Dev Team',
    description: 'Website changes, new features & bug fixes',
    namespace: 'development',
    calLink: 'yarden-zemer/development',
  },
  {
    id: 'jordan',
    icon: BarChart2,
    iconGradient: 'from-[#06b6d4] to-[#10b981]',
    label: 'Jordan',
    sublabel: 'Metrics & Reporting',
    description: 'Call tracking, leads & monthly performance',
    namespace: 'jordan-metrics',
    calLink: 'yarden-zemer/client-check-in',
  },
];

const ALL_EMBEDS = [
  { id: 'new', namespace: '30-min-discovery-call', calLink: 'yarden-zemer/30-min-discovery-call' },
  { id: 'existing', namespace: 'client-check-in', calLink: 'yarden-zemer/client-check-in' },
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
  const [selected, setSelected] = useState(null);
  const [teamMember, setTeamMember] = useState(null);
  const initializedRef = useRef(new Set());

  useEffect(() => { bootstrapCal(); }, []);

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
  const selectedMain = MAIN_CARDS.find((c) => c.id === selected);

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

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: CalendarDays, label: 'Live calendar sync' },
              { icon: CheckCircle2, label: 'Instant confirmation' },
              { icon: Mail, label: 'Email + calendar invite' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 — Main cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
          {MAIN_CARDS.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleMainSelect(opt.id)}
                aria-label={`Select ${opt.title}`}
                className="relative p-6 rounded-2xl border text-left transition-all duration-300 w-full group"
                style={{
                  background: isActive ? opt.bgActive : 'rgba(255,255,255,0.02)',
                  borderColor: isActive ? opt.accent : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? `0 0 40px ${opt.glowColor}` : 'none',
                }}
              >
                {/* Radio */}
                <div
                  className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                  style={{ borderColor: isActive ? opt.accent : '#4b5563' }}
                >
                  {isActive && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: opt.accent }} />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${opt.iconGradient} shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                >
                  {opt.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{opt.description}</p>

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
            );
          })}
        </div>

        {/* Step 2 — Team sub-options */}
        <div
          className="max-w-4xl mx-auto overflow-hidden transition-all duration-500"
          style={{
            maxHeight: selected === 'team' ? '520px' : '0px',
            opacity: selected === 'team' ? 1 : 0,
            marginBottom: selected === 'team' ? '28px' : '0px',
          }}
        >
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-5">
              Who would you like to meet with?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {TEAM_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isActive = teamMember === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTeamMember(opt.id)}
                    aria-label={`Book with ${opt.label}`}
                    className="relative flex items-start gap-4 text-left p-4 rounded-xl border transition-all duration-250 group"
                    style={{
                      background: isActive ? 'rgba(102,126,234,0.08)' : 'rgba(255,255,255,0.02)',
                      borderColor: isActive ? '#667eea' : 'rgba(255,255,255,0.07)',
                      boxShadow: isActive ? '0 0 24px rgba(102,126,234,0.14)' : 'none',
                    }}
                  >
                    {/* Selected check */}
                    {isActive && (
                      <div
                        className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: '#667eea' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br ${opt.iconGradient} shadow-md transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="text-sm font-bold text-white leading-snug"
                        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                      >
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-1">{opt.sublabel}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{opt.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active selection label */}
        {activeEmbedId && (
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-gray-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {selected !== 'team' && selectedMain && (
                <>
                  <selectedMain.icon className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedMain.title}{selected === 'new' ? ' — 30-Min Discovery Call' : ' — Check-In'}</span>
                </>
              )}
              {selected === 'team' && selectedTeamOption && (
                <>
                  <selectedTeamOption.icon className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedTeamOption.label} — {selectedTeamOption.sublabel}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Cal.com embeds */}
        <div className="max-w-4xl mx-auto">
          {!activeEmbedId && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <CalendarDays className="w-7 h-7 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">
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
