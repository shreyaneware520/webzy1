import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const STATS = [
  { value: '100%', label: 'Fresh Noodles' },
  { value: '18 Hrs', label: 'Slow Broth' },
  { value: 'Authentic', label: 'Seoul Recipe' },
];

export default function Hero({ onExploreClick, onDiscoverClick }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(9,7,8,0.85) 0%, rgba(26,8,13,0.7) 100%), url(/hero-bg.png) center/cover no-repeat',
        overflow: 'hidden',
        paddingTop: 88,
        paddingBottom: 40,
      }}
    >
      {/* ── Floating Particles ── */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: 'var(--warm-gold)',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: 0,
            animation: 'particleDrift 10s linear infinite',
            animationDelay: Math.random() * 10 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Background Ambient Glows & Grid ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(158, 22, 43, 0.18) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201, 162, 74, 0.08) 0%, transparent 65%)',
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
          className="anim-glow-white anim-sway"
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
          className="anim-glow-red anim-sway"
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="anim-fade-up"
          style={{
            maxWidth: '950px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0',
          }}
        >
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
            <span className="text-outline-glow" style={{ display: 'inline-block' }}>
              SEOUL.
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: 'rgba(245, 235, 221, 0.75)',
              lineHeight: 1.7,
              maxWidth: 650,
              margin: '0 auto 40px auto',
            }}
          >
            Bold Korean flavours. Rich, slow-cooked broth. Fresh chewy noodles. Crafted for
            unforgettable cravings.
          </p>

          {/* CTAs */}
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onExploreClick}>
              EXPLORE MENU <ArrowRight size={14} />
            </button>
            <button className="btn-outline" onClick={onDiscoverClick}>
              DISCOVER RAMEN
            </button>
          </div>

          {/* Stats list */}
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="hero-stat-separator" />}
                <div
                  className="hero-stat-item anim-fade-up"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 24px)',
                      fontWeight: 800,
                      color: 'var(--warm-gold)',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      color: 'rgba(245, 235, 221, 0.65)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
