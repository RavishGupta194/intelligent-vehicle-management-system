import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Search, SlidersHorizontal, Star, CheckCircle, ArrowRight, Upload, Filter, MapPin, Gauge, Fuel, Zap, ShieldCheck, Heart, Info, ArrowUpRight, ArrowUpDown, Image as ImageIcon, AlertCircle, X, RotateCw, Box, MoveHorizontal, BoxSelect, Car, MessageSquare } from 'lucide-react'
import sedanImg from '../assets/sedan.png'
import suvImg from '../assets/suv.png'
import electricImg from '../assets/electric.png'
import ruggedImg from '../assets/rugged.png'
import mpvImg from '../assets/mpv.png'

const steps = [
  { icon: <Upload size={24} />, step: '01', title: 'Details', desc: 'Add photos & specs' },
  { icon: <ShieldCheck size={24} />, step: '02', title: 'Verify', desc: 'Free 150-point check' },
  { icon: <Zap size={24} />, step: '03', title: 'Match', desc: 'Connect with buyers' },
  { icon: <CheckCircle size={24} />, step: '04', title: 'Sold', desc: 'Secure payment' },
]

function EMIModal({ car, onClose }) {
  const [downpayment, setDownpayment] = useState(Math.round(car.price * 0.2))
  const [tenure, setTenure] = useState(60) // months
  const interestRate = 8.5 / 100 / 12 // monthly interest

  const p = car.price - downpayment
  const emi = Math.round((p * interestRate * Math.pow(1 + interestRate, tenure)) / (Math.pow(1 + interestRate, tenure) - 1))

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#161616', border: '1px solid rgba(233,196,106,0.2)', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '2rem', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', margin: 0 }}>EMI CALCULATOR</h2>
            <p style={{ color: '#e9c46a', fontSize: '0.8rem', fontWeight: 800, margin: '4px 0 0' }}>{car.name.toUpperCase()}</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer' }}><X size={20}/></button>
        </div>

        <div style={{ background: 'rgba(233,196,106,0.05)', border: '1px solid rgba(233,196,106,0.1)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>ESTIMATED MONTHLY PAYMENT</div>
          <div style={{ color: '#e9c46a', fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>₹{emi.toLocaleString()}</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '8px' }}>@ 8.5% Interest Rate • {tenure} Months</div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>DOWN PAYMENT</label>
              <span style={{ color: '#fff', fontWeight: 800 }}>₹{downpayment.toLocaleString()}</span>
            </div>
            <input type="range" min={Math.round(car.price * 0.1)} max={car.price} step="10000" value={downpayment} onChange={e => setDownpayment(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#e9c46a' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>LOAN TENURE</label>
              <span style={{ color: '#fff', fontWeight: 800 }}>{tenure} Months</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[12, 24, 36, 48, 60, 72, 84].map(t => (
                <button key={t} onClick={() => setTenure(t)} style={{ flex: 1, padding: '8px 0', borderRadius: '8px', border: '1px solid', borderColor: tenure === t ? '#e9c46a' : 'rgba(255,255,255,0.1)', background: tenure === t ? 'rgba(233,196,106,0.1)' : 'transparent', color: tenure === t ? '#e9c46a' : 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>{t/12}Y</button>
              ))}
            </div>
          </div>
        </div>

        <button style={{ width: '100%', marginTop: '2.5rem', background: '#e9c46a', color: '#000', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 900, fontSize: '1rem', letterSpacing: 1, cursor: 'pointer' }}>CHECK ELIGIBILITY</button>
      </motion.div>
    </div>,
    document.body
  )
}

function OfferModal({ car, user, onClose }) {
  const [offer, setOffer] = useState(car.price - 50000)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!user) { alert("Please login to make an offer!"); return; }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: car.id,
          listingName: car.name,
          listingPrice: car.price,
          buyerName: user.name,
          buyerEmail: user.email,
          sellerEmail: car.sellerEmail || 'admin@carvia.com',
          offerAmount: offer,
          message: msg
        })
      })
      if (res.ok) {
        alert("Offer submitted successfully! The seller will be notified.")
        onClose()
      }
    } catch (e) {
      alert("Failed to submit offer.")
    } finally {
      setLoading(false)
    }
  }

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#161616', border: '1px solid rgba(233,196,106,0.2)', borderRadius: '24px', width: '100%', maxWidth: '450px', padding: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>MAKE AN OFFER</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.9rem' }}>Negotiate directly with the seller for <b>{car.name}</b></p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>LISTING PRICE: ₹{car.price.toLocaleString()}</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#e9c46a', fontWeight: 800 }}>₹</span>
            <input type="number" value={offer} onChange={e => setOffer(parseInt(e.target.value))} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 16px 16px 32px', color: '#fff', fontSize: '1.2rem', fontWeight: 800, outline: 'none' }} />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>MESSAGE TO SELLER</label>
          <textarea placeholder="e.g. I can pay full cash within 2 days..." value={msg} onChange={e => setMsg(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '0.95rem', minHeight: '100px', outline: 'none', resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>CANCEL</button>
          <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: '14px', borderRadius: '12px', border: 'none', background: '#e9c46a', color: '#000', fontWeight: 900, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>{loading ? 'SENDING...' : 'SEND OFFER'}</button>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

function ShowroomModal({ car, onClose }) {
  const [view, setView] = useState('exterior') // 'exterior' | 'interior'
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-300, 300], [-45, 45])
  const interiorImg = "https://images.unsplash.com/photo-1606016159991-efa6ec6d1f05?ixlib=rb-4.0.3&auto=format&fit=crop&w=3000&q=80"

  useEffect(() => {
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [])

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 99999, background: 'rgba(10,10,11,0.98)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', margin: 0, letterSpacing: 1 }}>
            {car.name} <span style={{ color: '#e9c46a' }}>VIRTUAL SHOWROOM</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', fontSize: '0.9rem', fontWeight: 600 }}>PREMIUM INTERACTIVE EXPERIENCE</p>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', padding: '12px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s'
        }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(233,196,106,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <X size={24} />
        </button>
      </div>

      {/* View Toggles */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem 0' }}>
        <button onClick={() => setView('exterior')} style={{
          padding: '12px 32px', borderRadius: '100px', border: '1px solid',
          borderColor: view === 'exterior' ? '#e9c46a' : 'rgba(255,255,255,0.1)',
          background: view === 'exterior' ? 'rgba(233,196,106,0.1)' : 'transparent',
          color: view === 'exterior' ? '#e9c46a' : 'rgba(255,255,255,0.5)',
          fontWeight: 800, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.3s'
        }}>EXTERIOR 360°</button>
        <button onClick={() => setView('interior')} style={{
          padding: '12px 32px', borderRadius: '100px', border: '1px solid',
          borderColor: view === 'interior' ? '#e9c46a' : 'rgba(255,255,255,0.1)',
          background: view === 'interior' ? 'rgba(233,196,106,0.1)' : 'transparent',
          color: view === 'interior' ? '#e9c46a' : 'rgba(255,255,255,0.5)',
          fontWeight: 800, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.3s'
        }}>INTERIOR PANORAMA</button>
      </div>

      {/* Viewer Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem 2rem' }}>
        
        {view === 'exterior' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', perspective: 1000 }}>
            <div style={{ position: 'absolute', top: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: 1 }}>
              <RotateCw size={16} color="#e9c46a" /> DRAG TO INSPECT
            </div>
            
            <motion.div
              drag="x"
              dragConstraints={{ left: -300, right: 300 }}
              style={{ x, rotateY, cursor: 'grab', zIndex: 2 }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <img src={car.displayImage} alt={car.name} style={{ width: '900px', maxWidth: '90vw', objectFit: 'contain', filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.8))' }} draggable="false" />
            </motion.div>
            
            <div style={{ width: '700px', height: '30px', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 70%)', borderRadius: '50%', marginTop: '-30px', zIndex: 1 }} />
          </div>
        )}

        {view === 'interior' && (
          <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '100px', color: '#fff', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1 }}>
              <MoveHorizontal size={16} color="#e9c46a" /> SWIPE LEFT/RIGHT TO LOOK AROUND
            </div>
            <motion.div
              drag="x"
              dragConstraints={{ left: -1500, right: 0 }}
              style={{ height: '100%', width: 'fit-content', cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <img src={interiorImg} alt="Interior" style={{ height: '100%', width: 'auto', objectFit: 'cover', pointerEvents: 'none' }} />
            </motion.div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default function BuySell({ user }) {
  const [tab, setTab] = useState('buy')
  const [search, setSearch] = useState('')
  const [fuel, setFuel] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [contacted, setContacted] = useState([])
  const [sellStep, setSellStep] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showroomCar, setShowroomCar] = useState(null)
  const [activeEMI, setActiveEMI] = useState(null)
  const [activeOffer, setActiveOffer] = useState(null)

  const [form, setForm] = useState({
    name: '',
    year: '',
    km: '',
    price: '',
    city: '',
    fuel: 'Petrol',
    transmission: 'Manual',
    type: 'Sedan',
    image: ''
  })

  const fetchListings = async () => {
    try {
      console.log('Fetching listings from:', `${import.meta.env.VITE_API_URL}/api/listings`)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      console.log('Listings received:', data.length)
      const mapped = data.map(car => ({
        ...car,
        displayImage: car.image || (car.type === 'Sedan' ? sedanImg : (car.type === 'SUV' ? suvImg : (car.type === 'Electric' ? electricImg : ruggedImg)))
      }))
      setListings(mapped)
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const filtered = listings
    .filter(c => {
      if (!c || !c.name || !c.fuel) return false
      const matchName = c.name.toLowerCase().includes(search.toLowerCase())
      const matchFuel = fuel === 'All' || c.fuel.includes(fuel)
      return matchName && matchFuel
    })
    .sort((a, b) => {
      if (!a.price || !b.price) return 0
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Newest') return (b.year || 0) - (a.year || 0)
      if (sortBy === 'Lowest KM') return (a.km || 0) - (b.km || 0)
      return 0
    })

  const handleSellSubmit = async (e) => {
    e.preventDefault()
    if (sellStep < 3) {
      setSellStep(prev => prev + 1)
      return
    }

    const newListing = {
      ...form,
      year: parseInt(form.year),
      km: parseInt(form.km),
      price: parseInt(form.price),
      userEmail: user?.email || 'guest@carvia.com',
      status: 'pending'
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing)
      })

      if (response.ok) {
        alert('SUCCESS: Listing submitted! It will be visible after admin approval.')
        setSellStep(0)
        setTab('buy')
        setForm({ name: '', year: '', km: '', price: '', city: '', fuel: 'Petrol', transmission: 'Manual', type: 'Sedan', image: '' })
      } else {
        alert('Failed to submit listing. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting listing:', error)
    }
  }

  return (
    <div className="page-enter" style={{ background: '#0a0a0b', color: '#fff', minHeight: '100vh' }}>
      
      <div style={{
        position: 'relative',
        padding: '120px 2rem 60px',
        background: 'radial-gradient(circle at 50% -20%, rgba(233, 196, 106, 0.15) 0%, transparent 50%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1.5rem' }}>
            INDIAN ROAD <br/>
            <span style={{ background: 'linear-gradient(90deg, #fff 0%, #e9c46a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LEGENDS.</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', width: 'fit-content', margin: '0 auto' }}>
            {['buy', 'sell'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '14px 40px', borderRadius: '12px', border: 'none', background: tab === t ? '#e9c46a' : 'transparent', color: tab === t ? '#000' : 'rgba(255,255,255,0.5)', fontWeight: 800, cursor: 'pointer' }}>
                {t === 'buy' ? 'Browse Stock' : 'Sell Listing'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem 100px' }}>
        
        {tab === 'buy' ? (
          <>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                <input placeholder="Search manufacturer or model..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 16px 16px 48px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'].map(f => (
                  <button key={f} onClick={() => setFuel(f)} style={{ padding: '12px 24px', borderRadius: '14px', border: '1px solid', borderColor: fuel === f ? '#e9c46a' : 'rgba(255,255,255,0.1)', background: fuel === f ? 'rgba(233,196,106,0.1)' : 'transparent', color: fuel === f ? '#e9c46a' : 'rgba(255,255,255,0.6)', fontWeight: 700, cursor: 'pointer' }}>{f}</button>
                ))}
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: '#fff', fontWeight: 700 }}>
                <option value="Newest">Sort: Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Lowest KM">Lowest KM</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
              {loading ? (
                <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
                   <div style={{ width: 40, height: 40, border: '3px solid rgba(233,196,106,0.1)', borderTopColor: '#e9c46a', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
                   <p style={{ fontWeight: 700, color: 'var(--muted)' }}>FETCHING PREMIUM FLEET...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '6rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                   <Car size={48} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
                   <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>NO VEHICLES FOUND</h3>
                   <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Try adjusting your filters or search terms.</p>
                </div>
              ) : filtered.map(car => (
                <div key={car._id} className="car-card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img src={car.displayImage} alt={car.name || 'Car'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="car-img" />
                    <div style={{ position: 'absolute', top: 20, left: 20 }}><span style={{ background: '#e9c46a', color: '#000', padding: '4px 12px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 900 }}>APPROVED</span></div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div><h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{car.name || 'Unknown Vehicle'}</h3><p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}><MapPin size={12} /> {car.city || 'N/A'} • {car.year || 'N/A'}</p></div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#e9c46a' }}>₹{((car.price || 0) / 100000).toFixed(1)}L</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <button onClick={() => setActiveEMI(car)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <ArrowUpRight size={14} /> EMI CALC
                      </button>
                      <button onClick={() => setActiveOffer(car)} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'rgba(233,196,106,0.05)', color: '#e9c46a', border: '1px solid rgba(233,196,106,0.2)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <MessageSquare size={14} /> NEGOTIATE
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => setShowroomCar(car)} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', color: '#e9c46a', border: '1px solid rgba(233,196,106,0.3)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(233,196,106,0.1)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                        <BoxSelect size={18} /> 360° VIEW
                      </button>
                      <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#e9c46a', color: '#000', fontWeight: 800, cursor: 'pointer', border: 'none' }}>GET DETAILS</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '30px', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.05)' }} />
              {steps.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: i <= sellStep ? '#e9c46a' : 'rgba(255,255,255,0.03)', color: i <= sellStep ? '#000' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>{s.icon}</div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: i <= sellStep ? '#fff' : 'rgba(255,255,255,0.3)' }}>{s.title}</h4>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.06)', padding: '4rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>SELL YOUR CAR</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e9c46a', marginBottom: '3rem', background: 'rgba(233,196,106,0.1)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(233,196,106,0.2)' }}>
                <AlertCircle size={18} />
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Note: Your listing will be visible to buyers only after administrator approval.</p>
              </div>

              <form onSubmit={handleSellSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: 'Vehicle Name', key: 'name', placeholder: 'e.g. Honda City ZX' },
                    { label: 'Model Year', key: 'year', placeholder: '2022' },
                    { label: 'KM Driven', key: 'km', placeholder: '15,000' },
                    { label: 'Expected Price (₹)', key: 'price', placeholder: '12,00,000' },
                    { label: 'Current City', key: 'city', placeholder: 'Delhi' },
                  ].map((item, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: 12, color: '#e9c46a' }}>{item.label.toUpperCase()}</label>
                      <input required value={form[item.key]} onChange={e => setForm({...form, [item.key]: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }} placeholder={item.placeholder} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: 12, color: '#e9c46a' }}>CATEGORY</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
                      <option>Sedan</option><option>SUV</option><option>Electric</option><option>Rugged</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: 12, color: '#e9c46a' }}>PHOTO URL (OPTIONAL)</label>
                    <div style={{ position: 'relative' }}>
                      <ImageIcon size={18} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                      <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px 20px 18px 54px', color: '#fff' }} placeholder="https://image-link.com/car.jpg" />
                    </div>
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '22px', borderRadius: '20px', background: '#e9c46a', color: '#000', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer', border: 'none' }}>
                  {sellStep < 3 ? 'NEXT STEP' : 'FINALIZE SUBMISSION'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {showroomCar && <ShowroomModal car={showroomCar} onClose={() => setShowroomCar(null)} />}
      {activeEMI && <EMIModal car={activeEMI} onClose={() => setActiveEMI(null)} />}
      {activeOffer && <OfferModal car={activeOffer} user={user} onClose={() => setActiveOffer(null)} />}
    </div>
  )
}
