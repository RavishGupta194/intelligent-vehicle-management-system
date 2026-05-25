import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, Star, Wrench, Zap, Shield, Phone, Droplet, Battery, Disc, PenTool, ThermometerSnowflake, CarFront, Calendar, MapPin, Plus, Trash2, ChevronDown } from 'lucide-react'

const categories = ['All Services', 'Periodic Service', 'AC & Heating', 'Batteries', 'Tyres & Wheel', 'Denting & Painting']

const services = [
  { id: 1, category: 'Periodic Service', name: 'Comprehensive Service', desc: 'Engine oil, oil filter, air filter, AC filter, brake fluid, coolant, wheel alignment & balancing.', basePrice: 4499, duration: '4-5 hrs', icon: <Droplet size={24}/>, popular: true },
  { id: 2, category: 'Periodic Service', name: 'Standard Service', desc: 'Engine oil replacement, oil filter, air filter, basic wash & vacuum, multi-point check.', basePrice: 2499, duration: '3 hrs', icon: <Wrench size={24}/>, popular: false },
  { id: 3, category: 'Periodic Service', name: 'Engine Diagnostics', desc: 'OBD-II complete scan, sensor health check, fault code reading & reset.', basePrice: 699, duration: '45 min', icon: <Zap size={24}/>, popular: false },
  { id: 4, category: 'AC & Heating', name: 'AC Gas Top-up & Cleaning', desc: 'AC gas check & top-up, condenser cleaning, vent cleaning, cabin filter check.', basePrice: 1299, duration: '1.5 hrs', icon: <ThermometerSnowflake size={24}/>, popular: true },
  { id: 5, category: 'Batteries', name: 'Battery Replacement (OEM)', desc: '100% genuine OEM battery, old battery buyback, terminal cleaning, alternator check.', basePrice: 3499, duration: '45 min', icon: <Battery size={24}/>, popular: false },
  { id: 6, category: 'Tyres & Wheel', name: 'Complete Wheel Care', desc: 'Laser wheel alignment, automated wheel balancing, tyre rotation, tyre polish.', basePrice: 999, duration: '1 hr', icon: <Disc size={24}/>, popular: false },
  { id: 7, category: 'Denting & Painting', name: 'Panel Paint & Dent Repair', desc: 'Grade A primer & clear coat, exact color match guarantee, minor dent removal included.', basePrice: 2199, duration: '24 hrs', icon: <PenTool size={24}/>, popular: false },
]

const steps = [
  { step: '01', title: 'Add Your Cars', desc: 'Add one or more vehicles to your garage.' },
  { step: '02', title: 'Select Services', desc: 'Pick exact services for each vehicle.' },
  { step: '03', title: 'Schedule Slot', desc: 'Choose a time and location for doorstep service.' },
  { step: '04', title: 'Quality Check', desc: 'Multi-point inspection post-service.' },
]

