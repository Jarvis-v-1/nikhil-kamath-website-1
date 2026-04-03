import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { useTheme } from '../../hooks/useTheme';

export default function AccuracyChart({ data, inView }) {
  const { theme } = useTheme();
  
  // Create a custom tooltip with glassmorphism to fit the stealth wealth vibe
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isOutlier = payload[0].value > 90;
      
      return (
        <div className={`p-4 rounded-lg backdrop-blur-md border ${
          theme === 'dark' 
            ? 'bg-[#121212]/80 border-white/10 text-white' 
            : 'bg-white/80 border-black/10 text-black'
        } shadow-xl`}>
          <p className="font-mono text-xs uppercase opacity-60 mb-1">{label}</p>
          <p className={`font-grotesk text-2xl font-bold ${isOutlier ? 'text-[#D4FF00]' : ''}`}>
            {payload[0].value}% <span className="text-sm font-normal opacity-60 ml-1">Accuracy</span>
          </p>
          {isOutlier && (
            <p className="text-xs font-mono text-[#D4FF00] mt-2 uppercase">vs. Grandmaster</p>
          )}
        </div>
      );
    }
    return null;
  };

  const chartColor = theme === 'dark' ? '#F8F7F4' : '#121212';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const accentColor = '#D4FF00'; // Chartreuse

  // Memoize data formatting to ensure Recharts mounts it correctly
  const formattedData = useMemo(() => data.map(d => ({ ...d })), [data]);

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="game" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: chartColor, opacity: 0.5, fontSize: 12, fontFamily: 'JetBrains Mono' }}
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
            label={{ position: 'insideTopLeft', value: 'Historical Avg (~5%)', fill: chartColor, opacity: 0.4, fontSize: 10, fontFamily: 'JetBrains Mono' }} 
          />

          {/* Render the line only when in view for the draw animation */}
          {inView && (
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke={chartColor}
              strokeWidth={3}
              dot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
              activeDot={{ r: 8, fill: accentColor, stroke: chartColor, strokeWidth: 2 }}
              animationDuration={2500}
              animationEasing="ease-out"
              isAnimationActive={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
