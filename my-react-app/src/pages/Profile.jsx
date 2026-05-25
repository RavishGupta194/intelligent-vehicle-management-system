import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { User, Car, Clock, Trash2, ShieldCheck, MapPin, Gauge, Fuel, Trophy, Target, Zap, Award, Gift, CircleDollarSign, X, CheckCircle, Package, ArrowLeft, Activity } from 'lucide-react'

const redeemProducts = [
  { id: 1, name: 'CARVIA Signature Cap', type: 'Merch', cost: 300, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Premium Leather Keychain', type: 'Accessories', cost: 150, img: 'https://images.unsplash.com/photo-1533559129598-65ec4db1f47b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Free Basic Car Wash', type: 'Service', cost: 500, img: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: '1 Day Free Hatchback Rental', type: 'Rental', cost: 1500, img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Dashboard Phone Mount', type: 'Accessories', cost: 250, img: 'https://images.unsplash.com/photo-1626262963134-2e61c360980c?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Engine Oil Top-Up', type: 'Service', cost: 800, img: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'CARVIA Travel Mug', type: 'Merch', cost: 400, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Mini Fire Extinguisher', type: 'Safety', cost: 600, img: 'https://images.unsplash.com/photo-1582215264376-79ba13636f86?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: '1 Day Free SUV Rental', type: 'Rental', cost: 2500, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80' },
  { id: 10, name: 'Premium Car Perfume', type: 'Accessories', cost: 200, img: 'https://images.unsplash.com/photo-1594958055627-7756f10ce697?auto=format&fit=crop&w=400&q=80' },
  { id: 11, name: 'Tire Inflator (Portable)', type: 'Accessories', cost: 1200, img: 'https://images.unsplash.com/photo-1626620579222-1d528ef0dc7f?auto=format&fit=crop&w=400&q=80' },
  { id: 12, name: 'Microfiber Cleaning Kit', type: 'Accessories', cost: 350, img: 'https://images.unsplash.com/photo-1585062544838-662f5f190e2d?auto=format&fit=crop&w=400&q=80' }
]

function RedeemModal({ onClose, userCoins, setCoins, user }) {
  const [selected, setSelected] = useState(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', pin: '' })

  const handleRedeem = async (e) => {
    e.preventDefault()
    if (userCoins < selected.cost) {
      alert("Not enough coins!")
      return
    }

    const payload = {
      userName: form.name,
      userEmail: user?.email || 'guest@carvia.com',
      productName: selected.name,
      cost: selected.cost,
      address: form.address,
      phone: form.phone,
      pin: form.pin
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/redemptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if(res.ok) {
        setCoins(prev => prev - selected.cost)
        setSuccess(true)
      } else {
        const errorData = await res.json()
        console.error('Redemption error:', errorData)
        alert(`Failed to submit redemption: ${errorData.message || 'Unknown error'}`)
      }
    } catch(err) {
      console.error('Network error during redemption:', err)
      alert('Error connecting to server.')
    }
  }

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#111', width: '100%', maxWidth: 1000, height: '85vh', borderRadius: '32px', border: '1px solid rgba(233,196,106,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: 0 }}>REWARD <span style={{ color: '#e9c46a' }}>STORE</span></h2>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)' }}>Balance: <span style={{ color: '#e9c46a', fontWeight: 800 }}>{userCoins} Coins</span></p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={28} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', marginTop: '10vh' }}>
              <CheckCircle size={80} color="#2a9d8f" style={{ margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>REDEEMED SUCCESSFULLY!</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 400, margin: '0 auto 2rem' }}>Your <b>{selected.name}</b> will be delivered/activated shortly at your address.</p>
              <button onClick={onClose} style={{ padding: '16px 40px', background: '#e9c46a', color: '#000', borderRadius: '100px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>BACK TO PROFILE</button>
            </div>
          ) : selected ? (
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: '#e9c46a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: '2rem' }}><ArrowLeft size={18} /> BACK TO STORE</button>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px' }}>
                <img src={selected.img} alt={selected.name} style={{ width: 120, height: 120, borderRadius: '16px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{selected.name}</h3>
                  <div style={{ fontSize: '1.2rem', color: '#e9c46a', fontWeight: 900 }}>{selected.cost} Coins</div>
                </div>
              </div>

              <form onSubmit={handleRedeem} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>DELIVERY DETAILS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div><label style={{ display:'block', fontSize:'0.8rem', color:'#e9c46a', fontWeight:800, marginBottom:8 }}>FULL NAME</label><input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} style={{ width:'100%', padding:'16px', borderRadius:'12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }} /></div>
                  <div><label style={{ display:'block', fontSize:'0.8rem', color:'#e9c46a', fontWeight:800, marginBottom:8 }}>PHONE NUMBER</label><input required value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} style={{ width:'100%', padding:'16px', borderRadius:'12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }} /></div>
                </div>
                <div><label style={{ display:'block', fontSize:'0.8rem', color:'#e9c46a', fontWeight:800, marginBottom:8 }}>FULL ADDRESS</label><textarea required value={form.address} onChange={e=>setForm({...form, address: e.target.value})} rows={3} style={{ width:'100%', padding:'16px', borderRadius:'12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', resize:'none' }} /></div>
                <div><label style={{ display:'block', fontSize:'0.8rem', color:'#e9c46a', fontWeight:800, marginBottom:8 }}>PINCODE</label><input required value={form.pin} onChange={e=>setForm({...form, pin: e.target.value})} style={{ width:'100%', padding:'16px', borderRadius:'12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }} /></div>
                
                <button type="submit" disabled={userCoins < selected.cost} style={{ padding:'20px', borderRadius:'16px', background: userCoins < selected.cost ? 'rgba(255,255,255,0.1)' : '#e9c46a', color: userCoins < selected.cost ? 'rgba(255,255,255,0.3)' : '#000', border:'none', fontWeight:900, fontSize:'1.1rem', cursor: userCoins < selected.cost ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
                  {userCoins < selected.cost ? 'NOT ENOUGH COINS' : 'CONFIRM REDEMPTION'}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {redeemProducts.map(prod => (
                <div key={prod.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <img src={prod.img} alt={prod.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: '#e9c46a', fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>{prod.type.toUpperCase()}</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem', flex: 1 }}>{prod.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>{prod.cost} <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>COINS</span></span>
                      <button onClick={() => setSelected(prod)} style={{ background: 'rgba(233,196,106,0.1)', color: '#e9c46a', border: '1px solid rgba(233,196,106,0.3)', padding: '8px 16px', borderRadius: '100px', fontWeight: 800, cursor: 'pointer' }}>REDEEM</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Profile({ user }) {
  const [myListings, setMyListings] = useState([])
  const [myOrders, setMyOrders] = useState([])
  const [myMaintenance, setMyMaintenance] = useState([])
  const [myRedemptions, setMyRedemptions] = useState([])
  const [myTransactions, setMyTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [coinsBalance, setCoinsBalance] = useState(0)
  
  const [referral, setReferral] = useState(null)
  const [refCodeInput, setRefCodeInput] = useState('')
  const [loadingRef, setLoadingRef] = useState(false)

  const badges = [
    { name: 'Road Trip Rookie', icon: <Target size={20} />, color: '#2a9d8f', desc: 'Booked first rental' },
    { name: 'Safe Pilot', icon: <ShieldCheck size={20} />, color: '#e9c46a', desc: 'Drowsy score < 10' },
    { name: 'City Explorer', icon: <MapPin size={20} />, color: '#f4a261', desc: 'Visited 3+ cities' },
    { name: 'High Roller', icon: <Trophy size={20} />, color: '#e63946', desc: 'Earned 5000+ coins' },
    { name: 'Eco Warrior', icon: <Zap size={20} />, color: '#00ff00', desc: 'Rented EV 3 times' },
  ]

  const fetchData = async () => {
    if (!user?.email) return
    try {
      const [listRes, orderRes, maintRes, redempRes, refRes, coinsRes, transRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/user/listings/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/user/orders/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/user/maintenance/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/user/redemptions/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/referrals/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/user/coins/${user.email}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/user/transactions/${user.email}`)
      ])
      const listData = await listRes.json()
      const orderData = await orderRes.json()
      const maintData = await maintRes.json()
      const redempData = await redempRes.json()
      const refData = await refRes.json()
      const coinsData = await coinsRes.json()
      const transData = await transRes.json()
      
      setMyListings(listData)
      setMyOrders(orderData)
      setMyMaintenance(maintData)
      setMyRedemptions(redempData)
      setMyTransactions(transData)
      setReferral(refData)
      if (coinsData && coinsData.coins !== undefined) {
        setCoinsBalance(coinsData.coins)
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateRef = async () => {
    setLoadingRef(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/referrals/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      })
      if (res.ok) setReferral(await res.json())
    } catch (e) { alert("Failed to generate code.") }
    finally { setLoadingRef(false) }
  }

  const handleApplyRef = async () => {
    if (!refCodeInput) return
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/referrals/use`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: refCodeInput, usedByEmail: user.email, usedByName: user.name })
      })
      const data = await res.json()
      alert(data.message)
      if (res.ok) {
        setCoinsBalance(prev => prev + 1000)
        setRefCodeInput('')
      }
    } catch (e) { alert("Error applying code.") }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Delete this listing?')) return
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/listings/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMyListings(prev => prev.filter(x => x._id !== id))
        alert('Listing deleted.')
      }
    } catch (error) {
      alert('Delete failed.')
    }
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#0a0a0b', color: '#fff', padding: '120px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e9c46a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={50} color="#000" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{user?.name || 'User Profile'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>{user?.email}</p>
          </div>
        </div>

        {/* GAMIFICATION & REWARDS DASHBOARD */}
        <div style={{ marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(233,196,106,0.1) 0%, rgba(10,10,11,1) 100%)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(233,196,106,0.3)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
          
          {/* Left: Stats */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem', color: '#e9c46a' }}>
              <Trophy size={28} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>CARVIA REWARDS</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Earn CARVIA Coins by driving safely and completing milestones. Redeem them for free rentals and maintenance!
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
              <button onClick={() => setShowRedeemModal(true)} style={{ background: '#e9c46a', color: '#000', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                <Gift size={20} /> REDEEM COINS
              </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '150px', background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <CircleDollarSign size={32} color="#e9c46a" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>{coinsBalance}</div>
                <div style={{ fontSize: '0.8rem', color: '#e9c46a', fontWeight: 700, letterSpacing: 1 }}>COINS BALANCE</div>
              </div>
              <div style={{ flex: 1, minWidth: '150px', background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <ShieldCheck size={32} color="#2a9d8f" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>98<span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.3)' }}>/100</span></div>
                <div style={{ fontSize: '0.8rem', color: '#2a9d8f', fontWeight: 700, letterSpacing: 1 }}>SAFETY SCORE</div>
              </div>
            </div>
          </div>

          {/* Right: Ways to Earn */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>WAYS TO EARN</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { icon: <Target size={20} color="#2a9d8f" />, title: 'Complete a 300km safe trip', points: '+500 Coins', desc: 'No drowsy AI alerts triggered during the entire rental trip.' },
                { icon: <Zap size={20} color="#e9c46a" />, title: 'Rent an Electric Vehicle (EV)', points: '+200 Coins', desc: 'Go green and earn extra eco-friendly reward points.' },
                { icon: <Award size={20} color="#f4a261" />, title: 'Refer a Friend', points: '+1000 Coins', desc: 'Awarded instantly when they complete their first rental.' },
                { icon: <Gift size={20} color="#c77dff" />, title: 'Maintain Tire Pressure', points: '+50 Coins', desc: 'Keep OBD telemetry optimal during the trip to earn.' }
              ].map((way, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>{way.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', margin: 0 }}>{way.title}</h4>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#e9c46a', background: 'rgba(233,196,106,0.1)', padding: '4px 8px', borderRadius: '6px' }}>{way.points}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{way.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REFERRAL & BADGES SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Refer a Friend */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
              <Award size={28} color="#e9c46a" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>REFER & EARN</h2>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '24px', border: '1px dashed rgba(233,196,106,0.3)', marginBottom: '2rem' }}>
               <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', fontWeight: 600 }}>YOUR UNIQUE REFERRAL CODE</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '15px 25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: 5, color: '#e9c46a' }}>
                    {referral?.referralCode || 'GENERATING...'}
                  </span>
                  <button onClick={() => {navigator.clipboard.writeText(referral?.referralCode); alert('Copied!')}} style={{ background: 'transparent', border: 'none', color: '#e9c46a', cursor: 'pointer', fontWeight: 800 }}>COPY</button>
               </div>
               <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '1.5rem', fontWeight: 500 }}>Share this code with friends. When they use it, both of you get <span style={{ color: '#e9c46a', fontWeight: 800 }}>1000 COINS</span> instantly!</p>
            </div>


          </div>

          {/* Achievement Badges */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
                <Award size={28} color="#2a9d8f" />
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MY ACHIEVEMENTS</h2>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1.5rem' }}>
                {badges.map((b, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: b.color, opacity: i < 3 ? 1 : 0.2 }}>
                      {b.icon}
                    </div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: i < 3 ? '#fff' : 'rgba(255,255,255,0.2)' }}>{b.name.toUpperCase()}</div>
                  </div>
                ))}
             </div>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          {/* My Listings */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <Car size={24} color="#e9c46a" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MY LISTINGS</h2>
            </div>
            
            {loading ? <p>Loading listings...</p> : myListings.length === 0 ? (
              <p style={{ opacity: 0.3 }}>No listings yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {myListings.map(item => (
                  <div key={item._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{item.name}</h4>
                      <span style={{ 
                        fontSize: '0.65rem', padding: '4px 10px', borderRadius: '6px', 
                        background: item.status === 'approved' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(233, 196, 106, 0.2)',
                        color: item.status === 'approved' ? '#2a9d8f' : '#e9c46a',
                        fontWeight: 900
                      }}>{item.status.toUpperCase()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>₹{item.price.toLocaleString()} • {item.city}</p>
                      <button onClick={() => handleDeleteListing(item._id)} style={{ background: 'transparent', border: 'none', color: '#ff4b2b', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Rental Orders */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <Clock size={24} color="#e9c46a" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MY ORDERS</h2>
            </div>

            {loading ? <p>Loading orders...</p> : myOrders.length === 0 ? (
              <p style={{ opacity: 0.3 }}>No orders yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {myOrders.map(order => (
                  <div key={order._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h4 style={{ fontWeight: 800 }}>{order.carName}</h4>
                      <span style={{ color: '#e9c46a', fontWeight: 900 }}>₹{order.price.toLocaleString()}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Booked on: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* My Maintenance Bookings */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
            <ShieldCheck size={24} color="#f4a261" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MY MAINTENANCE BOOKINGS</h2>
          </div>

          {loading ? <p>Loading bookings...</p> : myMaintenance.length === 0 ? (
            <p style={{ opacity: 0.3 }}>No maintenance bookings yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {myMaintenance.map(m => (
                <div key={m._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h4 style={{ fontWeight: 800 }}>{m.vehicles.map(v => v.model).join(', ')}</h4>
                    <span style={{ 
                      fontSize: '0.65rem', padding: '4px 10px', borderRadius: '6px', 
                      background: m.status === 'accepted' ? 'rgba(42, 157, 143, 0.2)' : m.status === 'rejected' ? 'rgba(255, 75, 43, 0.1)' : 'rgba(233, 196, 106, 0.2)',
                      color: m.status === 'accepted' ? '#2a9d8f' : m.status === 'rejected' ? '#ff4b2b' : '#e9c46a',
                      fontWeight: 900
                    }}>{m.status.toUpperCase()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Slot: {m.date} at {m.time}</p>
                      <p style={{ fontSize: '0.8rem', color: '#f4a261', fontWeight: 700 }}>Total: ₹{m.totalAmount.toLocaleString()}</p>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
                      Booked: {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Redemption History */}
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <Trophy size={24} color="#c77dff" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>MY REDEMPTIONS</h2>
            </div>

            {loading ? <p>Loading...</p> : myRedemptions.length === 0 ? (
              <p style={{ opacity: 0.3 }}>No redemptions yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {myRedemptions.map(r => (
                  <div key={r._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(199,125,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontWeight: 800 }}>{r.productName}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#c77dff' }}>{r.cost} Coins</p>
                      </div>
                      <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(233,196,106,0.1)', color: '#e9c46a', fontWeight: 900 }}>{r.status.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <Activity size={24} color="#2a9d8f" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>POINTS HISTORY</h2>
            </div>

            {loading ? <p>Loading...</p> : myTransactions.length === 0 ? (
              <p style={{ opacity: 0.3 }}>No transaction history.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {myTransactions.map(t => (
                  <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{t.reason}</h4>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>{new Date(t.createdAt).toLocaleDateString()} {new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: t.type === 'earn' ? '#2a9d8f' : '#e63946' }}>
                      {t.type === 'earn' ? '+' : '-'}{t.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      {showRedeemModal && <RedeemModal onClose={() => setShowRedeemModal(false)} userCoins={coinsBalance} setCoins={setCoinsBalance} user={user} />}
    </div>
  )
}
