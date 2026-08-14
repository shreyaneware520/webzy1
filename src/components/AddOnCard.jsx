import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddOnCard({ item, onAddToOrder }) {
  const isVeg = item.category === 'veg';
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        background: 'rgba(26, 8, 13, 0.55)',
        border: '1px solid rgba(158, 22, 43, 0.18)',
        borderRadius: 18,
        backdropFilter: 'blur(8px)',
        transition: 'all 0.35s var(--ease-premium)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 74, 0.35)';
        e.currentTarget.style.background = 'rgba(58, 12, 21, 0.4)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.18)';
        e.currentTarget.style.background = 'rgba(26, 8, 13, 0.55)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: 14,
          overflow: 'hidden',
          flexShrink: 0,
          background: '#090708',
          position: 'relative',
          border: '1px solid rgba(158, 22, 43, 0.15)',
        }}
      >
        {imgError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            🥟
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s var(--ease-premium)',
            }}
          />
        )}
        {/* Veg/Non-Veg dot */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            left: 5,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: isVeg ? 'var(--green)' : 'var(--warm-red)',
            border: '1.5px solid rgba(9, 7, 8, 0.8)',
            boxShadow: `0 0 5px ${isVeg ? 'var(--green)' : 'var(--warm-red)'}`,
          }}
        />
      </div>

      {/* Info details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: 8,
            color: 'var(--korean-red)',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 2,
          }}
        >
          {isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
        </span>
        <h4
          className="font-serif"
          style={{
            fontSize: 14,
            fontWeight: 750,
            color: 'var(--soft-cream)',
            lineHeight: 1.25,
            marginBottom: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </h4>
        <p
          style={{
            fontSize: 10,
            color: 'rgba(245, 235, 221, 0.45)',
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <span
            className="font-serif"
            style={{ fontSize: 16, fontWeight: 800, color: 'var(--warm-gold)' }}
          >
            ₹{item.price}
          </span>
          <button
            onClick={() => onAddToOrder(item)}
            aria-label={`Add ${item.name}`}
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, var(--korean-red), var(--warm-red))',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              color: 'var(--soft-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s var(--ease-premium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.25)';
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
