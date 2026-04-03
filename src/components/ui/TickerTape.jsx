import { motion } from 'framer-motion';

const TICKER_DATA = [
  { label: 'MATH SCORE', value: '6/100', status: 'loss', change: '-94.00' },
  { label: 'NW', value: '$3.3B', status: 'profit', change: '+12.5%' },
  { label: 'CHESS ACCURACY', value: '98.9%', status: 'profit', change: 'SYS_ERR_BNND' },
  { label: 'BOOKS/WK', value: '1-2', status: 'profit', change: '+1' },
  { label: 'CALL CENTER PAY', value: '₹8,000', status: 'loss', change: '-INFLATION' },
  { label: 'DROPOUT LEL', value: 'CLASS 10', status: 'warning', change: 'MAX' },
  { label: 'GIVING PLEDGE', value: '50%', status: 'profit', change: 'COMMITTED' },
  { label: 'ZERODHA VAL', value: '₹64,800CR', status: 'profit', change: 'UP' }
];

export default function TickerTape() {
  return (
    <div className="w-full bg-[#050505] border-b border-t border-[rgba(0,255,65,0.2)] py-1 overflow-hidden sticky top-0 z-40 flex items-center shadow-[0_0_15px_rgba(0,255,65,0.1)]">
      <div className="bg-[#0a0a0a] text-[#E0E0E0] px-3 font-mono text-xs hidden md:flex items-center absolute left-0 z-10 h-full border-r border-[rgba(0,255,65,0.2)]">
        LIVE_FEED_NK <span className="w-2 h-2 rounded-full bg-[#00ff41] ml-2 animate-pulse" />
      </div>
      
      <div className="flex w-full md:pl-32">
        <motion.div
          className="flex whitespace-nowrap items-center gap-8 font-mono text-xs uppercase tracking-widest"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25
          }}
        >
          {/* Duplicate list to create infinite scroll effect */}
          {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#606060]">{item.label}</span>
              <span className="text-[#E0E0E0] font-bold">{item.value}</span>
              <span className={
                item.status === 'profit' ? 'text-[#00ff41]' : 
                item.status === 'loss' ? 'text-[#ff2a2a]' : 
                'text-[#ffb800]'
              }>
                {item.status === 'profit' ? '▲' : item.status === 'loss' ? '▼' : '■'} {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
