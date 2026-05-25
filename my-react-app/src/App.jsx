import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rental from './pages/Rental';
import Maintenance from './pages/Maintenance';
import LiveMonitoring from './pages/LiveMonitoring';
import BuySell from './pages/BuySell';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Destinations from './pages/Destinations';
import Chatbot from './components/Chatbot';
import './App.css';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="22px" height="22px" fill="white">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 22 184.9 22 255.4c0 14.5 1.7 30 5.4 46 14.8 62.7 54.4 148.1 114.6 148.1 31.9 0 46-19.7 82.2-19.7 36 0 49.3 19.3 83.1 19.3 64.1 0 99.4-86.4 114.8-149.6-38.3-21.6-53.7-58.4-53.4-96.8zM245.9 83c21-25.2 34.6-55.8 30.6-83-26.8 1.6-58.6 18.2-79.9 43.1-18.9 21.8-34.5 54.3-29.6 82.4 30.1 2.3 58.7-18.1 78.9-42.5z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="22px" height="22px" fill="white">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  
  // Feedback Messages
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('carviaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const resetMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    resetMessages();
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('carviaUser');
    window.location.href = '/'; // Redirect to landing
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetMessages();

    const baseUrl = import.meta.env.VITE_API_URL + '/api';
    let endpoint = '';
    let bodyData = { email };

    if (activeTab === 'signin') {
      endpoint = '/signin';
      bodyData.password = password;
    } else if (activeTab === 'signup') {
      endpoint = '/signup';
      bodyData.name = name;
      bodyData.password = password;
      bodyData.referralCode = referralCode;
    } else if (activeTab === 'forgot') {
      endpoint = '/forgot-password';
      bodyData.password = password;
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setSuccessMsg(data.message);
      
      if (activeTab === 'signin') {
        setTimeout(() => {
          const userData = data.user || { name: 'Verified User', email, isAdmin: false };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('carviaUser', JSON.stringify(userData));
          
          if (userData.isAdmin) {
            window.location.href = '/admin';
          }
        }, 1000);
      } else if (activeTab === 'signup') {
        setTimeout(() => handleTabSwitch('signin'), 1500);
      }

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userData = { name: `${provider} User`, email: `user@${provider.toLowerCase()}.com`, isAdmin: false };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('carviaUser', JSON.stringify(userData));
      
      // If we were on /admin, go to home instead
      if (window.location.pathname === '/admin') {
        window.location.href = '/';
      }
    }, 1500);
  };

  // Logged In View
  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental" element={<Rental user={user} />} />
          <Route path="/maintenance" element={<Maintenance user={user} />} />
          <Route path="/monitoring" element={<LiveMonitoring />} />
          <Route path="/buy-sell" element={<BuySell user={user} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/admin" element={user?.isAdmin ? <Admin user={user} /> : <Navigate to="/" />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
        <Chatbot />
        <Footer />
      </BrowserRouter>
    );
  }

  return (
    <div className="app-container">
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <div className="modal-overlay">
        <div className="auth-box">
          <div className="auth-header">
            <h2>{activeTab === 'signin' ? 'Welcome Back' : (activeTab === 'signup' ? 'Join CARVIA' : 'Reset Password')}</h2>
            <p>Ready to hit the road?</p>
          </div>
          
          {activeTab !== 'forgot' && (
            <div className="auth-tabs">
              <button className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => handleTabSwitch('signin')}>Sign In</button>
              <button className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabSwitch('signup')}>Sign Up</button>
            </div>
          )}

          <form className="auth-form" onSubmit={handleAuth}>
            {errorMsg && <div className="msg-box error">{errorMsg}</div>}
            {successMsg && <div className="msg-box success">{successMsg}</div>}

            {activeTab !== 'forgot' && (
              <>
                <div className="social-login-grid">
                  <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')}><GoogleIcon /></button>
                  <button type="button" className="social-btn" onClick={() => handleSocialLogin('Apple')}><AppleIcon /></button>
                  <button type="button" className="social-btn" onClick={() => handleSocialLogin('GitHub')}><GitHubIcon /></button>
                </div>
                <div className="divider"><span>OR CONTINUE WITH EMAIL</span></div>
              </>
            )}

            <div className="input-section">
              {activeTab === 'signup' && (
                <>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Referral Code (Optional)</label>
                    <input type="text" placeholder="CARVIA-XXXXXX" value={referralCode} onChange={e => setReferralCode(e.target.value.toUpperCase())} />
                  </div>
                </>
              )}
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@company.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label>{activeTab === 'forgot' ? 'New Password' : 'Password'}</label>
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
            </div>

            <div className="action-section">
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <span className="loader"></span> : (activeTab === 'signin' ? 'Start Engine' : (activeTab === 'signup' ? 'Create Account' : 'Reset Link'))}
              </button>
              {activeTab === 'forgot' && <button type="button" className="text-btn" onClick={() => handleTabSwitch('signin')}>← Back</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
