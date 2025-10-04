// src/components/dashboard/AirQualityChart.tsx
import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface DataPoint {
  time: string;
  value: number;
}

interface AirQualityChartProps {
  data: DataPoint[];
}

const AirQualityChart: React.FC<AirQualityChartProps> = ({ data }) => {
  // Formate l'heure pour l'affichage
  const formatXAxis = (time: string) => {
    return new Date(time).getHours() + 'h';
  };

  // Couleur en fonction de la valeur AQI
  const getColor = (value: number) => {
    if (value <= 50) return '#10B981'; // green-500
    if (value <= 100) return '#F59E0B'; // yellow-500
    if (value <= 150) return '#F97316'; // orange-500
    if (value <= 200) return '#EF4444'; // red-500
    if (value <= 300) return '#8B5CF6'; // purple-500
    return '#7F1D1D'; // red-900
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const time = new Date(payload[0].payload.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{time}</p>
          <p className="font-semibold" style={{ color: getColor(payload[0].value) }}>
            AQI: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#E5E7EB" 
          strokeOpacity={0.3} 
        />
        
        <XAxis
          dataKey="time"
          tickFormatter={formatXAxis}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        
        <YAxis
          domain={[0, 300]}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickCount={6}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorValue)"
          strokeWidth={2}
          activeDot={{ r: 6, fill: '#3B82F6' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AirQualityChart;