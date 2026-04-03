import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../ui/RevealText';
import { ASSETS } from '../../utils/constants';

function Stat({ label, value, prefix = "", suffix = "" }) {
  // Simple intersection observer animation for stats
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <div ref={ref} className="text-center sm:text-left">
      <motion.p 
        className="font-mono text-xs uppercase tracking-widest text-secondary mb-1"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.p>
      <motion.p 
        className="font-grotesk font-bold text-3xl md:text-5xl text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      >
        {prefix}{value}{suffix}
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax move image upwards slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-between px-6 pt-8 pb-12 md:px-12 md:pt-12 md:pb-24 lg:flex-row lg:items-center overflow-hidden"
    >
      {/* Top Left Navigation (Empty or space for logo) */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
      </div>
      
      <div className="absolute top-6 right-6 md:top-12 md:right-12 z-20">
        <div className="glass-panel px-4 py-2 font-mono text-[10px] md:text-xs tracking-widest uppercase rounded-full text-secondary flex items-center gap-2">
          <span className="text-secondary opacity-70">Est. 1986</span>
          <span className="w-1 h-1 rounded-full bg-chartreuse inline-block animate-pulse" />
          <span className="hidden sm:inline text-secondary opacity-70">Shimoga → Bengaluru</span>
        </div>
      </div>

      {/* Main Text Content */}
      <motion.div 
        className="z-10 w-full lg:w-3/5 pt-24 lg:pt-0 mt-auto lg:mt-0 lg:pr-12"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <RevealText 
          text="THE BEAUTIFUL HYPOCRITE" 
          className="font-grotesk font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-tight mb-6 uppercase text-charcoal dark:text-bone" 
          delay={0} 
        />
        
        <motion.p 
          className="font-inter text-lg md:text-xl text-secondary max-w-2xl mb-12 lg:mb-20 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dropout. Billionaire. Philosopher. Fraud. <br className="hidden sm:block" />
          The most interesting contradiction in Indian business.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-start gap-8 sm:gap-16">
          <Stat label="Net Worth" value="3.3" prefix="$" suffix="B" />
          <Stat label="Math Score" value="6" suffix="/100" />
          <Stat label="Degrees Earned" value="0" />
        </div>
      </motion.div>

      {/* Portrait / Parallax / Breathing Element */}
      <div className="absolute lg:relative inset-0 w-full h-[60vh] sm:h-[80vh] lg:h-full lg:w-2/5 flex items-end lg:items-center justify-end lg:justify-center pointer-events-none mt-auto opacity-40 lg:opacity-100 z-0">
        
        {/* Glow effect behind head (Breathing pulse) */}
        <motion.div 
          className="absolute top-[40%] left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-chartreuse mix-blend-screen blur-[120px] z-[-1]" 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="relative w-full h-[80%] lg:h-full flex justify-end lg:justify-center items-end overflow-hidden"
          style={{ y }}
          animate={{
            y: [0, -15, 0], // Subtle idle breathing override on top of scroll parallax
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Progressive image loading */}
          <picture>
            <img 
              src={ASSETS.hero} 
              alt="Nikhil Kamath Portrait" 
              className="w-auto h-full max-h-[70vh] lg:max-h-[85vh] object-contain object-bottom filter dark:brightness-110 contrast-125 saturate-110 drop-shadow-2xl grayscale origin-bottom scale-[-1,1]"
              style={{ transform: "scaleX(-1)" }} // Flip image to face inwards
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:-translate-x-0 z-20 flex flex-col items-center lg:items-start text-xs font-mono text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="uppercase tracking-widest mb-4">Scroll to Decode</span>
        <motion.div 
          className="w-[1px] bg-primary h-16 origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
