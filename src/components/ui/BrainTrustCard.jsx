import { motion } from 'framer-motion';

export default function BrainTrustCard({ member, delay }) {
  return (
    <motion.div 
      className="group relative flex-1 h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden cursor-crosshair bg-[#0a0a0a] border border-[rgba(0,255,65,0.2)] isolate"
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
          className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-40 group-hover:filter-none group-hover:opacity-100 transition-all duration-700 ease-out transform group-hover:scale-105 origin-bottom mix-blend-screen"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent group-hover:from-[#050505]/90 transition-opacity duration-500" />
      </div>
      
      {/* Chartreuse Hover Border */}
      <div className="absolute inset-0 border-2 border-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        
        <div className="overflow-hidden mb-2">
          <motion.div 
            className="font-mono text-xs uppercase tracking-widest text-[#00ff41] text-glow-green"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            // {member.title}
          </motion.div>
        </div>

        <h3 className="font-mono uppercase font-bold text-3xl md:text-4xl lg:text-5xl text-[#E0E0E0] mb-4 leading-none transform transition-transform duration-500 group-hover:-translate-y-2 border-b border-[rgba(0,255,65,0.3)] pb-2 inline-block">
          {member.name}
        </h3>

        <div className="overflow-hidden">
          <p className="font-mono text-[10px] md:text-xs text-[#606060] uppercase leading-relaxed transform translate-y-[200%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span className="text-[#00ff41] mr-2">_&gt;</span>{member.bio}
          </p>
        </div>
        
      </div>
    </motion.div>
  );
}
