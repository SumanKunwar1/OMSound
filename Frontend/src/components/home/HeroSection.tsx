import { useEffect, useState } from 'react';

const slides = [
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312763/1_tzcr8o.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312764/2_ju3oqc.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312764/3_dymhav.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312764/4_j6op4x.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312764/5_hwfaps.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312766/6_myoozt.png",
  "https://res.cloudinary.com/dcsgax3ld/image/upload/v1771312765/8_hvvho9.png",
];

const SLIDE_MS = 4000;
const FADE_MS  = 1100;

const HeroSection = () => {
  const [current, setCurrent]             = useState(0);
  const [prev, setPrev]                   = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (transitioning) return;
      setPrev(current);
      setTransitioning(true);
      setCurrent(c => (c + 1) % slides.length);
      setTimeout(() => { setPrev(null); setTransitioning(false); }, FADE_MS);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [current, transitioning]);

  const goTo = (i: number) => {
    if (i === current || transitioning) return;
    setPrev(current);
    setTransitioning(true);
    setCurrent(i);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, FADE_MS);
  };

  return (
    <>
      <style>{`
        /* ── Banner sizing ─────────────────────────────────────────────────── */
        .hero-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #071020;

          /* Push content below the fixed navbar.
             Navbar desktop height: py-6 (24px top + 24px bottom) + ~28px logo = ~76px.
             We use 76px here so nothing is hidden behind it.                  */
          margin-top: 76px;

          /* Keep the exact 1920×900 ratio on large screens                    */
          aspect-ratio: 1920 / 900;
          max-height: 900px;
        }

        /* Tablet landscape (769–1280px) */
        @media (max-width: 1280px) and (min-width: 769px) {
          .hero-wrap {
            aspect-ratio: 1920 / 900;
            max-height: 500px;
          }
        }

        /* Tablet portrait (481–768px): fixed height */
        @media (max-width: 768px) and (min-width: 481px) {
          .hero-wrap {
            /* Navbar is slightly shorter on tablet */
            margin-top: 68px;
            aspect-ratio: unset;
            height: 320px;
            max-height: unset;
          }
          .hero-img { object-position: center center; }
        }

        /* Mobile (≤480px) */
        @media (max-width: 480px) {
          .hero-wrap {
            /* Mobile navbar is py-4 (~64px) */
            margin-top: 64px;
            aspect-ratio: unset;
            height: 200px;
            max-height: unset;
          }
          .hero-img { object-position: center top; }
        }

        /* ── Ken Burns ──────────────────────────────────────────────────────── */
        @keyframes kbL {
          from { transform: scale(1)    translate(0%,     0%);   }
          to   { transform: scale(1.06) translate(-1.2%, -0.6%); }
        }
        @keyframes kbR {
          from { transform: scale(1)    translate(0%,    0%);   }
          to   { transform: scale(1.06) translate(1.2%, -0.6%); }
        }
        .kb-l { animation: kbL ${SLIDE_MS + FADE_MS}ms ease-in-out forwards; }
        .kb-r { animation: kbR ${SLIDE_MS + FADE_MS}ms ease-in-out forwards; }

        /* ── Crossfade ──────────────────────────────────────────────────────── */
        @keyframes hFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hFadeOut { from { opacity: 1; } to { opacity: 0; } }
        .h-in  { animation: hFadeIn  ${FADE_MS}ms ease-in-out forwards; }
        .h-out { animation: hFadeOut ${FADE_MS}ms ease-in-out forwards; }

        /* ── Progress pill fill ─────────────────────────────────────────────── */
        @keyframes pillFill { from { width: 0%; } to { width: 100%; } }
        .pill-fill { animation: pillFill ${SLIDE_MS}ms linear forwards; }
      `}</style>

      <div className="hero-wrap">

        {/* Slide layers */}
        {slides.map((src, i) => {
          const active = i === current;
          const exit   = i === prev;
          if (!active && !exit) return null;
          return (
            <div
              key={i}
              className={active ? 'h-in' : 'h-out'}
              style={{ position: 'absolute', inset: 0, zIndex: active ? 10 : 5 }}
            >
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                className={`hero-img ${active ? (i % 2 === 0 ? 'kb-l' : 'kb-r') : ''}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transformOrigin: 'center center',
                }}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Edge vignette only — centre completely clear */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.28) 100%)',
          }}
        />

        {/* Progress dot indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                position: 'relative',
                height: 3,
                width: i === current ? 44 : 18,
                borderRadius: 999,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.35)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.35s ease',
                flexShrink: 0,
              }}
            >
              {i === current && (
                <span
                  key={`fp-${current}`}
                  className="pill-fill"
                  style={{
                    position: 'absolute',
                    left: 0, top: 0,
                    height: '100%',
                    background: '#fff',
                    borderRadius: 999,
                  }}
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </>
  );
};

export default HeroSection;