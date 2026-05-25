import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Fuel, Settings, Star, Search, Calendar, MapPin, Zap, Gauge, X, CreditCard, CheckCircle, Smartphone, Clock, MessageSquare, Send, ChevronUp, GitCompare } from 'lucide-react';

const cars = [
  // Premium imports with reduced prices
  { id: 1, name: 'Mercedes-Benz AMG GT', type: 'Luxury Sedan', price: 12999, seats: 2, fuel: 'Petrol', transmission: 'Automatic', hp: '523 hp', zeroToSixty: '3.7s', rating: 5.0, reviews: 124, badge: 'Premium', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800', color: '#e63946', city: 'Delhi' },
  { id: 2, name: 'Porsche 911 Carrera', type: 'Sports', price: 16999, seats: 2, fuel: 'Petrol', transmission: 'Automatic', hp: '379 hp', zeroToSixty: '4.0s', rating: 4.9, reviews: 89, badge: 'Exotic', image: 'https://images.unsplash.com/photo-1503376794736-2bf9b84b067a?auto=format&fit=crop&q=80&w=800', color: '#f4a261', city: 'Mumbai' },
  { id: 3, name: 'BMW X5 M‑Sport', type: 'SUV', price: 7499, seats: 5, fuel: 'Diesel', transmission: 'Automatic', hp: '335 hp', zeroToSixty: '5.3s', rating: 4.8, reviews: 212, badge: 'Popular', image: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&q=80&w=800', color: '#2a9d8f', city: 'Bangalore' },
  { id: 4, name: 'Tesla Model 3', type: 'Electric SUV', price: 4499, seats: 5, fuel: 'Electric', transmission: 'Automatic', hp: '450 hp', zeroToSixty: '3.1s', rating: 4.9, reviews: 432, badge: '⚡ Electric', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800', color: '#e9c46a' },
  { id: 5, name: 'Audi RS7 Sportback', type: 'Luxury Sedan', price: 10999, seats: 4, fuel: 'Petrol', transmission: 'Automatic', hp: '591 hp', zeroToSixty: '3.5s', rating: 4.9, reviews: 156, badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800', color: '#c77dff' },
  { id: 6, name: 'Range Rover Velar', type: 'SUV', price: 8499, seats: 5, fuel: 'Diesel', transmission: 'Automatic', hp: '395 hp', zeroToSixty: '5.2s', rating: 4.7, reviews: 178, badge: 'Best Value', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800', color: '#e63946' },
  // Indian market basics – affordable price points
  { id: 7, name: 'Maruti Alto', type: 'Hatchback', price: 399, seats: 4, fuel: 'Petrol', transmission: 'Manual', hp: '68 hp', zeroToSixty: '13.5s', rating: 4.2, reviews: 540, badge: 'Budget', image: 'https://images.unsplash.com/photo-1588854337119-7a6d4ec0b58c?auto=format&fit=crop&q=80&w=800', color: '#ff7f50' },
  { id: 8, name: 'Tata Tiago', type: 'Hatchback', price: 449, seats: 5, fuel: 'Petrol', transmission: 'Manual', hp: '82 hp', zeroToSixty: '12.8s', rating: 4.3, reviews: 312, badge: 'Value', image: 'https://images.unsplash.com/photo-1587574285064-6c4e1c5c5b2f?auto=format&fit=crop&q=80&w=800', color: '#ffb347' },
  { id: 9, name: 'Mahindra Bolero', type: 'SUV', price: 799, seats: 7, fuel: 'Diesel', transmission: 'Manual', hp: '87 hp', zeroToSixty: '14.0s', rating: 4.0, reviews: 180, badge: 'Rugged', image: 'https://images.unsplash.com/photo-1586192991316-4e6b0fd0e0c7?auto=format&fit=crop&q=80&w=800', color: '#8fbc8f' },
  { id: 10, name: 'Hyundai Creta', type: 'SUV', price: 999, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '115 hp', zeroToSixty: '9.2s', rating: 4.5, reviews: 260, badge: 'Popular', image: 'https://images.unsplash.com/photo-1589989651646-7b5b5eb1e5e1?auto=format&fit=crop&q=80&w=800', color: '#87ceeb' },
  // Additional premium & popular models
  { id: 11, name: 'Ford Mustang', type: 'Sports', price: 11999, seats: 4, fuel: 'Petrol', transmission: 'Manual', hp: '450 hp', zeroToSixty: '4.3s', rating: 4.8, reviews: 210, badge: 'Iconic', image: 'https://images.unsplash.com/photo-1542365887-bc0db8eff0f9?auto=format&fit=crop&q=80&w=800', color: '#b22222' },
  { id: 12, name: 'Chevrolet Camaro', type: 'Sports', price: 11499, seats: 4, fuel: 'Petrol', transmission: 'Manual', hp: '455 hp', zeroToSixty: '4.2s', rating: 4.7, reviews: 190, badge: 'Classic', image: 'https://images.unsplash.com/photo-1582213782179-6ec7e0fdf5a5?auto=format&fit=crop&q=80&w=800', color: '#ff4500' },
  { id: 13, name: 'Jaguar F‑PACE', type: 'SUV', price: 13999, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '380 hp', zeroToSixty: '3.9s', rating: 4.6, reviews: 140, badge: 'Luxury', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf6c9?auto=format&fit=crop&q=80&w=800', color: '#800000' },
  { id: 14, name: 'Lexus LC', type: 'Luxury Sedan', price: 15999, seats: 4, fuel: 'Petrol', transmission: 'Automatic', hp: '471 hp', zeroToSixty: '4.4s', rating: 4.9, reviews: 120, badge: 'Elegant', image: 'https://images.unsplash.com/photo-1598300056994-6d75d3efb8c5?auto=format&fit=crop&q=80&w=800', color: '#2f4f4f' },
  { id: 15, name: 'BMW i8', type: 'Sports', price: 17999, seats: 2, fuel: 'Hybrid', transmission: 'Automatic', hp: '369 hp', zeroToSixty: '4.2s', rating: 4.9, reviews: 110, badge: 'Futuristic', image: 'https://images.unsplash.com/photo-1542828629-3b5b8c7a6c44?auto=format&fit=crop&q=80&w=800', color: '#4682b4' },
  { id: 16, name: 'Mercedes-Benz C‑Class', type: 'Luxury Sedan', price: 12999, seats: 4, fuel: 'Petrol', transmission: 'Automatic', hp: '255 hp', zeroToSixty: '6.4s', rating: 4.5, reviews: 95, badge: 'Premium', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800', color: '#556b2f' },
  { id: 17, name: 'Kia Seltos', type: 'SUV', price: 899, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '140 hp', zeroToSixty: '8.5s', rating: 4.4, reviews: 180, badge: 'Value', image: 'https://images.unsplash.com/photo-1578442992299-fcf6f5b0b8a4?auto=format&fit=crop&q=80&w=800', color: '#ff8c00' },
  { id: 18, name: 'Hyundai i20', type: 'Hatchback', price: 599, seats: 5, fuel: 'Petrol', transmission: 'Manual', hp: '115 hp', zeroToSixty: '9.5s', rating: 4.3, reviews: 210, badge: 'Compact', image: 'https://images.unsplash.com/photo-1562089369-7bd9a0e1c9b8?auto=format&fit=crop&q=80&w=800', color: '#6a5acd' },
  { id: 19, name: 'Honda City', type: 'Sedan', price: 699, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '120 hp', zeroToSixty: '9.0s', rating: 4.5, reviews: 250, badge: 'Reliable', image: 'https://images.unsplash.com/photo-1580673869270-45cce0f5b71e?auto=format&fit=crop&q=80&w=800', color: '#8b0000' },
  { id: 20, name: 'Toyota Corolla', type: 'Sedan', price: 649, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '115 hp', zeroToSixty: '9.3s', rating: 4.5, reviews: 240, badge: 'Trusted', image: 'https://images.unsplash.com/photo-1512453971419-43b4d2e0c9ac?auto=format&fit=crop&q=80&w=800', color: '#b8860b' },
    // Additional Indian models (non‑luxury, premium pricing)
    { id: 21, name: 'Mahindra Scorpio', type: 'SUV', price: 1199, seats: 7, fuel: 'Diesel', transmission: 'Manual', hp: '140 hp', zeroToSixty: '10.2s', rating: 4.3, reviews: 150, badge: 'Adventure', image: 'https://images.unsplash.com/photo-1597614121645-6bbf8e6abfbd?auto=format&fit=crop&q=80&w=800', color: '#ff8c00' },
    { id: 22, name: 'Renault Kwid', type: 'Hatchback', price: 299, seats: 5, fuel: 'Petrol', transmission: 'Manual', hp: '56 hp', zeroToSixty: '14.5s', rating: 4.1, reviews: 210, badge: 'Compact', image: 'https://images.unsplash.com/photo-1557264379-1c8e1b70c2e7?auto=format&fit=crop&q=80&w=800', color: '#ffa500' },
    { id: 23, name: 'Ford EcoSport', type: 'SUV', price: 1099, seats: 5, fuel: 'Petrol', transmission: 'Automatic', hp: '150 hp', zeroToSixty: '9.8s', rating: 4.4, reviews: 180, badge: 'Urban', image: 'https://images.unsplash.com/photo-1596477627849-30c5b1f6b6d6?auto=format&fit=crop&q=80&w=800', color: '#8b0000' },
    { id: 24, name: 'Maruti Swift', type: 'Hatchback', price: 399, seats: 5, fuel: 'Petrol', transmission: 'Manual', hp: '84 hp', zeroToSixty: '12.8s', rating: 4.5, reviews: 320, badge: 'Sporty', image: 'https://images.unsplash.com/photo-1584374536995-2d0ae6c4f6d3?auto=format&fit=crop&q=80&w=800', color: '#1e90ff' },
    { id: 25, name: 'Maruti Alto 800', type: 'Hatchback', price: 199, seats: 4, fuel: 'Petrol', transmission: 'Manual', hp: '47 hp', zeroToSixty: '16.0s', rating: 4.0, reviews: 850, badge: 'Ultra Budget', image: 'https://images.unsplash.com/photo-1620138546344-7b3c38b25752?auto=format&fit=crop&q=80&w=800', color: '#ff4500' },
    { id: 26, name: 'Tata Nano', type: 'Hatchback', price: 99, seats: 4, fuel: 'Petrol', transmission: 'Manual', hp: '38 hp', zeroToSixty: '20.0s', rating: 3.8, reviews: 1200, badge: 'Cheapest', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800', color: '#ffd700' },
    { id: 27, name: 'Maruti WagonR', type: 'Hatchback', price: 249, seats: 5, fuel: 'CNG', transmission: 'Manual', hp: '67 hp', zeroToSixty: '14.2s', rating: 4.2, reviews: 540, badge: 'Family', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800', color: '#8fbc8f' },
];

const types = ['All', 'Sports', 'Luxury Sedan', 'SUV', 'Electric SUV', 'Hatchback', 'Sedan'];

function Rental({ user }) {
  const [selected, setSelected] = useState('All');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [city, setCity] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // term applied on button click
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sortOrder, setSortOrder] = useState('popular');
  const [budget, setBudget] = useState(20000);
  const [time, setTime] = useState(new Date());
  const [cityFocused, setCityFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const INSURANCE_PER_DAY = 299;


  const recommendedCities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  // expose a global helper so other components (e.g., Navbar) can open the cart drawer
  useEffect(() => {
    // @ts-ignore – attach to window for quick cross‑component access
    window.openCart = () => setCartOpen(true);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart.length }));
  }, [cart]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let filtered = cars.filter(c => 
    (selected === 'All' || c.type === selected) && 
    (searchTerm ? c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.city?.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
    c.price <= budget
  );
  if (sortOrder === 'lowToHigh') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'popular') {
    filtered.sort((a, b) => b.reviews - a.reviews);
  }

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: 'var(--black)' }}>
      {/* Status Bar */}
      <div style={{
        background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid var(--border)',
        padding: '8px 2rem', display: 'flex', justifyContent: 'center', gap: '2rem',
        fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600,
        backdropFilter: 'blur(10px)', position: 'sticky', top: 70, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={14} color="var(--red)" />
          {time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={14} color="var(--red)" style={{ animation: 'spin 4s linear infinite' }} />
          {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'var(--dark)', borderBottom: '1px solid var(--border)',
        padding: '4rem 2rem 4rem', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p style={{ color: 'var(--red)', fontSize: '0.85rem', letterSpacing: 4, fontWeight: 700, marginBottom: 16 }}>CARVIA EXOTIC RENTALS</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: 3, marginBottom: '1rem', lineHeight: 1 }}>
              UNLEASH YOUR <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--red)' }}>DREAM RIDE</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 3rem', lineHeight: 1.6 }}>
              Select from our highly curated fleet of luxury sedans, rugged SUVs, and high-performance sports cars.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '1.5rem', maxWidth: 1000, margin: '0 auto',
            backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="var(--red)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Pickup City"
                value={city}
                onChange={e => setCity(e.target.value)}
                onFocus={() => setCityFocused(true)}
                onBlur={() => setTimeout(() => setCityFocused(false), 200)}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 10, padding: '14px 16px 14px 44px', color: 'var(--white)',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s'
                }}
              />
              <AnimatePresence>
                {cityFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute', top: '110%', left: 0, right: 0, background: 'var(--card)',
                      border: '1px solid var(--border)', borderRadius: 12, padding: '8px', zIndex: 10,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)', maxHeight: '200px', overflowY: 'auto'
                    }}
                  >
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)', padding: '4px 8px', fontWeight: 700 }}>RECOMMENDED CITIES</p>
                    {recommendedCities.filter(c => c.toLowerCase().includes(city.toLowerCase())).map(c => (
                      <div key={c} onClick={() => setCity(c)} style={{
                        padding: '10px 12px', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem',
                        transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 10
                      }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <MapPin size={14} color="var(--muted)" /> {c}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {[
              { icon: Calendar, placeholder: 'Date', value: pickupDate, setter: setPickupDate, type: 'date' },
              { icon: Clock, placeholder: 'Time', value: pickupTime, setter: setPickupTime, type: 'time' },
            ].map(({ icon: Icon, placeholder, value, setter, type }) => (
              <div key={placeholder} style={{ position: 'relative' }}>
                <Icon size={18} color="var(--red)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 10,
                    padding: '14px 16px 14px 44px',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border 0.2s',
                    appearance: 'none', // hide default browser icon
                    WebkitAppearance: 'none'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>
            ))}
            <button
              onClick={(e) => { e.preventDefault(); setSearchTerm(city); }}
              style={{
                background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 10,
                padding: '14px 24px', fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: 1,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Search size={18} /> FIND CARS
            </button>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs & Sort */}
      <div style={{ padding: '3rem 2rem 1rem', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', background: 'var(--card)', padding: '8px', borderRadius: 100, border: '1px solid var(--border)' }}>
          {types.map(t => (
            <button key={t} onClick={() => setSelected(t)} style={{
              padding: '10px 24px', borderRadius: 100, border: 'none',
              background: selected === t ? 'var(--red)' : 'transparent',
              color: selected === t ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: 0.5,
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              {t === 'Electric SUV' && <Zap size={14} />}
              {t === 'SUV' && <MapPin size={14} />}
              {t === 'Sports' && <Gauge size={14} />}
              {t}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Budget Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 240 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--muted)' }}>FILTER BY BUDGET</span>
              <span style={{ color: 'var(--red)', background: 'rgba(230,57,70,0.1)', padding: '2px 8px', borderRadius: 4 }}>₹{budget.toLocaleString()} / day</span>
            </div>
            <input 
              type="range" min="100" max="20000" step="500" 
              value={budget} onChange={e => setBudget(parseInt(e.target.value))}
              style={{
                accentColor: 'var(--red)', cursor: 'pointer', width: '100%',
                background: 'var(--border)', height: 6, borderRadius: 3
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--card)', padding: '4px 16px', borderRadius: 100, border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Sort:</span>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{
              background: 'transparent', border: 'none', color: '#fff', padding: '8px 4px',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, outline: 'none', cursor: 'pointer'
            }}>
              <option value="popular" style={{ background: 'var(--card)' }}>Most Popular</option>
              <option value="lowToHigh" style={{ background: 'var(--card)' }}>Price: Low to High</option>
              <option value="highToLow" style={{ background: 'var(--card)' }}>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 2rem 6rem' }}>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          <AnimatePresence>
            {filtered.map(car => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={car.id}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 20, overflow: 'hidden', position: 'relative',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url("${car.image}")`,
                    backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                    transition: 'transform 0.5s ease'
                  }} className="car-image-bg" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--card) 0%, transparent 100%)' }} />
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: 'rgba(0,255,0,0.1)', border: '1px solid #00ff00', color: '#00ff00',
                    fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: 100,
                    letterSpacing: 1, backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: 6
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff00', animation: 'blink 1s infinite' }} />
                    AVAILABLE NOW
                  </div>
                  <span style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(0,0,0,0.6)', border: `1px solid ${car.color}`, color: '#fff',
                    fontSize: '0.75rem', fontWeight: 700, padding: '6px 14px', borderRadius: 100,
                    letterSpacing: 1, backdropFilter: 'blur(5px)'
                  }}>{car.badge}</span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-display)', letterSpacing: 1 }}>{car.name}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 4, fontWeight: 500 }}>{car.type}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: car.color, lineHeight: 1 }}>₹{car.price}</span>
                      <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>/ DAY</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={16} color="var(--muted)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>POWER</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{car.hp}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Gauge size={16} color="var(--muted)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>0-60 MPH</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{car.zeroToSixty}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500, paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {[[Users, `${car.seats} Seats`], [Fuel, car.fuel], [Settings, car.transmission]].map(([Icon, text]) => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon size={14} color="var(--white)" />{text}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <Star size={16} fill="#f4a261" color="#f4a261" />
    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{car.rating}</span>
    <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>({car.reviews} reviews)</span>
  </div>
  <div style={{ display: 'flex', gap: 8 }}>
    <button onClick={() => {
      setCompareList(prev => prev.some(i => i.id === car.id) ? prev.filter(i => i.id !== car.id) : [...prev, car]);
      setCompareOpen(true);
    }} style={{
      background: compareList.some(i => i.id === car.id) ? 'var(--red)' : 'rgba(255,255,255,0.05)',
      border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', color: '#fff'
    }}>
      <GitCompare size={16} />
    </button>
    <button type="button" onClick={(e) => { 
      e.preventDefault(); 
      e.stopPropagation(); 
      setCart(prev => prev.some(i => i.id === car.id) ? prev : [...prev, { id: car.id, name: car.name, price: car.price }]); 
    }} style={{ 
      position: 'relative', zIndex: 20, 
      background: cart.some(i => i.id === car.id) ? 'var(--border)' : 'var(--red)', 
      color: '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', 
      fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
    }}>
      {cart.some(i => i.id === car.id) ? <><CheckCircle size={16}/> In Cart</> : 'Add to Cart'}
    </button>
  </div>
</div>
                            
            </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`
        .car-image-bg:hover { transform: scale(1.05); }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
        input[type="date"]::-webkit-inner-spin-button,
        input[type="time"]::-webkit-inner-spin-button {
          display: none;
        }
      `}</style>

      {/* Cart Drawer */}
      {cartOpen && createPortal(
        <div style={{
          position: 'fixed', top: 70, right: 0, width: '360px', height: 'calc(100vh - 70px)', background: 'var(--card)',
          borderLeft: '1px solid var(--border)', boxShadow: '-4px 0 12px rgba(0,0,0,0.4)',
          display: 'flex', flexDirection: 'column', padding: '1.5rem', zIndex: 9999,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)' }}>Your Cart</h3>
            <button onClick={() => setCartOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="var(--muted)" />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem' }}>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--muted)', textAlign: 'center' }}>Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  marginBottom: '0.75rem', background: 'rgba(255,255,255,0.03)', 
                  padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                    <div style={{ color: 'var(--red)', fontSize: '0.85rem', fontWeight: 700, marginTop: '4px' }}>₹{item.price} / day</div>
                  </div>
                  <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} style={{ 
                    background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--muted)', 
                    cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                  }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'rgba(230,57,70,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                <span>Total</span>
                <span>₹{cart.reduce((sum, i) => sum + i.price, 0)}</span>
              </div>
              <button onClick={() => { setCheckoutOpen(true); setCartOpen(false); }} style={{
                width: '100%', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 8,
                padding: '12px', fontWeight: 700, cursor: 'pointer'
              }}>Checkout</button>
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Checkout Modal */}
      {checkoutOpen && createPortal(
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 9999, padding: '1rem'
        }}>
          <div style={{ 
            background: 'var(--card)', padding: '2rem', borderRadius: 24, width: '450px', maxWidth: '100%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 1 }}>Secure Checkout</h3>
              <button onClick={() => setCheckoutOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><X size={24}/></button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span>Car Rental ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>₹{cart.reduce((sum, i) => sum + i.price, 0)}</span>
              </div>
              <div onClick={() => setInsuranceAdded(p => !p)} style={{ background: insuranceAdded ? 'rgba(42,157,143,0.1)' : 'rgba(255,255,255,0.03)', border: insuranceAdded ? '1px solid rgba(42,157,143,0.4)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '1rem', marginBottom: '0.75rem', cursor: 'pointer', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>&#128737;&#65039;</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: insuranceAdded ? '#2a9d8f' : '#fff' }}>Zero Depreciation Insurance</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>Full accident coverage • 24/7 roadside • No hidden costs</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, color: insuranceAdded ? '#2a9d8f' : '#e9c46a' }}>₹{INSURANCE_PER_DAY}/day</div>
                    <div style={{ fontSize: '0.65rem', marginTop: 3, fontWeight: 800, color: insuranceAdded ? '#2a9d8f' : 'var(--muted)' }}>{insuranceAdded ? '✅ ADDED' : 'TAP TO ADD'}</div>
                  </div>
                </div>
              </div>
              {insuranceAdded && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(42,157,143,0.9)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span>₹{INSURANCE_PER_DAY} × {cart.length} day(s) insurance</span>
                  <span>+₹{INSURANCE_PER_DAY * cart.length}</span>
                </div>
              )}
              <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                <span>TOTAL</span>
                <span style={{ color: 'var(--red)' }}>₹{cart.reduce((sum, i) => sum + i.price, 0) + (insuranceAdded ? INSURANCE_PER_DAY * cart.length : 0)}</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button onClick={() => setPaymentMethod('card')} style={{
                  flex: 1, padding: '12px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: paymentMethod === 'card' ? 'rgba(230,57,70,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${paymentMethod === 'card' ? 'var(--red)' : 'transparent'}`,
                  color: paymentMethod === 'card' ? 'var(--red)' : 'var(--muted)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                }}><CreditCard size={18}/> Card</button>
                <button onClick={() => setPaymentMethod('upi')} style={{
                  flex: 1, padding: '12px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: paymentMethod === 'upi' ? 'rgba(230,57,70,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${paymentMethod === 'upi' ? 'var(--red)' : 'transparent'}`,
                  color: paymentMethod === 'upi' ? 'var(--red)' : 'var(--muted)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                }}><Smartphone size={18}/> UPI</button>
              </div>
              
              {paymentMethod === 'card' ? (
                <>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 500, letterSpacing: 0.5 }}>CARD DETAILS</label>
                  <div style={{ marginBottom: '1rem' }}>
                    <input type="text" placeholder="Name on Card" style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                      padding: '14px', color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
                    }} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                  <div style={{ position: 'relative', marginBottom: '1rem' }}>
                    <CreditCard size={18} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Card Number" style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                      padding: '14px 14px 14px 42px', color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
                    }} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="MM/YY" style={{
                      flex: 1, minWidth: 0, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                      padding: '14px', color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
                    }} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    <input type="text" placeholder="CVC" style={{
                      flex: 1, minWidth: 0, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                      padding: '14px', color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
                    }} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                </>
              ) : (
                <>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 500, letterSpacing: 0.5 }}>ENTER UPI ID</label>
                  <div style={{ position: 'relative', marginBottom: '1rem' }}>
                    <Smartphone size={18} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="username@upi" style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                      padding: '14px 14px 14px 42px', color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border 0.2s'
                    }} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '1rem' }}>
                    A payment request will be sent to your UPI app.
                  </div>
                </>
              )}
            </div>

            <button onClick={async () => { 
              const total = cart.reduce((sum, i) => sum + i.price, 0);
              try {
                for (const item of cart) {
                  await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userName: user?.name || 'Guest',
                      userEmail: user?.email || 'guest@carvia.com',
                      carName: item.name,
                      price: item.price
                    })
                  });
                }
                setCart([]); 
                setCheckoutOpen(false); 
                alert("Payment Successful! Your ride is booked."); 
              } catch (e) {
                alert("Booking failed. Please check connection.");
              }
            }} style={{
              width: '100%', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 12,
              padding: '16px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
              Pay ₹{cart.reduce((sum, i) => sum + i.price, 0) + (insuranceAdded ? INSURANCE_PER_DAY * cart.length : 0)}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <CheckCircle size={12} /> Payments are secure and encrypted
            </div>
          </div>
        </div>,
        document.body
      )}


      {/* Comparison Dynamic Island (Screen Bottom Center) */}
      {createPortal(
        <AnimatePresence>
          {compareOpen && compareList.length > 0 && (
            <motion.div 
              initial={{ y: 100, x: '-50%', opacity: 0 }}
              animate={{ y: -40, x: '-50%', opacity: 1 }}
              exit={{ y: 100, x: '-50%', opacity: 0 }}
              style={{
                position: 'fixed', left: '50%', bottom: 0, width: 'fit-content', minWidth: 400,
                background: 'rgba(20,20,20,0.95)', border: '1px solid var(--border)',
                borderRadius: 100, padding: '10px 28px',
                boxShadow: '0 -15px 40px rgba(0,0,0,0.6)', zIndex: 9998,
                backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ background: 'var(--red)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 800 }}>
                  {compareList.length}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1, color: 'var(--muted)' }}>CARS SELECTED</span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {compareList.map(c => (
                  <div key={c.id} style={{ position: 'relative' }}>
                    <img src={c.image} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }} />
                    <button onClick={() => setCompareList(prev => prev.filter(i => i.id !== c.id))} style={{ position: 'absolute', top: -5, right: -5, background: 'var(--red)', border: 'none', borderRadius: '50%', padding: 2, color: '#fff', cursor: 'pointer' }}><X size={10} /></button>
                  </div>
                ))}
              </div>

              <div style={{ height: 24, width: 1, background: 'var(--border)' }} />

              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => setCompareModalOpen(true)}
                  style={{ background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 100, padding: '8px 20px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <GitCompare size={16} /> COMPARE NOW
                </button>
                <button onClick={() => setCompareOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Full Comparison Modal */}
      {compareModalOpen && createPortal(
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10002, padding: '2rem'
        }}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24,
            width: '95%', maxWidth: 1200, maxHeight: '90vh', overflowY: 'auto', padding: '2rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0 }}>SPECIFICATION COMPARISON</h2>
              <button onClick={() => setCompareModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><X size={32} /></button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '20px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>FEATURE</th>
                    {compareList.map(c => (
                      <th key={c.id} style={{ padding: '20px', borderBottom: '1px solid var(--border)', minWidth: 200 }}>
                        <img src={c.image} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{c.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Daily Rent', c => `₹${c.price}`],
                    ['Horsepower', c => c.hp],
                    ['0-60 MPH', c => c.zeroToSixty],
                    ['Seats', c => c.seats],
                    ['Fuel Type', c => c.fuel],
                    ['Transmission', c => c.transmission],
                    ['User Rating', c => `⭐ ${c.rating} (${c.reviews} reviews)`]
                  ].map(([label, getValue]) => (
                    <tr key={label}>
                      <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 700, color: 'var(--muted)', background: 'rgba(255,255,255,0.02)' }}>{label}</td>
                      {compareList.map(c => (
                        <td key={c.id} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 600 }}>{getValue(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Choose the car that fits your adrenaline needs best!</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Rental;
