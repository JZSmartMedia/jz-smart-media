'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SchedulePage() {
  const [selected, setSelected] = useState(null); // 'new' | 'existing'

  useEffect(() => {
    // Cal.com queue setup (idempotent — safe to run even if Cal already exists)
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

    // Discovery call (New Client)
    Cal('init', '30-min-discovery-call', { origin: 'https://app.cal.com' });
    Cal.ns['30-min-discovery-call']('inline', {
      elementOrSelector: '#cal-discovery',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'yarden-zemer/30-min-discovery-call',
    });
    Cal.ns['30-min-discovery-call']('ui', { hideEventTypeDetails: false, layout: 'month_view' });

    // Client check-in (Existing Client)
    Cal('init', 'client-check-in', { origin: 'https://app.cal.com' });
    Cal.ns['client-check-in']('inline', {
      elementOrSelector: '#cal-checkin',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'yarden-zemer/client-check-in',
    });
    Cal.ns['client-check-in']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  }, []);

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

        {/* Logo */}
        <div className="flex items-baseline gap-1.5 select-none">
          <span
            className="text-2xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-none"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            JZ.
          </span>
          <span className="text-xs font-medium tracking-wide text-gray-400">
            Smart Media
          </span>
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

        {/* Selection cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">

          {/* New Client */}
          <button
            onClick={() => setSelected('new')}
            className="relative p-6 rounded-2xl border text-left transition-all duration-300 w-full"
            style={{
              background: selected === 'new' ? 'rgba(102,126,234,0.08)' : 'rgba(255,255,255,0.02)',
              borderColor: selected === 'new' ? '#667eea' : 'rgba(255,255,255,0.08)',
              boxShadow: selected === 'new' ? '0 0 40px rgba(102,126,234,0.12)' : 'none',
            }}
          >
            {/* Radio */}
            <div
              className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: selected === 'new' ? '#667eea' : '#4b5563' }}
            >
              {selected === 'new' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#667eea' }} />
              )}
            </div>

            <div className="text-3xl mb-3">👋</div>
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              New Client
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Let's talk about your goals and how we can help grow your business.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                style={{ background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', color: '#a5b4fc' }}
              >
                DISCOVERY CALL
              </span>
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide text-gray-400"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                30 MIN
              </span>
            </div>
          </button>

          {/* Existing Client */}
          <button
            onClick={() => setSelected('existing')}
            className="relative p-6 rounded-2xl border text-left transition-all duration-300 w-full"
            style={{
              background: selected === 'existing' ? 'rgba(67,233,123,0.06)' : 'rgba(255,255,255,0.02)',
              borderColor: selected === 'existing' ? '#43e97b' : 'rgba(255,255,255,0.08)',
              boxShadow: selected === 'existing' ? '0 0 40px rgba(67,233,123,0.10)' : 'none',
            }}
          >
            {/* Radio */}
            <div
              className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: selected === 'existing' ? '#43e97b' : '#4b5563' }}
            >
              {selected === 'existing' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#43e97b' }} />
              )}
            </div>

            <div className="text-3xl mb-3">🤝</div>
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              Existing Client
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Book your regular check-in — review progress, updates, and next steps.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                style={{ background: 'rgba(67,233,123,0.12)', border: '1px solid rgba(67,233,123,0.25)', color: '#6ee7b7' }}
              >
                CHECK-IN
              </span>
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide text-gray-400"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                RECURRING
              </span>
            </div>
          </button>
        </div>

        {/* Selected label pill */}
        {selected && (
          <div className="flex justify-center mb-8">
            <div
              className="px-5 py-2.5 rounded-full text-sm text-gray-300 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {selected === 'new'
                ? '👋 New Client — 30-Min Discovery Call'
                : '🤝 Existing Client — Check-In'}
            </div>
          </div>
        )}

        {/* Cal.com embeds — both always in DOM, toggled with display */}
        <div className="max-w-4xl mx-auto">
          {/* Placeholder when nothing selected */}
          {!selected && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-3">
              <div className="text-4xl opacity-40">📆</div>
              <p className="text-base">Select a meeting type above to see available times</p>
            </div>
          )}

          <div
            id="cal-discovery"
            style={{
              display: selected === 'new' ? 'block' : 'none',
              width: '100%',
              height: '700px',
              overflow: 'scroll',
              borderRadius: '1rem',
            }}
          />
          <div
            id="cal-checkin"
            style={{
              display: selected === 'existing' ? 'block' : 'none',
              width: '100%',
              height: '700px',
              overflow: 'scroll',
              borderRadius: '1rem',
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm text-gray-600 mt-4"
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
