import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RamenCard from './components/RamenCard';
import AddOnCard from './components/AddOnCard';
import DishDetailModal from './components/DishDetailModal';
import OrderCart from './components/OrderCart';
import { menuData } from './data/menu';
import { Search, ChefHat, MapPin, Clock, Phone, ArrowUp } from 'lucide-react';

/* ── helpers ── */
const calcTotal = (cart) =>
  cart.reduce((t, item) => {
    const ext = (item.extras || []).reduce((s, e) => s + e.price, 0);
    return t + (item.price + ext) * item.quantity;
  }, 0);

/* ── Section Header ── */
function SectionHeader({ tag, title, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 52 }}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title font-serif">{title}</h2>
      <div className="divider" style={{ margin: center ? '18px auto' : '18px 0' }} />
      {sub && <p style={{ fontSize: 14, color: 'rgba(250,249,246,0.55)', lineHeight: 1.65, maxWidth: 480, margin: center ? '0 auto' : 0 }}>{sub}</p>}
    </div>
  );
}

/* ── Contact Card ── */
function ContactCard({ icon, title, children }) {
  return (
    <div style={{
      display: 'flex', gap: 18, padding: '24px 28px',
      background: 'rgba(26,12,14,0.55)',
      border: '1px solid rgba(128,0,32,0.18)',
      borderRadius: 20, backdropFilter: 'blur(8px)',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.18)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 14, flexShrink: 0,
        background: 'rgba(74,14,23,0.7)',
        border: '1px solid rgba(128,0,32,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#D4AF37',
      }}>
        {icon}
      </div>
      <div>
        <div className="font-serif" style={{ fontSize: 16, fontWeight: 700, color: 'var(--cream)', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'rgba(250,249,246,0.65)', lineHeight: 1.7 }}>{children}</div>
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
  const [ramenFilter, setRamenFilter] = useState('all');
  const [addonFilter, setAddonFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [showTop, setShowTop] = useState(false);

  /* ── Scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      const ids = ['contact-section', 'about-section', 'addons-section', 'ramen-collection'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) { setActiveSection(id); break; }
        if (id === 'ramen-collection') setActiveSection('hero');
      }
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  /* ── Cart ops ── */
  const addToOrder = (dish, extras = []) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === dish.id && JSON.stringify(i.extras || []) === JSON.stringify(extras));
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...dish, quantity: 1, extras }];
    });
  };

  const updateQty = (idx, qty) => {
    if (qty <= 0) setCart(c => c.filter((_, i) => i !== idx));
    else setCart(c => { const n = [...c]; n[idx] = { ...n[idx], quantity: qty }; return n; });
  };

  const removeItem = (idx) => setCart(c => c.filter((_, i) => i !== idx));

  /* ── Filters ── */
  const filteredRamen = menuData.ramen.filter(d =>
    (ramenFilter === 'all' || d.category === ramenFilter) &&
    (d.name.toLowerCase().includes(query.toLowerCase()) || d.description.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredAddons = menuData.addOns.filter(d =>
    addonFilter === 'all' || d.category === addonFilter
  );

  const cartQty = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = calcTotal(cart);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--charcoal)', color: 'var(--cream)', fontFamily: "'Outfit', 'Inter', sans-serif" }}>

      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartQty}
        onCartClick={() => setCartOpen(true)}
        activeSection={activeSection}
        scrollToSection={scrollTo}
      />

      {/* ── Hero ── */}
      <div id="hero">
        <Hero
          onExploreClick={() => scrollTo('ramen-collection')}
          onDiscoverClick={() => scrollTo('about-section')}
        />
      </div>

      {/* ══════════════════════════════
          RAMEN COLLECTION
      ══════════════════════════════ */}
      <section id="ramen-collection" style={{
        padding: '100px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '-100px', width: 400, height: 400, borderRadius: '50%', background: 'rgba(128,0,32,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '-100px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(212,175,55,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div className="container">
          <SectionHeader
            tag="Select Specialties"
            title="The Ramen Collection"
            sub="Slow-simmered 18-hour broth paired with house-made noodles and hand-crafted toppings."
          />

          {/* Toolbar */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'stretch',
            background: 'rgba(22,10,12,0.65)',
            border: '1px solid rgba(128,0,32,0.18)',
            borderRadius: 22, padding: 20, marginBottom: 40,
            backdropFilter: 'blur(10px)',
            maxWidth: 860, margin: '0 auto 40px',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              {/* Filter tabs */}
              <div className="filter-tabs" style={{ flex: 1, minWidth: 240 }}>
                {[['all', 'SHOW ALL'], ['veg', 'VEG'], ['non-veg', 'NON-VEG']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setRamenFilter(val)}
                    className={`filter-tab ${ramenFilter === val ? 'active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(250,249,246,0.35)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search ramen..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Ramen Grid */}
          {filteredRamen.length > 0 ? (
            <div className="grid-ramen">
              {filteredRamen.map((dish, i) => (
                <div key={dish.id} style={{ animation: `fadeInUp 0.6s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1) both` }}>
                  <RamenCard
                    dish={dish}
                    onOpen3D={setSelectedDish}
                    onAddToOrder={addToOrder}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(250,249,246,0.3)' }}>
              <ChefHat size={52} strokeWidth={1} style={{ marginBottom: 16 }} />
              <div className="font-serif" style={{ fontSize: 20, fontWeight: 700 }}>No Ramen Found</div>
              <p style={{ fontSize: 13, marginTop: 6 }}>Try different search terms or switch filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          ADD-ONS
      ══════════════════════════════ */}
      <section id="addons-section" style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, var(--charcoal) 0%, #120910 50%, var(--charcoal) 100%)',
        borderTop: '1px solid rgba(128,0,32,0.1)',
      }}>
        <div className="container">
          <SectionHeader
            tag="Customise Your Bowl"
            title="Make It Yours"
            sub="Elevate your broth experience with premium hand-picked extras."
          />

          {/* Add-on filter */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <div className="filter-tabs">
              {[['all', 'All Add-ons'], ['veg', 'Veg'], ['non-veg', 'Non-Veg']].map(([val, label]) => (
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

          <div className="grid-addons">
            {filteredAddons.map((item, i) => (
              <div key={item.id} style={{ animation: `fadeInUp 0.5s ${i * 0.05}s cubic-bezier(0.16,1,0.3,1) both` }}>
                <AddOnCard item={item} onAddToOrder={addToOrder} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ABOUT
      ══════════════════════════════ */}
      <section id="about-section" style={{
        padding: '100px 0',
        borderTop: '1px solid rgba(128,0,32,0.1)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 52, alignItems: 'center' }} className="about-grid">
            {/* Image */}
            <div style={{
              position: 'relative', borderRadius: 28, overflow: 'hidden',
              border: '1px solid rgba(128,0,32,0.15)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              aspectRatio: '4/3',
            }}>
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=85"
                alt="Chef crafting ramen"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(11,8,8,0.9) 0%, rgba(11,8,8,0.1) 55%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--korean-red)', textTransform: 'uppercase', marginBottom: 6 }}>Authentic Seoul Bar</div>
                <div className="font-serif" style={{ fontSize: 22, fontWeight: 800, color: 'var(--cream)' }}>Carefully Preserved Heritage</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <SectionHeader tag="Our Brand Story" title="Crafting the Ultimate Ramen Culture" center={false} />
              <p style={{ fontSize: 14, color: 'rgba(250,249,246,0.7)', lineHeight: 1.8, marginBottom: 18 }}>
                At Little Kimchi, our culinary philosophy revolves around slow cooking and meticulous precision. Every batch of our vegetable and chicken broths is simmered for exactly 18 hours, extracting deep mineral richness and complex umami tones.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(250,249,246,0.7)', lineHeight: 1.8, marginBottom: 40 }}>
                Inspired by the vibrant ramen bars of modern Seoul, we bring you traditional Korean flavour signatures combined with a premium digital experience — because food isn't just taste, it's a multi-sensory art form.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['18+ Hrs', 'Broth Extraction'], ['Daily Fresh', 'Hand-cut Noodles'], ['Authentic', 'Seoul Recipe'], ['100% Pure', 'Ingredients']].map(([val, lab]) => (
                  <div key={lab} style={{
                    padding: '18px 20px', borderRadius: 16,
                    background: 'rgba(26,12,14,0.55)',
                    border: '1px solid rgba(128,0,32,0.15)',
                  }}>
                    <div className="font-serif" style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold-light)', marginBottom: 4 }}>{val}</div>
                    <div style={{ fontSize: 10, color: 'rgba(250,249,246,0.45)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{lab}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* ══════════════════════════════
          CONTACT
      ══════════════════════════════ */}
      <section id="contact-section" style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, var(--charcoal) 0%, #120910 50%, var(--charcoal) 100%)',
        borderTop: '1px solid rgba(128,0,32,0.1)',
      }}>
        <div className="container">
          <SectionHeader tag="Find Us" title="Visit Little Kimchi" sub="We're open Tuesday through Sunday. Walk in, scan the QR, and immerse in the Seoul ramen experience." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <ContactCard icon={<MapPin size={20} />} title="LOCATION">
              12, Hanok Street, Seoul Town Centre<br />MG Road, Bangalore, India
            </ContactCard>
            <ContactCard icon={<Clock size={20} />} title="OPENING HOURS">
              Tues — Sun: 11:30 AM – 11:00 PM<br /><span style={{ color: 'rgba(197,28,36,0.8)' }}>Monday: Closed</span>
            </ContactCard>
            <ContactCard icon={<Phone size={20} />} title="INQUIRIES">
              +91 98765 43210<br />hello@littlekimchi.cafe
            </ContactCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{
        padding: '44px 0', borderTop: '1px solid rgba(128,0,32,0.12)',
        background: 'var(--charcoal-800)',
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div className="font-serif gold-text" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>LITTLE KIMCHI</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(250,249,246,0.35)', fontWeight: 600, marginTop: 4 }}>
              © 2026 LITTLE KIMCHI CAFÉ · ALL RIGHTS RESERVED
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(26,12,14,0.8)',
              border: '1px solid rgba(128,0,32,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(250,249,246,0.6)', transition: 'all 0.3s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = 'var(--gold-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.25)'; e.currentTarget.style.color = 'rgba(250,249,246,0.6)'; }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ── Modals & Overlays ── */}
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

      {/* ── Mobile sticky cart bar ── */}
      {cartQty > 0 && !cartOpen && (
        <button
          className="mobile-order-bar"
          onClick={() => setCartOpen(true)}
          style={{ display: 'none' }}
          id="mobile-cart-bar"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800,
            }}>{cartQty}</span>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em' }}>VIEW ORDER</span>
          </span>
          <span style={{ fontSize: 14, fontWeight: 800 }}>₹{cartTotal}</span>
        </button>
      )}

      {/* ── Scroll to top ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          style={{
            position: 'fixed', bottom: 28, right: 24, zIndex: 50,
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(26,10,12,0.9)',
            border: '1px solid rgba(128,0,32,0.4)',
            cursor: 'pointer', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.3s',
            animation: 'fadeInUp 0.4s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.color = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(128,0,32,0.4)'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.transform = 'none'; }}
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* ── Global Responsive Styles ── */}
      <style>{`
        /* Make hero two-column on big screens */
        section#hero > div > div { }

        /* Mobile cart bar */
        @media (max-width: 768px) {
          #mobile-cart-bar { display: flex !important; }
        }

        /* Hero two-column layout */
        .hero-inner-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (max-width: 900px) {
          .hero-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
