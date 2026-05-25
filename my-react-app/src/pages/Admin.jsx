import { useState, useEffect } from 'react'
import { ShieldAlert, Check, X, LogOut, LayoutDashboard, Car, Clock, ShieldCheck, Trash2, Lock, ShoppingCart, User as UserIcon, Gift, MessageSquare, TrendingUp, DollarSign, Users, Award } from 'lucide-react'

export default function Admin({ user }) {
  const [listings, setListings] = useState([])
  const [orders, setOrders] = useState([])
  const [maintenance, setMaintenance] = useState([])
  const [redemptions, setRedemptions] = useState([])
  const [referrals, setReferrals] = useState([])
  const [offers, setOffers] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [listRes, orderRes, maintRes, redempRes, refRes, offerRes, userRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/listings`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/maintenance`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/redemptions`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/referrals`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/offers`),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`)
      ])
      const listData = await listRes.json()
      const orderData = await orderRes.json()
      const maintData = await maintRes.json()
      const redempData = await redempRes.json()
      const refData = await refRes.json()
      const offerData = await offerRes.json()
      const userData = await userRes.json()
      
      setListings(listData)
      setOrders(orderData)
      setMaintenance(maintData)
      setRedemptions(redempData)
      setReferrals(refData || [])
      setOffers(offerData || [])
      setUsers(userData || [])
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.isAdmin) fetchData()
  }, [user])

  const updateListingStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) { fetchData(); alert(`Listing ${status}!`) }
      else { alert('Update failed on server.') }
    } catch (e) { alert('Update failed.') }
  }

  const deleteListing = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/listings/${id}`, { method: 'DELETE' })
      if (res.ok) { fetchData(); alert('Listing deleted!') }
      else { alert('Delete failed on server.') }
    } catch (e) { alert('Delete failed.') }
  }

  const updateRedemptionStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/redemptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) { fetchData(); alert(`Redemption ${status}!`) }
    } catch (e) { alert('Update failed.') }
  }

  const updateMaintStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/maintenance/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) { fetchData(); alert(`Maintenance ${status}!`) }
      else { alert('Update failed on server.') }
    } catch (e) { alert('Update failed.') }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0)
  const maintenanceRevenue = maintenance.filter(m => m.status === 'completed').reduce((sum, m) => sum + (m.totalAmount || 0), 0)

  if (!user?.isAdmin) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0b', color: '#fff' }}>
        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}>
          <Lock size={60} color="#e9c46a" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>ADMIN ACCESS ONLY</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Please login with an administrator account to view this dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0b', color: '#fff', paddingTop: 80 }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'rgba(233,196,106,0.6)', fontWeight: 800, letterSpacing: 2, marginBottom: '1rem', paddingLeft: '1rem' }}>MAIN MENU</div>
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { id: 'listings', icon: <Car size={20} />, label: 'Vehicle Listings' },
          { id: 'orders', icon: <ShoppingCart size={20} />, label: 'Rental Orders' },
          { id: 'maintenance', icon: <ShieldCheck size={20} />, label: 'Maintenance' },
          { id: 'redemptions', icon: <Gift size={20} />, label: 'Rewards' },
          { id: 'offers', icon: <MessageSquare size={20} />, label: 'Negotiations' },
          { id: 'referrals', icon: <Users size={20} />, label: 'Referrals' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              background: activeTab === item.id ? 'rgba(233,196,106,0.1)' : 'transparent',
              color: activeTab === item.id ? '#e9c46a' : 'rgba(255,255,255,0.5)',
              fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.3s'
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', margin: 0 }}>COMMAND <span style={{ color: '#e9c46a' }}>CENTER</span></h1>
            <p style={{ color: 'var(--muted)', fontWeight: 600, marginTop: 4 }}>System Monitoring & Fleet Control</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={fetchData} style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>REFRESH DATA</button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { label: 'Total Revenue', val: `₹${(totalRevenue + maintenanceRevenue).toLocaleString()}`, icon: <DollarSign color="#10b981" />, trend: '+12.5%' },
                { label: 'Active Rentals', val: orders.length, icon: <Car color="#38bdf8" />, trend: `+${orders.length > 0 ? 1 : 0} new` },
                { label: 'Pending Listings', val: listings.filter(l => l.status === 'pending').length, icon: <ShieldAlert color="#e63946" />, trend: 'Action Required' },
                { label: 'Total Users', val: users.length, icon: <Users color="#e9c46a" />, trend: '+48 this week' },
              ].map((stat, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{stat.icon}</div>
                    <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1 }}>{stat.label.toUpperCase()}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: 4 }}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity placeholder */}
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem' }}>SYSTEM ALERTS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {listings.filter(l => l.status === 'pending').slice(0, 3).map(l => (
                  <div key={l._id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(230,57,70,0.05)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(230,57,70,0.1)' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e63946' }} />
                    <div style={{ flex: 1 }}>New vehicle listing <b>{l.name}</b> waiting for verification.</div>
                    <button onClick={() => setActiveTab('listings')} style={{ color: '#e63946', fontWeight: 800, border: 'none', background: 'transparent', cursor: 'pointer' }}>REVIEW</button>
                  </div>
                ))}
                {redemptions.filter(r => r.status === 'pending').slice(0, 2).map(r => (
                  <div key={r._id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(233,196,106,0.05)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(233,196,106,0.1)' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e9c46a' }} />
                    <div style={{ flex: 1 }}>Reward redemption for <b>{r.productName}</b> pending shipment.</div>
                    <button onClick={() => setActiveTab('redemptions')} style={{ color: '#e9c46a', fontWeight: 800, border: 'none', background: 'transparent', cursor: 'pointer' }}>MANAGE</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {listings.map(car => (
              <div key={car._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <img src={car.image} alt="" style={{ width: 100, height: 60, objectFit: 'contain', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{car.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Seller: {car.userEmail} • ₹{(car.price/100000).toFixed(1)}L</div>
                </div>
                <div style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: car.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(230,57,70,0.1)', color: car.status === 'approved' ? '#10b981' : '#e63946' }}>{car.status.toUpperCase()}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {car.status === 'pending' && <button onClick={() => updateListingStatus(car._id, 'approved')} style={{ padding: '10px', borderRadius: '10px', background: '#10b981', border: 'none', color: '#fff', cursor: 'pointer' }}><Check size={18} /></button>}
                  <button onClick={() => deleteListing(car._id)} style={{ padding: '10px', borderRadius: '10px', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', color: '#e63946', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length === 0 ? <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No orders found.</div> : orders.map(o => (
              <div key={o._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>RENTAL ORDER</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{o.carName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>User: <b>{o.userName}</b> ({o.userEmail}) • Price: <b style={{ color: '#fff' }}>₹{o.price.toLocaleString()}</b></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{new Date(o.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'redemptions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {redemptions.map(r => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#e9c46a', fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>REWARD ITEM</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{r.productName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>User: <b>{r.userName}</b> ({r.userEmail}) • Cost: <b>{r.cost} Coins</b></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: 'rgba(233,196,106,0.1)', color: '#e9c46a', display: 'inline-block', marginBottom: '1rem' }}>{r.status.toUpperCase()}</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {r.status === 'pending' && <button onClick={() => updateRedemptionStatus(r._id, 'shipped')} style={{ background: '#e9c46a', border: 'none', color: '#000', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>SHIP ITEM</button>}
                      {r.status === 'shipped' && <button onClick={() => updateRedemptionStatus(r._id, 'delivered')} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>MARK DELIVERED</button>}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                  <b>SHIPPING ADDRESS:</b> {r.address}, {r.pin} • <b>PHONE:</b> {r.phone}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {maintenance.length === 0 ? <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No maintenance bookings found.</div> : maintenance.map(m => (
              <div key={m._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>{m.services && m.services.length > 0 ? m.services.map(s => s.serviceName).join(', ').toUpperCase() : 'GENERAL'} SERVICE</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{m.vehicles && m.vehicles.length > 0 ? m.vehicles.map(v => `${v.makeLabel} ${v.model}`).join(', ') : 'Vehicle Info Missing'} <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '1rem' }}>({m.date} - {m.time})</span></div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>Customer: <b>{m.userName}</b> • Amount: <b>₹{m.totalAmount}</b></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: m.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(56,189,248,0.1)', color: m.status === 'completed' ? '#10b981' : '#38bdf8', display: 'inline-block', marginBottom: '1rem' }}>{m.status.toUpperCase()}</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {m.status === 'pending' && <button onClick={() => updateMaintStatus(m._id, 'confirmed')} style={{ background: '#38bdf8', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>CONFIRM SLOT</button>}
                    {m.status === 'confirmed' && <button onClick={() => updateMaintStatus(m._id, 'completed')} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>SERVICE COMPLETE</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'offers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {offers.map(o => (
              <div key={o._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#e9c46a', fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>NEGOTIATION IN PROGRESS</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{o.listingName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>Buyer: <b>{o.buyerName}</b> • Listed: ₹{o.listingPrice.toLocaleString()} • Offer: <b style={{ color: '#fff' }}>₹{o.offerAmount.toLocaleString()}</b></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <div style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: 'rgba(233,196,106,0.1)', color: '#e9c46a' }}>{o.status.toUpperCase()}</div>
                  </div>
                </div>
                {o.message && <div style={{ marginTop: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>"{o.message}"</div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'referrals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {referrals.map(r => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(233,196,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e9c46a' }}><Users size={24} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{r.referralCode}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Owner: {r.referrerEmail}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700 }}>STATUS</div>
                  <div style={{ fontWeight: 800, color: r.usedByEmail ? '#10b981' : 'var(--muted)' }}>{r.usedByEmail ? `Used by ${r.usedByName}` : 'NOT USED'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700 }}>COINS AWARDED</div>
                   <div style={{ fontWeight: 900, color: r.coinsAwarded ? '#10b981' : '#e63946' }}>{r.coinsAwarded ? 'YES' : 'NO'}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && <div style={{ textAlign: 'center', padding: '5rem' }}><Clock className="spin" size={40} color="#e9c46a" /></div>}
      </main>

      <style>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
