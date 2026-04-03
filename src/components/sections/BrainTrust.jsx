import { BRAIN_TRUST_DATA } from '../../data';
import BrainTrustCard from '../ui/BrainTrustCard';
import SectionHeading from '../ui/SectionHeading';
import { ASSETS } from '../../utils/constants';

export default function BrainTrust() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-bone dark:bg-[var(--bg-secondary)] overflow-hidden transition-colors duration-500 z-10 px-6 md:px-12">
      
      {/* Background Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-opacity duration-500 max-w-[800px] max-h-[800px]"
        style={{
          backgroundImage: `url(${ASSETS.gruhasBg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          title="The Brain Trust" 
          subtitle="Inner Circle"
          align="center"
          className="mb-16 md:mb-24"
        />
        
        <p className="text-center font-inter text-charcoal-mid dark:text-bone-dim max-w-2xl mx-auto mt-[-3rem] mb-16">
          No empire is built alone. These three made Nikhil's contradictions operational. Hover to reveal.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full justify-center">
          {BRAIN_TRUST_DATA.map((member, index) => (
            <BrainTrustCard 
              key={member.id} 
              member={member} 
              delay={index * 0.2} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
