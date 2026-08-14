import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';

export default function OrderCart({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [placed, setPlaced] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [dineIn, setDineIn] = useState(true);

  if (!isOpen) return null;

  const subtotal = cart.reduce((t, item) => {
    const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
    return t + (item.price + ext) * item.quantity;
  }, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const placeOrder = () => {
    if (!cart.length) return;
    setOrdering(true);
    // Simulate API call to kitchen order manager
    setTimeout(() => {
      setOrdering(false);
      setPlaced(true);
    }, 2000);
  };

  const reset = () => {
    onClearCart();
    setPlaced(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div className="cart-overlay" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="cart-drawer">
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
              width: 38,
              height: 38,
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
          {placed ? (
            /* Order Placed Success */
            <div
              style={{
                height: '100%',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '2px solid rgba(34, 197, 94, 0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
                }}
              >
                <CheckCircle2 size={44} color="#22c55e" />
              </div>
              
              <div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: 'var(--soft-cream)',
                    marginBottom: 10,
                  }}
                >
                  ORDER SUBMITTED!
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(245, 235, 221, 0.6)',
                    lineHeight: 1.7,
                    maxWidth: 280,
                    margin: '0 auto',
                  }}
                >
                  Your Korean broth & noodles are cooking on high heat. We'll alert your table shortly.
                </p>
              </div>
              
              <button
                onClick={reset}
                className="btn-primary"
                style={{ padding: '14px 32px', marginTop: 8 }}
              >
                ORDER MORE SPECIALTIES 🍜
              </button>
            </div>
          ) : cart.length === 0 ? (
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
              <div className="font-serif" style={{ fontSize: 19, fontWeight: 800 }}>
                Your bowl is empty
              </div>
              <p style={{ fontSize: 12.5, maxWidth: 220, margin: '0 auto', lineHeight: 1.6 }}>
                Explore the Little Kimchi collection and add dishes to start.
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
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
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
                          aria-label="Remove Item"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'rgba(245, 235, 221, 0.35)',
                            padding: 2,
                            transition: 'color 0.3s',
                            flexShrink: 0,
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
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}
                        >
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{
                              padding: '6px 12px',
                              background: 'none',
                              border: 'none',
                              color: 'var(--soft-cream)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          
                          <span
                            style={{
                              fontSize: 12.5,
                              fontWeight: 800,
                              color: 'var(--soft-cream)',
                              minWidth: 20,
                              textAlign: 'center',
                            }}
                          >
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{
                              padding: '6px 12px',
                              background: 'none',
                              border: 'none',
                              color: 'var(--soft-cream)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
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
        {!placed && cart.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1.5px solid rgba(158, 22, 43, 0.25)',
              background: 'rgba(9, 7, 8, 0.4)',
            }}
          >
            {/* Dine-in Service Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[['🪑 DINE-IN SERVICE', true], ['🛍 TAKEAWAY PACK', false]].map(([label, val]) => (
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
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(245, 235, 221, 0.6)' }}>
                <span>Broth Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(245, 235, 221, 0.6)' }}>
                <span>SGST + CGST (5%)</span>
                <span>₹{gst}</span>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 19,
                  fontWeight: 900,
                  color: 'var(--warm-gold)',
                  paddingTop: 12,
                  borderTop: '1.5px solid rgba(158, 22, 43, 0.25)',
                }}
              >
                <span>TOTAL DUE</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={placeOrder}
              disabled={ordering}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 16,
                background: ordering
                  ? 'rgba(158, 22, 43, 0.5)'
                  : 'linear-gradient(135deg, var(--korean-red), var(--warm-red))',
                border: 'none',
                cursor: ordering ? 'not-allowed' : 'pointer',
                color: 'var(--soft-cream)',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.15em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 8px 30px rgba(158, 22, 43, 0.45)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => !ordering && (e.currentTarget.style.filter = 'brightness(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
            >
              {ordering ? (
                <>
                  <span
                    className="anim-spin"
                    style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                    }}
                  />{' '}
                  DISPATCHING TO KITCHEN...
                </>
              ) : (
                <>SUBMIT ORDER · ₹{total}</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
