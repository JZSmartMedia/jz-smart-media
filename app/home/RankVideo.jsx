'use client';

import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

/**
 * Rank-grid video with the source's top and bottom chrome cropped off.
 *
 * The recordings are 512×558 with a dark bar top (business name + timestamp)
 * and bottom (street address). We show only rows 24–534, so the frame is
 * effectively 512×511 and neither bar is ever visible.
 *
 * Native <video controls> can't be used with that crop — the control bar sits
 * at the bottom of the element, which is now outside the visible box and would
 * be clipped. A custom play/pause overlay replaces it.
 */
export default function RankVideo({ src, poster, label }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="v2p-video-frame">
      <video
        ref={ref}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support this video.
      </video>

      <button
        type="button"
        className={`v2p-video-btn${playing ? ' playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        {playing
          ? <Pause size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          : <Play size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />}
      </button>
    </div>
  );
}
