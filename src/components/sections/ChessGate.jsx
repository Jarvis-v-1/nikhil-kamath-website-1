import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AccuracyChart from '../ui/AccuracyChart';
import SectionHeading from '../ui/SectionHeading';
import { CHESS_DATA } from '../../data';
import { ASSETS } from '../../utils/constants';

export default function ChessGate() {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isChartInView = useInView(chartRef, { once: true, amount: 0.5 });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 overflow-hidden bg-bone dark:bg-charcoal text-charcoal dark:text-bone z-10 transition-colors duration-500">
      
      {/* Background Textures */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `url(${ASSETS.givingPledgeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'grayscale(100%)'
        }}
      />
      
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] z-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none transition-opacity duration-500 flex items-center justify-center">
        <img src={ASSETS.anandShadow} alt="" className="object-contain w-full h-full filter saturate-0 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="The 98.9% Human" 
          subtitle="Chess-Gate"
          className="mb-12"
        />

        {/* Hero Number */}
        <div className="relative mb-16 md:mb-24">
          <motion.div 
            className="font-grotesk font-bold leading-none tracking-tighter text-[100px] sm:text-[140px] md:text-[200px] lg:text-[250px] text-charcoal/10 dark:text-bone/10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="relative">
              98.9<span className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] align-top">%</span>
              <motion.div 
                className="absolute inset-0 text-chartreuse mix-blend-multiply dark:mix-blend-screen"
                initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
                animate={isInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              >
                98.9<span className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] align-top">%</span>
              </motion.div>
            </span>
          </motion.div>
          
          <motion.div 
            className="text-lg md:text-xl font-serif italic max-w-xl text-charcoal-mid dark:text-bone-dim mt-4 pl-2 border-l-2 border-chartreuse relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            "This was for fun and charity. In hindsight, it was quite silly. Apologies."
            <span className="block mt-2 font-mono text-xs uppercase not-italic opacity-50 tracking-widest">— Nikhil Kamath, June 2021</span>
          </motion.div>
        </div>

        {/* Narrative & Chart Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Narrative Text */}
          <div className="space-y-8 text-base md:text-lg text-charcoal-mid dark:text-bone-dim font-inter leading-relaxed relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              In June 2021, a billionaire sat down to play chess against a five-time world champion. He won. <strong className="text-charcoal dark:text-bone">It was too perfect.</strong>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The match was for charity — COVID-19 relief. Nikhil Kamath vs. Viswanathan Anand. The billionaire dropout against the grandmaster. Computer analysis showed Nikhil's accuracy at 98.9% — a number that would make Magnus Carlsen raise an eyebrow. His regular games? Accuracy between 0.6% and 10.9%.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              The internet was unforgiving. Forbes ran a piece titled "Liar's Chess." But within 24 hours, <strong className="text-chartreuse-dim dark:text-chartreuse">Anand himself asked Chess.com to restore Nikhil's account.</strong>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              This is perhaps the most humanizing moment in Nikhil's public life. The man who optimizes everything — every investment, every routine, every molecule of air he breathes — tried to optimize a charity match against a living legend. The algorithm couldn't teach him what Anand demonstrated for free: that real mastery includes knowing when to let someone save face.
            </motion.p>
          </div>

          {/* Chart Section */}
          <div className="relative">
            <div className="mb-6 flex justify-between font-mono text-xs text-charcoal-mid dark:text-bone-dim uppercase tracking-widest">
              <span>Historical Accuracy</span>
              <span className="text-chartreuse">The Anomaly</span>
            </div>
            
            <div 
              ref={chartRef}
              className="w-full h-[350px] md:h-[400px] glass-panel dark:glass-panel-dark rounded-2xl p-6"
            >
              <AccuracyChart data={CHESS_DATA} inView={isChartInView} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
