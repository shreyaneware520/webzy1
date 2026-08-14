import React, { useState } from 'react';
import { Eye, Flame, Plus } from 'lucide-react';

export default function RamenCard({ dish, onOpen3D, onAddToOrder }) {
  const isVeg = dish.category === 'veg';
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        border: '1.5px solid rgba(158, 22, 43, 0.15)',
        background: 'rgba(26, 8, 13, 0.55)',
        borderRadius: 24,
      }}
    >
      {/* ── Top Badge Bar ── */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 999,
          background: 'rgba(9, 7, 8, 0.85)',
          backdropFilter: 'blur(8px)',
          border: `1.5px solid ${isVeg ? 'rgba(34,197,94,0.45)' : 'rgba(158, 22, 43, 0.45)'}`,
        }}
      >
        <span className={isVeg ? 'veg-dot' : 'nonveg-dot'} />
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--soft-cream)',
            textTransform: 'uppercase',
          }}
        >
          {isVeg ? 'VEG' : 'NON-VEG'}
        </span>
      </div>

      {/* Spice Flame badge */}
      {dish.spiceLevel > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(158, 22, 43, 0.15)',
            border: '1.5px solid rgba(196, 33, 56, 0.45)',
            color: 'var(--warm-red)',
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          <Flame size={12} style={{ fill: 'var(--warm-red)' }} />
          <span style={{ fontSize: 9 }}>SPICY ×{dish.spiceLevel}</span>
        </div>
      )}

      {/* ── Food Image (Hover trigger) ── */}
      <div
        onClick={() => onOpen3D(dish)}
        style={{
          position: 'relative',
          paddingTop: '72%',
          overflow: 'hidden',
          background: '#090708',
          cursor: 'pointer',
        }}
        className="card-img-wrap"
      >
        {imgError ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1A080D, #3A0C15)',
              fontSize: 48,
              gap: 8,
            }}
          >
            🍜
            <span
              style={{
                fontSize: 10,
                color: 'rgba(245, 235, 221, 0.45)',
                letterSpacing: '0.15em',
                fontWeight: 'bold',
              }}
            >
              PREPARING BOWL
            </span>
          </div>
        ) : (
          <img
            src={dish.image}
            alt={dish.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s var(--ease-premium)',
            }}
            className="card-img"
          />
        )}

        {/* Shadow Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9, 7, 8, 0.95) 0%, rgba(9, 7, 8, 0.15) 60%, transparent 100%)',
          }}
        />

        {/* Hover overlay CTA */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(58, 12, 21, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.35s ease',
          }}
          className="card-overlay"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 999,
              background: 'var(--soft-cream)',
              color: 'var(--deep-black)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.18em',
              transform: 'translateY(14px)',
              transition: 'transform 0.35s var(--ease-premium)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
            }}
            className="card-cta"
          >
            <Eye size={13} strokeWidth={2.5} /> VIEW IN 3D
          </div>
        </div>
      </div>

      {/* ── Card Content Details ── */}
      <div
        style={{
          padding: '22px 24px 24px',
          background: 'linear-gradient(180deg, rgba(26, 8, 13, 0.25) 0%, rgba(9, 7, 8, 0.75) 100%)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          borderTop: '1.5px solid rgba(158, 22, 43, 0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <span
              style={{
                fontSize: 9,
                color: 'var(--korean-red)',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 3,
              }}
            >
              라면 · RAMEN
            </span>
            <h3
              className="font-serif card-title"
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--soft-cream)',
                lineHeight: 1.25,
                transition: 'color 0.3s',
              }}
            >
              {dish.name}
            </h3>
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 21,
              fontWeight: 800,
              color: 'var(--warm-gold)',
              whiteSpace: 'nowrap',
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            ₹{dish.price}
          </div>
        </div>

        <p
          style={{
            fontSize: 12.5,
            color: 'rgba(245, 235, 221, 0.65)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {dish.description}
        </p>

        {/* Spice level icons */}
        {dish.spiceLevel > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontSize: 9,
                color: 'rgba(245, 235, 221, 0.45)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              SPICINESS:
            </span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(3)].map((_, i) => (
                <Flame
                  key={i}
                  size={12}
                  style={{
                    color: i < dish.spiceLevel ? 'var(--warm-red)' : 'rgba(245, 235, 221, 0.15)',
                    fill: i < dish.spiceLevel ? 'var(--warm-red)' : 'transparent',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 6 }}>
          <button
            onClick={() => onOpen3D(dish)}
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'rgba(58, 12, 21, 0.5)',
              border: '1.5px solid rgba(158, 22, 43, 0.35)',
              borderRadius: 14,
              cursor: 'pointer',
              color: 'var(--soft-cream)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.35s var(--ease-premium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--warm-gold)';
              e.currentTarget.style.background = 'rgba(158, 22, 43, 0.4)';
              e.currentTarget.style.color = 'var(--warm-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.35)';
              e.currentTarget.style.background = 'rgba(58, 12, 21, 0.5)';
              e.currentTarget.style.color = 'var(--soft-cream)';
            }}
          >
            <Eye size={13} color="var(--warm-gold)" /> VIEW IN 3D
          </button>
          <button
            onClick={() => onAddToOrder(dish)}
            aria-label="Add to order"
            style={{
              width: 44,
              height: 44,
              background: 'linear-gradient(135deg, var(--korean-red), var(--warm-red))',
              border: 'none',
              borderRadius: 14,
              cursor: 'pointer',
              color: 'var(--soft-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(158, 22, 43, 0.45)',
              transition: 'all 0.3s var(--ease-premium)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.2)';
              e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Styled card hover selectors */}
      <style>{`
        .card-img-wrap:hover .card-overlay { opacity: 1 !important; }
        .card-img-wrap:hover .card-cta { transform: translateY(0) !important; }
        .card-img-wrap:hover .card-img { transform: scale(1.06); }
        article.glass-card:hover .card-title { color: var(--warm-gold) !important; }
      `}</style>
    </article>
  );
}
