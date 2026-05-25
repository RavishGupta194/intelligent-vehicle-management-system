import { Link } from 'react-router-dom'
import { Car, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, ArrowRight, Smartphone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: '#050505', borderTop: '1px solid var(--border)',
      padding: '5rem 2rem 2rem', color: 'var(--text)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Top Newsletter / App Section */}
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', 
          alignItems: 'center', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
          marginBottom: '4rem'
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 1, color: 'var(--white)', marginBottom: '0.5rem' }}>STAY IN THE FAST LANE.</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Subscribe to get exclusive supercar rental deals and maintenance tips.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: 450 }}>
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              style={{
                flex: 1, padding: '14px 20px', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--white)', outline: 'none', fontSize: '0.95rem'
              }}
            />
            <button style={{
              background: 'var(--red)', border: 'none', borderRadius: 8, padding: '0 24px',
              color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              fontWeight: 600, transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
              JOIN <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '4rem', marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div style={{ flex: '2 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <div style={{ width: 40, height: 40, background: 'var(--red)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={22} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 3, color: 'var(--white)' }}>CARVIA</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 320 }}>
              The ultimate all-in-one automotive super app. Rent, service, buy, and sell vehicles with unprecedented ease and trust.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div key={i} style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--white)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem', letterSpacing: 1 }}>SERVICES</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                ['Self-Drive Rentals', '/rental'], ['Doorstep Servicing', '/maintenance'],
                ['Live Monitoring', '/monitoring'], ['Buy / Sell Cars', '/buy-sell'],
              ].map(([label, path]) => (
                <Link key={path} to={path} style={{
                  display: 'inline-block', color: 'var(--muted)', fontSize: '0.95rem', transition: 'color 0.2s', textDecoration: 'none'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem', letterSpacing: 1 }}>COMPANY</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['About Us', 'Careers', 'Press', 'Investor Relations'].map(item => (
                <a key={item} href="#" style={{ display: 'inline-block', color: 'var(--muted)', fontSize: '0.95rem', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item}</a>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div>
            <h4 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem', letterSpacing: 1 }}>GET THE APP</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{ 
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 16px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', transition: 'background 0.2s', color: 'var(--white)', width: '100%', maxWidth: 200
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <Smartphone size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Download on the</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>App Store</div>
                </div>
              </button>
              <button style={{ 
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 16px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', transition: 'background 0.2s', color: 'var(--white)', width: '100%', maxWidth: 200
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <Smartphone size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>GET IT ON</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>© 2026 CARVIA Automotive. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--muted)', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--white)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--muted)', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--white)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
