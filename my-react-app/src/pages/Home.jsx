import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ArrowRight, Shield, Zap, Clock, Users, ChevronRight, Car, Map, Wrench, ShoppingBag } from 'lucide-react'

const services = [
  {
    icon: Car, title: 'Self-Drive Rentals', path: '/rental',
    desc: 'Hit the road on your terms. Rent premium SUVs, sedans, and performance cars by the hour or day.',
    color: '#e63946',
  },
  {
    icon: Map, title: 'Live Monitoring', path: '/monitoring',
    desc: 'Track your fleet or personal vehicle in real-time with advanced telematics and route optimization analytics.',
    color: '#f4a261',
  },
  {
    icon: Wrench, title: 'Doorstep Servicing', path: '/maintenance',
    desc: 'Own a car? Get it serviced right at your home or office with our certified, top-rated mechanics.',
    color: '#2a9d8f',
  },
  {
    icon: ShoppingBag, title: 'Buy / Sell', path: '/buy-sell',
    desc: 'Upgrade your ride. Buy certified pre-owned cars or sell yours instantly at the best market price.',
    color: '#e9c46a',
  },
]

const stats = [
  { value: '100k+', label: 'Happy Users' },
  { value: '2,500+', label: 'Premium Cars' },
  { value: '30+', label: 'Cities Present' },
  { value: '4.9★', label: 'Average Rating' },
]

const reviews = [
  { name: 'Arjun Sharma', role: 'Weekend Explorer', rating: 5, city: 'Delhi', text: 'Rented a Thar for a weekend getaway to the hills. The car was spotless, and picking it up was incredibly smooth.' },
  { name: 'Priya Mehta', role: 'Daily Commuter', rating: 5, city: 'Mumbai', text: 'I rent a car through CARVIA every week for my office commute. It is cheaper and way more comfortable than booking a cab.' },
  { name: 'Rahul Kapoor', role: 'Car Enthusiast', rating: 4, city: 'Pune', text: 'Sold my old hatchback and bought a certified Honda City through CARVIA. Transparent pricing and zero hidden fees.' },
]

const features = [
  { icon: Shield, title: 'Ironclad Insurance', desc: 'Enjoy absolute peace of mind with our zero-liability comprehensive insurance on every rental and purchase.' },
  { icon: Zap, title: 'Smart Keyless Entry', desc: 'Unlock, start, and return your rented car directly from the CARVIA mobile app. No human contact needed.' },
  { icon: Clock, title: 'Ultimate Flexibility', desc: 'Rent for 2 hours or 2 months. Schedule maintenance at 2 AM. You have complete control over your time.' },
  { icon: Users, title: 'White-Glove Delivery', desc: 'We bring the car to you. Doorstep delivery for rentals, test drives, and mechanic services across 30+ cities.' },
]

const steps = [
  { title: 'Choose Service', desc: 'Select from self-drive, maintenance, or buy/sell inside the app.' },
  { title: 'Book in 60s', desc: 'Confirm your booking with zero paperwork and instant approval.' },
  { title: 'We Deliver', desc: 'Your car or mechanic arrives at your doorstep, right on time.' },
]

