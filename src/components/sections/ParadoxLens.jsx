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
    <div className="absolute inset-0 bg-[#1a1a1a] text-bone-dim p-8 md:p-14 flex flex-col justify-center border border-white/5 rounded-2xl shadow-inner z-10 select-none overflow-hidden group-hover:bg-[#121212] transition-colors duration-500">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Folder Tab Detail */}
      <div className="absolute top-0 right-10 bg-white/5 px-4 py-1 rounded-b-lg font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 border-x border-b border-white/10">
        FILE_{data.id * 1024}_X
      </div>

      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-chartreuse mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
        PUBLIC_NARRATIVE_{data.id}
      </div>
      
      <h3 className="font-grotesk font-bold text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight text-bone group-hover:text-white transition-colors">
        {data.surface}
      </h3>
      
      <div className="mt-12 flex items-center gap-4 group-hover:translate-x-2 transition-transform">
        <div className="h-[1px] w-12 bg-white/10" />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em]">Initialize Searchlight</span>
      </div>
    </div>
  );

  // Truth Layer (Light/Bone - The "Searchlight" Reveal)
  const TruthLayer = () => (
    <motion.div 
      className={`absolute inset-0 bg-bone text-charcoal p-8 md:p-14 flex flex-col justify-center border-4 border-chartreuse/30 rounded-2xl shadow-2xl z-20 pointer-events-none transition-opacity duration-300 ${isMobile && !isTapped ? 'opacity-0' : 'opacity-100'}`}
      style={{
        clipPath: isMobile ? 'none' : clipPath,
        WebkitClipPath: isMobile ? 'none' : clipPath,
        willChange: 'clip-path'
      }}
    >
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-red-600 font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-600" />
        CLASSIFIED_TRUTH
      </div>
      
      <div className="relative mb-8">
        <p className="font-mono italic text-xl md:text-2xl lg:text-3xl leading-snug text-charcoal font-bold">
          {data.truth}
        </p>
      </div>

      <div className="mt-auto pt-8 border-t border-charcoal/10 flex justify-between items-center">
        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-charcoal/40">Reference: BIO_ARCHIVE</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-charcoal/20" />
          <div className="w-1.5 h-1.5 bg-charcoal/20" />
          <div className="w-1.5 h-1.5 bg-chartreuse" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      ref={cardRef}
      className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-none group paradox-card bg-[#111] border border-white/20 hover:border-chartreuse/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-chartreuse/5"
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
    <section id="paradox" className="relative w-full py-24 md:py-40 px-6 md:px-12 bg-charcoal text-bone overflow-hidden z-10">
      {/* Background Separation Highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-chartreuse/[0.02] blur-[120px]" />
      </div>

      {/* Background Image Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-screen grayscale pointer-events-none"
        style={{
          backgroundImage: `url(${ASSETS.kingfisherBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Noise Overlay specifically for this section to add grit */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('/assets/textures/noise-overlay.png')]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          title="The Paradox Lens" 
          subtitle="Surface vs Reality"
          align="center"
          className="mb-16 md:mb-32 dark"
        />
        
        {isMobile && (
          <p className="text-center font-mono text-[10px] text-chartreuse animate-pulse mb-8 uppercase tracking-[0.3em]">
            ↓ Tap cards to decode ↓
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

