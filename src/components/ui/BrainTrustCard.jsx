import { motion } from 'framer-motion';

export default function BrainTrustCard({ member, delay }) {
  return (
    <motion.div 
      className="group relative flex-1 h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden cursor-crosshair bg-charcoal dark:bg-charcoal-light border border-charcoal-mid/50 dark:border-glass-border isolate"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      data-cursor="pointer"
    >
      {/* Background Image - Grayscale by default, color on hover */}
      <div className="absolute inset-0 z-0">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover object-top filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out transform group-hover:scale-105 origin-bottom"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent group-hover:from-charcoal/90 transition-opacity duration-500" />
      </div>
      
      {/* Chartreuse Hover Border */}
      <div className="absolute inset-0 border-2 border-chartreuse opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        
        <div className="overflow-hidden mb-2">
          <motion.div 
            className="font-mono text-xs uppercase tracking-widest text-chartreuse-dim"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            // {member.title}
          </motion.div>
        </div>

        <h3 className="font-grotesk font-bold text-3xl md:text-4xl lg:text-5xl text-bone mb-4 leading-none transform transition-transform duration-500 group-hover:-translate-y-2">
          {member.name}
        </h3>

        <div className="overflow-hidden">
          <p className="font-inter text-sm md:text-base text-bone-dim leading-relaxed transform translate-y-[200%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            {member.bio}
          </p>
        </div>
        
      </div>
    </motion.div>
  );
}
