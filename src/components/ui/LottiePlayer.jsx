import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useInView } from 'framer-motion';

export default function LottiePlayer({ animationPath, loop = true, autoplayObj = true, triggerOnClick = false, size = "w-32 h-32", className = "" }) {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  
  // Use Framer Motion's useInView to only play when entering screen
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    // Fetch the animation JSON manually so we can pass it to lottie-react
    fetch(animationPath)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading lottie anim", err));
  }, [animationPath]);

  useEffect(() => {
    if (!lottieRef.current || !animationData) return;

    if (triggerOnClick) {
      lottieRef.current.stop();
      return; 
    }

    if (autoplayObj && isInView) {
      // The `loop` property is already handled natively by passing it to the <Lottie /> component prop
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [isInView, animationData, autoplayObj, loop, triggerOnClick]);

  const handleClick = () => {
    if (triggerOnClick && lottieRef.current && animationData) {
      lottieRef.current.goToAndPlay(0, true);
    }
  };

  if (!animationData) return <div className={`${size} ${className} opacity-0 bg-transparent`} ref={containerRef} />;

  return (
    <div 
      ref={containerRef} 
      className={`${size} ${className} ${triggerOnClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      data-cursor={triggerOnClick ? "pointer" : ""}
    >
      <Lottie 
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
