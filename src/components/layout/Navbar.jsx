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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] hidden md:block" // Hidden on mobile to save space
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <nav className="glass-panel dark:glass-panel-dark rounded-full px-2 py-2 flex items-center shadow-2xl border border-charcoal/5 dark:border-bone/10 transition-colors duration-500">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  data-cursor="pointer"
                  className={`relative px-4 py-2 font-mono text-[10px] uppercase tracking-widest rounded-full transition-colors duration-300
                    ${isActive 
                      ? 'text-charcoal' // Text color when active (due to chartreuse bg)
                      : 'text-charcoal-mid hover:text-charcoal dark:text-bone-dim dark:hover:text-bone'
                    }`}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-chartreuse rounded-full z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
