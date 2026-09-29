'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper.
 *
 * Children stay server-rendered — only this thin wrapper is client code, so the
 * page keeps its SSR HTML (and its LCP) while still animating in.
 *
 * Reveals once and disconnects: elements don't re-animate when you scroll back
 * up, which reads as cheap. Honours prefers-reduced-motion by showing instantly.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    // Already in view on load (e.g. the hero) — show without waiting.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -64px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`v2p-reveal v2p-rv-${variant}${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      // Caller styles merge in rather than clobbering the stagger delay.
      style={{ '--rv-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Counts up to `value` the first time it scrolls into view. Static text is
 * rendered on the server so the real number is always in the HTML.
 */
export function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const run = () => {
      setStarted(true);
      const start = performance.now();
      let frame;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutExpo — fast then settles, which feels deliberate rather than mechanical
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setDisplay(Number((value * eased).toFixed(decimals)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplay(0);
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration, started]);

  return (
    <span ref={ref}>
      {prefix}
      {Number(display).toFixed(decimals)}
      {suffix}
    </span>
  );
}
