import { useRef, useState, useEffect } from 'react';
import { SCRAPBOOK_ITEMS } from '../../data';
import DraggableItem from '../ui/DraggableItem';
import SectionHeading from '../ui/SectionHeading';

export default function Scrapbook() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Slight delay to ensure refs are ready before mounting draggable items
    const timer = setTimeout(() => setIsReady(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="archive" className="relative w-full h-[120vh] min-h-[900px] overflow-hidden bg-bone dark:bg-charcoal text-charcoal dark:text-bone transition-colors duration-500 py-24 md:py-32">
      
      {/* Section Header - Non-overlapping */}
      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none md:max-w-xl">
        <SectionHeading 
          title="The Deep Cuts" 
          subtitle={isMobile ? "Tap to reveal" : "Drag & Discover"}
          className="mb-4"
        />
        <p className="font-mono text-xs md:text-sm text-charcoal-mid dark:text-bone-dim uppercase tracking-widest max-w-sm mt-[-1rem]">
          The stories that 99% of his followers don't know. {isMobile ? 'Tap cards to flip them.' : 'Hover to read, drag to organize.'}
        </p>
      </div>

      {/* The "Desk" Surface */}
      <div 
        ref={containerRef} 
        className="absolute inset-x-6 md:inset-x-12 top-[320px] md:top-[280px] bottom-12 rounded-2xl border border-charcoal/5 dark:border-bone/5 bg-black/[0.02] dark:bg-white/[0.02] pointer-events-none"
      >
        {/* Scattered Items */}
        {isReady && SCRAPBOOK_ITEMS.map((item, index) => {
          // Calculate a wider scatter grid (3 columns x 2 rows roughly)
          const col = index % 3;
          const row = Math.floor(index / 3);
          
          const xOffset = isMobile ? 10 : (col * 30) + 5;
          const yOffset = isMobile ? (index * 20) + 5 : (row * 40) + 5;
          
          return (
            <div 
              key={item.id}
              className="absolute pointer-events-auto"
              style={{ 
                left: `${xOffset}%`, 
                top: `${yOffset}%`
              }}
            >
              <DraggableItem 
                item={item} 
                containerRef={containerRef} 
                isMobile={isMobile}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
