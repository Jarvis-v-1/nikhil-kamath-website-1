import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      data-cursor="pointer"
      className="p-1 rounded-full glass-panel flex items-center relative overflow-hidden group"
      aria-label="Toggle Theme"
    >
      {/* Indicator Pill */}
      <motion.div 
        className="absolute top-1 bottom-1 bg-charcoal dark:bg-bone rounded-full shadow-sm flex items-center"
        initial={false}
        animate={{
          left: theme === 'dark' ? '50%' : '4px',
          right: theme === 'dark' ? '4px' : '50%',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      
      {/* Light Mode Button */}
      <div className={`relative z-10 w-20 py-2 flex items-center justify-center transition-colors text-[10px] sm:text-xs font-mono font-bold
        ${theme === 'light' ? 'text-bone' : 'text-charcoal/60 dark:text-bone-dim group-hover:text-charcoal dark:group-hover:text-bone'}`}>
        <span className="mr-1 sm:mr-2">☀️</span> LIGHT
      </div>
      
      {/* Dark Mode Button */}
      <div className={`relative z-10 w-20 py-2 flex items-center justify-center transition-colors text-[10px] sm:text-xs font-mono font-bold
        ${theme === 'dark' ? 'text-charcoal' : 'text-charcoal/60 dark:text-bone-dim group-hover:text-charcoal dark:group-hover:text-bone'}`}>
        <span className="mr-1 sm:mr-2">🌙</span> DARK
      </div>
    </button>
  );
}
