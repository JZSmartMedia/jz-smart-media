'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

/**
 * Client testimonials.
 *
 * These are the quotes already published on the live jzsmartmedia.com homepage,
 * reused verbatim with the same attributions — not written for this page.
 */
export default function Testimonials({ items }) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  const go = (delta) => setIndex((i) => (i + delta + items.length) % items.length);

  return (
    <div className="v2p-tst">
      <div className="v2p-tst-card">
        <div className="v2p-tst-copy">
          <Quote className="v2p-tst-quote" size={30} aria-hidden="true" />
          <blockquote className="v2p-tst-text" style={{ margin: 0 }}>
            &ldquo;{active.content}&rdquo;
          </blockquote>
          <div className="v2p-tst-by">
            <span className="v2p-tst-stars" aria-label={`${active.rating} out of 5 stars`}>
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ))}
            </span>
            <span className="v2p-tst-who">
              <b>{active.name}</b>
              <span>{active.role}</span>
            </span>
          </div>
        </div>

        <div className="v2p-tst-visual">
          <Image
            src={active.image}
            alt={`${active.role} project`}
            fill
            sizes="(max-width: 880px) 100vw, 34vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <button type="button" className="v2p-tst-nav prev" onClick={() => go(-1)} aria-label="Previous testimonial">
        <ChevronLeft size={19} aria-hidden="true" />
      </button>
      <button type="button" className="v2p-tst-nav next" onClick={() => go(1)} aria-label="Next testimonial">
        <ChevronRight size={19} aria-hidden="true" />
      </button>

      <div className="v2p-tst-dots">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            className={`v2p-tst-dot${i === index ? ' on' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial from ${item.name}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
