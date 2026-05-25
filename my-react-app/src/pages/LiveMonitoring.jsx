import React, { useState, useEffect } from 'react'
import { Activity, AlertTriangle, CheckCircle, Eye, Shield, Camera, Info, Radio, Play, Square, Settings, Cpu, Zap, Target, BarChart3, LineChart, ChevronRight, LayoutGrid, Clock, Terminal, Activity as Heart, Layers, Globe, ChevronDown, FileText } from 'lucide-react'

export default function LiveMonitoring() {
  const [isPythonRunning, setIsPythonRunning] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'SYSTEM STANDBY: READY FOR NEURAL UPLINK', type: 'info' }
  ])
  const [thinkData, setThinkData] = useState({
    ear: '--', mar: '--', tilt: '--', blinks: '--', status: '--', score: '--', yawns: '--', alerts: '--', time: '--'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.thingspeak.com/channels/3100233/feeds.json?results=1');
        const data = await res.json();
        if (data.feeds && data.feeds[0]) {
          const f = data.feeds[0];
          setThinkData({
            ear: f.field1 || '--',
            mar: f.field2 || '--',
            tilt: f.field3 || '--',
            blinks: f.field4 || '--',
            status: f.field5 === '1' ? 'AWAKE' : f.field5 === '0' ? 'DROWSY' : '--',
            score: f.field6 || '--',
            yawns: f.field7 || '--',
            alerts: f.field8 || '--',
            time: new Date(f.created_at).toLocaleTimeString()
          });
        }
      } catch (err) {
        console.error("ThingSpeak fetch error", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStartMonitor = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/start', { method: 'POST' });
      if (res.ok) {
        setIsPythonRunning(true);
        addLog('AI monitoring sequence initiated.', 'success');
      }
    } catch (err) {
      console.error("Failed to start python script", err);
      addLog('Connection failed. Is the Python server running?', 'error');
    }
  }

  const handleStopMonitor = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/stop', { method: 'POST' });
      if (res.ok) {
        setIsPythonRunning(false);
        addLog('Monitoring stopped by user.', 'warning');
      }
    } catch (err) {
      console.error("Failed to stop python script", err);
    }
  }

  const addLog = (msg, type) => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 10))
  }

  const thinkSpeakCharts = [
    { title: 'Eye Aspect Ratio (EAR)', field: 1, color: '#38bdf8', icon: Eye, desc: 'Blink rate & eye closure' },
    { title: 'Mouth Aspect Ratio (MAR)', field: 2, color: '#f97373', icon: Activity, desc: 'Yawning behaviour' },
    { title: 'Head Tilt (°)', field: 3, color: '#10b981', icon: Target, desc: 'Pose & nodding' },
    { title: 'Blink Count', field: 4, color: '#a855f7', icon: Eye, desc: 'Per interval' },
    { title: 'Binary Status', field: 5, color: '#e5e7eb', icon: Shield, desc: '1=Awake, 0=Drowsy', type: 'column' },
    { title: 'Drowsiness Score', field: 6, color: '#c77dff', icon: Zap, desc: 'Model confidence' },
    { title: 'Yawns', field: 7, color: '#38bdf8', icon: Activity, desc: 'Events per window' },
    { title: 'Alerts Triggered', field: 8, fieldType: 'step', color: '#facc15', icon: AlertTriangle, desc: 'Triggered warnings' },
  ]

  return (
    <div className="page-enter" style={{ 
      paddingTop: 80, 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--foreground)',
      paddingBottom: '8rem',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* 1. OVERLAY SIDEBAR */}
      <aside style={{
        position: 'fixed', top: 80, right: showSidebar ? 0 : -320, width: 320, height: 'calc(100vh - 80px)',
        background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(30px)', borderLeft: '1px solid rgba(255,255,255,0.1)',
        zIndex: 2000, padding: '2rem', transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.8)'
      }}>
        <button onClick={() => setShowSidebar(!showSidebar)} style={{ position: 'absolute', left: -50, top: 20, width: 50, height: 50, background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '12px 0 0 12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '-5px 0 15px rgba(0,0,0,0.3)' }}>
          <ChevronRight size={24} style={{ transform: showSidebar ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s' }} />
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: 1 }}>SNAPSHOT</h3><span style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: 2 }}>REAL-TIME VALUES</span></div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2a9d8f', animation: 'blink 1s infinite' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[
            { label: 'EAR', value: thinkData.ear, color: '#38bdf8' },
            { label: 'MAR', value: thinkData.mar, color: '#f97373' },
            { label: 'HEAD TILT', value: `${thinkData.tilt}°`, color: '#10b981' },
            { label: 'AI STATUS', value: thinkData.status, color: thinkData.status === 'AWAKE' ? '#2a9d8f' : 'var(--red)' },
            { label: 'DROWSY SCORE', value: thinkData.score, color: '#c77dff' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 700 }}>{item.label}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </aside>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        
        {/* HEADER SECTION */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--red)', marginBottom: 4 }}>
              <Zap size={16} fill="var(--red)" /><span style={{ letterSpacing: 4, fontSize: '0.7rem', fontWeight: 900 }}>SYSTEM.LIVE_MONITORING</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: -1, lineHeight: 1 }}>DRIVER <span style={{ color: 'var(--red)' }}>SAFETY DASHBOARD</span></h1>
          </div>
          <div style={{ textAlign: 'right' }}>
             <div style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: 1.5 }}>OPERATIONAL STATUS</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2a9d8f', fontWeight: 700, fontSize: '0.9rem' }}>
                <Globe size={14} /> CLOUD SYNC ACTIVE
             </div>
          </div>
        </div>

        {/* TOP MAIN SECTION: CAMERA & CONTROLS */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'start', marginBottom: '1rem' }}>
          <div style={{ background: '#000', borderRadius: 20, overflow: 'hidden', position: 'relative', height: '480px', width: '640px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `1px solid ${isPythonRunning ? 'var(--red)' : 'var(--border)'}`, flexShrink: 0 }}>
            {isPythonRunning ? (
              <img src={`http://localhost:8000/video_feed?t=${new Date().getTime()}`} alt="AI Feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
                <Camera size={48} style={{ marginBottom: 16, opacity: 0.1 }} /><div style={{ letterSpacing: 5, fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)' }}>FEED STANDBY</div>
              </div>
            )}
            <div style={{ position: 'absolute', top: 15, left: 15, background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: 6, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: isPythonRunning ? 'var(--red)' : '#2a9d8f', animation: isPythonRunning ? 'blink 0.8s infinite' : 'none' }} />{isPythonRunning ? 'LIVE' : 'STANDBY'}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '480px', flex: 1 }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem', opacity: 0.5 }}><Settings size={16} /><span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: 2 }}>CONTROL UNIT</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={handleStartMonitor} disabled={isPythonRunning} style={{ background: isPythonRunning ? 'rgba(255,255,255,0.05)' : 'var(--red)', color: '#fff', border: 'none', padding: '16px', borderRadius: 16, fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: 1.5, cursor: isPythonRunning ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.4s' }}><Play size={18} fill="currentColor" /> INITIATE LINK</button>
                <button onClick={handleStopMonitor} disabled={!isPythonRunning} style={{ background: 'transparent', color: !isPythonRunning ? 'var(--muted)' : '#fff', border: `2px solid ${!isPythonRunning ? 'var(--border)' : 'rgba(255,255,255,0.2)'}`, padding: '14px', borderRadius: 16, fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: 1.5, cursor: !isPythonRunning ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}><Square size={18} fill="currentColor" /> TERMINATE</button>
              </div>
            </div>
            <div style={{ background: 'var(--dark)', border: '1px solid var(--border)', borderRadius: 24, padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}><span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: 2, opacity: 0.5 }}>NEURAL LOGS</span><Radio size={14} color={isPythonRunning ? 'var(--red)' : 'var(--muted)'} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto', flex: 1 }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ fontSize: '0.7rem', color: log.type === 'error' ? 'var(--red)' : log.type === 'success' ? '#2a9d8f' : 'var(--muted)' }}><span style={{ opacity: 0.3, marginRight: 8 }}>[{log.time}]</span><span style={{ fontWeight: 500 }}>{log.msg}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: '2.5rem', opacity: 0.4, animation: 'float 2s infinite ease-in-out' }}>
           <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: 2 }}>SCROLL FOR DETAILED ANALYTICS</span>
           <ChevronDown size={14} />
        </div>

        {/* INSIGHTS SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 32, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', opacity: 0.6 }}>SESSION COMPOSITION</h3>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'conic-gradient(#2a9d8f 0% 88%, var(--red) 88% 100%)', position: 'relative', boxShadow: '0 0 30px rgba(42,157,143,0.15)' }}>
               <div style={{ position: 'absolute', inset: 25, background: 'var(--card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900 }}>88%</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2a9d8f' }} /> ALERT</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.7rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--red)' }} /> FATIGUE</div>
            </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 32, padding: '2rem' }}>
             <h3 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', opacity: 0.6 }}>SYSTEM DIAGNOSTICS</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'AI CORE ENGINE', status: 'STABLE', color: '#2a9d8f', icon: Cpu },
                  { label: 'SENSOR UPLINK', status: 'ACTIVE', color: '#2a9d8f', icon: Globe },
                  { label: 'DATA LATENCY', status: '12MS', color: '#2a9d8f', icon: Activity },
                  { label: 'BUFFER POOL', status: '94%', color: '#e9c46a', icon: Layers },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><item.icon size={14} color={item.color} /><span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 700 }}>{item.label}</span></div>
                     <span style={{ fontSize: '0.75rem', fontWeight: 800, color: item.color }}>{item.status}</span>
                  </div>
                ))}
             </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 32, padding: '2rem' }}>
             <h3 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', opacity: 0.6 }}>AI EVENT TIMELINE</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { time: '10:42 AM', event: 'Eye closure pattern identified', type: 'warning' },
                  { time: '10:15 AM', event: 'Uplink handshake successful', type: 'info' },
                  { time: '09:58 AM', event: 'Calibration sequence complete', type: 'success' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', position: 'absolute', top: 20, bottom: -20, left: 5 }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.type === 'warning' ? 'var(--red)' : item.type === 'success' ? '#2a9d8f' : '#38bdf8', marginTop: 4, zIndex: 1 }} />
                    <div><div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 2 }}>{item.time}</div><div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.event}</div></div>
                  </div>
                ))}
             </div>
          </div>
        </div>


      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
          {thinkSpeakCharts.map((chart, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 28, padding: '1.5rem', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 12, color: chart.color }}>
                    {React.createElement(chart.icon, { size: 18 })}
                  </div>
                  <div><div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{chart.title}</div><div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{chart.desc}</div></div>
                </div>
                <FileText size={16} style={{ opacity: 0.2 }} />
              </div>
              <div style={{ background: '#020617', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <iframe width="100%" height="260" style={{ border: 'none', display: 'block' }} src={`https://thingspeak.com/channels/3100233/charts/${chart.field}?width=auto&height=260&bgcolor=%23020617&color=${chart.color.replace('#', '%23')}&dynamic=true&type=${chart.type || 'line'}`}></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* MATLAB ANALYTICS */}
        <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(10,10,10,1) 100%)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 32, padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><BarChart3 size={24} color="#f97316" /><h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: 1 }}>SIGNAL RECONSTRUCTION (MATLAB)</h3></div>
          </div>
          <div style={{ background: '#020617', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}><iframe width="100%" height="300" style={{ border: 'none', display: 'block' }} src="https://thingspeak.com/apps/matlab_visualizations/641399?width=auto&height=300"></iframe></div>
        </div>

      </div>

      </div>
    </div>
  )
}
