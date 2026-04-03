import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_DATA } from '../../data';
import LottiePlayer from '../ui/LottiePlayer';
import SectionHeading from '../ui/SectionHeading';
import { ANIMATIONS } from '../../utils/constants';

function TimelineNode({ data, index }) {
  const Icon = data.icon;
  
  return (
    <div className="w-[300px] md:w-[400px] flex-shrink-0 flex flex-col items-start px-8 border-l border-charcoal-mid dark:border-glass-border relative">
      {/* Node Dot */}
      <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-chartreuse" />
      
      {/* Time & Icon */}
      <div className="flex items-center gap-4 mb-6 mt-[-4px]">
        <div className="font-mono text-xl md:text-2xl text-bone font-bold tracking-tighter">
          {data.time}
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-bone-dim">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="font-grotesk font-bold text-xl md:text-2xl text-bone mb-3">
        {data.title}
      </h3>
      <p className="font-inter text-sm md:text-base text-bone-dim leading-relaxed h-[80px]">
        {data.desc}
      </p>

      {/* Optional Lottie Element */}
      <div className="mt-8 w-full h-[160px] flex items-center justify-center border border-dashed border-charcoal-mid/30 dark:border-glass-border/30 rounded-xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-charcoal/5 dark:bg-bone/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {data.anim === 'sunrise' && (
          <LottiePlayer 
            animationPath={ANIMATIONS.sunrise} 
            loop={true} 
            size="w-[120px] h-[120px]" 
          />
        )}
        {data.anim === 'coffee' && (
          <LottiePlayer 
            animationPath={ANIMATIONS.coffee} 
            loop={false} 
            size="w-[120px] h-[120px]" 
          />
        )}
        {!data.anim && (
          <span className="font-mono text-[10px] text-charcoal-mid/50 dark:text-bone-dim/50 uppercase tracking-widest">
            {data.title.split(' ')[1]} Protocol
          </span>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll to horizontal
  // Need to adjust range based on total width. 8 items * ~400px = ~3200px
  // We'll translate from 0 to -[amount]
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);
  
  // Background color mapping: Keeps it firmly dark to prevent sudden flashes
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [
      "var(--color-charcoal-light)", 
      "var(--color-charcoal)",  
      "var(--color-charcoal-mid)", 
      "var(--color-charcoal)"    
    ]
  );

  return (
    <motion.section 
      ref={targetRef} 
      className="relative h-[300vh] w-full"
      style={{ backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-visible py-12 md:py-24">
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto z-10 mb-8 md:mb-16 mt-16 md:mt-0">
          <SectionHeading 
            title="A Beautiful Hypocrite's Day" 
            subtitle="24-Hour OS"
            className="md:max-w-2xl dark" // Force dark heading text for dark background
          />
        </div>

        <motion.div 
          style={{ x }} 
          className="flex items-center pl-6 md:pl-12 pt-12 pb-12 w-max relative z-10"
        >
          {/* Timeline continuous connecting line */}
          <div className="absolute top-[12px] left-0 w-full h-[1px] bg-charcoal-mid dark:bg-glass-border" />
          
          {TIMELINE_DATA.map((nodeData, idx) => (
            <TimelineNode key={idx} data={nodeData} index={idx} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
