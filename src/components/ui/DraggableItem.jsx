import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import LottiePlayer from './LottiePlayer';

export default function DraggableItem({ item, containerRef, isMobile }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  // Set random initial rotation between -8 and +8 degrees
  useEffect(() => {
    setRotation(Math.floor(Math.random() * 16) - 8);
  }, []);

  const handleInteraction = () => {
    // Bring to front
    setZIndex(prev => prev + 10);
    // Flip if mobile, otherwise just interactive sound/feel
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseDown = () => {
    if (!isMobile) {
      setZIndex(prev => prev + 10);
    }
  };

  return (
    <motion.div
      layout
      drag={!isMobile}
      dragConstraints={containerRef}
      dragElastic={0.05}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 100 }}
      onMouseDown={handleMouseDown}
      onClick={handleInteraction}
      onHoverStart={() => !isMobile && setIsFlipped(true)}
      onHoverEnd={() => !isMobile && setIsFlipped(false)}
      initial={{ rotate: rotation, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`cursor-grab relative ${
        isFlipped 
          ? 'w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-50' 
          : `${item.width} ${item.aspect}`
      }`}
      style={{ zIndex: isFlipped ? 100 : zIndex }}
      data-cursor="pointer"
    >
      <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
        
        {/* Card Inner - handles 3D flip */}
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of Card (Image) */}
          <div 
            className="absolute inset-0 backface-hidden bg-[#0A0A0A] p-2 md:p-3 shadow-2xl border border-[rgba(0,255,65,0.3)] filter sepia"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-[#1A1A1A] relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover filter grayscale contrast-125"
                draggable={false}
              />
              
              {/* Optional Easter Egg Label */}
              {item.interactive && !isFlipped && (
                <div className="absolute inset-0 bg-[rgba(0,255,65,0.1)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10" onClick={(e) => {
                  if (item.interactive) {
                    // Handled by parent or inner Lottie trigger if needed
                  }
                }}>
                  <span className="bg-[#050505] text-[#00ff41] border border-[#00ff41] text-xs px-2 py-1 rotate-[0deg] font-mono shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                    DECRYPT_FILE
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back of Card (Text Story) */}
          <div 
            className="absolute inset-0 backface-hidden bg-[#0a0a0a] border border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.1)] p-3 md:p-5 flex flex-col justify-start transform rotate-y-180"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#00ff41] opacity-50 rounded-none z-30" /> {/* Terminal header notch */}
            
            <div className="w-full h-full overflow-y-auto custom-scrollbar pt-4 flex flex-col items-center justify-center">
              {item.interactive && item.lottie ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <LottiePlayer 
                    animationPath={item.lottie} 
                    loop={false}
                    triggerOnClick={true}
                    size="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                  />
                  <p className="font-mono text-[9px] md:text-[10px] mt-4 text-[#E0E0E0] uppercase tracking-widest leading-relaxed">
                    {item.easterEggLabel}
                  </p>
                </div>
              ) : (
                <div className="terminal-grid p-2 w-full h-full bg-[#050505] border border-[rgba(0,255,65,0.2)] flex items-center">
                  <p className="font-mono text-[10px] md:text-xs text-[#00ff41] leading-relaxed font-normal text-left">
                    <span className="animate-pulse mr-2">_&gt;</span>{item.backText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
