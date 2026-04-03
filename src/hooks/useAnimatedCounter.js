import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function useAnimatedCounter(target, duration = 2, startOnInView = true, inViewRef = null) {
  const [count, setCount] = useState(0);
  const isInView = useInView(inViewRef || { current: null }, { once: true, amount: 0.5 });
  
  useEffect(() => {
    // If we require it to be in view, but it isn't yet, don't start
    if (startOnInView && inViewRef && !isInView) return;
    
    let startTimestamp = null;
    let animationFrame;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setCount(target * easeOut);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, startOnInView, isInView, inViewRef]);
  
  return { count, isInView };
}
