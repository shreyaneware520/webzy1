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
    setTimeout(() => { setOrdering(false); setPlaced(true); }, 2200);
  };

  const reset = () => { onClearCart(); setPlaced(false); onClose(); };

  return (
    <>
      {/* Backdrop */}
      <div className="cart-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="cart-drawer">

        {/* ── Header ── */}
        <div style={{
          padding: '22px 24px', borderBottom: '1px solid rgba(128,0,32,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div className="font-serif" style={{ fontSize: 20, fontWeight: 800, color: 'var(--cream)' }}>YOUR ORDER</div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--gold-light)', marginTop: 2 }}>
              {dineIn ? '🪑 DINE-IN' : '🛍 TAKEAWAY'} · QR MENU
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'rgba(26,10,12,0.8)',
            border: '1px solid rgba(128,0,32,0.3)',
            cursor: 'pointer', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {placed ? (
            /* Success screen */
            <div style={{ height: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)',
                border: '2px solid rgba(34,197,94,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 size={40} color="#22c55e" />
              </div>
              <div>
                <div className="font-serif" style={{ fontSize: 22, fontWeight: 800, color: 'var(--cream)', marginBottom: 8 }}>
                  ORDER PLACED!
                </div>
                <p style={{ fontSize: 13, color: 'rgba(250,249,246,0.55)', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
                  Your ramen is being crafted by our chefs. Sit back and enjoy the experience.
                </p>
              </div>
              <button onClick={reset} className="btn-primary" style={{ marginTop: 10 }}>ORDER MORE 🍜</button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty cart */
            <div style={{ height: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14, color: 'rgba(250,249,246,0.35)' }}>
              <span style={{ fontSize: 56 }}>🍜</span>
              <div className="font-serif" style={{ fontSize: 18, fontWeight: 700 }}>Your bowl is empty</div>
              <p style={{ fontSize: 12 }}>Add ramen and add-ons to build your perfect order.</p>
            </div>
          ) : (
            /* Item list */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cart.map((item, idx) => {
                const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
                const lineTotal = (item.price + ext) * item.quantity;
                return (
                  <div key={`${item.id}-${idx}`} style={{
                    display: 'flex', gap: 14, padding: '14px 16px',
                    background: 'rgba(26,10,12,0.6)',
                    border: '1px solid rgba(128,0,32,0.15)',
                    borderRadius: 18, transition: 'all 0.3s',
                    alignItems: 'flex-start',
                  }}>
                    <img src={item.image} alt={item.name} style={{
                      width: 60, height: 60, borderRadius: 12,
                      objectFit: 'cover', border: '1px solid rgba(128,0,32,0.2)', flexShrink: 0,
                    }} onError={e => { e.target.style.display = 'none'; }} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span className="font-serif" style={{ fontSize: 14, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2 }}>
                          {item.name}
                        </span>
                        <button onClick={() => onRemoveItem(idx)} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'rgba(250,249,246,0.3)', padding: 2, transition: 'color 0.3s', flexShrink: 0,
                        }}
                          onMouseEnter={e => e.currentTarget.style.color = '#C51C24'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,249,246,0.3)'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {item.extras?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
                          {item.extras.map((e, i) => (
                            <span key={i} style={{ fontSize: 9, padding: '3px 8px', borderRadius: 999, background: 'rgba(128,0,32,0.2)', color: 'var(--gold-light)', border: '1px solid rgba(128,0,32,0.3)' }}>
                              +{e.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <span className="font-serif" style={{ fontSize: 15, fontWeight: 800, color: 'var(--gold-light)' }}>₹{lineTotal}</span>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 0,
                          background: 'rgba(11,8,8,0.7)',
                          border: '1px solid rgba(128,0,32,0.25)',
                          borderRadius: 10, overflow: 'hidden',
                        }}>
                          <button onClick={() => onUpdateQuantity(idx, item.quantity - 1)} style={{
                            padding: '5px 10px', background: 'none', border: 'none',
                            color: 'var(--cream)', cursor: 'pointer', fontSize: 14,
                          }}><Minus size={13} /></button>
                          <span style={{ padding: '5px 8px', fontSize: 13, fontWeight: 700, color: 'var(--cream)', minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)} style={{
                            padding: '5px 10px', background: 'none', border: 'none',
                            color: 'var(--cream)', cursor: 'pointer', fontSize: 14,
                          }}><Plus size={13} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {!placed && cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(128,0,32,0.15)' }}>
            {/* Dine toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
              {[['🪑 DINE-IN', true], ['🛍 TAKEAWAY', false]].map(([label, val]) => (
                <button
                  key={label}
                  onClick={() => setDineIn(val)}
                  style={{
                    padding: '10px', borderRadius: 12, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.3s',
                    background: dineIn === val ? 'rgba(74,14,23,0.5)' : 'transparent',
                    border: `1px solid ${dineIn === val ? 'rgba(212,175,55,0.4)' : 'rgba(128,0,32,0.2)'}`,
                    color: dineIn === val ? 'var(--gold-light)' : 'rgba(250,249,246,0.5)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Bill */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(250,249,246,0.55)' }}>
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(250,249,246,0.55)' }}>
                <span>GST (5%)</span><span>₹{gst}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: 'var(--gold-light)', paddingTop: 10, borderTop: '1px solid rgba(128,0,32,0.15)' }}>
                <span>TOTAL</span><span>₹{total}</span>
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={placeOrder}
              disabled={ordering}
              style={{
                width: '100%', padding: '16px', borderRadius: 16,
                background: ordering ? 'rgba(128,0,32,0.5)' : 'linear-gradient(135deg, #800020, #C51C24)',
                border: 'none', cursor: ordering ? 'not-allowed' : 'pointer',
                color: 'var(--cream)', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 6px 24px rgba(128,0,32,0.4)',
                transition: 'filter 0.3s',
              }}
              onMouseEnter={e => !ordering && (e.currentTarget.style.filter = 'brightness(1.15)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
            >
              {ordering ? (
                <><span className="anim-spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} /> SENDING ORDER...</>
              ) : (
                <>PLACE ORDER · ₹{total}</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
