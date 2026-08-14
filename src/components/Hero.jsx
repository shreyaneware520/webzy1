import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const STATS = [
  { value: '100%', label: 'Fresh Noodles' },
  { value: '18 Hrs', label: 'Slow Broth' },
  { value: 'Authentic', label: 'Seoul Recipe' },
];

export default function Hero({ onExploreClick, onDiscoverClick }) {
  const bowlRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({
        x: (e.clientX - cx) / 30,
        y: (e.clientY - cy) / 30,
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #090708 0%, #1A080D 40%, #090708 100%)',
        overflow: 'hidden',
        paddingTop: 88,
        paddingBottom: 40,
      }}
    >
      {/* ── Background Ambient Glows & Grid ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 85% 20%, rgba(158, 22, 43, 0.22) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 15% 85%, rgba(201, 162, 74, 0.08) 0%, transparent 60%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Shop-Inspired Decorative SVGs ── */}

      {/* Cherry Blossom Branch - Top Left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(200px, 30vw, 360px)',
          pointerEvents: 'none',
          zIndex: 8,
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          {/* Branch structure */}
          <path d="M0 20 C60 20, 100 45, 180 35 C200 32, 220 18, 240 22 C260 26, 270 42, 290 38" stroke="#4E2C1A" strokeWidth="4" strokeLinecap="round" />
          <path d="M120 40 C140 55, 170 65, 195 55" stroke="#4E2C1A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M70 28 C85 45, 110 50, 120 62" stroke="#4E2C1A" strokeWidth="2" strokeLinecap="round" />

          {/* Sakura Blossoms */}
          <circle cx="110" cy="30" r="8" fill="#FFAEC9" opacity="0.9" />
          <circle cx="110" cy="30" r="4" fill="#E45275" />
          
          <circle cx="180" cy="35" r="10" fill="#FFAEC9" opacity="0.95" />
          <circle cx="180" cy="35" r="5" fill="#E45275" />

          <circle cx="150" cy="50" r="7" fill="#FFAEC9" opacity="0.9" />
          <circle cx="150" cy="50" r="3" fill="#E45275" />

          <circle cx="220" cy="20" r="9" fill="#FFAEC9" opacity="0.9" />
          <circle cx="220" cy="20" r="4.5" fill="#E45275" />

          <circle cx="250" cy="28" r="6" fill="#FFAEC9" opacity="0.85" />
          <circle cx="275" cy="40" r="7" fill="#FFAEC9" opacity="0.9" />
          <circle cx="85" cy="40" r="8" fill="#FFAEC9" opacity="0.9" />
          <circle cx="85" cy="40" r="4" fill="#E45275" />
        </svg>
      </div>

      {/* Hanging Wooden Tags (リトル김치 / LITTLE KIMCHI) - Top Right Eaves */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          right: '8%',
          display: 'flex',
          gap: 12,
          zIndex: 10,
          pointerEvents: 'none',
        }}
        className="desktop-nav"
      >
        {/* Small wood beam */}
        <div style={{ position: 'absolute', top: -4, left: -10, right: -10, height: 6, background: 'var(--warm-wood)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }} />
        {['리', '틀', '김', '치'].map((char, index) => (
          <div
            key={index}
            className="wood-tag anim-float"
            style={{
              padding: '10px 14px',
              fontSize: 14,
              animationDelay: `${index * 0.25}s`,
              animationDuration: '5.5s',
              position: 'relative',
            }}
          >
            {/* Hanging thread */}
            <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 2, height: 8, background: '#1A080D' }} />
            {char}
          </div>
        ))}
      </div>

      {/* Hanging Lantern 1 (Round Warm-White) - Top Left-Center */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '32%',
          width: 54,
          height: 90,
          zIndex: 9,
          pointerEvents: 'none',
        }}
      >
        {/* Cable */}
        <div style={{ width: 2, height: 35, background: '#120808', margin: '0 auto' }} />
        {/* Lantern Body */}
        <div
          className="anim-glow-white"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 30%, #FFF9EC 20%, #F5EBDD 60%, #C9A24A 100%)',
            margin: '0 auto',
            position: 'relative',
            border: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          {/* Paper rib bands */}
          <div style={{ position: 'absolute', inset: '4px 0', borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />
          {/* Top/Bottom Cap */}
          <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 14, height: 4, background: '#090708', borderRadius: 1 }} />
          <div style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', width: 14, height: 4, background: '#090708', borderRadius: 1 }} />
          {/* Tassel */}
          <div style={{ position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', width: 3, height: 14, background: '#C9A24A', borderRadius: 1 }} />
        </div>
      </div>

      {/* Hanging Lantern 2 (Red Cylindrical) - Mid Right Edge */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: '3%',
          width: 60,
          height: 160,
          zIndex: 9,
          pointerEvents: 'none',
        }}
      >
        {/* Cable */}
        <div style={{ width: 2, height: 30, background: '#120808', margin: '0 auto' }} />
        {/* Lantern Body */}
        <div
          className="anim-glow-red"
          style={{
            width: 48,
            height: 86,
            borderRadius: 14,
            background: 'var(--grad-red-lantern)',
            margin: '0 auto',
            position: 'relative',
            border: '1.5px solid rgba(0,0,0,0.25)',
          }}
        >
          {/* Paper rib bands */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '20%', right: '20%', borderLeft: '1px solid rgba(0,0,0,0.15)', borderRight: '1px solid rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
          {/* Cherry Blossom Branch Motif on lantern */}
          <div style={{ position: 'absolute', inset: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.65 }}>
            <span style={{ fontSize: 16 }}>🌸</span>
          </div>
          {/* Top/Bottom Cap */}
          <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 22, height: 5, background: '#090708', borderRadius: 1 }} />
          <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 22, height: 5, background: '#090708', borderRadius: 1 }} />
          {/* Red/Gold Tassel */}
          <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 4, height: 18, background: 'var(--warm-gold)', borderRadius: 1 }} />
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <div
        className="container"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="hero-inner-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 48,
            alignItems: 'center',
            minHeight: 'calc(100vh - 128px)',
          }}
        >
          {/* ── LEFT: Typography & Editorial Details ── */}
          <div style={{ maxWidth: 580 }} className="anim-fade-up">
            {/* Sparkle Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 999,
                background: 'rgba(58, 12, 21, 0.55)',
                border: '1px solid rgba(201, 162, 74, 0.35)',
                backdropFilter: 'blur(8px)',
                marginBottom: 24,
              }}
            >
              <Sparkles size={13} color="#C9A24A" style={{ animation: 'pulse 2s infinite' }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: '0.24em',
                  fontWeight: 800,
                  color: 'var(--warm-gold)',
                  textTransform: 'uppercase',
                }}
              >
                Premium Culinary Experience
              </span>
            </div>

            {/* Brand Title Subtext */}
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.45em',
                color: 'var(--korean-red)',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              LITTLE KIMCHI · 리틀 김치
            </div>

            {/* Main Editorial Headline */}
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: 'var(--soft-cream)',
                marginBottom: 22,
                letterSpacing: '-0.02em',
              }}
            >
              A BOWL OF <br />
              <span className="gold-text" style={{ display: 'inline-block' }}>
                SEOUL.
              </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 16,
                color: 'rgba(245, 235, 221, 0.75)',
                lineHeight: 1.7,
                maxWidth: 460,
                marginBottom: 40,
              }}
            >
              Bold Korean flavours. Rich, slow-cooked broth. Fresh chewy noodles. Crafted for
              unforgettable cravings.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
              <button className="btn-primary" onClick={onExploreClick}>
                EXPLORE MENU <ArrowRight size={14} />
              </button>
              <button className="btn-outline" onClick={onDiscoverClick}>
                DISCOVER RAMEN
              </button>
            </div>

            {/* Stats list */}
            <div
              style={{
                display: 'flex',
                paddingTop: 32,
                borderTop: '1px solid rgba(158, 22, 43, 0.25)',
              }}
            >
              {STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && (
                    <div
                      style={{
                        width: 1.5,
                        background: 'rgba(158, 22, 43, 0.25)',
                        margin: '0 24px',
                      }}
                    />
                  )}
                  <div>
                    <div
                      className="font-serif"
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'var(--warm-gold)',
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        letterSpacing: '0.15em',
                        color: 'rgba(245, 235, 221, 0.45)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        marginTop: 6,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Interactive Ramen Bowl (Overlap visual depth) ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              padding: '20px 0',
            }}
          >
            {/* Ambient gold glow behind food */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201, 162, 74, 0.25) 0%, transparent 65%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />

            {/* Steam rising particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="steam"
                style={{
                  width: `${12 + i * 4}px`,
                  height: `${24 + i * 8}px`,
                  bottom: '30%',
                  left: `${42 + i * 4.5}%`,
                  animationDelay: `${i * 1.3}s`,
                  animationDuration: `${5.5 + i * 0.8}s`,
                }}
              />
            ))}

            {/* Main Interactive Bowl Container */}
            <div
              ref={bowlRef}
              className="anim-float"
              style={{
                width: 'clamp(280px, 38vw, 440px)',
                height: 'clamp(280px, 38vw, 440px)',
                position: 'relative',
                zIndex: 12,
                transition: 'transform 0.25s ease-out',
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
                cursor: 'grab',
              }}
            >
              {/* Soft Drop Shadow under bowl */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  left: '10%',
                  right: '10%',
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.65)',
                  filter: 'blur(14px)',
                }}
              />

              {/* High Resolution Photorealistic Food Image */}
              <img
                src="https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=1000&auto=format&fit=crop&q=90"
                alt="Signature Miso Ramen"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid var(--wine-red)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.75), 0 0 50px rgba(158, 22, 43, 0.3)',
                }}
              />

              {/* Subtle gloss overlay to mimic light reflections */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.3) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Glowing active label pill beneath bowl */}
            <div
              style={{
                position: 'absolute',
                bottom: -15,
                background: 'rgba(9, 7, 8, 0.95)',
                border: '1.5px solid var(--warm-gold)',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--soft-cream)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(201, 162, 74, 0.25)',
              }}
              className="anim-bounce"
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--korean-red)',
                  display: 'inline-block',
                  animation: 'ping 1.6s ease-in-out infinite',
                  boxShadow: '0 0 0 4px rgba(158, 22, 43, 0.3)',
                }}
              />
              SIGNATURE MISO RAMEN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