const carDatabase = {
  'Maruti Suzuki': { multiplier: 1, models: ['Swift', 'Baleno', 'WagonR', 'Alto', 'Brezza', 'Dzire', 'Ertiga', 'Fronx', 'Grand Vitara', 'Ignis', 'Celerio', 'XL6', 'Jimny', 'S-Presso', 'Ciaz'] },
  'Hyundai': { multiplier: 1.1, models: ['i20', 'Creta', 'Venue', 'Verna', 'Aura', 'Exeter', 'Tucson', 'Alcazar', 'Grand i10 Nios', 'Ioniq 5', 'Kona Electric'] },
  'Tata': { multiplier: 1.1, models: ['Nexon', 'Punch', 'Harrier', 'Safari', 'Tiago', 'Altroz', 'Tigor', 'Nexon EV', 'Tiago EV', 'Punch EV', 'Hexa', 'Zest'] },
  'Mahindra': { multiplier: 1.2, models: ['XUV700', 'Scorpio-N', 'Scorpio Classic', 'Thar', 'Bolero', 'XUV300', 'XUV 3XO', 'XUV400 EV', 'Marazzo', 'Alturas G4'] },
  'Kia': { multiplier: 1.1, models: ['Seltos', 'Sonet', 'Carens', 'EV6'] },
  'Toyota': { multiplier: 1.2, models: ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Fortuner Legender', 'Glanza', 'Urban Cruiser', 'Hyryder', 'Camry', 'Vellfire', 'Hilux'] },
  'Honda': { multiplier: 1.2, models: ['City', 'Amaze', 'Elevate', 'Jazz', 'WR-V', 'CR-V', 'Civic', 'Brio'] },
  'Volkswagen': { multiplier: 1.3, models: ['Virtus', 'Taigun', 'Tiguan', 'Polo', 'Vento', 'Ameo', 'Jetta', 'Passat'] },
  'Skoda': { multiplier: 1.3, models: ['Slavia', 'Kushaq', 'Kodiaq', 'Superb', 'Octavia', 'Rapid', 'Yeti'] },
  'Renault': { multiplier: 1.1, models: ['Kwid', 'Triber', 'Kiger', 'Duster', 'Captur'] },
  'Nissan': { multiplier: 1.1, models: ['Magnite', 'Kicks', 'Micra', 'Sunny', 'Terrano', 'X-Trail'] },
  'MG': { multiplier: 1.2, models: ['Hector', 'Hector Plus', 'Astor', 'Gloster', 'ZS EV', 'Comet EV'] },
  'Jeep': { multiplier: 1.5, models: ['Compass', 'Meridian', 'Wrangler', 'Grand Cherokee'] },
  'Ford': { multiplier: 1.2, models: ['EcoSport', 'Endeavour', 'Figo', 'Freestyle', 'Aspire', 'Mustang'] },
  'Volvo': { multiplier: 2.2, models: ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'C40 Recharge'] },
  'Jaguar': { multiplier: 2.5, models: ['F-Pace', 'XE', 'XF', 'F-Type', 'I-Pace'] },
  'Land Rover': { multiplier: 2.5, models: ['Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Discovery', 'Discovery Sport', 'Defender'] },
  'BMW': { multiplier: 2.2, models: ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4', 'i4', 'i7', 'iX'] },
  'Mercedes-Benz': { multiplier: 2.2, models: ['C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQC', 'EQS'] },
  'Audi': { multiplier: 2.2, models: ['A4', 'A6', 'A8 L', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'RS5', 'RS e-tron GT'] },
  'Porsche': { multiplier: 3.5, models: ['Macan', 'Cayenne', 'Panamera', '911', 'Taycan', '718'] },
  'Lexus': { multiplier: 2.5, models: ['ES', 'NX', 'RX', 'LX', 'LS', 'LC'] },
  'Mini': { multiplier: 1.8, models: ['Cooper', 'Countryman', 'Clubman'] }
};

export default function Maintenance({ user }) {
  const [activeCategory, setActiveCategory] = useState('All Services')
  
  // Garage State (Multiple Vehicles)
  const [vehicles, setVehicles] = useState([]) // { id, make, model, multiplier }
  const [activeVehicleId, setActiveVehicleId] = useState(null)
  
  // New Vehicle Input State
  const [newMake, setNewMake] = useState('Maruti Suzuki')
  const [newModel, setNewModel] = useState(carDatabase['Maruti Suzuki'].models[0])

  const handleMakeChange = (e) => {
    const make = e.target.value;
    setNewMake(make);
    setNewModel(carDatabase[make].models[0]);
  }

  // Cart State: array of { serviceId, vehicleId }
  const [cartItems, setCartItems] = useState([])
  
  // Booking Details
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [booked, setBooked] = useState(false)
  
  // Addons & Promos
  const [pickupDrop, setPickupDrop] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    if (booked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [booked]);

  // Handlers
  const addVehicle = () => {
    const newId = Date.now().toString();
    const v = { 
      id: newId, 
      makeLabel: newMake, 
      model: newModel, 
      multiplier: carDatabase[newMake].multiplier 
    };
    
    setVehicles([...vehicles, v]);
    // do not reset model, keep it as default for easy adding
    if (!activeVehicleId) setActiveVehicleId(newId);
  }

  const removeVehicle = (vId) => {
    setVehicles(vehicles.filter(v => v.id !== vId));
    setCartItems(cartItems.filter(c => c.vehicleId !== vId));
    if (activeVehicleId === vId) {
      const remaining = vehicles.filter(v => v.id !== vId);
      setActiveVehicleId(remaining.length > 0 ? remaining[0].id : null);
    }
  }

  const toggleService = (sId) => {
    if (!activeVehicleId) {
      alert("Please add and select a vehicle first.");
      return;
    }
    const exists = cartItems.some(c => c.serviceId === sId && c.vehicleId === activeVehicleId);
    if (exists) {
      setCartItems(cartItems.filter(c => !(c.serviceId === sId && c.vehicleId === activeVehicleId)));
    } else {
      setCartItems([...cartItems, { serviceId: sId, vehicleId: activeVehicleId }]);
    }
  }

  // Calculations
  const activeVehicle = vehicles.find(v => v.id === activeVehicleId);
  const currentMultiplier = activeVehicle ? activeVehicle.multiplier : 1;
  
  const calculateSubtotal = () => {
    let sum = 0;
    cartItems.forEach(item => {
      const s = services.find(srv => srv.id === item.serviceId);
      const v = vehicles.find(veh => veh.id === item.vehicleId);
      if (s && v) {
        sum += Math.floor(s.basePrice * v.multiplier);
      }
    });
    return sum;
  }

  const subtotal = calculateSubtotal();
  const pickupFee = pickupDrop && cartItems.length > 0 ? 299 : 0;
  const discount = promoApplied ? Math.floor(subtotal * 0.1) : 0;
  const gst = Math.floor((subtotal - discount) * 0.18);
  const total = subtotal + pickupFee + gst - discount;
  
  const filteredServices = services.filter(s => activeCategory === 'All Services' || s.category === activeCategory)

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: 'var(--black)', overflowX: 'hidden' }}>
      {/* Hero */}
      <div style={{
        background: 'var(--dark)', borderBottom: '1px solid var(--border)',
        padding: '5rem 2rem 4rem', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(244,162,97,0.08) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#f4a261', fontSize: '0.85rem', letterSpacing: 4, fontWeight: 700, marginBottom: 16 }}>CARVIA CERTIFIED MAINTENANCE</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: 2, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            EXPERT CAR CARE,<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px #f4a261' }}>TAILORED FOR YOUR VEHICLE</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Add your vehicles to see exact pricing. 100% genuine parts and certified mechanics ensuring peak performance.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gap: '3rem', boxSizing: 'border-box' }} className="maintenance-grid">

        {/* Left Side: Services & Info */}
        <div style={{ minWidth: 0 }}>
          
          {/* VEHICLE GARAGE SECTION */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: 1, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <CarFront size={24} color="#f4a261" /> 1. ADD YOUR CARS
            </h2>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div className="input-wrap" style={{ flex: '1 1 200px' }}>
                <select value={newMake} onChange={handleMakeChange} className="panel-input" style={{ appearance: 'none', paddingLeft: '14px', paddingRight: '40px' }}>
                  {Object.keys(carDatabase).map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
              </div>
              <div className="input-wrap" style={{ flex: '1 1 200px' }}>
                <select value={newModel} onChange={e => setNewModel(e.target.value)} className="panel-input" style={{ appearance: 'none', paddingLeft: '14px', paddingRight: '40px' }}>
                  {carDatabase[newMake].models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
              </div>
              <button onClick={addVehicle} style={{ background: '#f4a261', color: '#111', border: 'none', borderRadius: 10, padding: '0 24px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, height: '48px' }}>
                <Plus size={18} /> ADD CAR
              </button>
            </div>

            {vehicles.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>MY GARAGE (Select a car to view/add services)</div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {vehicles.map(v => (
                    <div 
                      key={v.id} 
                      onClick={() => setActiveVehicleId(v.id)}
                      style={{ 
                        background: activeVehicleId === v.id ? 'rgba(244,162,97,0.1)' : 'rgba(0,0,0,0.3)', 
                        border: `1px solid ${activeVehicleId === v.id ? '#f4a261' : 'rgba(255,255,255,0.1)'}`, 
                        padding: '12px 16px', borderRadius: 12, cursor: 'pointer', 
                        display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: activeVehicleId === v.id ? '#fff' : 'var(--text)', fontSize: '1rem' }}>{v.model}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{v.makeLabel}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeVehicle(v.id); }} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', padding: 4 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: 1, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Wrench size={24} color="#f4a261" /> 2. SELECT SERVICES {activeVehicle ? `FOR ${activeVehicle.model.toUpperCase()}` : ''}
          </h2>

          {!activeVehicle && (
            <div style={{ background: 'rgba(244,162,97,0.05)', border: '1px dashed rgba(244,162,97,0.4)', borderRadius: 16, padding: '3rem 2rem', textAlign: 'center', color: 'var(--muted)', marginBottom: '4rem' }}>
              Please add and select a vehicle in your garage above to view exact pricing and select services.
            </div>
          )}

          {/* Categories */}
          {activeVehicle && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} style={{
                  padding: '10px 20px', borderRadius: 100, border: 'none', whiteSpace: 'nowrap',
                  background: activeCategory === c ? '#f4a261' : 'var(--card)',
                  color: activeCategory === c ? '#111' : 'var(--muted)',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: activeCategory === c ? '0 4px 15px rgba(244,162,97,0.3)' : 'none'
                }}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Service List */}
          {activeVehicle && (
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '4rem' }}>
              <AnimatePresence mode="popLayout">
                {filteredServices.map((s, i) => {
                  const inCart = cartItems.some(c => c.serviceId === s.id && c.vehicleId === activeVehicleId)
                  const calculatedPrice = Math.floor(s.basePrice * currentMultiplier);
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      key={s.id} onClick={() => toggleService(s.id)} 
                      style={{
                        background: 'var(--card)',
                        border: `1px solid ${inCart ? '#f4a261' : 'var(--border)'}`,
                        borderRadius: 16, padding: '1.5rem',
                        cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex', gap: '1.5rem', alignItems: 'center',
                        position: 'relative', overflow: 'hidden'
                      }}
                      onMouseEnter={e => !inCart && (e.currentTarget.style.borderColor = 'rgba(244,162,97,0.4)')}
                      onMouseLeave={e => !inCart && (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      {inCart && <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: '#f4a261' }} />}
                      
                      <div style={{ width: 50, height: 50, borderRadius: 12, background: inCart ? '#f4a261' : 'rgba(255,255,255,0.03)', color: inCart ? '#111' : '#f4a261', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                        {s.icon}
                      </div>
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: inCart ? '#fff' : 'var(--text)' }}>{s.name}</h3>
                          {s.popular && <span style={{ background: 'rgba(244,162,97,0.1)', color: '#f4a261', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: 100, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>POPULAR</span>}
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 12, maxWidth: '90%' }}>{s.desc}</p>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} color="#f4a261"/> {s.duration}</span>
                          <span style={{ color: '#f4a261' }}>₹{calculatedPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${inCart ? '#f4a261' : 'var(--border)'}`,
                        background: inCart ? '#f4a261' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s'
                      }}>
                        {inCart && <CheckCircle size={16} color="#111" strokeWidth={3} />}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

        </div>

        {/* Right Side: Booking Panel */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '2rem', position: 'sticky', top: 90,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)', boxSizing: 'border-box'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: 1, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Shield size={24} color="#f4a261" /> 3. CHECKOUT
            </h3>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Wrench size={24} color="var(--muted)" />
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', fontWeight: 500 }}>Select services from the list<br/>to begin booking.</p>
              </div>
            ) : (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1rem' }}>
                  {vehicles.map(v => {
                    const vehicleServices = cartItems.filter(c => c.vehicleId === v.id);
                    if (vehicleServices.length === 0) return null;
                    return (
                      <div key={v.id} style={{ marginBottom: '1.2rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#f4a261', fontWeight: 700, marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                          {v.model.toUpperCase()}
                        </div>
                        {vehicleServices.map(c => {
                          const s = services.find(srv => srv.id === c.serviceId);
                          const price = Math.floor(s.basePrice * v.multiplier);
                          return (
                            <div key={c.serviceId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                              <div style={{ display: 'flex', gap: 8, flex: 1, paddingRight: '10px' }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)', marginTop: 8, flexShrink: 0 }}></div>
                                <span style={{ color: 'var(--text)', fontWeight: 500, lineHeight: 1.4 }}>{s.name}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ color: 'var(--white)', fontWeight: 600 }}>₹{price.toLocaleString()}</span>
                                <div 
                                  onClick={() => setCartItems(cartItems.filter(item => !(item.serviceId === c.serviceId && item.vehicleId === c.vehicleId)))}
                                  style={{ color: 'rgba(239,68,68,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                  title="Remove Service"
                                >
                                  <Trash2 size={14} />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
                
                {/* Addons & Breakdown */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={pickupDrop} onChange={e => setPickupDrop(e.target.checked)} style={{ accentColor: '#f4a261', width: 16, height: 16 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>Pick-up & Drop</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#f4a261', fontWeight: 600 }}>₹299</span>
                  </label>
                  
                  {/* Promo Code */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '4px' }}>
                    <input 
                      placeholder="Promo Code" 
                      value={promoCode} 
                      onChange={e => setPromoCode(e.target.value)} 
                      disabled={promoApplied}
                      style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: '0.85rem', outline: 'none', minWidth: 0 }}
                    />
                    <button 
                      onClick={() => { 
                        if(promoApplied) {
                          setPromoApplied(false);
                          setPromoCode('');
                        } else {
                          if(promoCode.toUpperCase() === 'CARVIA10') setPromoApplied(true); else alert('Invalid Promo Code'); 
                        }
                      }}
                      disabled={!promoCode && !promoApplied}
                      style={{ background: promoApplied ? 'rgba(239,68,68,0.2)' : '#f4a261', color: promoApplied ? '#ef4444' : '#111', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      {promoApplied ? 'REMOVE' : 'APPLY'}
                    </button>
                  </div>
                  {!promoApplied && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '1rem' }}>🔥 Try <b style={{color:'#f4a261', cursor:'pointer'}} onClick={()=>setPromoCode('CARVIA10')}>CARVIA10</b> for 10% off</div>}
                  {promoApplied && <div style={{ marginBottom: '1rem' }}></div>}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    <span>Service Cost</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#4ade80' }}>
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    <span>Taxes & GST (18%)</span>
                    <span>₹{gst.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, color: 'var(--muted)', fontSize: '0.9rem' }}>TOTAL</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="input-wrap">
                <MapPin size={16} className="input-icon" />
                <input placeholder="Service Location / Address" value={address} onChange={e => setAddress(e.target.value)} className="panel-input" style={{ paddingLeft: '40px' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="input-wrap" style={{ flex: 1, minWidth: 0 }}>
                  <Calendar size={16} className="input-icon" color={date ? "#f4a261" : "var(--muted)"} />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="panel-input date-time-input" style={{ paddingLeft: '40px', color: date ? '#fff' : 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }} />
                </div>
                <div className="input-wrap" style={{ flex: 1, minWidth: 0 }}>
                  <Clock size={16} className="input-icon" color={time ? "#f4a261" : "var(--muted)"} />
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="panel-input date-time-input" style={{ paddingLeft: '40px', color: time ? '#fff' : 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }} />
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(244,162,97,0.05)', borderLeft: '3px solid #f4a261', padding: '12px 14px', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem' }}>
              <div style={{ color: '#f4a261', fontSize: '0.75rem', fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>⚠️ IMPORTANT NOTICE</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                Prices shown are estimated and may vary upon physical inspection. If you cancel after our technician arrives, a nominal visiting fee of ₹299 will be applicable.
              </div>
            </div>

            <button onClick={async () => {
              if (!user) {
                alert("Please sign in to book a service.");
                return;
              }
              if (cartItems.length && address && date && time) {
                const bookingData = {
                  userName: user.name,
                  userEmail: user.email,
                  vehicles: vehicles.map(v => ({ makeLabel: v.makeLabel, model: v.model })),
                  services: cartItems.map(c => {
                    const s = services.find(srv => srv.id === c.serviceId);
                    const v = vehicles.find(veh => veh.id === c.vehicleId);
                    return { serviceName: s.name, vehicleModel: v.model, price: Math.floor(s.basePrice * v.multiplier) };
                  }),
                  address,
                  date,
                  time,
                  totalAmount: total
                };

                try {
                  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/maintenance`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                  });
                  if (res.ok) {
                    setBooked(true);
                  } else {
                    const errorData = await res.json();
                    alert(`Booking failed: ${errorData.message || 'Please try again.'}`);
                  }
                } catch (err) {
                  alert("Connection error.");
                }
              }
            }} 
              disabled={!(cartItems.length && address && date && time)}
              style={{
              width: '100%', background: booked ? '#2a9d8f' : '#f4a261',
              color: booked ? '#fff' : '#111', border: 'none',
              borderRadius: 12, padding: '16px', fontFamily: 'var(--font-body)',
              fontWeight: 800, fontSize: '1rem', letterSpacing: '1px',
              cursor: (cartItems.length && address && date && time) ? 'pointer' : 'not-allowed', 
              transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: (cartItems.length && address && date && time) || booked ? 1 : 0.5
            }}>
              {booked ? <><CheckCircle size={20}/> BOOKING CONFIRMED</> : 'CONFIRM APPOINTMENT'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                <Shield size={14} color="#f4a261" /> Secure Booking
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                <Star size={14} color="#f4a261" /> 100% Satisfaction
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(244,162,97,0.1)', color: '#f4a261', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: 0.5, marginBottom: 2 }}>24/7 ROADSIDE ASSISTANCE</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>1800-CARVIA-99</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 4rem', boxSizing: 'border-box' }}>
        {/* Our USPs */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 1, marginBottom: '2rem' }}>THE CARVIA PROMISE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Star color="#f4a261" size={28} />, title: 'Unbeatable Pricing', desc: 'Up to 40% savings compared to authorized service centers without compromising on quality.' },
              { icon: <Shield color="#f4a261" size={28} />, title: '100% Genuine Parts', desc: 'We strictly use OES/OEM spare parts specifically engineered for your vehicle.' },
              { icon: <CheckCircle color="#f4a261" size={28} />, title: 'Certified Experts', desc: 'Highly qualified and trained mechanics with years of brand-specific experience.' },
              { icon: <Zap color="#f4a261" size={28} />, title: 'Absolute Satisfaction', desc: 'Guaranteed satisfaction with a comprehensive 1-month or 1000km service warranty.' },
            ].map((usp) => (
              <div key={usp.title} style={{ background: 'var(--card)', border: '1px solid rgba(244,162,97,0.2)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'all 0.3s' }}>
                <div style={{ background: 'rgba(244,162,97,0.1)', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>{usp.icon}</div>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', marginBottom: 6 }}>{usp.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 1, marginBottom: '2rem' }}>HOW IT WORKS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', position: 'relative' }}>
            {steps.map((s, index) => (
              <div key={s.step} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -10, fontFamily: 'var(--font-display)', fontSize: '6rem', color: 'rgba(255,255,255,0.02)', fontWeight: 800, lineHeight: 1 }}>{s.step}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(244,162,97,0.1)', color: '#f4a261', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>{index + 1}</div>
                <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, color: '#fff' }}>{s.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 1, marginBottom: '2rem', textAlign: 'center' }}>WHAT OUR CUSTOMERS SAY</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Rajesh K.', car: 'BMW 5 Series', text: 'Saved ₹12,000 on my major service! The mechanic was highly professional and strictly used OEM parts. Will never go back to the dealer.', rating: 5 },
              { name: 'Sneha P.', car: 'Tata Nexon EV', text: 'Incredible doorstep service. Zero hassle, total transparency, and the mechanic explained everything perfectly. Highly recommend!', rating: 5 },
              { name: 'Amit S.', car: 'Hyundai Creta', text: 'The AC gas top-up and cleaning was done perfectly right in my parking lot. Very convenient and amazing pricing.', rating: 4 }
            ].map((review, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', position: 'relative' }}>
                <div style={{ display: 'flex', gap: 4, color: '#f4a261', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={j < review.rating ? '#f4a261' : 'transparent'} />)}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{review.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(244,162,97,0.2)', color: '#f4a261', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{review.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{review.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {booked && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '3rem 2rem', maxWidth: 450, width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', maxHeight: '90vh', overflowY: 'auto' }}
              >
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem', color: '#fff' }}>Booking Confirmed!</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Your service appointment has been successfully scheduled. Our mechanic will arrive at your location on time.
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Booking ID</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>#CRV-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Date & Time</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{date} at {time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Total Amount</span>
                  <span style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.85rem' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <button onClick={() => { setBooked(false); setCartItems([]); setVehicles([]); setActiveVehicleId(null); setAddress(''); setDate(''); setTime(''); }} style={{ width: '100%', background: '#f4a261', color: '#111', border: 'none', borderRadius: 12, padding: '16px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
                BACK TO GARAGE
              </button>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .input-wrap {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }
        .panel-input {
          width: 100%;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 14px 14px 14px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          color-scheme: dark;
        }
        .panel-input option {
          background-color: #111;
          color: #fff;
          font-family: var(--font-body);
        }
        .date-time-input {
          position: relative;
        }
        .date-time-input::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .panel-input:focus {
          border-color: #f4a261;
          background: rgba(0,0,0,0.6);
        }
        .panel-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .maintenance-grid {
          grid-template-columns: 1fr 360px;
        }
        @media (max-width: 992px) {
          .maintenance-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
