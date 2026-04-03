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
    <section id="archive" className="relative w-full h-[120vh] min-h-[900px] overflow-hidden bg-[#050505] text-[#E0E0E0] transition-colors duration-500 py-24 md:py-32 terminal-grid">
      
      {/* Section Header - Non-overlapping */}
      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none md:max-w-xl">
        <SectionHeading 
          title="The Deep Cuts" 
          subtitle={isMobile ? "Tap to decrypt" : "Drag & Decrypt"}
          className="mb-4 text-[#E0E0E0]"
        />
        <p className="font-mono text-xs md:text-sm text-[#606060] uppercase tracking-widest max-w-sm mt-[-1rem]">
          Hidden data packets. {isMobile ? 'Tap packets to decode.' : 'Hover to preview, drag to organize.'}
        </p>
      </div>

      {/* The "Desk" Surface */}
      <div 
        ref={containerRef} 
        className="absolute inset-x-6 md:inset-x-12 top-[320px] md:top-[280px] bottom-12 border border-[rgba(0,255,65,0.2)] bg-[rgba(0,255,65,0.02)] pointer-events-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05),transparent_2px)] bg-[size:100%_4px] mix-blend-overlay pointer-events-none" />
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
