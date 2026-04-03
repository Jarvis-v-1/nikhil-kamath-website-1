import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PARADOXES_DATA } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import { ASSETS } from '../../utils/constants';
import { Quote } from 'lucide-react';

function ParadoxCard({ data, isMobile }) {
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef(null);

  // Motion values for buttery smooth cursor tracking
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Add springs to the motion values to remove any jitter
  const springX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  // Map springs to clip-path string - increased size to 200px for even better readability
  const clipPath = useTransform(
    [springX, springY],
    ([x, y]) => `circle(200px at ${x}px ${y}px)`
  );

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // Surface Layer (Dark/Charcoal - The "Redacted" File)
  const SurfaceLayer = () => (
    <div className="absolute inset-0 bg-[#111] text-[#E0E0E0] p-8 md:p-14 flex flex-col justify-center border border-[rgba(255,42,42,0.3)] rounded-none shadow-inner z-10 select-none overflow-hidden group-hover:bg-[#0a0a0a] transition-colors duration-500">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,42,42,0.05),transparent_2px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay" />
      
      {/* Folder Tab Detail */}
      <div className="absolute top-0 right-8 bg-[rgba(255,42,42,0.1)] px-4 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#ff2a2a] border-x border-b border-[rgba(255,42,42,0.3)]">
        SHORT_POSITION
      </div>

      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#ff2a2a] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-none bg-[#ff2a2a] animate-pulse" />
        PUBLIC_NARRATIVE_{data.id}
      </div>
      
      <h3 className="font-mono font-bold text-xl md:text-2xl lg:text-3xl leading-[1.2] tracking-tight text-[#E0E0E0] group-hover:text-white transition-colors uppercase border-l-2 border-[#ff2a2a] pl-4">
        {data.surface}
      </h3>
      
      <div className="mt-12 flex items-center gap-4 group-hover:translate-x-2 transition-transform">
        <div className="h-[1px] w-12 bg-[rgba(255,42,42,0.5)]" />
        <span className="font-mono text-[10px] text-[#ff2a2a] uppercase tracking-[0.4em]">INIT_ORDER</span>
      </div>
    </div>
  );

  // Truth Layer (Light/Bone - The "Searchlight" Reveal)
  const TruthLayer = () => (
    <motion.div 
      className={`absolute inset-0 bg-[#050505] text-[#00ff41] p-8 md:p-14 flex flex-col justify-center border-2 border-[#00ff41] rounded-none shadow-[0_0_30px_rgba(0,255,65,0.2)] z-20 pointer-events-none transition-opacity duration-300 ${isMobile && !isTapped ? 'opacity-0' : 'opacity-100'}`}
      style={{
        clipPath: isMobile ? 'none' : clipPath,
        WebkitClipPath: isMobile ? 'none' : clipPath,
        willChange: 'clip-path'
      }}
    >
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#00ff41] font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-none bg-[#00ff41] text-glow-green" />
        LONG_POSITION_REALITY
      </div>
      
      <div className="relative mb-8">
        <p className="font-mono text-lg md:text-xl lg:text-2xl leading-snug text-[#00ff41] text-glow-green uppercase">
          {data.truth}
        </p>
      </div>

      <div className="mt-auto pt-8 border-t border-[rgba(0,255,65,0.3)] flex justify-between items-center">
        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#606060]">LEDGER_ID: BIO_ARCHIVE</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-[#00ff41] opacity-30" />
          <div className="w-1.5 h-1.5 bg-[#00ff41] opacity-30" />
          <div className="w-1.5 h-1.5 bg-[#00ff41]" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      ref={cardRef}
      className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden cursor-none group paradox-card bg-[#111] border border-[rgba(255,42,42,0.2)] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      data-cursor="pointer"
      onClick={() => isMobile && setIsTapped(!isTapped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <SurfaceLayer />
      <TruthLayer />
    </motion.div>
  );
}

export default function ParadoxLens() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="paradox" className="relative w-full py-24 md:py-40 px-6 md:px-12 bg-[#050505] text-[#E0E0E0] overflow-hidden z-10 terminal-grid">
      
      {/* Noise Overlay specifically for this section to add grit */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('/assets/textures/noise-overlay.png')]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          title="The Paradox Ledger" 
          subtitle="Surface vs Reality"
          align="center"
          className="mb-16 md:mb-32 text-[#E0E0E0]"
        />
        
        {isMobile && (
          <p className="text-center font-mono text-[10px] text-[#00ff41] animate-pulse mb-8 uppercase tracking-[0.3em]">
            ↓ Tap blocks to decode ↓
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PARADOXES_DATA.map((paradox) => (
            <ParadoxCard key={paradox.id} data={paradox} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

