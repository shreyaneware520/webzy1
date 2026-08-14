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
        x: (e.clientX - cx) / 35,
        y: (e.clientY - cy) / 35,
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: 'linear-gradient(135deg, #0B0808 0%, #1A0E12 45%, #0B0808 100%)',
      overflow: 'hidden', paddingTop: 72,
    }}>

      {/* ── Background Radials ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(128,0,32,0.18) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 50% at 10% 90%, rgba(197,160,89,0.07) 0%, transparent 60%)',
      }} />

      {/* ── Subtle Grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* ── Floating Orb ── */}
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(128,0,32,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} className="anim-glow" />

      {/* ── Main Content ── */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 48, alignItems: 'center',
        padding: '60px 1rem',
        position: 'relative', zIndex: 10,
      }}>

        {/* ── LEFT TEXT ── */}
        <div style={{ maxWidth: 560 }} className="anim-fade-up">

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 999,
            background: 'rgba(74,14,23,0.6)',
            border: '1px solid rgba(212,175,55,0.35)',
            backdropFilter: 'blur(8px)', marginBottom: 24,
          }}>
            <Sparkles size={14} color="#D4AF37" />
            <span style={{ fontSize: 10, letterSpacing: '0.25em', fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase' }}>
              Premium Culinary Experience
            </span>
          </div>

          {/* Brand Tag */}
          <div style={{ fontSize: 11, letterSpacing: '0.4em', color: '#C51C24', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>
            LITTLE KIMCHI
          </div>

          {/* Headline */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.08,
            color: 'var(--cream)', marginBottom: 20,
          }}>
            A Bowl of{' '}
            <span className="gold-text" style={{ display: 'inline-block' }}>Seoul.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 17, color: 'rgba(250,249,246,0.75)',
            lineHeight: 1.65, maxWidth: 440, marginBottom: 36,
          }}>
            Bold Korean flavours. Rich, slow-cooked broth. Fresh chewy noodles crafted to be remembered.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 48 }}>
            <button className="btn-primary" onClick={onExploreClick}>
              EXPLORE MENU <ArrowRight size={15} />
            </button>
            <button className="btn-outline" onClick={onDiscoverClick}>
              DISCOVER RAMEN
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: 0,
            paddingTop: 28, borderTop: '1px solid rgba(128,0,32,0.2)',
          }}>
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={{ width: 1, background: 'rgba(128,0,32,0.2)', margin: '0 28px' }} />}
                <div>
                  <div className="font-serif" style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold-light)', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(250,249,246,0.45)', fontWeight: 700, textTransform: 'uppercase', marginTop: 5 }}>
                    {s.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Ramen Bowl ── */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>

          {/* Glow beneath bowl */}
          <div style={{
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            width: 280, height: 80, borderRadius: '50%',
            background: 'rgba(128,0,32,0.35)', filter: 'blur(35px)',
            pointerEvents: 'none',
          }} className="anim-glow" />

          {/* Steam particles */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="steam" style={{
              width: `${14 + i * 5}px`,
              height: `${28 + i * 10}px`,
              bottom: '28%',
              left: `${44 + i * 4}%`,
              animationDelay: `${i * 1.4}s`,
              animationDuration: `${6 + i}s`,
            }} />
          ))}

          {/* Interactive bowl container */}
          <div
            ref={bowlRef}
            className="anim-float"
            style={{
              width: 'clamp(260px, 40vw, 420px)',
              height: 'clamp(260px, 40vw, 420px)',
              position: 'relative', zIndex: 10,
              transition: 'transform 0.25s ease-out',
              transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
              cursor: 'grab',
            }}
          >
            {/* Drop shadow */}
            <div style={{
              position: 'absolute', bottom: '4%', left: '8%', right: '8%',
              height: 24, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', filter: 'blur(12px)',
            }} />

            {/* Bowl Image */}
            <img
              src="https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=900&auto=format&fit=crop&q=90"
              alt="Signature Ramen Bowl"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', borderRadius: '50%',
                border: '2px solid rgba(128,0,32,0.3)',
                boxShadow: '0 20px 70px rgba(0,0,0,0.7), 0 0 40px rgba(128,0,32,0.2)',
              }}
            />

            {/* Gloss overlay */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Label pill below bowl */}
          <div style={{
            position: 'absolute', bottom: 0,
            background: 'rgba(18,10,12,0.9)',
            border: '1px solid rgba(212,175,55,0.25)',
            padding: '8px 18px', borderRadius: 999,
            fontSize: 12, fontWeight: 600, color: 'var(--cream)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', gap: 8,
          }} className="anim-bounce">
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--korean-red)', display: 'inline-block',
              animation: 'ping 1.5s ease-in-out infinite',
              boxShadow: '0 0 0 4px rgba(197,28,36,0.25)',
            }} />
            Signature Miso Ramen
          </div>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
