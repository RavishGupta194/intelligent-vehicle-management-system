import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Car, Key, Wrench, Map, ShoppingBag, User, ShoppingCart, Navigation } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Rent a Car', path: '/rental', icon: <Key size={18} /> },
  { label: 'Maintenance', path: '/maintenance', icon: <Wrench size={18} /> },
  { label: 'Live Monitoring', path: '/monitoring', icon: <Map size={18} /> },
  { label: 'Buy / Sell', path: '/buy-sell', icon: <ShoppingBag size={18} /> },
  { label: 'Destinations', path: '/destinations', icon: <Navigation size={18} /> },
]

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handler = (e) => setCartCount(e.detail)
    window.addEventListener('cartUpdated', handler)
    return () => window.removeEventListener('cartUpdated', handler)
  }, [])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, background: 'var(--red)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Car size={20} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.8rem',
            letterSpacing: '3px', color: 'var(--white)',
          }}>CARVIA</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              padding: '8px 18px', borderRadius: '6px',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem',
              letterSpacing: '0.5px',
              color: isActive ? '#fff' : 'var(--muted)',
              background: isActive ? 'var(--red)' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px',
            })}>
              <span>{item.icon}</span>{item.label}
            </NavLink>
          ))}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Cart button */}
            <button onClick={() => {
              if (window.openCart) window.openCart();
            }} style={{
              position: 'relative',
              background: 'var(--red)', color: '#fff', border: 'none',
              width: 38, height: 38, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', marginLeft: '1rem'
            }} title="View Cart">
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute', top: -4, right: -4,
                      background: '#fff', color: 'var(--red)',
                      fontSize: '0.75rem', fontWeight: 800,
                      width: 20, height: 20, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.3)', border: '2px solid var(--red)'
                    }}
                  >
                    {cartCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button onClick={() => setProfileOpen(!profileOpen)} style={{
              width: 38, height: 38,
              background: 'rgba(255,255,255,0.05)', color: 'var(--white)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            title="My Profile"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--red)'
              e.currentTarget.style.borderColor = 'var(--red)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}>
              <User size={18} />
            </button>

            {profileOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 15px)', right: 0,
                background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)', borderRadius: 12, padding: '1.25rem',
                minWidth: '220px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                zIndex: 2100
              }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>{user?.name || 'Verified User'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{user?.email || 'user@carvia.com'}</div>
                </div>
                <Link to="/profile" onClick={() => setProfileOpen(false)} style={{
                  padding: '0.6rem', borderRadius: '6px', color: 'var(--white)', textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <User size={16} /> My Dashboard
                </Link>
                <button onClick={() => { setProfileOpen(false); onLogout?.(); }} style={{
                  background: 'rgba(230,57,70,0.1)', color: 'var(--red)', border: 'none',
                  padding: '0.6rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(230,57,70,0.1)'}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Btn */}
        <button onClick={() => setOpen(!open)} style={{
          background: 'none', border: 'none', color: 'var(--white)',
          cursor: 'pointer', display: 'none',
        }} className="menu-btn">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 70, left: 0, right: 0, bottom: 0,
          background: 'rgba(10,10,10,0.98)', zIndex: 999,
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              padding: '1rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem',
              color: isActive ? '#fff' : 'var(--text)',
              background: isActive ? 'var(--red)' : 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '12px',
            })}>
              <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>{item.label}
            </NavLink>
          ))}
          <button onClick={() => { setOpen(false); onLogout?.(); }} style={{
            padding: '1rem 1.5rem', borderRadius: '8px', marginTop: 'auto',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem',
            color: 'var(--red)', background: 'rgba(230,57,70,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
            textAlign: 'left'
          }}>
            <span style={{ fontSize: '1.4rem' }}><User size={22} /></span>Sign Out
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
