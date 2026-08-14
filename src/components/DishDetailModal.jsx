import React, { useState } from 'react';
import { X, Star, Flame, ShoppingBag, Check, ChevronRight } from 'lucide-react';
import DishViewer3D from './DishViewer3D';

const EXTRAS = [
  { id: 'extra-noodles', name: 'Extra Noodles', price: 30 },
  { id: 'extra-egg', name: 'Ajitama Soft Egg', price: 40, nonVegOnly: true },
  { id: 'extra-tofu', name: 'Grilled Tofu', price: 40, vegOnly: true },
  { id: 'extra-garlic', name: 'Crispy Garlic', price: 15 },
];

export default function DishDetailModal({ dish, onClose, onAddToOrder }) {
  const [extras, setExtras] = useState([]);
  const isVeg = dish.category === 'veg';

  const toggleExtra = (extra) => {
    setExtras(prev =>
      prev.some(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const totalPrice = dish.price + extras.reduce((s, e) => s + e.price, 0);

  const filteredExtras = EXTRAS.filter(e => !(e.nonVegOnly && isVeg) && !(e.vegOnly && !isVeg));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel anim-zoom-in">

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 18, right: 18, zIndex: 30,
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(26,10,12,0.9)',
            border: '1px solid rgba(128,0,32,0.4)',
            cursor: 'pointer', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.4)'; e.currentTarget.style.color = 'var(--cream)'; }}
        >
          <X size={16} />
        </button>

        {/* ── LEFT: 3D Viewer ── */}
        <div style={{
          padding: 28,
          borderRight: '1px solid rgba(128,0,32,0.15)',
          display: 'flex', flexDirection: 'column', gap: 18,
          background: 'rgba(11,8,8,0.4)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--korean-red)', textTransform: 'uppercase' }}>
            Interactive 3D Showcase
          </div>
          <DishViewer3D dish={dish} />
          <p style={{ fontSize: 11, color: 'rgba(250,249,246,0.4)', textAlign: 'center', letterSpacing: '0.05em' }}>
            🖱 Drag to orbit · 🔍 Pinch/scroll to zoom
          </p>
        </div>

        {/* ── RIGHT: Details ── */}
        <div style={{
          padding: 28, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
          {/* Category + spice tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={{
              padding: '5px 14px', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
              background: isVeg ? 'rgba(34,197,94,0.1)' : 'rgba(197,28,36,0.1)',
              border: `1px solid ${isVeg ? 'rgba(34,197,94,0.35)' : 'rgba(197,28,36,0.35)'}`,
              color: isVeg ? '#22c55e' : 'var(--korean-red)',
              textTransform: 'uppercase',
            }}>
              {isVeg ? '🌿 VEG' : '🍖 NON-VEG'} RAMEN
            </span>
            {dish.spiceLevel > 0 && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 14px', borderRadius: 999, fontSize: 10, fontWeight: 800,
                background: 'rgba(197,28,36,0.1)',
                border: '1px solid rgba(197,28,36,0.35)',
                color: 'var(--korean-red)',
              }}>
                {[...Array(dish.spiceLevel)].map((_, i) => <Flame key={i} size={11} style={{ fill: 'var(--korean-red)' }} />)}
                SPICY ×{dish.spiceLevel}
              </span>
            )}
          </div>

          {/* Name + rating */}
          <div>
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 800, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 10,
            }}>
              {dish.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: '#D4AF37', color: '#D4AF37' }} />)}
              <span style={{ fontSize: 11, color: 'rgba(250,249,246,0.45)', marginLeft: 4 }}>5.0 · Authentic Recipe</span>
            </div>
          </div>

          {/* Price */}
          <div className="font-serif" style={{ fontSize: 34, fontWeight: 900, color: 'var(--gold-light)', lineHeight: 1 }}>
            ₹{dish.price}
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: 'rgba(250,249,246,0.75)', lineHeight: 1.7 }}>
            {dish.description}
          </p>

          {/* Ingredients */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(250,249,246,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>
              Ingredients
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dish.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-pill">{ing}</span>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(250,249,246,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>
              Customise Bowl
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {filteredExtras.map(extra => {
                const selected = extras.some(e => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    style={{
                      padding: '12px 14px',
                      background: selected ? 'rgba(74,14,23,0.6)' : 'rgba(26,12,14,0.6)',
                      border: `1px solid ${selected ? 'rgba(212,175,55,0.5)' : 'rgba(128,0,32,0.2)'}`,
                      borderRadius: 14, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      textAlign: 'left', transition: 'all 0.3s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--cream)', marginBottom: 2 }}>{extra.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gold-light)' }}>+₹{extra.price}</div>
                    </div>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6,
                      background: selected ? 'var(--korean-red)' : 'rgba(128,0,32,0.2)',
                      border: `1px solid ${selected ? 'var(--korean-red)' : 'rgba(128,0,32,0.4)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s', flexShrink: 0,
                    }}>
                      {selected && <Check size={12} color="white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer action bar */}
          <div style={{
            display: 'flex', gap: 12, paddingTop: 8,
            borderTop: '1px solid rgba(128,0,32,0.15)',
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '14px 22px', borderRadius: 16,
                background: 'transparent',
                border: '1px solid rgba(250,249,246,0.2)',
                color: 'rgba(250,249,246,0.7)', fontSize: 11, fontWeight: 800,
                letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,249,246,0.2)'; e.currentTarget.style.color = 'rgba(250,249,246,0.7)'; }}
            >
              BACK
            </button>
            <button
              onClick={() => { onAddToOrder(dish, extras); onClose(); }}
              style={{
                flex: 1, padding: '14px 22px', borderRadius: 16,
                background: 'linear-gradient(135deg, #800020, #C51C24)',
                border: 'none', cursor: 'pointer',
                color: 'var(--cream)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 6px 24px rgba(128,0,32,0.45)',
                transition: 'filter 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
            >
              <ShoppingBag size={15} />
              ADD TO ORDER · ₹{totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
