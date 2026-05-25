import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Compass, ArrowRight, Sun, Snowflake, Mountain, X, Calendar, Car, Info, Map as MapIcon, Route, Camera, BookOpen, Lightbulb, Palmtree, Search, Clock, Wallet, Thermometer, CheckCircle2, Phone, Utensils } from 'lucide-react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { destinationsData } from '../data/destinationsData'

function MapSpotSelector({ dest }) {
  const [activeSpot, setActiveSpot] = useState(null)
  const [driveStatus, setDriveStatus] = useState('idle') // idle | locating | done | error

  const current = activeSpot || dest.coords
  const zoom = activeSpot ? 14 : dest.coords.zoom

  // OpenStreetMap embed URL — free, no API key
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${current.lon - 0.15}%2C${current.lat - 0.10}%2C${current.lon + 0.15}%2C${current.lat + 0.10}&layer=mapnik&marker=${current.lat}%2C${current.lon}`

  const handleDriveNow = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    setDriveStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const destLat = current.lat
        const destLon = current.lon
        // Open Google Maps with turn-by-turn directions
        const gmUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destLat},${destLon}&travelmode=driving`
        setDriveStatus('done')
        window.open(gmUrl, '_blank')
        setTimeout(() => setDriveStatus('idle'), 3000)
      },
      (err) => {
        setDriveStatus('error')
        setTimeout(() => setDriveStatus('idle'), 3000)
      },
      { timeout: 10000, maximumAge: 0 }
    )
  }

  const driveLabel = {
    idle:     { text: '🚗 DRIVE NOW', bg: 'linear-gradient(135deg, #e63946, #c1121f)' },
    locating: { text: '📡 LOCATING YOU...', bg: 'linear-gradient(135deg, #e9c46a, #f4a261)' },
    done:     { text: '✅ OPENING MAPS!', bg: 'linear-gradient(135deg, #2a9d8f, #1a7a70)' },
    error:    { text: '❌ LOCATION DENIED', bg: 'linear-gradient(135deg, #555, #333)' },
  }[driveStatus]

  return (
    <div>
      {/* Spot pills */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveSpot(null)}
          style={{ padding: '8px 18px', borderRadius: '100px', border: '1px solid', borderColor: !activeSpot ? 'var(--red)' : 'rgba(255,255,255,0.15)', background: !activeSpot ? 'rgba(230,57,70,0.1)' : 'transparent', color: !activeSpot ? 'var(--red)' : 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          📍 Overview
        </button>
        {dest.mapSpots.map((spot, i) => (
          <button
            key={i}
            onClick={() => setActiveSpot(spot)}
            style={{ padding: '8px 18px', borderRadius: '100px', border: '1px solid', borderColor: activeSpot?.name === spot.name ? 'var(--red)' : 'rgba(255,255,255,0.15)', background: activeSpot?.name === spot.name ? 'rgba(230,57,70,0.1)' : 'transparent', color: activeSpot?.name === spot.name ? 'var(--red)' : 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            🗺 {spot.name}
          </button>
        ))}
      </div>

      {/* Map iframe */}
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', height: 340 }}>
        <iframe
          key={mapUrl}
          src={mapUrl}
          width="100%"
          height="340"
          style={{ border: 'none', display: 'block', filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
          title={`Map of ${dest.name}`}
          loading="lazy"
        />
        {/* Overlay label */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', animation: 'blink 1.5s infinite' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
            {activeSpot ? activeSpot.name.toUpperCase() : dest.name.toUpperCase()} • LIVE MAP
          </span>
        </div>
        {/* "Open Full Map" link */}
        <a
          href={`https://www.openstreetmap.org/?mlat=${current.lat}&mlon=${current.lon}#map=${zoom}/${current.lat}/${current.lon}`}
          target="_blank" rel="noopener noreferrer"
          style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(230,57,70,0.85)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, color: '#fff', textDecoration: 'none', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <MapPin size={12} /> OPEN FULL MAP
        </a>
      </div>

      {/* DRIVE NOW Button */}
      <button
        onClick={handleDriveNow}
        disabled={driveStatus === 'locating'}
        style={{
          marginTop: '1.25rem',
          width: '100%',
          padding: '18px',
          borderRadius: 14,
          border: 'none',
          background: driveLabel.bg,
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.1rem',
          letterSpacing: 2,
          cursor: driveStatus === 'locating' ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          boxShadow: driveStatus === 'idle' ? '0 8px 30px rgba(230,57,70,0.4)' : 'none',
          transition: 'all 0.4s ease',
          transform: driveStatus === 'locating' ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {driveStatus === 'locating' && (
          <span style={{ width: 18, height: 18, border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
        )}
        {driveLabel.text}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.6rem', fontWeight: 600 }}>
        Detects your current location &amp; opens Google Maps turn-by-turn directions
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function WeatherWidget({ cityName }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Using Open-Meteo API — completely free, no API key
    const cityCoords = {
      'Goa': { lat: 15.2993, lon: 74.1240 },
      'Ladakh': { lat: 34.1526, lon: 77.5770 },
      'Jaipur': { lat: 26.9124, lon: 75.7873 },
      'Manali': { lat: 32.2432, lon: 77.1892 },
      'Kerala': { lat: 10.1632, lon: 76.6413 },
      'Udaipur': { lat: 24.5854, lon: 73.7125 },
      'Agra': { lat: 27.1767, lon: 78.0081 },
      'Varanasi': { lat: 25.3176, lon: 82.9739 },
      'Darjeeling': { lat: 27.0410, lon: 88.2663 },
      'Coorg': { lat: 12.4244, lon: 75.7382 }
    }
    const coords = cityCoords[cityName] || { lat: 20.5937, lon: 78.9629 }
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`)
      .then(r => r.json())
      .then(data => {
        const code = data.current_weather?.weathercode
        const getCondition = (c) => {
          if (c === 0) return { label: 'Clear Sky ☀️', icon: '☀️' }
          if (c <= 3) return { label: 'Partly Cloudy ⛅', icon: '⛅' }
          if (c <= 48) return { label: 'Foggy 🌫️', icon: '🌫️' }
          if (c <= 67) return { label: 'Rainy 🌧️', icon: '🌧️' }
          if (c <= 77) return { label: 'Snowy ❄️', icon: '❄️' }
          if (c <= 82) return { label: 'Showers 🌦️', icon: '🌦️' }
          return { label: 'Thunderstorm ⛈️', icon: '⛈️' }
        }
        const humid = data.hourly?.relativehumidity_2m?.[new Date().getHours()] || '--'
        const condition = getCondition(code)
        setWeather({
          temp: Math.round(data.current_weather?.temperature),
          wind: Math.round(data.current_weather?.windspeed),
          humidity: humid,
          condition
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [cityName])

  if (loading) return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', animation: 'blink 1s infinite' }} />
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Fetching live weather...</span>
    </div>
  )

  if (!weather) return null

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(30,30,60,0.9), rgba(20,20,40,0.9))', border: '1px solid rgba(100,100,255,0.2)', borderRadius: 16, padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ fontSize: '3rem', lineHeight: 1 }}>{weather.condition.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.7rem', color: 'rgba(150,150,255,0.8)', fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>LIVE WEATHER IN {cityName.toUpperCase()}</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{weather.temp}°C</div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{weather.condition.label}</div>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{weather.wind} km/h</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>WIND</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{weather.humidity}%</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>HUMIDITY</div>
        </div>
      </div>
    </div>
  )
}

function GuideModal({ dest, onClose }) {
  useEffect(() => {
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [])

  const parseItinerary = (desc) => {
    if (desc.includes('->')) return desc.split('->').map(s => s.trim())
    if (desc.includes('Day')) {
      return desc.split(/Day \d+:/).filter(Boolean).map(s => s.trim().replace(/,\s*$/, '').replace(/\.\s*$/, ''))
    }
    return desc.split(/(?:\. |, | and )/).filter(s => s.trim().length > 5).map(s => s.trim())
  }

  const durationMatch = dest.itinerary.title.match(/\d+-Day/)
  const duration = durationMatch ? durationMatch[0] : 'Flexible'
  const budget = `₹${(dest.id * 4 + 15)},000`
  const weather = dest.type.includes('Snow') || dest.type.includes('Mountain') || dest.type.includes('Hill') ? '10°C - 20°C' : '25°C - 35°C'

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 900, height: '90vh',
          background: '#161616',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.9)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header Image */}
        <div style={{ height: 260, position: 'relative', flexShrink: 0 }}>
          <img
            src={dest.image} alt={dest.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #161616 0%, transparent 60%)' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff',
              width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(4px)',
            }}
          >
            <X size={20} />
          </button>
          <div style={{ position: 'absolute', bottom: 16, left: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', margin: 0 }}>{dest.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '6px 0 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={14} color="var(--red)" /> The Ultimate Travel & Culture Guide
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>

          {/* Quick Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 8, background: 'rgba(230,57,70,0.1)', borderRadius: 8, color: 'var(--red)' }}><Clock size={20} /></div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>DURATION</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{duration}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 8, background: 'rgba(230,57,70,0.1)', borderRadius: 8, color: 'var(--red)' }}><Wallet size={20} /></div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>EST. BUDGET</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{budget}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 8, background: 'rgba(230,57,70,0.1)', borderRadius: 8, color: 'var(--red)' }}><Thermometer size={20} /></div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>AVG. WEATHER</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{weather}</div>
              </div>
            </div>
          </div>

          {/* Live Weather Widget */}
          <div style={{ marginBottom: '2rem' }}>
            <WeatherWidget cityName={dest.name} />
          </div>

          {/* Info Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: <Calendar size={20} />, label: 'BEST TIME', value: dest.bestTime },
              { icon: <Route size={20} />, label: 'TERRAIN', value: dest.terrain },
              { icon: <Car size={20} />, label: 'IDEAL CAR', value: dest.idealCar },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ padding: 8, background: 'rgba(230,57,70,0.1)', borderRadius: 8, color: 'var(--red)', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Culture */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Palmtree color="var(--red)" size={22} /> Culture & Vibe
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', alignItems: 'center' }}>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0, flex: '1 1 260px' }}>{dest.culture.desc}</p>
              <div style={{ flex: '1 1 180px', height: 160, borderRadius: 10, overflow: 'hidden' }}>
                <img src={dest.culture.image} alt="culture" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Full Itinerary Timeline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapIcon color="var(--red)" size={22} /> Detailed Day-by-Day Itinerary
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{dest.itinerary.title}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', marginLeft: '10px' }}>
              <div style={{ position: 'absolute', left: 24, top: 20, bottom: 20, width: 2, background: 'rgba(230,57,70,0.2)' }} />
              {parseItinerary(dest.itinerary.desc).map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', paddingBottom: i === arr.length - 1 ? 0 : '2rem' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#161616', border: '2px solid var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)', fontWeight: 800, zIndex: 1, flexShrink: 0 }}>
                    D{i+1}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', flex: 1 }}>
                    <h4 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.1rem' }}>Day {i + 1}</h4>
                    <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scenic Route Preview Image */}
            <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', height: 220, marginTop: '2rem' }}>
              <img src={dest.itinerary.image} alt="itinerary preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--red)', fontSize: '0.95rem', fontWeight: 800, letterSpacing: 1, margin: '0 0 6px' }}>SCENIC ROUTE HIGHLIGHT</h4>
                <p style={{ color: '#fff', margin: 0, lineHeight: 1.6 }}>Enjoy the most beautiful sceneries along the drive.</p>
              </div>
            </div>
          </div>

          {/* Spots */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Camera color="var(--red)" size={22} /> Must Visit Places
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {dest.spots.map((spot, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ height: 140 }}>
                    <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: '1rem' }}>{spot.name}</h4>
                    <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>{spot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packing Checklist */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 color="var(--red)" size={22} /> Essential Packing List
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {(dest.type.includes('Snow') || dest.type.includes('Mountain') || dest.type.includes('Hill') ? 
                ['Heavy Jackets', 'Snow Boots', 'Thermals', 'Polarized Sunglasses', 'First Aid Kit', 'Flashlight'] : 
                ['Sunscreen SPF 50+', 'Comfortable Sneakers', 'Light Cotton Clothes', 'Power Bank', 'Mosquito Repellent', 'Reusable Water Bottle']
              ).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={14} color="var(--red)" />
                  </div>
                  <span style={{ color: '#fff', fontSize: '0.9rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency & Local Info */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', background: 'rgba(230,57,70,0.05)', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(230,57,70,0.1)' }}>
              <h4 style={{ color: 'var(--red)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem' }}>
                <Phone size={18} /> Emergency Contacts
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem' }}><span>Police:</span> <span style={{ fontWeight: 600 }}>100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem' }}><span>Ambulance:</span> <span style={{ fontWeight: 600 }}>108</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem' }}><span>CARVIA Roadside:</span> <span style={{ fontWeight: 600 }}>1800-200-8888</span></div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '250px', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ color: '#fff', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem' }}>
                <Utensils size={18} color="var(--red)" /> Must Try Cuisine
              </h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                When in {dest.name}, do not leave without trying the local street food and authentic regional delicacies. Ask the locals for the best hidden gems!
              </p>
            </div>
          </div>

          {/* ── INTERACTIVE MAP EXPERIENCE ── */}
          {dest.coords && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin color="var(--red)" size={22} /> Live Destination Map
              </h3>

              {/* Spot selector pills */}
              {dest.mapSpots && (
                <MapSpotSelector dest={dest} />
              )}
            </div>
          )}

          {/* Tips */}
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lightbulb color="var(--red)" size={22} /> Expert Tips
            </h3>
            <div style={{ background: 'rgba(230,57,70,0.06)', borderLeft: '4px solid var(--red)', padding: '1rem 1.25rem', borderRadius: '0 12px 12px 0', marginBottom: '1rem' }}>
              <div style={{ color: 'var(--red)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Info size={16} /> DRIVING ADVICE
              </div>
              <p style={{ color: '#fff', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>{dest.drivingTip}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, marginBottom: '0.75rem' }}>PRO TIPS</div>
              <ul style={{ color: 'var(--muted)', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8, fontSize: '0.9rem' }}>
                {dest.proTips.map((tip, i) => <li key={i} style={{ marginBottom: 4 }}>{tip}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexShrink: 0, background: 'rgba(0,0,0,0.3)' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 22px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            Close
          </button>
          <Link to="/rental" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 28px', background: 'var(--red)', color: '#fff', border: 'none',
              borderRadius: 8, fontWeight: 700, letterSpacing: 1, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(230,57,70,0.4)'
            }}>
              RENT NOW <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Destinations() {
  const [selectedDest, setSelectedDest] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDestinations = destinationsData.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--black)', paddingTop: '80px', paddingBottom: '4rem' }}>

      {/* HEADER SECTION */}
      <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '100%', background: 'radial-gradient(ellipse at top, rgba(230,57,70,0.15) 0%, transparent 70%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,57,70,0.1)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, marginBottom: '1.5rem', border: '1px solid rgba(230,57,70,0.2)' }}>
              <Compass size={16} /> EXPLORE THE UNSEEN
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--white)', letterSpacing: 2, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              TOP CURATED <br /><span style={{ color: 'var(--red)' }}>DESTINATIONS</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Discover breathtaking locations across India. Rent the perfect vehicle, check out our customized travel guides, and make unforgettable memories with CARVIA.
            </p>

            {/* SEARCH BAR */}
            <div style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
              <Search size={20} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'var(--white)' }} />
              <input
                placeholder="Search for a city or experience (e.g. Goa, Snow, Desert)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '16px 20px 16px 56px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--white)', fontSize: '1.05rem', outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--red)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section style={{ padding: '2rem', maxWidth: 1250, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {filteredDestinations.map((dest, idx) => {
            const Icon = dest.icon || MapPin
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.1 }}
                style={{
                  background: 'var(--dark)', borderRadius: 24, overflow: 'hidden',
                  border: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.borderColor = 'rgba(230,57,70,0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ height: 240, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={dest.image} alt={dest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--dark) 0%, transparent 70%)' }} />
                  {dest.popular && (
                    <div style={{ position: 'absolute', top: 20, right: 20, background: 'var(--red)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '6px 12px', borderRadius: 100, letterSpacing: 1 }}>
                      TRENDING
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '6px 14px', borderRadius: 100, color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                    <MapPin size={16} color="var(--red)" /> {dest.name}
                  </div>
                </div>

                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.75rem' }}>
                    <Icon size={16} /> {dest.type.toUpperCase()}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1rem', letterSpacing: 1 }}>{dest.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{dest.desc}</p>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => setSelectedDest(dest)}
                      style={{
                        flex: 1, padding: '12px 0', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)',
                        borderRadius: 12, fontSize: '0.9rem', fontWeight: 600, letterSpacing: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer'
                      }}
                    >
                      <MapIcon size={16} /> GUIDE
                    </button>
                    <Link to="/rental" style={{ textDecoration: 'none', flex: 1 }}>
                      <button style={{
                        width: '100%', height: '100%', padding: '12px 0', background: 'var(--red)',
                        border: 'none', color: '#fff', borderRadius: 12, fontSize: '0.9rem',
                        fontWeight: 600, letterSpacing: 1, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8, cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(230,57,70,0.3)'
                      }}>
                        <Car size={16} /> RENT
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {filteredDestinations.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <h3>No destinations found. Try another search.</h3>
            </div>
          )}
        </div>
      </section>

      {/* MODAL — rendered via portal directly into document.body */}
      {selectedDest && <GuideModal dest={selectedDest} onClose={() => setSelectedDest(null)} />}

    </div>
  )
}
