import React, { useState } from 'react';
import { X, Play, Tv, Sparkles, Volume2, Film, Check } from 'lucide-react';

interface ExpanseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpanseModal({ isOpen, onClose }: ExpanseModalProps) {
  const [streamActive, setStreamActive] = useState(false);

  if (!isOpen) return null;

  const handleStartStream = () => {
    setStreamActive(true);
    setTimeout(() => {
      setStreamActive(false);
    }, 4000);
  };

  return (
    <div id="expanse-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="expanse-modal-container"
        className="relative w-full max-w-2xl overflow-hidden rounded-none bg-[#0c0c0c] border border-white/5 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Accent gold corners */}
        <div className="absolute top-[1.5px] left-[1.5px] w-4 h-4 border-t border-l border-[#c1a35f]" />
        <div className="absolute bottom-[1.5px] right-[1.5px] w-4 h-4 border-b border-r border-[#c1a35f]" />

        {/* Background Image/Poster of Expanse */}
        <div className="relative h-64 overflow-hidden bg-[#111]">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=700" 
            alt="The Expanse" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />
          
          {/* Accent glow corner */}
          <div className="absolute top-4 left-4 bg-black/80 border border-[#c1a35f]/40 text-[#c1a35f] font-mono text-[9px] font-bold px-3 py-1 rounded-none uppercase flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-[#c1a35f]" /> Prime Video exclusive
          </div>
          
          <button 
            id="close-expanse-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-none bg-zinc-950/60 hover:bg-[#c1a35f] border border-white/10 text-zinc-400 hover:text-black transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cinematic Description details */}
        <div className="p-6 text-left">
          <span className="text-[10px] text-[#c1a35f] uppercase font-mono font-bold tracking-widest">Sci-Fi Epic Series</span>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-tight font-display mt-1">THE EXPANSE: THE COLD VOID</h3>
          
          <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-mono mt-2.5">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">98% Match</span>
            <span>2030 SPECIAL EDITION</span>
            <span className="px-1.5 py-0.5 border border-white/10 bg-white/5 text-zinc-300 rounded-none font-bold text-[9px] font-mono">UHD HDR</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-4">
            A geopolitical thriller set two hundred years in the future, the solar system is divided in high tension. In this newly remastered sub-space edition, crew members of the Rocinante uncover a deep alien technology conspiracy that threatens the fragile armistice between Earth, Mars, and the Outer Planets Alliance (OPA).
          </p>

          <div className="bg-[#121212] border border-white/5 rounded-none p-4 mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 justify-between">
            <div className="flex items-center gap-3.5 text-xs text-zinc-400 font-sans">
              <Film className="w-5 h-5 text-[#c1a35f]" />
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px]">Stream Remastered UHD Episode 1</p>
                <p className="text-[10px] text-zinc-500 leading-tight">Configured for holographic wall screens or quantum projectors</p>
              </div>
            </div>
            
            <button 
              id="expanse-instant-stream"
              onClick={handleStartStream}
              className="px-4 py-2 bg-[#c1a35f] text-black hover:bg-[#d9bf86] transition-all font-bold text-[10px] uppercase tracking-wider rounded-none flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#c1a35f]/10 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Stream Trailer</span>
            </button>
          </div>

          {streamActive && (
            <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono uppercase tracking-wider flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Holographic stream redirected to your local 2030 smart display. Projector initialized!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
