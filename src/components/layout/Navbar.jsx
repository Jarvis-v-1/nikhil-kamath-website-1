import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Origin', id: 'hero' },
  { label: 'Ritual', id: 'timeline' },
  { label: 'Paradox', id: 'paradox' },
  { label: 'Chess', id: 'chess' },
  { label: 'Archive', id: 'archive' },
  { label: 'Trust', id: 'trust' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling past the first 30vh
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Simple scroll spy logic
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      
      let currentActive = 'hero';
      // Work backwards from bottom to top to find the first section we're currently inside
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the top of the section is anywhere above the middle of the screen
          if (rect.top <= window.innerHeight * 0.5) {
            currentActive = NAV_ITEMS[i].id;
            break;
          }
        }
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to handle initial state if reloading scrolled down
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 w-full z-[90] hidden md:flex border-t border-[rgba(0,255,65,0.2)] bg-[#050505]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center text-[10px] font-mono tracking-widest text-[#606060] px-4 py-1 border-r border-[rgba(0,255,65,0.2)]">
            SYS_NAV
          </div>
          <nav className="flex items-center w-full">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  data-cursor="pointer"
                  className={`relative px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150 border-r border-[rgba(0,255,65,0.1)]
                    ${isActive 
                      ? 'text-[#050505] bg-[#00ff41]' 
                      : 'text-[#E0E0E0] hover:text-[#00ff41] hover:bg-[rgba(0,255,65,0.05)]'
                    }`}
                >
                  <span className="relative z-10">[{item.label}]</span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
