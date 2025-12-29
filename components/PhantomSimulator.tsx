
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Globe, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  message?: string;
  isSigning?: boolean;
}

const PhantomSimulator: React.FC<Props> = ({ isOpen, onClose, onApprove, message, isSigning = false }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      if (onApprove) onApprove();
      toast.success('Signature Confirmed', {
        description: 'Transaction 0x7e8...4f1a successfully confirmed on mainnet-beta'
      });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-[360px] bg-[#181818] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <img src="https://i.postimg.cc/xTkS3vQk/Untitled-design-2025-12-29T223214-803.png" alt="ForgePath" className="w-6 h-6 rounded-md object-contain" />
            <span className="font-bold text-white text-sm">ForgePath Auth</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mb-4 text-lime border border-lime/20">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isSigning ? 'Signature Request' : 'Approve Connection'}
            </h3>
            <p className="text-sm text-gray-400">
              {message || 'FORGE.LINK is requesting to connect to your wallet to view balance and activity.'}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1"><Globe size={12}/> Network</span>
              <span className="text-white font-medium">Solana Mainnet</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1"><Lock size={12}/> Security</span>
              <span className="text-lime font-medium">Verified App</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="w-full py-3 bg-[#ab9ff2] text-white font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isSigning ? 'Confirm' : 'Connect'
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-white/5 text-gray-300 font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="p-3 bg-red-500/10 flex items-start gap-2 border-t border-red-500/10">
          <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-red-400">
            Never share your recovery phrase with anyone. Phantom will never ask for it.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PhantomSimulator;
