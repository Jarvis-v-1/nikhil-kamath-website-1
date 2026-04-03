import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../utils/constants';
import { Zap } from 'lucide-react';

export default function Footer() {
  const [showMatriarch, setShowMatriarch] = useState(false);

  return (
    <footer className="relative w-full bg-[#0a0a0a] text-bone pt-32 pb-40 px-6 md:px-12 border-t border-white/5 overflow-hidden z-20">
      
      {/* Background Editorial Text */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 font-grotesk font-black text-[15vw] leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap uppercase italic tracking-tighter">
        THE PARADOX
      </div>

      {/* Background Noise Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${ASSETS.noise})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Veena Easter Egg Trigger - Optimized for Visibility */}
        <div className="mb-16 flex flex-col items-center">
          <motion.button
            className="group relative flex flex-col items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all duration-500"
            onClick={() => setShowMatriarch(!showMatriarch)}
            data-cursor="pointer"
            initial={false}
            animate={showMatriarch ? { rotate: 0 } : {}}
          >
            <motion.div 
              className="w-12 h-12 md:w-16 md:h-16 relative"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img 
                src={ASSETS.veena} 
                alt="Veena" 
                className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
              />
            </motion.div>
            
            <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.4em] text-bone/40 group-hover:text-chartreuse transition-colors">
              Matrilineal Root
            </span>
          </motion.button>
        </div>

        {/* Matriarch Reveal Panel */}
        <AnimatePresence>
          {showMatriarch && (
            <motion.div 
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{ height: "auto", opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-5xl glass-panel-dark rounded-[2.5rem] mb-24 overflow-hidden border border-chartreuse/20"
            >
              <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-2">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-chartreuse/10 mix-blend-overlay z-10" />
                    <img src={ASSETS.revathi} alt="Revathi Kamath" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" />
                  </div>
                </div>
                
                <div className="md:col-span-3 text-bone-dim space-y-6">
                  <div className="space-y-1">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-chartreuse">The Silent Engine</h4>
                    <h3 className="font-serif italic text-4xl md:text-6xl text-bone leading-tight">Revathi Kamath</h3>
                  </div>
                  
                  <div className="space-y-4 font-inter text-sm md:text-lg leading-relaxed text-bone-dim/90">
                    <p>
                      A classically trained Veena player who built an event management empire from ₹5,000 borrowed from a friend. She landed her first major contract by pitching a floral arrangement to Wipro.
                    </p>
                    <p>
                      Her landscaping works include the Chinnaswamy Stadium, with a client list featuring Intel, Tata Steel, and Citadel.
                    </p>
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] bg-chartreuse/10 text-chartreuse self-start px-4 py-2 rounded-full inline-block mt-4">
                      "entrepreneurship is a Matrilineal trait here"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Bottom / Brokai Labs Credit */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
             <span>Nikhil Kamath Paradox</span>
             <span className="hidden md:inline">//</span>
             <span className="hidden md:inline">2026 Editorial</span>
          </div>

          <a 
            href="https://www.brokailabs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-chartreuse/20 transition-all duration-500 group"
            data-cursor="pointer"
          >
            <Zap size={14} className="text-chartreuse animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
              Built with Precision by Brokai Labs
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
