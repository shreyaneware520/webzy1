import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RamenCard from './components/RamenCard';
import AddOnCard from './components/AddOnCard';
import DishDetailModal from './components/DishDetailModal';
import OrderCart from './components/OrderCart';
import CherryBlossomCanvas from './components/CherryBlossomCanvas';
import { menuData } from './data/menu';
import { Search, ChefHat, MapPin, Clock, Phone, ArrowUp, X, ShoppingBag } from 'lucide-react';

/* ── helpers ── */
const calcTotal = (cart) =>
  cart.reduce((t, item) => {
    const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
    return t + (item.price + ext) * item.quantity;
  }, 0);

/* ── useScrollReveal hook ── */
function useScrollReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) {
      // If reduced motion, make all visible immediately
      el.querySelectorAll('.scroll-reveal').forEach((c) => c.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const items = el.querySelectorAll('.scroll-reveal');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, deps);

  return ref;
}

/* ── Section Header Component ── */
function SectionHeader({ tag, title, sub, center = true }) {
  return (
    <div className="scroll-reveal" style={{ textAlign: center ? 'center' : 'left', marginBottom: 48 }}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title font-serif">{title}</h2>
      <div className="divider" style={{ margin: center ? '20px auto' : '20px 0' }} />
      {sub && (
        <p
          style={{
            fontSize: 14,
            color: 'rgba(245, 235, 221, 0.65)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: center ? '0 auto' : 0,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Contact Card Component ── */
function ContactCard({ icon, title, children }) {
  return (
    <div
      className="scroll-reveal"
      style={{
        display: 'flex',
        gap: 20,
        padding: '28px 30px',
        background: 'rgba(26, 8, 13, 0.6)',
        border: '1.5px solid rgba(158, 22, 43, 0.18)',
        borderRadius: 22,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.35s var(--ease-premium)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--warm-gold)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.18)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          flexShrink: 0,
          background: 'rgba(58, 12, 21, 0.85)',
          border: '1.5px solid rgba(158, 22, 43, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--warm-gold)',
        }}
      >
        {icon}
      </div>
      <div>
        <div
          className="font-serif"
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: 'var(--soft-cream)',
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'rgba(245, 235, 221, 0.7)',
            lineHeight: 1.75,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── SearchOverlay Component ── */
function SearchOverlay({ query, onQueryChange, results, onSelectDish, onAddToOrder, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const highlightMatch = (text, q) => {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="search-highlight">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div className="search-overlay">
      {/* Search Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 18,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(245, 235, 221, 0.4)',
              pointerEvents: 'none',
            }}
          />
          <input
            ref={inputRef}
            type="text"
            className="search-overlay-input"
            placeholder="Search dishes, ingredients..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Close search"
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(26, 8, 13, 0.6)',
            border: '1px solid rgba(158, 22, 43, 0.3)',
            color: 'var(--soft-cream)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {query.length < 2 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: 'rgba(245, 235, 221, 0.3)',
          }}>
            <Search size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'rgba(245, 235, 221, 0.45)' }}>
              Search our menu
            </div>
            <p style={{ fontSize: 13 }}>
              Try "chicken", "miso", "kimchi", or "dumplings"
            </p>
          </div>
        ) : results.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: 'rgba(245, 235, 221, 0.3)',
          }}>
            <ChefHat size={48} style={{ marginBottom: 16, color: 'var(--korean-red)' }} />
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 800, color: 'var(--soft-cream)', marginBottom: 8 }}>
              No dishes found
            </div>
            <p style={{ fontSize: 13 }}>
              Try searching for another dish or ingredient.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
              color: 'rgba(245, 235, 221, 0.4)', marginBottom: 4,
            }}>
              {results.length} RESULT{results.length !== 1 ? 'S' : ''} FOUND
            </div>
            {results.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  background: 'rgba(26, 8, 13, 0.55)',
                  border: '1px solid rgba(158, 22, 43, 0.18)',
                  borderRadius: 18,
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--ease-premium)',
                }}
                onClick={() => onSelectDish(item)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 74, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.18)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 56, height: 56, borderRadius: 12,
                    objectFit: 'cover', flexShrink: 0,
                    border: '1px solid rgba(158, 22, 43, 0.15)',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2,
                  }}>
                    <span className={item.category === 'veg' ? 'veg-dot' : 'nonveg-dot'}
                      style={{ width: 7, height: 7 }} />
                    <span style={{
                      fontSize: 8, fontWeight: 800, letterSpacing: '0.15em',
                      color: 'var(--korean-red)', textTransform: 'uppercase',
                    }}>
                      {item.type === 'ramen' ? 'RAMEN' : 'ADD-ON'}
                    </span>
                  </div>
                  <div className="font-serif" style={{
                    fontSize: 15, fontWeight: 800, color: 'var(--soft-cream)', lineHeight: 1.2,
                  }}>
                    {highlightMatch(item.name, query)}
                  </div>
                  <div style={{
                    fontSize: 11, color: 'rgba(245, 235, 221, 0.5)', marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {highlightMatch(item.description, query)}
                  </div>
                </div>
                <div className="font-serif" style={{
                  fontSize: 16, fontWeight: 800, color: 'var(--warm-gold)', whiteSpace: 'nowrap',
                }}>
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ramenFilter, setRamenFilter] = useState('veg');
  const [addonFilter, setAddonFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [showTop, setShowTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollRevealRef = useScrollReveal([ramenFilter, addonFilter, query]);
  const categoryBarRef = useRef(null);

  /* ── Scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      const ids = ['contact-section', 'about-section', 'addons-section', 'ramen-collection'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
        if (id === 'ramen-collection') setActiveSection('hero');
      }
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 130, behavior: 'smooth' });
  };

  /* ── Cart ops ── */
  const addToOrder = useCallback((dish, extras = []) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === dish.id && JSON.stringify(i.extras || []) === JSON.stringify(extras)
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...dish, quantity: 1, extras }];
    });
  }, []);

  const updateQty = useCallback((idx, qty) => {
    if (qty <= 0) setCart((c) => c.filter((_, i) => i !== idx));
    else
      setCart((c) => {
        const n = [...c];
        n[idx] = { ...n[idx], quantity: qty };
        return n;
      });
  }, []);

  const removeItem = useCallback((idx) => setCart((c) => c.filter((_, i) => i !== idx)), []);

  /* ── Category Navigation ── */
  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);

    if (cat === 'all') {
      setRamenFilter('veg');
      setAddonFilter('all');
      scrollTo('ramen-collection');
    } else if (cat === 'ramen') {
      setRamenFilter('veg');
      scrollTo('ramen-collection');
    } else if (cat === 'addons') {
      setAddonFilter('all');
      scrollTo('addons-section');
    } else if (cat === 'veg') {
      setRamenFilter('veg');
      setAddonFilter('veg');
      scrollTo('ramen-collection');
    } else if (cat === 'non-veg') {
      setRamenFilter('non-veg');
      setAddonFilter('non-veg');
      scrollTo('ramen-collection');
    }
  }, []);

  // Auto-scroll active category chip into view
  useEffect(() => {
    const bar = categoryBarRef.current;
    if (!bar) return;
    const activeChip = bar.querySelector('.category-chip.active');
    if (activeChip) {
      activeChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  /* ── Search ── */
  const allDishes = useMemo(() => [
    ...menuData.ramen,
    ...menuData.addOns,
  ], []);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return allDishes.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.ingredients && d.ingredients.some((ing) => ing.toLowerCase().includes(q))) ||
      d.category.includes(q) ||
      d.type.includes(q)
    );
  }, [searchQuery, allDishes]);

  const handleSearchSelect = useCallback((dish) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedDish(dish);
  }, []);

  /* ── Filters ── */
  const filteredRamen = menuData.ramen.filter(
    (d) =>
      d.category === ramenFilter &&
      (d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.description.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredAddons = menuData.addOns.filter(
    (d) => addonFilter === 'all' || d.category === addonFilter
  );

  const cartQty = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = calcTotal(cart);

  const categories = [
    { id: 'all', label: 'All', emoji: '🍜' },
    { id: 'ramen', label: 'Ramen', emoji: '🍲' },
    { id: 'addons', label: 'Add-Ons', emoji: '🥟' },
    { id: 'veg', label: 'Veg', emoji: '🌿' },
    { id: 'non-veg', label: 'Non-Veg', emoji: '🍖' },
  ];

  return (
    <div
      ref={scrollRevealRef}
      style={{
        minHeight: '100vh',
        background: 'var(--deep-black)',
        color: 'var(--soft-cream)',
        fontFamily: "'Outfit', 'Inter', sans-serif",
        position: 'relative',
      }}
    >
      {/* Ambient Cherry Blossom Particle overlay */}
      <CherryBlossomCanvas />

      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartQty}
        onCartClick={() => setCartOpen(true)}
        activeSection={activeSection}
        scrollToSection={scrollTo}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <SearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          results={searchResults}
          onSelectDish={handleSearchSelect}
          onAddToOrder={addToOrder}
          onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
        />
      )}

      {/* ── Hero Section ── */}
      <div id="hero">
        <Hero
          onExploreClick={() => scrollTo('ramen-collection')}
          onDiscoverClick={() => scrollTo('about-section')}
        />
      </div>

      {/* ── Shop Wooden Board Divider Accent ── */}
      <div
        className="wood-border"
        style={{
          height: 18,
          background: 'var(--grad-wood)',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Subtle shadow glow beneath eave */}
        <div style={{ position: 'absolute', bottom: -8, left: 0, right: 0, height: 8, background: 'linear-gradient(rgba(0,0,0,0.6), transparent)' }} />
      </div>

      {/* ── Sticky Category Navigation Bar ── */}
      <div className="category-bar">
        <div className="category-bar-inner" ref={categoryBarRef}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          RAMEN COLLECTION SECTION
          ══════════════════════════════ */}
      <section
        id="ramen-collection"
        style={{
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, var(--deep-black) 0%, var(--dark-burgundy) 100%)',
        }}
      >
        {/* Radial light spots */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '-120px',
            width: 440,
            height: 440,
            borderRadius: '50%',
            background: 'rgba(158, 22, 43, 0.12)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '-120px',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'rgba(201, 162, 74, 0.05)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container">
          <SectionHeader
            tag="Selected House Bowls"
            title="The Ramen Collection"
            sub="Slow-simmered 18-hour broth paired with fresh house-crafted noodles, soft Ajitama egg, and roasted toppings."
          />

          {/* ── Premium VEG / NON-VEG Segmented Toggle ── */}
          <div className="scroll-reveal" style={{ marginBottom: 12 }}>
            <div className="ramen-category-toggle">
              <button
                onClick={() => setRamenFilter('veg')}
                className={`ramen-category-btn ${ramenFilter === 'veg' ? 'active veg-active' : ''}`}
                aria-pressed={ramenFilter === 'veg'}
              >
                <span className="food-type-indicator veg" />
                VEG RAMEN
              </button>
              <button
                onClick={() => setRamenFilter('non-veg')}
                className={`ramen-category-btn ${ramenFilter === 'non-veg' ? 'active nonveg-active' : ''}`}
                aria-pressed={ramenFilter === 'non-veg'}
              >
                <span className="food-type-indicator nonveg" />
                NON-VEG RAMEN
              </button>
            </div>
          </div>

          {/* ── Category Header ── */}
          <div className="ramen-category-header" key={`header-${ramenFilter}`}>
            <h3>
              <span className={`food-type-indicator ${ramenFilter === 'veg' ? 'veg' : 'nonveg'}`} />
              {ramenFilter === 'veg' ? 'VEG RAMEN' : 'NON-VEG RAMEN'}
            </h3>
            <p>
              {ramenFilter === 'veg'
                ? 'Fresh vegetarian bowls crafted with plant-based ingredients'
                : 'Rich bowls with slow-roasted meat & seafood'}
            </p>
            <div className={`accent-line ${ramenFilter === 'veg' ? 'veg' : 'nonveg'}`} />
          </div>

          {/* ── Search Bar ── */}
          <div
            className="scroll-reveal"
            style={{
              maxWidth: 480,
              margin: '24px auto 40px',
              position: 'relative',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(245, 235, 221, 0.4)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              className="search-input"
              placeholder={ramenFilter === 'veg' ? 'Search veg ramen...' : 'Search non-veg ramen...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* ── Ramen Product Grid ── */}
          {filteredRamen.length > 0 ? (
            <div className="grid-ramen scroll-reveal-stagger ramen-grid-fade" key={`grid-${ramenFilter}`}>
              {filteredRamen.map((dish) => (
                <div key={dish.id} className="scroll-reveal">
                  <RamenCard
                    dish={dish}
                    onViewDetails={setSelectedDish}
                    onAddToOrder={addToOrder}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="scroll-reveal" style={{ textAlign: 'center', padding: '90px 0', color: 'rgba(245, 235, 221, 0.3)' }}>
              <ChefHat size={56} strokeWidth={1} style={{ marginBottom: 18, color: 'var(--korean-red)' }} />
              <div className="font-serif" style={{ fontSize: 22, fontWeight: 800, color: 'var(--soft-cream)' }}>
                No Ramen Found
              </div>
              <p style={{ fontSize: 13.5, marginTop: 8 }}>
                Try searching for other ingredients or switch category filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Segment Divider Wood Plank ── */}
      <div
        className="wood-border"
        style={{
          height: 12,
          background: 'var(--grad-wood)',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* ══════════════════════════════
          ADD-ONS SECTION
          ══════════════════════════════ */}
      <section
        id="addons-section"
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, var(--dark-burgundy) 0%, #15060b 50%, var(--deep-black) 100%)',
          borderTop: '1px solid rgba(158, 22, 43, 0.12)',
        }}
      >
        <div className="container">
          <SectionHeader
            tag="Customise Broth Bowls"
            title="Make It Yours"
            sub="Elevate your ramen experience with hand-picked skewers, dumplings, and savory toppings."
          />

          {/* Addons Category filters */}
          <div className="scroll-reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div className="filter-tabs" style={{ maxWidth: 360, width: '100%' }}>
              {[
                ['all', 'All Extras'],
                ['veg', '🌿 Veg'],
                ['non-veg', '🍖 Non-Veg'],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setAddonFilter(val)}
                  className={`filter-tab ${addonFilter === val ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Grid */}
          <div className="grid-addons scroll-reveal-stagger">
            {filteredAddons.map((item) => (
              <div key={item.id} className="scroll-reveal">
                <AddOnCard item={item} onAddToOrder={addToOrder} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Segment Divider Wood Plank ── */}
      <div
        className="wood-border"
        style={{
          height: 12,
          background: 'var(--grad-wood)',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* ══════════════════════════════
          ABOUT BRAND EXPERIENCE
          ══════════════════════════════ */}
      <section
        id="about-section"
        style={{
          padding: '80px 0',
          borderTop: '1px solid rgba(158, 22, 43, 0.12)',
          background: 'var(--deep-black)',
          position: 'relative',
        }}
      >
        {/* Soft glowing lamps and petals in background */}
        <div className="container">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }}
            className="about-grid"
          >
            {/* Visual Frame inspired by the actual storefront wooden cart */}
            <div
              className="scroll-reveal"
              style={{
                position: 'relative',
                borderRadius: 28,
                padding: 16,
                background: 'var(--grad-wood)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.65)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Inner card viewport */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  border: '2px solid rgba(0,0,0,0.4)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&auto=format&fit=crop&q=85"
                  alt="Chef crafting ramen at Little Kimchi cart"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s var(--ease-premium)',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                
                {/* Scrim Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(9, 7, 8, 0.95) 0%, rgba(9, 7, 8, 0.25) 50%, transparent 100%)',
                  }}
                />

                {/* Wooden Shop Label Badge (리틀 김치) */}
                <div
                  className="wood-tag"
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    fontSize: 12,
                    letterSpacing: '0.12em',
                  }}
                >
                  리틀 김치 · SEOUL BAR
                </div>

                <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.3em',
                      color: 'var(--warm-red)',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    Authentic Storefront Vibe
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: 24, fontWeight: 900, color: 'var(--soft-cream)' }}
                  >
                    Slow Broth. Runny Egg. Cozy Night.
                  </h3>
                </div>
              </div>
            </div>

            {/* Editorial Brand Text */}
            <div>
              <SectionHeader
                tag="Our Brand Heritage"
                title="The Little Kimchi Experience"
                center={false}
              />
              <p
                className="scroll-reveal"
                style={{
                  fontSize: 14.5,
                  color: 'rgba(245, 235, 221, 0.75)',
                  lineHeight: 1.85,
                  marginBottom: 20,
                }}
              >
                At Little Kimchi, our culinary philosophy is inspired by the vibrant street-food carts
                and intimate night-time ramen bars of modern Seoul. Our signature chicken and vegetable
                broths are slow-boiled for exactly 18 hours to release deep, mineral-rich signatures and
                complex umami tones.
              </p>
              <p
                className="scroll-reveal"
                style={{
                  fontSize: 14.5,
                  color: 'rgba(245, 235, 221, 0.75)',
                  lineHeight: 1.85,
                  marginBottom: 36,
                }}
              >
                By blending traditional techniques with a premium digital menu presentation, we aim to satisfy
                all your senses. Sit down, scan your table's QR code, interact with your favorite dishes in 3D,
                and customize the perfect bowl tailored to your cravings.
              </p>
              
              {/* Feature Highlights */}
              <div className="scroll-reveal-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  ['18+ Hrs Boil', 'BROTH EXTRACTION'],
                  ['Daily Hand-Cut', 'HOUSE WHEAT NOODLES'],
                  ['Seoul Signatures', 'TRADITIONAL RECIPES'],
                  ['100% Selected', 'FRESH TOPPING VEGS'],
                ].map(([val, lab]) => (
                  <div
                    key={lab}
                    className="scroll-reveal"
                    style={{
                      padding: '20px 22px',
                      borderRadius: 18,
                      background: 'rgba(26, 8, 13, 0.65)',
                      border: '1.5px solid rgba(158, 22, 43, 0.18)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <div
                      className="font-serif"
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: 'var(--warm-gold)',
                        marginBottom: 4,
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: 'rgba(245, 235, 221, 0.45)',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {lab}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) { .about-grid { grid-template-columns: 1.05fr 0.95fr !important; } }
        `}</style>
      </section>

      {/* ── Segment Divider Wood Plank ── */}
      <div
        className="wood-border"
        style={{
          height: 12,
          background: 'var(--grad-wood)',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* ══════════════════════════════
          CONTACT SECTION
          ══════════════════════════════ */}
      <section
        id="contact-section"
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, var(--deep-black) 0%, var(--dark-burgundy) 50%, var(--deep-black) 100%)',
          borderTop: '1px solid rgba(158, 22, 43, 0.12)',
        }}
      >
        <div className="container">
          <SectionHeader
            tag="Locate Little Kimchi"
            title="Come Share a Bowl"
            sub="We run tables Tuesday through Sunday. Walk in, scan the QR code to interact with our menu, and enjoy freshly served hot ramen."
          />
          <div
            className="scroll-reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            <ContactCard icon={<MapPin size={22} />} title="OUR ADDRESS">
              12, Hanok Street, Seoul Town Centre
              <br />
              MG Road, Bangalore, India
            </ContactCard>
            <ContactCard icon={<Clock size={22} />} title="SERVICE HOURS">
              Tues — Sun: 11:30 AM – 11:00 PM
              <br />
              <span style={{ color: 'var(--korean-red)', fontWeight: 800 }}>Monday: Closed for Prep</span>
            </ContactCard>
            <ContactCard icon={<Phone size={22} />} title="GET IN TOUCH">
              +91 98765 43210
              <br />
              hello@littlekimchi.cafe
            </ContactCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER AREA
          ══════════════════════════════ */}
      <footer
        style={{
          padding: '48px 0',
          borderTop: '1.5px solid rgba(158, 22, 43, 0.25)',
          background: 'rgba(9, 7, 8, 0.95)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div>
            <div
              className="font-serif gold-text"
              style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.15em' }}
            >
              LITTLE KIMCHI
            </div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.24em',
                color: 'rgba(245, 235, 221, 0.4)',
                fontWeight: 700,
                marginTop: 6,
                textTransform: 'uppercase',
              }}
            >
              © 2026 LITTLE KIMCHI CAFÉ · 리틀 김치 · ALL RIGHTS RESERVED
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 14 }}>
            {/* Social Media Link icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'rgba(26, 8, 13, 0.8)',
                border: '1.5px solid rgba(158, 22, 43, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(245, 235, 221, 0.65)',
                transition: 'all 0.35s var(--ease-premium)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--warm-gold)';
                e.currentTarget.style.color = 'var(--warm-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(158, 22, 43, 0.35)';
                e.currentTarget.style.color = 'rgba(245, 235, 221, 0.65)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ── Overlay Modals & Views ── */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToOrder={addToOrder}
        />
      )}

      <OrderCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
        onClearCart={() => setCart([])}
      />

      {/* ── Floating Cart Bar (Mobile) ── */}
      {cartQty > 0 && !cartOpen && !selectedDish && (
        <button
          className="floating-cart-bar"
          onClick={() => setCartOpen(true)}
          aria-label={`View order: ${cartQty} items, ₹${cartTotal}`}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              {cartQty}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em' }}>
              VIEW ORDER
            </span>
          </span>
          <span style={{ fontSize: 15, fontWeight: 900 }}>₹{cartTotal}</span>
        </button>
      )}

      {/* ── Scroll To Top Button ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top of page"
          style={{
            position: 'fixed',
            bottom: cartQty > 0 ? 84 : 28,
            right: 24,
            zIndex: 50,
            width: 46,
            height: 46,
            borderRadius: 14,
            background: 'rgba(9, 7, 8, 0.95)',
            border: '1.5px solid var(--warm-wood)',
            cursor: 'pointer',
            color: 'var(--soft-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.3s var(--ease-premium)',
            animation: 'fadeInUp 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--warm-gold)';
            e.currentTarget.style.color = 'var(--warm-gold)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--warm-wood)';
            e.currentTarget.style.color = 'var(--soft-cream)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
