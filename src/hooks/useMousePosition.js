import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      
      // Update CSS variables for clip-path reveal (Paradox Lens)
      document.documentElement.style.setProperty('--cx', `${ev.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${ev.clientY}px`);
    };
    
    const updateHoverState = ev => {
      const target = ev.target;
      const isInteractive = target.closest('[data-cursor="pointer"]') || 
                           target.tagName.toLowerCase() === 'a' || 
                           target.tagName.toLowerCase() === 'button';
                           
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return { ...mousePosition, isHovering };
}
