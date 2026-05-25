import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, name: 'Mercedes-Benz AMG GT', price: 12999, city: 'Delhi' },
  { id: 2, name: 'Porsche 911 Carrera', price: 16999, city: 'Mumbai' },
  { id: 3, name: 'BMW X5 M‑Sport', price: 7499, city: 'Bangalore' },
  { id: 4, name: 'Tesla Model 3', price: 4499, city: 'Delhi' },
  { id: 7, name: 'Maruti Alto', price: 399, city: 'Delhi' },
  { id: 10, name: 'Hyundai Creta', price: 999, city: 'Delhi' },
  { id: 15, name: 'BMW i8', price: 17999, city: 'Delhi' },
];

export default function Chatbot() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am Carvia AI. Looking for a premium ride or need help with maintenance?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      let response = "I'm your CARVIA expert. I can tell you about our fleet, pricing, city availability, or how to book a car! Try asking 'cheapest car', 'cars in Delhi', or 'how to book'.";
      let link = null;
      
      const lowerMsg = userMsg.toLowerCase();
      
      if (lowerMsg.includes('cheapest') || lowerMsg.includes('low price') || lowerMsg.includes('budget') || lowerMsg.includes('sasti')) {
        const cheapest = [...cars].sort((a,b) => a.price - b.price)[0];
        response = `Our most budget-friendly car is the ${cheapest.name}, which you can rent for just ₹${cheapest.price} per day. Check it out on our Rental page!`;
        link = { text: 'Go to Rental', path: '/rental' };
      } 
      else if (lowerMsg.includes('delhi')) {
        response = `In Delhi, we have premium models ready for you. You can see the full list on our Rental page by selecting 'Delhi' in the search bar.`;
        link = { text: 'View Delhi Cars', path: '/rental' };
      } 
      else if (lowerMsg.includes('luxury') || lowerMsg.includes('expensive') || lowerMsg.includes('premium')) {
        response = "For the ultimate luxury experience, I recommend our high-end fleet. You can filter for 'Luxury Sedan' or 'Sports' on the rental page.";
        link = { text: 'Explore Luxury', path: '/rental' };
      } 
      else if (lowerMsg.includes('book') || lowerMsg.includes('how to') || lowerMsg.includes('process')) {
        response = "Booking is easy: Select your car, add to cart, and pay securely. You can start your booking right now!";
        link = { text: 'Start Booking', path: '/rental' };
      }
      else if (lowerMsg.includes('maintenance') || lowerMsg.includes('service')) {
        response = "We offer professional doorstep car servicing! Book a slot in just a few clicks.";
        link = { text: 'Book Maintenance', path: '/maintenance' };
      }
      else if (lowerMsg.includes('buy') || lowerMsg.includes('sell')) {
        response = "Visit our marketplace to buy certified pre-owned cars or sell yours at the best price.";
        link = { text: 'Go to Marketplace', path: '/buysell' };
      }
      else if (lowerMsg.includes('monitoring') || lowerMsg.includes('driver') || lowerMsg.includes('ai')) {
        response = "Check out our Live AI Monitoring system that prevents accidents by detecting driver drowsiness.";
        link = { text: 'View Live Monitoring', path: '/monitoring' };
      }
      else if (lowerMsg.includes('document') || lowerMsg.includes('id') || lowerMsg.includes('license') || lowerMsg.includes('proof')) {
        response = "To rent a car, you'll need a valid Driving License and an Aadhar Card/Passport as ID proof. We keep it simple!";
      }
      else if (lowerMsg.includes('age') || lowerMsg.includes('limit') || lowerMsg.includes('old')) {
        response = "The minimum age to rent a car with CARVIA is 21 years with at least 1 year of driving experience.";
      }
      else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        response = "Hello! I'm the CARVIA AI Agent. I'm here to make your car experience seamless. Need help finding a car or booking a service?";
      }
      else if (lowerMsg.includes('plan') || lowerMsg.includes('trip') || lowerMsg.includes('itinerary') || lowerMsg.includes('travel')) {
        const keywords = ['goa', 'ladakh', 'jaipur', 'manali', 'kerala', 'udaipur', 'agra'];
        const city = keywords.find(k => lowerMsg.includes(k));
        if (city) {
          response = `I'd love to help you plan a trip to ${city.toUpperCase()}! You should start with local sightseeing, then head to the popular spots. Check out our detailed Destinations Guide for a full day-by-day itinerary!`;
          link = { text: `View ${city.toUpperCase()} Guide`, path: '/destinations' };
        } else {
          response = "I can help you plan a road trip! Which city are you planning to visit? I have expert guides for Goa, Ladakh, Jaipur, Manali, and more.";
          link = { text: 'Explore Destinations', path: '/destinations' };
        }
      }
      else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
        response = "You're very welcome! I'm always here if you need anything else. Enjoy your ride!";
      }

      setMessages(prev => [...prev, { role: 'ai', text: response, link }]);
      setIsTyping(false);
    }, 1000);
  };

  return createPortal(
    <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 9999 }}>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'absolute', bottom: 80, right: 0, width: 320, height: 400,
              background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{ background: '#e63946', padding: '1rem', color: '#fff', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff00', boxShadow: '0 0 10px #00ff00' }} />
                <span>CARVIA AI Assistant</span>
              </div>
              <X size={18} style={{ cursor: 'pointer' }} onClick={() => setChatOpen(false)} />
            </div>
            
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                  display: 'flex', flexDirection: 'column', gap: 6,
                  maxWidth: '85%'
                }}>
                  <div style={{
                    background: m.role === 'ai' ? 'rgba(255,255,255,0.05)' : '#e63946',
                    padding: '10px 14px',
                    borderRadius: m.role === 'ai' ? '0 15px 15px 15px' : '15px 15px 0 15px',
                    lineHeight: 1.4,
                    color: '#fff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    {m.text}
                  </div>
                  {m.link && (
                    <button 
                      onClick={() => { navigate(m.link.path); setChatOpen(false); }}
                      style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, padding: '8px 12px', color: '#e63946', fontSize: '0.8rem',
                        fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        transition: 'all 0.2s', width: 'fit-content'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      {m.link.text} <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '0 15px 15px 15px', color: '#fff', fontSize: '0.8rem' }}>
                   AI is typing...
                </div>
              )}
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8 }}>
              <input 
                type="text" 
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..." 
                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '10px 20px', color: '#fff', outline: 'none', fontSize: '0.85rem' }} 
              />
              <button 
                onClick={handleSendMessage}
                style={{ background: '#e63946', border: 'none', borderRadius: '50%', width: 38, height: 38, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          width: 60, height: 60, borderRadius: '50%', background: '#e63946',
          border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(230,57,70,0.4)', cursor: 'pointer', position: 'relative'
        }}
      >
        {chatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!chatOpen && <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: '#00ff00', borderRadius: '50%', border: '3px solid #141414' }} />}
      </motion.button>
    </div>,
    document.body
  );
}
