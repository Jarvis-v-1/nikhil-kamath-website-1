import { useState, useEffect } from 'react';
import { ThemeProvider } from './hooks/useTheme';

import CustomCursor from './components/layout/CustomCursor';
import NoiseOverlay from './components/layout/NoiseOverlay';
import Navbar from './components/layout/Navbar';

import Preloader from './components/sections/Preloader';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import ParadoxLens from './components/sections/ParadoxLens';
import ChessGate from './components/sections/ChessGate';
import Scrapbook from './components/sections/Scrapbook';
import BrainTrust from './components/sections/BrainTrust';
import Footer from './components/sections/Footer';

function AppContent() {
  const [loading, setLoading] = useState(true);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Content wrapper with opacity transition when loading finishes */}
      <div 
        className="w-full transition-opacity duration-1000 ease-in-out"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <main>
          <div id="hero">
            <Hero />
          </div>
          <div id="timeline">
            <Timeline />
          </div>
          <div id="paradox">
            <ParadoxLens />
          </div>
          <div id="chess">
            <ChessGate />
          </div>
          <div id="archive">
            <Scrapbook />
          </div>
          <div id="trust">
            <BrainTrust />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
