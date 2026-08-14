import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddOnCard({ item, onAddToOrder }) {
  const isVeg = item.category === 'veg';
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      background: 'rgba(26,12,14,0.55)',
      border: '1px solid rgba(128,0,32,0.15)',
      borderRadius: 18, backdropFilter: 'blur(8px)',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(74,14,23,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.15)'; e.currentTarget.style.background = 'rgba(26,12,14,0.55)'; e.currentTarget.style.transform = 'none'; }}
    >
      {/* Thumbnail */}
      <div style={{
        width: 68, height: 68, borderRadius: 14,
        overflow: 'hidden', flexShrink: 0,
        background: '#120808', position: 'relative',
      }}>
        {imgError ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🥟</div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
        )}
        {/* Veg/NonVeg dot */}
        <div style={{
          position: 'absolute', top: 5, left: 5,
          width: 10, height: 10, borderRadius: '50%',
          background: isVeg ? '#22c55e' : '#C51C24',
          border: '1.5px solid rgba(11,8,8,0.8)',
        }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 className="font-serif" style={{
          fontSize: 14, fontWeight: 700, color: 'var(--cream)',
          lineHeight: 1.2, marginBottom: 3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.name}
        </h4>
        <p style={{
          fontSize: 10, color: 'rgba(250,249,246,0.45)',
          lineHeight: 1.4, overflow: 'hidden',
          display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
        }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span className="font-serif" style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold-light)' }}>
            ₹{item.price}
          </span>
          <button
            onClick={() => onAddToOrder(item)}
            aria-label={`Add ${item.name}`}
            style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #800020, #C51C24)',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              color: 'var(--cream)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'filter 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.2)'; e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
