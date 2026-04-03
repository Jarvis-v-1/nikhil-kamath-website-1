import { ASSETS } from '../../utils/constants';

export default function NoiseOverlay() {
  return (
    <>
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url(${ASSETS.noise})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />
      <div className="fixed inset-0 z-50 pointer-events-none scanlines opacity-50" />
    </>
  );
}
