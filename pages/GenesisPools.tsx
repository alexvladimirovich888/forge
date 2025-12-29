
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ExternalLink, 
  Zap, 
  Users, 
  Trophy, 
  Activity, 
  Search, 
  Trash2, 
  Calculator, 
  Wifi, 
  Clock, 
  ShieldCheck,
  BarChart3,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PhantomSimulator from '../components/PhantomSimulator';

const DEFAULT_CA = "AJnY9aFekLRBjEDfDBJpiQMENzyZopSR3tPnre7Ppump";

// --- Utility Components ---

const DustScanner: React.FC<{ onTriggerWallet: () => void }> = ({ onTriggerWallet }) => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ name: string; amount: string }[] | null>(null);

  const handleScan = () => {
    if (!address) return toast.error('Enter address');
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult([
        { name: 'BONK', amount: '124K' },
        { name: 'SAMO', amount: '12.0' },
        { name: 'DUST', amount: '0.00' }
      ]);
      toast.success('Scan Complete');
    }, 3000);
  };

  return (
    <div className="bg-surface/50 border border-white/10 rounded-xl p-4 space-y-3 glass shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search size={14} className="text-lime" />
          <h4 className="font-bold text-white uppercase text-[10px] tracking-widest">Dust Scanner</h4>
        </div>
        {scanResult && <button onClick={() => {setScanResult(null); setAddress('');}} className="text-[9px] text-gray-500 hover:text-white uppercase">Clear</button>}
      </div>
      
      {!scanResult ? (
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Address..."
            className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-mono text-white focus:outline-none focus:border-lime/30"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="px-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
          >
            {isScanning ? <div className="w-3 h-3 border border-t-lime rounded-full animate-spin" /> : <ChevronRight size={14} />}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1">
            {scanResult.map((token, i) => (
              <div key={i} className="bg-black/40 p-1.5 rounded border border-white/5 text-center">
                <div className="text-[8px] text-gray-500 font-mono uppercase">{token.name}</div>
                <div className="text-[9px] text-white font-bold">{token.amount}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={onTriggerWallet}
            className="w-full py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black rounded uppercase hover:bg-red-500/20 transition-all flex items-center justify-center gap-1"
          >
            <Trash2 size={10} /> Cleanup
          </button>
        </div>
      )}
    </div>
  );
};

const AllocationCalc: React.FC = () => {
  const [stake, setStake] = useState(5000);
  const [days, setDays] = useState(30);
  const result = (stake * days) / 100;

  return (
    <div className="bg-surface/50 border border-white/10 rounded-xl p-4 space-y-4 glass shadow-lg">
      <div className="flex items-center gap-2">
        <Calculator size={14} className="text-lime" />
        <h4 className="font-bold text-white uppercase text-[10px] tracking-widest">Allocation Calc</h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex justify-between text-[8px] font-mono uppercase text-gray-500">
            <span>Stake</span>
            <span className="text-white">{stake / 1000}K</span>
          </div>
          <input 
            type="range" min="1000" max="50000" step="1000"
            className="w-full accent-lime bg-white/5 h-1 rounded appearance-none cursor-pointer"
            value={stake}
            onChange={(e) => setStake(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[8px] font-mono uppercase text-gray-500">
            <span>Days</span>
            <span className="text-white">{days}</span>
          </div>
          <input 
            type="range" min="7" max="365" step="1"
            className="w-full accent-lime bg-white/5 h-1 rounded appearance-none cursor-pointer"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="bg-black/40 p-2 rounded-lg border border-lime/20 flex items-center justify-between">
        <span className="text-[9px] font-mono text-gray-500 uppercase">Weight</span>
        <motion.span 
          key={result}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-lg font-black text-lime font-mono drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]"
        >
          {result.toLocaleString()}
        </motion.span>
      </div>
    </div>
  );
};

const NodeTester: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const startTest = () => {
    setIsTesting(true);
    setLatency(null);
    setTimeout(() => {
      setIsTesting(false);
      setLatency(Math.floor(Math.random() * 40 + 20));
    }, 2000);
  };

  return (
    <div className="bg-surface/50 border border-white/10 rounded-xl p-4 glass shadow-lg overflow-hidden relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-lime" />
          <h4 className="font-bold text-white uppercase text-[10px] tracking-widest">Node Tester</h4>
        </div>
        <button 
          onClick={startTest}
          disabled={isTesting}
          className="text-[9px] font-black text-lime uppercase tracking-widest hover:underline disabled:opacity-30"
        >
          {isTesting ? 'Testing...' : 'Ping'}
        </button>
      </div>

      <div className="flex items-center justify-center py-2 h-12 relative">
        <AnimatePresence>
          {isTesting && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute w-4 h-4 rounded-full border border-lime/40"
            />
          )}
        </AnimatePresence>
        
        {latency ? (
          <div className="text-center">
            <span className="text-2xl font-black text-white font-mono">{latency}</span>
            <span className="text-[8px] font-bold text-lime ml-1">MS</span>
          </div>
        ) : !isTesting && (
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Awaiting Pulse</span>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

const GenesisPools: React.FC = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletMessage, setWalletMessage] = useState('');
  
  // Chart Tracking State
  const [activeCA, setActiveCA] = useState(DEFAULT_CA);
  const [inputCA, setInputCA] = useState('');

  const triggerWallet = (msg: string) => {
    setWalletMessage(msg);
    setIsWalletOpen(true);
  };

  const handleTrackToken = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = inputCA.trim() || DEFAULT_CA;
    setActiveCA(target);
    toast.success(`Tracking: ${target === DEFAULT_CA ? '$FORGE' : target.substring(0, 8) + '...'}`);
  };

  const chartUrl = `https://dexscreener.com/solana/${activeCA}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/20 text-lime text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Zap className="w-3 h-3 fill-current" />
          Next Generation Launchpad
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight uppercase">
          PRECISION-ENGINEERED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime to-white">GROWTH.</span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
          FORGE.LINK is the premier incubator for high-integrity Solana startups. 
          We filter the noise to deliver institutional-grade opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/whitelist" className="w-full sm:w-auto px-8 py-3.5 bg-lime text-black font-black rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm">
            EXPLORE POOLS
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/docs" 
            target="_blank"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white font-black rounded-lg hover:bg-white/10 transition-all text-sm uppercase tracking-widest flex items-center justify-center"
          >
            DOCS
          </Link>
        </div>
      </section>

      {/* Grid: Genesis Pools (Left) & Utility (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Genesis Pools Content */}
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 h-[44px]">
              <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                <span className="w-1 h-6 bg-lime rounded-full" />
                Live <span className="text-gray-500">&</span> Upcoming Pools
              </h2>
            </div>

            <div className="space-y-6">
              {/* Main Card with Static Image Background */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="group relative bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-lime text-black text-[9px] font-black rounded uppercase tracking-widest">
                    SEED ROUND
                  </span>
                </div>

                <div className="aspect-[21/9] relative overflow-hidden bg-black">
                  <img 
                    src="https://i.postimg.cc/FRQB3SZd/Untitled-design-2025-12-29T224952-350.png" 
                    alt="Genesis Pool Background"
                    className="w-full h-full object-cover opacity-80 transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="w-14 h-14 bg-obsidian rounded-xl flex items-center justify-center border border-lime/30 text-lime group-hover:border-lime transition-colors">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">FORGE.LINK ($FORGE)</h3>
                      <p className="text-lime font-mono text-[10px] tracking-widest uppercase">Mainnet Alpha</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-7 space-y-5">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        The native backbone of FORGE.LINK. Access governance, tiered allocations, and protocol revenue sharing.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase">
                          <span>Progress</span>
                          <span className="text-lime">0% Filled</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "0%" }}
                            className="h-full bg-lime" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-5 grid grid-cols-1 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-[9px] text-gray-500 uppercase">Hard Cap</div>
                          <div className="text-sm font-bold text-white uppercase">5,000 SOL</div>
                        </div>
                        <div className="text-right space-y-0.5">
                          <div className="text-[9px] text-gray-500 uppercase">Min. Allocation</div>
                          <div className="text-sm font-bold text-lime uppercase">0.5 SOL</div>
                        </div>
                      </div>
                      <Link 
                        to="/whitelist" 
                        className="w-full py-3.5 bg-white text-black font-black text-sm rounded-xl hover:bg-lime transition-all uppercase italic text-center"
                      >
                        Join Seed Round
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mini Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-lime/5 blur-3xl rounded-full" />
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 italic">Verification Protocols</h4>
                  <div className="space-y-3">
                    {["Vetted Builders", "Fair Allocation", "Audited Assets"].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-gray-400 font-mono uppercase">
                        <div className="w-1 h-1 bg-lime rounded-full" /> {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-lime p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -top-4 -right-4 opacity-10">
                    <Activity size={80} strokeWidth={1} />
                  </div>
                  <h4 className="text-lg font-black text-black leading-tight mb-2 uppercase italic">Founding Member Pass.</h4>
                  <button className="w-max px-4 py-2 bg-black text-white font-black text-[10px] rounded-lg uppercase tracking-widest">
                    REDEEM
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Persistent Utility Sidebar */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 h-[44px]">
            <h3 className="text-[10px] font-black text-white uppercase italic tracking-widest whitespace-nowrap ml-1">
              FORGE <span className="text-lime">UTILITY</span>
            </h3>
            <div className="flex-1 h-px bg-white/5 ml-2" />
          </div>

          <div className="flex flex-col gap-3">
            <DustScanner onTriggerWallet={() => triggerWallet("Consolidate small token balances into SOL.")} />
            <AllocationCalc />
            <NodeTester />
          </div>

          <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-lime w-3.5 h-3.5" />
              <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Terminal Secured</span>
            </div>
            <span className="text-[8px] text-lime font-mono animate-pulse">256-BIT</span>
          </div>
        </aside>

      </div>

      {/* Live Terminal Section (Full Width Widget) - Now at the bottom */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter italic">
              <span className="w-1 h-6 bg-lime rounded-full" />
              LIVE <span className="text-lime">TERMINAL</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
              Tracking: {activeCA === DEFAULT_CA ? "FORGE.LINK Native ($FORGE)" : `${activeCA.substring(0, 16)}...`}
            </p>
          </div>

          <form onSubmit={handleTrackToken} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Enter Token CA to Track..."
                className="w-full bg-black/60 border border-white/10 rounded-lg pl-3 pr-3 py-2 text-[10px] font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-lime/50 transition-colors"
                value={inputCA}
                onChange={(e) => setInputCA(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-lime text-black font-black rounded-lg text-[10px] uppercase hover:bg-white transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              Track Token
            </button>
          </form>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-lime/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative h-[500px] md:h-[600px] bg-black border-2 border-lime rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(204,255,0,0.5)]">
            <iframe 
              key={activeCA}
              src={chartUrl}
              title="FORGE.LINK Live Terminal"
              className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Wallet Simulator */}
      <PhantomSimulator 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
        isSigning={true}
        message={walletMessage}
        onApprove={() => {
          setIsWalletOpen(false);
          toast.success('Confirmed', { description: 'Utility transaction processed.' });
        }}
      />
    </div>
  );
};

export default GenesisPools;
