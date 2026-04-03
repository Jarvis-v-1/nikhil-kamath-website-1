import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LottiePlayer from '../ui/LottiePlayer';
import { ANIMATIONS } from '../../utils/constants';

export default function Preloader({ onComplete }) {
  const [time, setTime] = useState([5, 30, 0]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Accelerated countdown from 05:30:00 to 00:00:00
    const interval = setInterval(() => {
      setTime(prev => {
        let [h, m, s] = prev;
        
        // Fast tick logic to reach 0 in ~2 seconds
        s -= 45;
        if (s < 0) {
          s += 60;
          m -= 17;
        }
        if (m < 0) {
          m += 60;
          h -= 2;
        }
        
        if (h <= 0 && m <= 0 && s <= 0) {
          clearInterval(interval);
          setIsDone(true);
          // Wait for sunrise animation to complete before removing preloader
          setTimeout(() => onComplete(), 1500);
          return [0, 0, 0];
        }
        
        return [Math.max(0, h), Math.max(0, m), Math.max(0, s)];
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Pad numbers with leading zeros
  const formatNum = (num) => num.toString().padStart(2, '0');

  // Digit component with odometer animation
  const Digit = ({ val }) => (
    <div className="relative h-[80px] sm:h-[120px] md:h-[160px] overflow-hidden leading-none tabular-nums text-chartreuse">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={val}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.15 }}
          className="absolute inset-0 flex items-center justify-center font-mono font-medium text-6xl sm:text-8xl md:text-[120px]"
        >
          {val}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-bone overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={isDone ? { opacity: [1, 1, 0], scale: [1, 0.95, 0.9] } : {}}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
    >
      {/* Clock Display */}
      <div className="flex items-center justify-center z-10">
        <div className="flex">
          <Digit val={formatNum(time[0])[0]} />
          <Digit val={formatNum(time[0])[1]} />
        </div>
        <span className="text-6xl sm:text-8xl md:text-[120px] font-mono text-chartreuse-dim mx-1 sm:mx-4 opacity-50 pb-2">:</span>
        <div className="flex">
          <Digit val={formatNum(time[1])[0]} />
          <Digit val={formatNum(time[1])[1]} />
        </div>
        <span className="text-6xl sm:text-8xl md:text-[120px] font-mono text-chartreuse-dim mx-1 sm:mx-4 opacity-50 pb-2">:</span>
        <div className="flex">
          <Digit val={formatNum(time[2])[0]} />
          <Digit val={formatNum(time[2])[1]} />
        </div>
      </div>
      
      {/* Narrative Intro Text */}
      <motion.div 
        className="mt-8 sm:mt-12 text-sm sm:text-base font-mono text-bone-dim tracking-widest uppercase text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone ? 1 : 0.6 }}
      >
        {!isDone ? (
          <>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="block mb-2"
            >
              ↓ counting down ↓
            </motion.span>
            Initializing Ritual
          </>
        ) : (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-chartreuse font-bold block"
          >
            THE DAY BEGINS.
          </motion.span>
        )}
      </motion.div>

      {/* Sunrise Animation Layer */}
      <motion.div 
        className="absolute bottom-0 w-full flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isDone ? 0.3 : 0, 
          y: isDone ? 40 : 100 
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <LottiePlayer 
          animationPath={ANIMATIONS.sunrise} 
          loop={false}
          autoplayObj={isDone}
          size="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"
        />
      </motion.div>
    </motion.div>
  );
}
