import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, align = "left", className = "" }) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'} ${className}`}>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="font-mono text-xs md:text-sm tracking-widest text-secondary md:dark:text-chartreuse mb-3 uppercase"
      >
        // {subtitle}
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="font-grotesk font-bold text-3xl md:text-5xl text-primary uppercase"
      >
        {title}
      </motion.h2>
    </div>
  );
}