export default function Home() {
  return (
    <div className="page-enter">

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '8rem 2rem 4rem',
      }}>
        {/* BG Gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(230,57,70,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '5%', width: 500, height: 500,
          borderRadius: '50%', border: '1px solid rgba(230,57,70,0.08)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '10%', width: 300, height: 300,
          borderRadius: '50%', border: '1px solid rgba(230,57,70,0.12)',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 500px', maxWidth: 700 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)',
              borderRadius: 100, padding: '6px 16px', marginBottom: '2rem',
              fontSize: '0.8rem', fontWeight: 500, color: 'var(--red)', letterSpacing: 1,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'blink 1.5s infinite' }} />
              INDIA'S #1 ALL-IN-ONE CAR PLATFORM
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
              lineHeight: 0.95, letterSpacing: '2px', marginBottom: '1.5rem',
              color: 'var(--white)',
            }}>
              YOUR RIDE.<br />
              <span style={{ color: 'var(--red)', WebkitTextStroke: '0px' }}>YOUR RULES.</span><br />
              NO LIMITS.
            </h1>

            <p style={{
              color: 'var(--muted)', fontSize: '1.15rem', lineHeight: 1.7,
              marginBottom: '2.5rem', maxWidth: 520,
            }}>
              From renting your dream car to doorstep servicing and seamless buy/sell options—the ultimate all-in-one automotive platform designed completely around you.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
                  padding: '14px 32px', borderRadius: 8,
                  fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px',
                  transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(230,57,70,0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                EXPLORE ALL SERVICES <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', perspective: 1000 }}>
            <div style={{
              width: 280, height: 580, background: 'rgba(20,20,20,0.6)',
              border: '2px solid rgba(255,255,255,0.1)', borderRadius: 40,
              backdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05)',
              overflow: 'hidden', position: 'relative',
              transform: 'rotateY(-15deg) rotateX(5deg)', transformStyle: 'preserve-3d'
            }}>
              {/* Dynamic Notch */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 25, background: '#000', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, zIndex: 10 }}></div>
              
              {/* Fake UI */}
              <div style={{ padding: '3.5rem 1.5rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: 45, height: 45, background: 'var(--red)', borderRadius: '50%' }}></div>
                  <div style={{ height: 16, width: 40, background: 'rgba(255,255,255,0.1)', borderRadius: 8 }}></div>
                </div>
                
                <div style={{ height: 24, background: 'rgba(255,255,255,0.8)', borderRadius: 6, width: '70%', marginBottom: '0.5rem' }}></div>
                <div style={{ height: 14, background: 'rgba(255,255,255,0.3)', borderRadius: 4, width: '40%', marginBottom: '2.5rem' }}></div>
                
                <div style={{ height: 160, background: 'linear-gradient(135deg, rgba(230,57,70,0.3), rgba(230,57,70,0.05))', borderRadius: 20, marginBottom: '1.25rem', border: '1px solid rgba(230,57,70,0.2)', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 15, left: 15, height: 20, width: 100, background: 'rgba(255,255,255,0.9)', borderRadius: 10 }}></div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ flex: 1, height: 100, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}></div>
                  <div style={{ flex: 1, height: 100, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)', padding: '1.5rem 0', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="marquee-container">
          <div className="marquee-content">
            <span className="brand-item">MERCEDES-BENZ</span>
            <span className="brand-item">BMW</span>
            <span className="brand-item">AUDI</span>
            <span className="brand-item">PORSCHE</span>
            <span className="brand-item">MAHINDRA</span>
            <span className="brand-item">TOYOTA</span>
            <span className="brand-item">MERCEDES-BENZ</span>
            <span className="brand-item">BMW</span>
            <span className="brand-item">AUDI</span>
            <span className="brand-item">PORSCHE</span>
            <span className="brand-item">MAHINDRA</span>
            <span className="brand-item">TOYOTA</span>
          </div>
        </motion.div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding: '8rem 2rem', background: 'var(--black)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ color: 'var(--red)', fontSize: '0.8rem', letterSpacing: 3, fontWeight: 600, marginBottom: 12 }}>SIMPLE PROCESS</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: 2 }}>HOW CARVIA WORKS</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', position: 'relative' }}>
             {/* Background connecting line (only visible on desktop, hidden via css in reality but here we just use relative positioning) */}
             {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.15 }} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                   <div style={{ 
                     width: 80, height: 80, background: 'rgba(230,57,70,0.1)', 
                     border: '1px solid rgba(230,57,70,0.3)', borderRadius: '50%', 
                     margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', 
                     justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, 
                     color: 'var(--red)', boxShadow: '0 0 20px rgba(230,57,70,0.2)' 
                   }}>
                     {i+1}
                   </div>
                   <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '0.75rem', letterSpacing: 1 }}>{step.title}</h3>
                   <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: 300, margin: '0 auto' }}>{step.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--white)', letterSpacing: 2 }}>{s.value}</div>
              <div style={{ width: '40px', height: '3px', background: 'var(--red)', margin: '0.75rem auto' }} />
              <div style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: 1.5, fontWeight: 600 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--red)', fontSize: '0.8rem', letterSpacing: 3, fontWeight: 600, marginBottom: 12 }}>WHAT WE DO</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: 2 }}>EVERYTHING YOU NEED<br />FOR THE ROAD</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, idx) => {
              const bgOpacity = service.color === '#e63946' ? 'rgba(230,57,70,0.1)' : service.color === '#f4a261' ? 'rgba(244,162,97,0.1)' : service.color === '#2a9d8f' ? 'rgba(42,157,143,0.1)' : 'rgba(233,196,106,0.1)'
              return (
                <motion.div key={service.path} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                <Link to={service.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)', borderRadius: 16, padding: '2.5rem 2rem',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden', height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = service.color
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${bgOpacity}`
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  }}>
                    <div style={{ marginBottom: '1.5rem', padding: '16px', background: bgOpacity, display: 'inline-flex', borderRadius: '14px' }}>
                      <service.icon size={32} color={service.color} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: 1.5, marginBottom: '0.75rem', color: 'var(--white)' }}>{service.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{service.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: service.color, fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1, marginTop: 'auto' }}>
                      EXPLORE <ChevronRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY CARVIA */}
      <section style={{ background: 'var(--dark)', padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--red)', fontSize: '0.8rem', letterSpacing: 3, fontWeight: 600, marginBottom: 12 }}>WHY CARVIA</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: 2 }}>BUILT FOR TRUST.<br />DESIGNED FOR SPEED.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{
                padding: '1.75rem', borderRadius: 10,
                border: '1px solid var(--border)', background: 'var(--card)',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: 'rgba(230,57,70,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.2rem',
                }}>
                  <f.icon size={22} color="var(--red)" />
                </div>
                <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>{f.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--red)', fontSize: '0.8rem', letterSpacing: 3, fontWeight: 600, marginBottom: 12 }}>CUSTOMER STORIES</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: 2 }}>REAL PEOPLE.<br />REAL RESULTS.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)', borderRadius: 16, padding: '2rem',
                transition: 'transform 0.4s ease', cursor: 'default'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem' }}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={16} color="#e63946" fill="#e63946" />
                  ))}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${i * 45}, 70%, 40%), hsl(${i * 45 + 30}, 80%, 30%))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '1.1rem', color: '#fff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--white)' }}>{r.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: 2 }}>{r.role} · {r.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: '0 2rem 6rem', borderRadius: 24,
        background: 'linear-gradient(135deg, #e63946 0%, #900a14 100%)',
        padding: '5rem 3rem', textAlign: 'center',
        maxWidth: 1160, marginLeft: 'auto', marginRight: 'auto',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(230,57,70,0.4)',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)', borderRadius: '50%' }} />

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: 3, marginBottom: '1rem', color: '#fff' }}>
            READY TO HIT THE ROAD?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: 550, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Join over 100,000 drivers who trust CARVIA for their daily commutes, weekend getaways, and vehicle maintenance.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/rental" style={{
              background: '#ffffff', color: '#c1121f',
              padding: '16px 36px', borderRadius: 100,
              fontWeight: 800, fontSize: '0.95rem', letterSpacing: '1px',
              transition: 'transform 0.2s', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>START YOUR ENGINE</Link>
            <Link to="/buy-sell" style={{
              background: 'rgba(0,0,0,0.2)', color: '#fff',
              padding: '16px 36px', borderRadius: 100,
              fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px',
              border: '1px solid rgba(255,255,255,0.4)', transition: 'background 0.2s',
              backdropFilter: 'blur(5px)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}>BUY A CAR</Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
