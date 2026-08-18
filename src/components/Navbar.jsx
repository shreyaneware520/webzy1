import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, X, Menu } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick, activeSection, scrollToSection, onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevCount = useRef(cartCount);
  const [badgePop, setBadgePop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge on count change
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 400);
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

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

  // Close menu on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: scrolled ? 'rgba(9, 7, 8, 0.96)' : 'rgba(9, 7, 8, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1.5px solid rgba(158, 22, 43, 0.25)'
            : '1px solid rgba(158, 22, 43, 0.08)',
          boxShadow: scrolled ? '0 8px 30px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'all 0.4s var(--ease-premium)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 64 : 78,
            transition: 'height 0.4s var(--ease-premium)',
          }}
        >
          {/* ── Brand Logo & Emblem ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textAlign: 'left',
            }}
          >
            {/* Custom Premium SVG Emblem */}
            <div
              style={{
                width: scrolled ? 38 : 44,
                height: scrolled ? 38 : 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--korean-red), var(--warm-red))',
                border: '1.5px solid var(--warm-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: scrolled
                  ? '0 4px 16px rgba(158, 22, 43, 0.5)'
                  : '0 4px 12px rgba(158, 22, 43, 0.3)',
                flexShrink: 0,
                transition: 'all 0.4s var(--ease-premium)',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Steaming Bowl Silhouette */}
                <path
                  d="M3 13C3 17.42 6.58 21 11 21C15.42 21 19 17.42 19 13H3Z"
                  fill="var(--soft-cream)"
                />
                {/* Gold Rim */}
                <path
                  d="M2.5 13H19.5V11.5H2.5V13Z"
                  fill="var(--warm-gold)"
                />
                {/* Steam Waves */}
                <path
                  d="M6 8.5C6.5 7.5 5.5 6.5 6 5.5"
                  stroke="var(--soft-cream)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 8.5C11.5 7.5 10.5 6.5 11 5.5"
                  stroke="var(--warm-gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 8.5C16.5 7.5 15.5 6.5 16 5.5"
                  stroke="var(--soft-cream)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Chopsticks crossing */}
                <line
                  x1="14.5"
                  y1="3"
                  x2="21.5"
                  y2="10"
                  stroke="var(--warm-gold)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: scrolled ? 15 : 17,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  background: 'var(--grad-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'font-size 0.4s var(--ease-premium)',
                }}
              >
                LITTLE KIMCHI
              </div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: '0.3em',
                  color: 'var(--korean-red)',
                  fontWeight: 700,
                  marginTop: -2,
                  transition: 'opacity 0.3s',
                  opacity: scrolled ? 0 : 1,
                  height: scrolled ? 0 : 'auto',
                  overflow: 'hidden',
                }}
              >
                리틀 김치 · SEOUL RAMEN
              </div>
            </div>
          </button>

          {/* ── Desktop Navigation ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 36 }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Action Icons & Mobile Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Mobile Search Button */}
            <button
              onClick={onSearchOpen}
              aria-label="Search menu"
              className="mobile-search-btn"
              style={{
                display: 'none',
                width: 44,
                height: 44,
                background: 'none',
                border: '1px solid rgba(158, 22, 43, 0.25)',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'rgba(245, 235, 221, 0.7)',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              <Search size={17} />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              aria-label={`Open Cart, ${cartCount} items`}
              style={{
                position: 'relative',
                background: 'rgba(58, 12, 21, 0.45)',
                border: '1.5px solid rgba(158, 22, 43, 0.3)',
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--soft-cream)',
                transition: 'all 0.35s var(--ease-premium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--warm-gold)';
                e.currentTarget.style.color = 'var(--warm-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.3)';
                e.currentTarget.style.color = 'var(--soft-cream)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  className={badgePop ? 'anim-badge-pop' : ''}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: 'var(--korean-red)',
                    color: 'var(--soft-cream)',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    fontSize: 10,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--deep-black)',
                    boxShadow: '0 0 10px rgba(158, 22, 43, 0.5)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: '1px solid rgba(158, 22, 43, 0.3)',
                borderRadius: 12,
                width: 44,
                height: 44,
                cursor: 'pointer',
                color: 'var(--soft-cream)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Navigation Drawer ── */}
        <div
          style={{
            background: 'rgba(9, 7, 8, 0.98)',
            borderTop: '1.5px solid rgba(158, 22, 43, 0.25)',
            padding: menuOpen ? '16px 24px 20px' : '0 24px',
            maxHeight: menuOpen ? 300 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s var(--ease-premium), padding 0.4s var(--ease-premium)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
          className="mobile-drawer"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                background:
                  activeSection === item.id
                    ? 'rgba(158, 22, 43, 0.15)'
                    : 'transparent',
                border: 'none',
                borderRadius: 14,
                padding: '14px 22px',
                color:
                  activeSection === item.id
                    ? 'var(--warm-gold)'
                    : 'var(--soft-cream)',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderLeft:
                  activeSection === item.id
                    ? '3px solid var(--warm-gold)'
                    : '3px solid transparent',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Responsive Mobile Nav Override ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-search-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
