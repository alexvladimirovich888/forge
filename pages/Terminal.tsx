
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe, Zap, Cpu, ArrowUpRight, ArrowDownRight, Search, BarChart3, Info } from 'lucide-react';
import { toast } from 'sonner';

// Default to a high-liquidity SOL/USDC pair on Solana
const DEFAULT_SOL_PAIR = "solana/58oQ3GucnoBvMhMoc7msvLC77XxB9p3A25o4mN15T89v"; 

const Terminal: React.FC = () => {
  const [tps, setTps] = useState(2450);
  const [fearAndGreed, setFearAndGreed] = useState(65);
  
  // Chart Tracking State
  const [activeCA, setActiveCA] = useState(DEFAULT_SOL_PAIR);
  const [inputCA, setInputCA] = useState('');
  
  const [events, setEvents] = useState([
    { id: '1', addr: '0x71...3e45', action: 'registered for Genesis Whitelist', time: 'JUST NOW' },
    { id: '2', addr: '0x92...1a2b', action: 'verified Discord status', time: '2M AGO' },
    { id: '3', addr: '0x3f...8d2c', action: 'applied for Seed Round', time: '5M AGO' },
    { id: '4', addr: '0x1c...5b9e', action: 'staked 1,000 $FORGE', time: '12M AGO' },
    { id: '5', addr: '0x8d...2a4f', action: 'verified Twitter status', time: '15M AGO' },
  ]);

  useEffect(() => {
    // Dynamic TPS simulation
    const interval = setInterval(() => {
      setTps(prev => Math.floor(2200 + Math.random() * 800));
    }, 2000);

    // Fetch Fear & Greed
    fetch('https://api.alternative.me/fng/')
      .then(r => r.json())
      .then(d => setFearAndGreed(parseInt(d.data[0].value)));

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleTrackToken = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = inputCA.trim() || DEFAULT_SOL_PAIR;
    // If it's a full CA but not the default pair, we use the standard solana/ prefix
    const finalTarget = target.includes('/') ? target : `solana/${target}`;
    setActiveCA(finalTarget);
    toast.success(`Tracking: ${target === DEFAULT_SOL_PAIR ? 'SOL/USDT' : target.substring(0, 8) + '...'}`);
  };

  const chartUrl = `https://dexscreener.com/${activeCA}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-2 glass">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-mono uppercase">Network TPS</span>
            <Activity size={16} className="text-lime" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{tps.toLocaleString()}</span>
            <span className="text-xs font-bold text-lime flex items-center gap-0.5">
              <ArrowUpRight size={12} /> 2.4%
            </span>
          </div>
        </div>

        <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-2 glass">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-mono uppercase">Sentiment</span>
            <Cpu size={16} className="text-lime" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{fearAndGreed}</span>
            <span className="text-xs font-bold text-white/50 uppercase">F&G INDEX</span>
          </div>
        </div>

        <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-2 glass">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-mono uppercase">Total Tx</span>
            <Globe size={16} className="text-lime" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">321.4B</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-lime/10 text-lime rounded font-bold uppercase">Mainnet</span>
          </div>
        </div>

        <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-2 glass">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-mono uppercase">24h Volume</span>
            <Zap size={16} className="text-lime" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">$4.2B</span>
            <span className="text-xs font-bold text-red-500 flex items-center gap-0.5 uppercase tracking-tighter">
              <ArrowDownRight size={12} /> 1.1%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Terminal Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-2 tracking-tighter">
                  <BarChart3 className="text-lime" size={24} />
                  SOLANA <span className="text-lime">LIVE MARKET</span>
                </h2>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">
                  Real-time SOL/USDT liquidity analysis and tracking terminal.
                </p>
              </div>
              
              <form onSubmit={handleTrackToken} className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <input 
                    type="text" 
                    placeholder="Enter Token CA to Track..."
                    className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-lime/50 transition-colors"
                    value={inputCA}
                    onChange={(e) => setInputCA(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
                </div>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-lime text-black font-black rounded-lg text-xs uppercase hover:bg-white transition-all shadow-lg active:scale-95"
                >
                  Track
                </button>
              </form>
            </div>

            {/* Premium Chart Container */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-lime/30 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-[650px] bg-black border-2 border-lime rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(204,255,0,0.3)]">
                <iframe 
                  key={activeCA}
                  src={chartUrl}
                  title="FORGE.LINK Terminal Chart"
                  className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-4 bg-white/5 rounded-xl border border-white/5 glass">
              <Info size={16} className="text-lime shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-relaxed">
                Market terminal synced with real-time exchange data. Performance optimized for low-latency trading view. 
                Data feed: <span className="text-lime">STABLE</span>. Node: <span className="text-lime">SECURE</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl flex flex-col h-[780px] shadow-xl glass">
          <div className="p-4 border-b border-white/5 bg-[#1f1f1f] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-white italic">Activity Stream</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-500">SOL Mainnet</span>
              <div className="w-2 h-2 bg-lime rounded-full animate-pulse shadow-[0_0_8px_#CCFF00]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono">
            {events.map((ev, i) => (
              <motion.div 
                key={ev.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-[10px] leading-relaxed group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lime font-bold">{ev.addr}</span>
                  <span className="text-[9px] text-gray-600 group-hover:text-white transition-colors">{ev.time}</span>
                </div>
                <p className="text-gray-400 border-l border-lime/30 pl-3 ml-1 uppercase tracking-tight">{ev.action}</p>
              </motion.div>
            ))}
            <div className="pt-4 text-center">
              <button className="text-[10px] text-gray-600 hover:text-lime transition-colors font-bold uppercase tracking-widest border border-white/5 px-4 py-2 rounded-lg bg-white/5">
                LOAD PREVIOUS LOGS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
