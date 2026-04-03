import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

export default function AccuracyChart({ data, inView }) {
  
  // Custom tooltip styled like a terminal readout
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isOutlier = payload[0].value > 90;
      
      return (
        <div className={`p-4 bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl relative`}>
          {/* Decorative Corner Brackets */}
          <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isOutlier ? 'border-[#ff2a2a]' : 'border-[#00ff41]'} opacity-50`} />
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isOutlier ? 'border-[#ff2a2a]' : 'border-[#00ff41]'} opacity-50`} />
          
          <p className="font-mono text-[10px] text-[#606060] uppercase mb-1">{label}</p>
          <p className={`font-mono text-xl md:text-2xl font-bold ${isOutlier ? 'text-[#ff2a2a] text-glow-red' : 'text-[#E0E0E0]'}`}>
            {payload[0].value}% <span className="text-xs font-normal opacity-50 ml-1">ACCURACY</span>
          </p>
          {isOutlier && (
            <p className="text-[10px] font-mono text-[#ff2a2a] mt-2 tracking-widest uppercase animate-pulse">! SYS_ANOMALY DETECTED</p>
          )}
        </div>
      );
    }
    return null;
  };

  const chartColor = '#00ff41';
  const gridColor = 'rgba(0, 255, 65, 0.2)';

  const formattedData = useMemo(() => data.map(d => ({ ...d })), [data]);

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="game" 
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
            tick={{ fill: '#606060', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            dy={10}
          />
          <YAxis 
            hide={true} 
            domain={[0, 100]} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: gridColor, strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          
          {/* Average Reference Line */}
          <ReferenceLine 
            y={5} 
            stroke={gridColor} 
            strokeDasharray="3 3" 
            label={{ position: 'insideTopLeft', value: 'AVG BASELINE', fill: '#606060', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
          />

          {/* Render the line only when in view for the draw animation */}
          {inView && (
            <Line
              type="step"
              dataKey="accuracy"
              stroke={chartColor}
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (!payload) return null;
                const isOutlier = payload.accuracy > 90;
                return (
                  <circle 
                    key={`dot-${payload.game}`}
                    cx={cx} 
                    cy={cy} 
                    r={isOutlier ? 6 : 0} 
                    fill={isOutlier ? '#ff2a2a' : chartColor} 
                    stroke="none"
                  />
                );
              }}
              activeDot={{ r: 6, fill: '#ff2a2a', stroke: 'none' }}
              animationDuration={2000}
              animationEasing="linear"
              isAnimationActive={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
