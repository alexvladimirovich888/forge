
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Shield, Twitter, MessageSquare, Fingerprint, Zap, Lock, Search } from 'lucide-react';
import { toast } from 'sonner';
import PhantomSimulator from '../components/PhantomSimulator';

const Whitelist: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [twitterVerified, setTwitterVerified] = useState(false);
  const [discordVerified, setDiscordVerified] = useState(false);
  const [finalSubmitOpen, setFinalSubmitOpen] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletOpen(true);
  };

  const handleVerifyTwitter = () => {
    toast.loading('Verifying @FORGELINK follow status...');
    setTimeout(() => {
      toast.dismiss();
      setTwitterVerified(true);
      toast.success('Twitter Verified');
    }, 1200);
  };

  const handleVerifyDiscord = () => {
    toast.loading('Connecting Discord profile...');
    setTimeout(() => {
      toast.dismiss();
      setDiscordVerified(true);
      toast.success('Discord Linked');
    }, 1200);
  };

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setIsEligible(true);
      toast.success('Wallet check passed: 0.24 SOL detected');
      setStep(4);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter text-white uppercase">
          GENESIS ACCESS <span className="text-lime">WHITELIST</span>
        </h1>
        <p className="text-gray-400">
          Secure your priority spot for the upcoming $FORGE launch. <br />
          Early registration grants 'Founding Member' status.
        </p>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#1f1f1f] border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] text-gray-500 font-mono ml-4 tracking-widest uppercase">
              Secure Auth Terminal v2.4.1
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-lime">
            <div className="w-1 h-1 bg-lime rounded-full animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="p-8 space-y-12">
          {/* Step 1: Wallet */}
          <div className={`space-y-4 transition-opacity duration-500 ${step < 1 ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${walletConnected ? 'bg-lime text-black' : 'bg-white/5 text-gray-500'}`}>
                {walletConnected ? <CheckCircle size={18} /> : '1'}
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Step 1: Identity</h3>
            </div>
            
            <div className="pl-11">
              {!walletConnected ? (
                <button 
                  onClick={handleWalletConnect}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-lime hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <Fingerprint size={20} className="text-lime" />
                  <span className="font-bold text-sm uppercase">Connect Wallet to Verify</span>
                </button>
              ) : (
                <div className="p-4 bg-lime/5 border border-lime/20 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="text-lime" size={20} />
                    <span className="font-mono text-sm text-white">Linked: 4eX9...v29B</span>
                  </div>
                  <span className="text-[10px] font-bold text-lime uppercase">Authenticated</span>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Socials */}
          <div className={`space-y-4 transition-opacity duration-500 ${!walletConnected ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${twitterVerified && discordVerified ? 'bg-lime text-black' : 'bg-white/5 text-gray-500'}`}>
                {twitterVerified && discordVerified ? <CheckCircle size={18} /> : '2'}
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Step 2: Social Verification</h3>
            </div>
            
            <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleVerifyTwitter}
                disabled={twitterVerified}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  twitterVerified ? 'bg-lime/5 border-lime/20 text-lime' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <Twitter size={20} fill={twitterVerified ? "currentColor" : "none"} />
                <span className="font-bold text-sm uppercase">{twitterVerified ? 'Twitter Verified' : 'Follow @FORGELINK'}</span>
              </button>
              <button 
                onClick={handleVerifyDiscord}
                disabled={discordVerified}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  discordVerified ? 'bg-lime/5 border-lime/20 text-lime' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <MessageSquare size={20} fill={discordVerified ? "currentColor" : "none"} />
                <span className="font-bold text-sm uppercase">{discordVerified ? 'Discord Verified' : 'Join Discord Community'}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Eligibility Scan */}
          <div className={`space-y-4 transition-opacity duration-500 ${(!twitterVerified || !discordVerified) ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isEligible ? 'bg-lime text-black' : 'bg-white/5 text-gray-500'}`}>
                {isEligible ? <CheckCircle size={18} /> : '3'}
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Step 3: Eligibility Scanner</h3>
            </div>
            
            <div className="pl-11">
              {!isEligible ? (
                <div className="relative p-8 rounded-2xl bg-black border border-white/10 overflow-hidden group">
                  {scanning && (
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-0.5 bg-lime shadow-[0_0_15px_#CCFF00] z-20"
                    />
                  )}
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-lime group-hover:border-lime/50 transition-colors">
                      <Search size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 font-mono mb-4 uppercase">Awaiting network validation...</p>
                      <button 
                        onClick={startScan}
                        disabled={scanning}
                        className="px-8 py-3 bg-lime text-black font-black rounded-lg hover:scale-105 transition-all disabled:opacity-50 uppercase"
                      >
                        {scanning ? 'Scanning Wallet...' : 'Scan for Eligibility'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase">Eligibility Check: PASSED</p>
                    <p className="text-[10px] text-green-500 font-mono uppercase tracking-widest">MINIMUM 0.1 SOL DETECTED (BALANCE: 0.24 SOL)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final Action */}
          <AnimatePresence>
            {isEligible && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 border-t border-white/5"
              >
                <button 
                  onClick={() => setFinalSubmitOpen(true)}
                  className="w-full py-5 bg-white text-black font-black text-xl rounded-xl hover:bg-lime transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)] uppercase"
                >
                  Apply for Whitelist
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Simulator Modals */}
      <PhantomSimulator 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
        onApprove={() => { setWalletConnected(true); setStep(2); }}
      />
      
      <PhantomSimulator 
        isOpen={finalSubmitOpen} 
        onClose={() => setFinalSubmitOpen(false)} 
        isSigning={true}
        message="FORGE.LINK Whitelist Application Request. This action will register your wallet address for the Genesis Pool."
        onApprove={() => {
          setFinalSubmitOpen(false);
          toast.success('APPLICATION SUCCESSFUL', {
            description: 'Check your status in the FORGE.LINK Discord. Founding member role pending.'
          });
        }}
      />
    </div>
  );
};

export default Whitelist;
