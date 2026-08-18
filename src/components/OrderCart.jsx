import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';

export default function OrderCart({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [dineIn, setDineIn] = useState(true);

  // Body scroll lock when cart open
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Escape key close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((t, item) => {
    const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
    return t + (item.price + ext) * item.quantity;
  }, 0);
  const gst = Math.round(subtotal * 0.05);

  return (
    <>
      {/* Backdrop overlay */}
      <div className="cart-overlay" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        {/* ── Header Area ── */}
        <div
          style={{
            padding: '24px 24px',
            borderBottom: '1.5px solid rgba(158, 22, 43, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(9, 7, 8, 0.4)',
          }}
        >
          <div>
            <div
              className="font-serif"
              style={{ fontSize: 20, fontWeight: 900, color: 'var(--soft-cream)' }}
            >
              YOUR RAMEN ORDER
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                color: 'var(--warm-gold)',
                marginTop: 3,
                fontWeight: 800,
              }}
            >
              {dineIn ? '🪑 DINE-IN SERVICE' : '🛍 TAKEAWAY PACKAGE'}
            </div>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Close Cart"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(9, 7, 8, 0.85)',
              border: '1.5px solid var(--warm-wood)',
              cursor: 'pointer',
              color: 'var(--soft-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <X size={16} />
          </button>
        </div>

        {/* ── Drawer Contents ── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 24px',
          }}
        >
          {cart.length === 0 ? (
            /* Empty State */
            <div
              style={{
                height: '100%',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 16,
                color: 'rgba(245, 235, 221, 0.35)',
              }}
            >
              <span style={{ fontSize: 60, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
                🍜
              </span>
              <div className="font-serif" style={{ fontSize: 19, fontWeight: 800, color: 'rgba(245, 235, 221, 0.5)' }}>
                Your bowl is empty
              </div>
              <p style={{ fontSize: 12.5, maxWidth: 220, margin: '0 auto', lineHeight: 1.6 }}>
                Explore the Little Kimchi collection and find something delicious.
              </p>
            </div>
          ) : (
            /* Ordered Items list */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((item, idx) => {
                const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
                const lineTotal = (item.price + ext) * item.quantity;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: '16px',
                      background: 'rgba(26, 8, 13, 0.6)',
                      border: '1.5px solid rgba(158, 22, 43, 0.18)',
                      borderRadius: 20,
                      alignItems: 'flex-start',
                      transition: 'all 0.3s',
                      animation: 'fadeInUp 0.3s var(--ease-premium)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 12,
                        objectFit: 'cover',
                        border: '1.5px solid rgba(158, 22, 43, 0.25)',
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <span
                          className="font-serif"
                          style={{
                            fontSize: 14.5,
                            fontWeight: 800,
                            color: 'var(--soft-cream)',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.name}
                        </span>
                        
                        <button
                          onClick={() => onRemoveItem(idx)}
                          aria-label={`Remove ${item.name}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'rgba(245, 235, 221, 0.35)',
                            padding: 4,
                            transition: 'color 0.3s',
                            flexShrink: 0,
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--warm-red)')}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = 'rgba(245, 235, 221, 0.35)')
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Customized Extra Items list */}
                      {item.extras?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                          {item.extras.map((e, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: 9,
                                padding: '3px 8px',
                                borderRadius: 999,
                                background: 'rgba(158, 22, 43, 0.15)',
                                color: 'var(--warm-gold)',
                                border: '1px solid rgba(158, 22, 43, 0.3)',
                                fontWeight: 700,
                              }}
                            >
                              +{e.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Quantity Editor Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 12,
                        }}
                      >
                        <span
                          className="font-serif"
                          style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: 'var(--warm-gold)',
                            transition: 'all 0.3s',
                          }}
                        >
                          ₹{lineTotal}
                        </span>
                        
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(9, 7, 8, 0.75)',
                            border: '1px solid rgba(158, 22, 43, 0.3)',
                            borderRadius: 12,
                            overflow: 'hidden',
                          }}
                        >
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{
                              padding: '8px 14px',
                              background: 'none',
                              border: 'none',
                              color: 'var(--soft-cream)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              minWidth: 44,
                              minHeight: 36,
                              justifyContent: 'center',
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 800,
                              color: 'var(--soft-cream)',
                              minWidth: 24,
                              textAlign: 'center',
                              transition: 'all 0.2s',
                            }}
                          >
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{
                              padding: '8px 14px',
                              background: 'none',
                              border: 'none',
                              color: 'var(--soft-cream)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              minWidth: 44,
                              minHeight: 36,
                              justifyContent: 'center',
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Bill Summary Footer ── */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1.5px solid rgba(158, 22, 43, 0.25)',
              background: 'rgba(9, 7, 8, 0.4)',
            }}
          >
            {/* Dine-in Service Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[['🪑 DINE-IN', true], ['🛍 TAKEAWAY', false]].map(([label, val]) => (
                <button
                  key={label}
                  onClick={() => setDineIn(val)}
                  style={{
                    padding: '12px 6px',
                    borderRadius: 14,
                    fontSize: 10,
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-premium)',
                    background: dineIn === val ? 'rgba(58, 12, 21, 0.55)' : 'transparent',
                    border: `1.5px solid ${
                      dineIn === val ? 'var(--warm-gold)' : 'rgba(158, 22, 43, 0.25)'
                    }`,
                    color: dineIn === val ? 'var(--warm-gold)' : 'rgba(245, 235, 221, 0.5)',
                    letterSpacing: '0.08em',
                    minHeight: 44,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
