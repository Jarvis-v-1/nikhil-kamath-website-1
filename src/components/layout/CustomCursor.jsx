import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ASSETS } from '../../utils/constants';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Use springs for smooth follower physics
  const cursorX = useSpring(0, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 30 });

  useEffect(() => {
    // Check if device is touch or small screen
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Also update CSS vars for clip-path revealing
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
    };

    const updateHoverState = (e) => {
      const target = e.target;
      const isInteractive = target.closest('[data-cursor="pointer"]') || 
                           target.tagName.toLowerCase() === 'a' || 
                           target.tagName.toLowerCase() === 'button';
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. Small dot (always active, no spring, raw mouse position) */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)] z-[100] pointer-events-none"
        style={{ 
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
          opacity: isHovering ? 0 : 1
        }}
      />
      
      {/* 2. Knight Icon / Crosshair (spring-based follower, only on hover) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 z-[100] pointer-events-none"
        style={{
          position: "fixed",
          border: '1px solid rgba(0, 255, 65, 0.5)',
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovering ? 1.2 : 0.5, 
          opacity: isHovering ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1px] h-full bg-[#00ff41] opacity-30" />
          <div className="h-[1px] w-full bg-[#00ff41] opacity-30 absolute" />
          <img src={ASSETS.cursor} alt="" className="w-4 h-4 relative z-10 invert brightness-200" />
        </div>
      </motion.div>
    </>
  );
}
