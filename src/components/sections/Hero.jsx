import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../ui/RevealText';
import { ASSETS } from '../../utils/constants';

function Stat({ label, value, status = 'neutral' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const statusColor = status === 'profit' ? 'text-[#00ff41] text-glow-green' : 
                      status === 'loss' ? 'text-[#ff2a2a] text-glow-red' : 
                      'text-[#E0E0E0]';
  const prefix = status === 'profit' ? '▲ ' : status === 'loss' ? '▼ ' : '■ ';

  return (
    <div ref={ref} className="border border-[rgba(0,255,65,0.2)] bg-[#0A0A0A] p-4 flex flex-col min-w-[140px] relative" data-cursor="pointer">
      {/* Decorative corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41] opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41] opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41] opacity-50" />
      
      <motion.p 
        className="font-mono text-[10px] uppercase tracking-widest text-[#606060] mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.p>
      <motion.p 
        className={`font-mono font-bold text-2xl md:text-3xl ${statusColor}`}
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      >
        <span className="text-sm align-middle mr-1 opacity-70">{prefix}</span>
        {value}
      </motion.p>
    </div>
  );
}

function Candlestick({ height, isUp, left, delay }) {
  return (
    <motion.div 
      className="absolute bottom-0 w-8 md:w-16 flex flex-col items-center justify-end"
      style={{ left }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: [0.1, 0.3, 0.1] }}
      transition={{ 
        height: { delay, duration: 1, type: 'spring' },
        opacity: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "linear" }
      }}
    >
      <div className={`w-[1px] h-full ${isUp ? 'bg-[#00ff41]' : 'bg-[#ff2a2a]'} opacity-50 relative`}>
        <div className={`absolute top-1/4 w-full h-1/2 left-1/2 -translate-x-1/2 ${isUp ? 'bg-[rgba(0,255,65,0.2)] border border-[#00ff41]' : 'bg-[rgba(255,42,42,0.2)] border border-[#ff2a2a]'} `} />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-between px-6 pt-8 pb-12 md:px-12 md:pt-12 md:pb-24 lg:flex-row lg:items-center overflow-hidden terminal-grid"
    >
      {/* Background Chart Motif */}
      <div className="absolute inset-x-0 bottom-0 top-[20%] z-0 pointer-events-none opacity-20 hidden md:block">
        <Candlestick height="30%" isUp={true} left="10%" delay={0.2} />
        <Candlestick height="45%" isUp={false} left="25%" delay={0.4} />
        <Candlestick height="20%" isUp={true} left="40%" delay={0.6} />
        <Candlestick height="60%" isUp={true} left="55%" delay={0.8} />
        <Candlestick height="50%" isUp={false} left="70%" delay={1.0} />
        <Candlestick height="80%" isUp={true} left="85%" delay={1.2} />
      </div>

      <div className="absolute top-20 right-6 md:top-20 md:right-12 z-20">
        <div className="bg-[#050505] border border-[#ffb800] px-4 py-2 font-mono text-[10px] md:text-xs tracking-widest uppercase text-[#ffb800] flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-[#ffb800] animate-pulse" />
          <span>SYS.OVERRIDE: ENGAGED</span>
        </div>
      </div>

      {/* Main Text Content */}
      <motion.div 
        className="z-10 w-full lg:w-3/5 pt-32 lg:pt-0 mt-auto lg:mt-0 lg:pr-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="font-mono text-[#00ff41] text-[10px] mb-4 tracking-widest uppercase">
          {'>'} TARGET PROFILE ACQUIRED
        </div>
        <RevealText 
          text="THE BEAUTIFUL HYPOCRITE" 
          className="font-mono font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[90px] leading-[0.9] tracking-tighter mb-6 uppercase text-[#E0E0E0] text-glow-green" 
          delay={0} 
        />
        
        <motion.p 
          className="font-mono text-sm md:text-base text-[#E0E0E0] opacity-80 max-w-2xl mb-12 lg:mb-20 leading-relaxed uppercase border-l-2 border-[#00ff41] pl-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          DROPOUT. BILLIONAIRE. PHILOSOPHER. FRAUD.<br className="hidden sm:block" />
          THE MOST INTERESTING CONTRADICTION IN INDIAN BUSINESS.
        </motion.p>
        
        {/* Orderbook Mock Layout for Stats */}
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[10px] text-[#606060] uppercase mb-2">++ KEY METRICS ++</div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Stat label="NET WORTH" value="$3.3B" status="profit" />
            <Stat label="MATH SCORE" value="6/100" status="loss" />
            <Stat label="DEGREES" value="0.00" status="warning" />
          </div>
        </div>
      </motion.div>

      {/* Portrait / Parallax / Breathing Element */}
      <div className="absolute lg:relative inset-0 w-full h-[60vh] sm:h-[80vh] lg:h-full lg:w-2/5 flex items-end lg:items-center justify-end lg:justify-center pointer-events-none mt-auto opacity-70 lg:opacity-100 z-0">
        
        {/* Glow effect behind head */}
        <motion.div 
          className="absolute top-[40%] left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#00ff41] mix-blend-screen blur-[150px] z-[-1]" 
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="relative w-full h-[80%] lg:h-full flex justify-end lg:justify-center items-end overflow-hidden"
          style={{ y }}
        >
          {/* Progressive image loading */}
          <picture>
            <img 
              src={ASSETS.hero} 
              alt="Nikhil Kamath Portrait" 
              className="w-auto h-full max-h-[70vh] lg:max-h-[85vh] object-contain object-bottom filter contrast-150 saturate-0 hue-rotate-90 brightness-75 drop-shadow-[0_0_20px_rgba(0,255,65,0.2)] origin-bottom scale-[-1,1]"
              style={{ transform: "scaleX(-1)" }} 
              loading="lazy"
              decoding="async"
            />
          </picture>
          
          {/* Tech overlay over portrait */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1),transparent_2px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay" />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-16 lg:bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:-translate-x-0 z-20 flex flex-col items-center lg:items-start text-[10px] font-mono text-[#00ff41]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="uppercase tracking-widest mb-4">INITIATE SEQUENCE [v]</span>
        <motion.div 
          className="w-[1px] bg-[#00ff41] h-16 origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
