/**
 * Inline brand marks for the partner and technology bars.
 *
 * Google and Microsoft use their standard published geometry. Meta, Yelp and
 * the technology marks are clean recreations built for this layout — good
 * enough to read correctly at this size, but they are NOT official artwork.
 *
 * If JZ Smart Media is enrolled in these partner programmes, each programme
 * issues official badge files; those should replace the marks here before the
 * page goes public. Partner claims must also be current and accurate.
 */

export function GoogleG({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

export function MicrosoftSquares({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M12 1h10v10H12z" />
      <path fill="#00A4EF" d="M1 12h10v10H1z" />
      <path fill="#FFB900" d="M12 12h10v10H12z" />
    </svg>
  );
}

export function MetaMark({ size = 26 }) {
  return (
    <svg width={size * 1.7} height={size} viewBox="0 0 52 30" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="jz-meta-grad" x1="4" y1="15" x2="48" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0064E1" />
          <stop offset="0.42" stopColor="#0091FB" />
          <stop offset="1" stopColor="#0064E1" />
        </linearGradient>
      </defs>
      <path
        d="M7 20.8C7 13.9 10.6 7 15.4 7c3 0 5.2 2.1 8 6.3 2.9-4.2 5.3-6.3 8.3-6.3C36.6 7 41 14.4 41 21c0 4.1-2.1 6.7-5.5 6.7-3.2 0-5.3-1.9-8-6.2l-2.1-3.4-2.2 3.6C20.5 25.9 18.4 27.7 15.3 27.7 11.7 27.7 7 25.1 7 20.8Z"
        stroke="url(#jz-meta-grad)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YelpMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF1A1A" aria-hidden="true">
      <path d="M10.6 11.3 5.2 9.1a1 1 0 0 1-.5-1.4c.6-1.2 1.6-2.2 2.8-2.9a1 1 0 0 1 1.5.7l1.4 5.1a.5.5 0 0 1-.8.7Z" />
      <path d="M10.9 13.9 7.3 18.2a1 1 0 0 1-1.6-.1A7.4 7.4 0 0 1 4.6 15a1 1 0 0 1 .9-1.3l5-.4a.5.5 0 0 1 .4.6Z" />
      <path d="M13.6 14.7 16 19.6a1 1 0 0 1-.7 1.4c-1.2.3-2.5.3-3.7 0a1 1 0 0 1-.7-1.3l1.9-5a.5.5 0 0 1 .8 0Z" />
      <path d="M14.5 12.4l5.2-1.4a1 1 0 0 1 1.2.9c.1 1.3-.1 2.6-.6 3.8a1 1 0 0 1-1.5.4l-4.4-3a.5.5 0 0 1 .1-.7Z" />
      <path d="M13.6 9.9V3.2a1 1 0 0 1 1.2-1c1.3.3 2.5.8 3.5 1.6a1 1 0 0 1 .1 1.5l-4 5a.5.5 0 0 1-.8-.4Z" />
    </svg>
  );
}

export function CallRailMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0A2540" />
      <path
        d="M7.6 7.4c-.5.5-.7 1.2-.5 1.9.9 3.3 3.3 5.7 6.6 6.6.7.2 1.4 0 1.9-.5l.8-.8a.8.8 0 0 0 0-1.2l-1.7-1.5a.8.8 0 0 0-1 0l-.7.5a7.7 7.7 0 0 1-2.4-2.4l.5-.7a.8.8 0 0 0 0-1L9.6 6.6a.8.8 0 0 0-1.2 0l-.8.8Z"
        fill="#4FC3F7"
      />
    </svg>
  );
}

export function GoHighLevelMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18V9.5l3.2-3.2V18H6Z" fill="#FFCE00" />
      <path d="M11.6 18V6.3l3.2 3.2V18h-3.2Z" fill="#2DD4A7" />
      <path d="m16.4 18 .1-6.2 2.6 2.6V18h-2.7Z" fill="#38BDF8" />
    </svg>
  );
}

export function GoogleLSAMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path fill="#34A853" d="M12 2a10 10 0 0 1 8.7 5.1l-5.2 3A4 4 0 0 0 12 8V2Z" />
      <path fill="#4285F4" d="M20.7 7.1A10 10 0 0 1 12 22v-6a4 4 0 0 0 3.5-5.9l5.2-3Z" />
      <path fill="#FBBC05" d="M12 22A10 10 0 0 1 3.3 7.1l5.2 3A4 4 0 0 0 12 16v6Z" />
      <path fill="#EA4335" d="M3.3 7.1A10 10 0 0 1 12 2v6a4 4 0 0 0-3.5 2.1l-5.2-3Z" />
      <circle cx="12" cy="12" r="3.1" fill="#fff" />
    </svg>
  );
}

export function GA4Mark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="15.4" y="3" width="5.4" height="18" rx="2.7" fill="#F9AB00" />
      <rect x="9.3" y="8.6" width="5.4" height="12.4" rx="2.7" fill="#E37400" />
      <circle cx="5.9" cy="18.1" r="2.9" fill="#E37400" />
    </svg>
  );
}
