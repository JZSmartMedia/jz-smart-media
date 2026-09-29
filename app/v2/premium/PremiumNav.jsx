'use client';

import { useState } from 'react';

const LINKS = [
  ['#services', 'Services'],
  ['#results', 'Results'],
  ['#work', 'Our Work'],
  ['#process', 'Process'],
  ['#about', 'Why JZ'],
];

export default function PremiumNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`nav-links${open ? ' open' : ''}`} id="v2p-nav-links">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>

      <div className="nav-actions">
        <a className="btn btn-primary" href="#audit">
          Free audit <span className="arrow" aria-hidden="true">→</span>
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="v2p-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </>
  );
}
