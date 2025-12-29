
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Shield, Terminal as TerminalIcon, Coins, Activity, Menu, X, ChevronRight, Zap } from 'lucide-react';

import GenesisPools from './pages/GenesisPools';
import Whitelist from './pages/Whitelist';
import Terminal from './pages/Terminal';
import Vault from './pages/Vault';
import Docs from './pages/Docs';
import { ANVIL_SVG } from './constants';
import PhantomSimulator from './components/PhantomSimulator';

const LOGO_URL = "https://i.postimg.cc/xTkS3vQk/Untitled-design-2025-12-29T223214-803.png";

// Component for a single falling coin
const FallingCoin: React.FC<{ delay: number; x: string; size: number; duration: number }> = ({ delay, x, size, duration }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-[-1]"
      style={{ left: x, width: size, height: size }}
      initial={{ y: -100, opacity: 0, rotateY: 0, rotateZ: 0 }}
      animate={{ 
        y: '110vh',
        opacity: [0, 0.5, 0.5, 0],
        rotateY: [0, 360, 720, 1080],
        rotateZ: [0, 45, -45, 0]
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity,
        ease: "linear",
        delay: delay 
      }}
    >
      <img src={LOGO_URL} alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]" />
    </motion.div>
  );
};

// Layout Wrapper to handle loading states and background
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    
    // Fetch SOL Price
    const fetchSolPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await res.json();
        setSolPrice(data.solana.usd);
      } catch (err) {
        setSolPrice(145.23); // Fallback
      }
    };
    
    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Reset loading on route change for "Skeleton" effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navItems = [
    { name: 'Genesis Pools', path: '/', icon: <Coins className="w-4 h-4" /> },
    { name: 'Whitelist', path: '/whitelist', icon: <Shield className="w-4 h-4" /> },
    { name: 'Terminal', path: '/terminal', icon: <TerminalIcon className="w-4 h-4" /> },
    { name: 'The Vault', path: '/vault', icon: <Activity className="w-4 h-4" /> },
  ];

  // Generate deterministic but random-looking properties for 45 coins for high density
  const coins = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    delay: i * 0.4, // Much smaller delay for more frequent spawns
    x: `${(i * 13.7) % 100}%`, // Better distribution across width
    size: 15 + (i % 4) * 8, // Various sizes (15px to 39px)
    duration: 8 + (i % 7) * 1.5 // Various speeds (8s to 17s)
  }));

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-lime selection:text-black bg-obsidian">
      {/* Global Coin Rain Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {coins.map((coin) => (
          <FallingCoin 
            key={coin.id}
            delay={coin.delay}
            x={coin.x}
            size={coin.size}
            duration={coin.duration}
          />
        ))}
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img 
              src={LOGO_URL}
              alt="FORGE.LINK Logo"
              className="w-8 h-8 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
            <span className="text-xl font-bold tracking-tighter text-white uppercase">FORGE<span className="text-lime">.LINK</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-lime ${
                  location.pathname === item.path ? 'text-lime' : 'text-gray-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6 pr-4 border-r border-white/10 mr-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-500 font-mono uppercase">SOL/USD</span>
              <span className="text-sm font-bold text-lime">${solPrice.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Network</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse-slow shadow-[0_0_8px_#CCFF00]" />
                <span className="text-sm font-bold text-white uppercase">Healthy</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsWalletOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-lime text-black font-bold text-sm rounded-md hover:bg-white transition-all shadow-lg active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              CONNECT WALLET
            </button>
            <button 
              className="md:hidden text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-md md:hidden p-6"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-white flex items-center justify-between"
                >
                  {item.name}
                  <ChevronRight className="text-lime" />
                </Link>
              ))}
              <button 
                onClick={() => { setIsWalletOpen(true); setIsMenuOpen(false); }}
                className="w-full py-4 bg-lime text-black font-bold text-xl rounded-lg"
              >
                CONNECT WALLET
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto relative z-10">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-48 bg-white/5 rounded-2xl w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-96 bg-white/5 rounded-2xl" />
                <div className="h-96 bg-white/5 rounded-2xl" />
                <div className="h-96 bg-white/5 rounded-2xl" />
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<GenesisPools />} />
                <Route path="/whitelist" element={<Whitelist />} />
                <Route path="/terminal" element={<Terminal />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="/docs" element={<Docs />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Custom Phantom Simulator Modal */}
      <PhantomSimulator isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
      
      <Toaster 
        theme="dark" 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1A1A1A',
            border: '1px solid #CCFF00',
            color: '#FFFFFF'
          }
        }} 
      />
      <footer className="py-8 border-t border-white/10 text-center relative z-10">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.4em]">
          Precision Engineering &copy; 2025 FORGE.LINK Protocol
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
};

export default App;
