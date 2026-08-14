import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick, activeSection, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'RAMEN', id: 'ramen-collection' },
    { label: 'ADD-ONS', id: 'addons-section' },
    { label: 'ABOUT', id: 'about-section' },
    { label: 'CONTACT', id: 'contact-section' },
  ];

  const handleNav = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
        background: 'rgba(11,8,8,0.85)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(128,0,32,0.2)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          
          {/* ── Brand Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #800020, #C51C24)',
              border: '1.5px solid rgba(212,175,55,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: '0 4px 16px rgba(128,0,32,0.5)',
              flexShrink: 0,
            }}>
              🍜
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 17, fontWeight: 800, letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #FAF9F6 0%, #D4AF37 60%, #C5A059 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>LITTLE KIMCHI</div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: '#C51C24', fontWeight: 700, marginTop: -2 }}>
                리틀 김치 · SEOUL BAR
              </div>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Cart + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onCartClick}
              aria-label="Open Cart"
              style={{
                position: 'relative', background: 'rgba(74,14,23,0.6)',
                border: '1px solid rgba(128,0,32,0.4)', borderRadius: '50%',
                width: 44, height: 44, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--cream)', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.4)'; e.currentTarget.style.color = 'var(--cream)'; }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: 'var(--korean-red)', color: 'var(--cream)',
                  borderRadius: '50%', width: 20, height: 20,
                  fontSize: 10, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--charcoal)',
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              aria-label="Toggle Menu"
              style={{
                background: 'none', border: '1px solid rgba(128,0,32,0.3)', borderRadius: 10,
                padding: 8, cursor: 'pointer', color: 'var(--cream)',
                display: 'none', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {menuOpen && (
          <div style={{
            background: 'rgba(11,8,8,0.97)',
            borderTop: '1px solid rgba(128,0,32,0.2)',
            padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8,
            animation: 'fadeInUp 0.3s ease',
          }} className="mobile-drawer">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  background: activeSection === item.id ? 'rgba(128,0,32,0.25)' : 'transparent',
                  border: 'none', borderRadius: 12, padding: '14px 20px',
                  color: activeSection === item.id ? 'var(--gold-light)' : 'var(--cream-dim)',
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
