import React, { useState } from 'react';
import { X, Star, Flame, ShoppingBag, Check } from 'lucide-react';
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
    setExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const totalPrice = dish.price + extras.reduce((s, e) => s + e.price, 0);

  const filteredExtras = EXTRAS.filter(
    (e) => !(e.nonVegOnly && isVeg) && !(e.vegOnly && !isVeg)
  );

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-panel anim-zoom-in">
        {/* ── Close Button ── */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 30,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(9, 7, 8, 0.9)',
            border: '1.5px solid var(--warm-wood)',
            cursor: 'pointer',
            color: 'var(--soft-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            transition: 'all 0.3s var(--ease-premium)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--warm-gold)';
            e.currentTarget.style.color = 'var(--warm-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--warm-wood)';
            e.currentTarget.style.color = 'var(--soft-cream)';
          }}
        >
          <X size={18} />
        </button>

        {/* ── LEFT: Interactive 3D Viewer Panel ── */}
        <div
          style={{
            padding: '36px 28px',
            borderRight: '1.5px solid rgba(158, 22, 43, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            background: 'rgba(9, 7, 8, 0.25)',
          }}
          className="modal-left"
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.28em',
              color: 'var(--korean-red)',
              textTransform: 'uppercase',
            }}
          >
            INTERACTIVE 3D PRESENTATION
          </div>
          
          <DishViewer3D dish={dish} />
          
          <div
            style={{
              fontSize: 11,
              color: 'rgba(245, 235, 221, 0.45)',
              textAlign: 'center',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
            }}
          >
            Use touch/mouse swipe to orbit model · scroll/pinch to zoom in and out. <br />
            Switch tabs to explore preloaded 360° frames.
          </div>
        </div>

        {/* ── RIGHT: Dish Descriptions & Toppings ── */}
        <div
          style={{
            padding: '36px 32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxHeight: '90vh',
          }}
          className="modal-right"
        >
          {/* Category Pill and Spiciness */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.15em',
                background: isVeg ? 'rgba(34,197,94,0.12)' : 'rgba(158, 22, 43, 0.12)',
                border: `1.5px solid ${isVeg ? 'rgba(34,197,94,0.45)' : 'rgba(198, 33, 56, 0.45)'}`,
                color: isVeg ? '#22c55e' : 'var(--warm-red)',
                textTransform: 'uppercase',
              }}
            >
              {isVeg ? '🌿 VEGETARIAN' : '🍖 NON-VEGETARIAN'} RAMEN
            </span>
            {dish.spiceLevel > 0 && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 800,
                  background: 'rgba(196, 33, 56, 0.12)',
                  border: '1.5px solid rgba(196, 33, 56, 0.45)',
                  color: 'var(--warm-red)',
                }}
              >
                {[...Array(dish.spiceLevel)].map((_, i) => (
                  <Flame key={i} size={11} style={{ fill: 'var(--warm-red)' }} />
                ))}
                SPICY Lvl {dish.spiceLevel}
              </span>
            )}
          </div>

          {/* Dish Header */}
          <div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.3em',
                color: 'var(--warm-gold)',
                fontWeight: 800,
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 4,
              }}
            >
              LITTLE KIMCHI SPECIALTY
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
                fontWeight: 900,
                color: 'var(--soft-cream)',
                lineHeight: 1.15,
                marginBottom: 8,
              }}
            >
              {dish.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  style={{ fill: 'var(--warm-gold)', color: 'var(--warm-gold)' }}
                />
              ))}
              <span style={{ fontSize: 11, color: 'rgba(245, 235, 221, 0.45)', marginLeft: 6 }}>
                5.0 · Chef Recommended Recipe
              </span>
            </div>
          </div>

          {/* Pricing tag */}
          <div
            className="font-serif"
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: 'var(--warm-gold)',
              lineHeight: 1,
            }}
          >
            ₹{dish.price}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 13.5,
              color: 'rgba(245, 235, 221, 0.75)',
              lineHeight: 1.7,
            }}
          >
            {dish.description}
          </p>

          {/* Ingredients list */}
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: 'rgba(245, 235, 221, 0.45)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Fresh Ingredients In Bowl
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dish.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-pill">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Customize Checklist */}
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: 'rgba(245, 235, 221, 0.45)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Customize Your Bowl
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {filteredExtras.map((extra) => {
                const selected = extras.some((e) => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    style={{
                      padding: '14px 16px',
                      background: selected
                        ? 'rgba(58, 12, 21, 0.6)'
                        : 'rgba(26, 8, 13, 0.55)',
                      border: `1.5px solid ${
                        selected ? 'var(--warm-gold)' : 'rgba(158, 22, 43, 0.25)'
                      }`,
                      borderRadius: 16,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      transition: 'all 0.3s var(--ease-premium)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: 'var(--soft-cream)',
                          marginBottom: 2,
                        }}
                      >
                        {extra.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--warm-gold)',
                          fontWeight: 700,
                        }}
                      >
                        +₹{extra.price}
                      </div>
                    </div>
                    {/* Check Circle */}
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: selected ? 'var(--korean-red)' : 'rgba(158, 22, 43, 0.25)',
                        border: `1px solid ${
                          selected ? 'var(--korean-red)' : 'rgba(158, 22, 43, 0.4)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s var(--ease-premium)',
                        flexShrink: 0,
                      }}
                    >
                      {selected && <Check size={12} color="white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action button bar */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              paddingTop: 16,
              borderTop: '1.5px solid rgba(158, 22, 43, 0.15)',
              marginTop: 10,
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '15px 24px',
                borderRadius: 16,
                background: 'transparent',
                border: '1.5px solid rgba(245, 235, 221, 0.25)',
                color: 'rgba(245, 235, 221, 0.7)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.3s var(--ease-premium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--soft-cream)';
                e.currentTarget.style.color = 'var(--soft-cream)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 235, 221, 0.25)';
                e.currentTarget.style.color = 'rgba(245, 235, 221, 0.7)';
              }}
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onAddToOrder(dish, extras);
                onClose();
              }}
              style={{
                flex: 1,
                padding: '15px 24px',
                borderRadius: 16,
                background: 'linear-gradient(135deg, var(--korean-red), var(--warm-red))',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--soft-cream)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 8px 24px rgba(158, 22, 43, 0.45)',
                transition: 'filter 0.3s, transform 0.3s var(--ease-premium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
              }}
            >
              <ShoppingBag size={15} />
              ADD TO ORDER · ₹{totalPrice}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop split panel adjustments */
        @media (max-width: 799px) {
          .modal-panel { grid-template-columns: 1fr !important; max-height: 95vh; }
          .modal-left { border-right: none !important; border-bottom: 1.5px solid rgba(158, 22, 43, 0.15); padding: 24px 20px !important; }
          .modal-right { padding: 24px 20px !important; maxHeight: none; }
        }
      `}</style>
    </div>
  );
}
