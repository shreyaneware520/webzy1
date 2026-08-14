import React, { useState } from 'react';
import { Eye, Flame, Plus } from 'lucide-react';

export default function RamenCard({ dish, onOpen3D, onAddToOrder }) {
  const isVeg = dish.category === 'veg';
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="glass-card"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
    >
      {/* ── Veg / Non-Veg badge ── */}
      <div style={{
        position: 'absolute', top: 14, left: 14, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 999,
        background: 'rgba(11,8,8,0.85)', backdropFilter: 'blur(8px)',
        border: `1px solid ${isVeg ? 'rgba(34,197,94,0.4)' : 'rgba(197,28,36,0.4)'}`,
      }}>
        <span className={isVeg ? 'veg-dot' : 'nonveg-dot'} />
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--cream)', textTransform: 'uppercase' }}>
          {isVeg ? 'VEG' : 'NON-VEG'}
        </span>
      </div>

      {/* ── Spice badge ── */}
      {dish.spiceLevel > 0 && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 3,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(197,28,36,0.15)',
          border: '1px solid rgba(197,28,36,0.4)',
          color: '#C51C24', fontSize: 10, fontWeight: 800,
        }}>
          <Flame size={12} style={{ fill: '#C51C24' }} />
          <span>×{dish.spiceLevel}</span>
        </div>
      )}

      {/* ── Food Image ── */}
      <div
        onClick={() => onOpen3D(dish)}
        style={{
          position: 'relative', paddingTop: '70%', overflow: 'hidden',
          background: '#120808', cursor: 'pointer',
        }}
        className="card-img-wrap"
      >
        {imgError ? (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a0808, #2a1010)',
            fontSize: 48, gap: 8,
          }}>
            🍜
            <span style={{ fontSize: 11, color: 'rgba(250,249,246,0.4)', letterSpacing: '0.1em' }}>Photo Coming Soon</span>
          </div>
        ) : (
          <img
            src={dish.image}
            alt={dish.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="card-img"
          />
        )}

        {/* Gradient scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(11,8,8,0.95) 0%, rgba(11,8,8,0.1) 55%, transparent 100%)',
        }} />

        {/* Hover overlay with 3D CTA */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(74,14,23,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.3s',
        }} className="card-overlay">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', borderRadius: 999,
            background: 'var(--cream)', color: 'var(--charcoal)',
            fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
            transform: 'translateY(12px)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }} className="card-cta">
            <Eye size={14} /> VIEW IN 3D
          </div>
        </div>
      </div>

      {/* ── Details ── */}
      <div style={{
        padding: '20px 22px 22px',
        background: 'linear-gradient(180deg, rgba(26,12,14,0.3) 0%, rgba(11,8,8,0.7) 100%)',
        flex: 1, display: 'flex', flexDirection: 'column', gap: 12,
        borderTop: '1px solid rgba(128,0,32,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <h3 className="font-serif" style={{
            fontSize: 19, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2,
            transition: 'color 0.3s',
          }} className="card-title">
            {dish.name}
          </h3>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 20, fontWeight: 800, color: 'var(--gold-light)',
            whiteSpace: 'nowrap', lineHeight: 1,
          }}>
            ₹{dish.price}
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'rgba(250,249,246,0.6)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {dish.description}
        </p>

        {/* Spice level dots */}
        {dish.spiceLevel > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, color: 'rgba(250,249,246,0.4)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Spice:</span>
            {[...Array(3)].map((_, i) => (
              <Flame key={i} size={12} style={{ color: i < dish.spiceLevel ? '#C51C24' : 'rgba(250,249,246,0.15)', fill: i < dish.spiceLevel ? '#C51C24' : 'transparent', transition: 'color 0.3s' }} />
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button
            onClick={() => onOpen3D(dish)}
            style={{
              flex: 1, padding: '11px 0',
              background: 'rgba(74,14,23,0.6)',
              border: '1px solid rgba(128,0,32,0.4)',
              borderRadius: 14, cursor: 'pointer',
              color: 'var(--cream)', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.background = 'rgba(128,0,32,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.4)'; e.currentTarget.style.background = 'rgba(74,14,23,0.6)'; }}
          >
            <Eye size={13} color="#D4AF37" /> VIEW IN 3D
          </button>
          <button
            onClick={() => onAddToOrder(dish)}
            aria-label="Add to order"
            style={{
              width: 44, height: 44,
              background: 'linear-gradient(135deg, #800020, #C51C24)',
              border: 'none', borderRadius: 14, cursor: 'pointer',
              color: 'var(--cream)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(128,0,32,0.4)',
              transition: 'filter 0.3s, transform 0.3s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.2)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* ── Hover interaction styles ── */}
      <style>{`
        .card-img-wrap:hover .card-overlay { opacity: 1 !important; }
        .card-img-wrap:hover .card-cta { transform: translateY(0) !important; }
        .card-img-wrap:hover .card-img { transform: scale(1.06); }
        article.glass-card:hover .card-title { color: #E5C06A !important; }
      `}</style>
    </article>
  );
}
