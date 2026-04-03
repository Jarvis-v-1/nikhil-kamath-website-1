import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_DATA } from '../../data';
import LottiePlayer from '../ui/LottiePlayer';
import SectionHeading from '../ui/SectionHeading';
import { ANIMATIONS } from '../../utils/constants';

function TimelineNode({ data, index }) {
  const Icon = data.icon;
  
  return (
    <div className="w-[300px] md:w-[400px] flex-shrink-0 flex flex-col items-start px-8 border-l border-[rgba(0,255,65,0.3)] relative">
      {/* Node Dot -> Terminal Tic */}
      <div className="absolute -left-[3px] top-0 w-[5px] h-[15px] bg-[#00ff41]" />
      
      {/* Time & Icon */}
      <div className="flex items-center gap-4 mb-6 mt-[-4px]">
        <div className="font-mono text-xl md:text-2xl text-[#00ff41] text-glow-green font-bold tracking-tighter">
          [{data.time}]
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-[#ffb800]">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="font-mono uppercase font-bold text-lg md:text-xl text-[#E0E0E0] mb-3 border-b border-[rgba(0,255,65,0.2)] pb-2 inline-block">
        &gt; {data.title}
      </h3>
      <p className="font-mono text-xs md:text-sm text-[#606060] leading-relaxed h-[80px] uppercase">
        {data.desc}
      </p>

      {/* Box element overlaying the bottom mimicking data processing */}
      <div className="mt-8 w-full h-[120px] flex items-center justify-center border border-[#1a1a1a] bg-[#0A0A0A] overflow-hidden relative group">
        <div className="absolute inset-0 bg-[rgba(0,255,65,0.05)] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1),transparent_2px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay" />
        
        {data.anim === 'sunrise' ? (
          <LottiePlayer 
            animationPath={ANIMATIONS.sunrise} 
            loop={true} 
            size="w-[80px] h-[80px]" 
          />
        ) : data.anim === 'coffee' ? (
          <LottiePlayer 
            animationPath={ANIMATIONS.coffee} 
            loop={false} 
            size="w-[80px] h-[80px]" 
          />
        ) : (
          <div className="font-mono text-[10px] text-[#606060] uppercase tracking-widest text-center w-full">
            <div className="w-full flex justify-between px-2 mb-2 text-[rgba(0,255,65,0.5)]">
               <span>VOL</span><span>CHG</span>
            </div>
            <div className="w-full flex justify-between px-2">
               <span>1.2M</span><span className="text-[#00ff41]">+2.4%</span>
            </div>
          </div>
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

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  return (
    <motion.section 
      ref={targetRef} 
      className="relative h-[300vh] w-full bg-[#050505] terminal-grid"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-visible py-12 md:py-24">
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto z-10 mb-8 md:mb-16 mt-16 md:mt-0">
          <SectionHeading 
            title="A Beautiful Hypocrite's Day" 
            subtitle="24-Hour OS"
            className="md:max-w-2xl text-[#E0E0E0]"
          />
        </div>

        <motion.div 
          style={{ x }} 
          className="flex items-center pl-6 md:pl-12 pt-12 pb-12 w-max relative z-10"
        >
          {/* Timeline continuous connecting line */}
          <div className="absolute top-[12px] left-0 w-full h-[1px] bg-[rgba(0,255,65,0.3)]" />
          
          {TIMELINE_DATA.map((nodeData, idx) => (
            <TimelineNode key={idx} data={nodeData} index={idx} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
