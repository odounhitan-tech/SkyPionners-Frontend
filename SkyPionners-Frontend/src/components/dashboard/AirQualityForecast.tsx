import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

export interface ForecastData {
  date: string;
  aqi: number;
  dominantPollutant: string;
  parameters: {
    [key: string]: number;
  };
}

interface AirQualityForecastProps {
  forecast: ForecastData[];
  className?: string;
}

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return '#00E400'; // Good
  if (aqi <= 100) return '#FFFF00'; // Moderate
  if (aqi <= 150) return '#FF7E00'; // Unhealthy for Sensitive Groups
  if (aqi <= 200) return '#FF0000'; // Unhealthy
  if (aqi <= 300) return '#8F3F97'; // Very Unhealthy
  return '#7E0023'; // Hazardous
};

const AirQualityForecast: React.FC<AirQualityForecastProps> = ({
  forecast,
  className = ''
}) => {
  if (!forecast || forecast.length === 0) {
    return (
      <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 ${className}`}>
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Prévisions non disponibles</h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium">Les données de prévision ne sont pas disponibles pour le moment.</p>
      </div>
    );
  }

  // Formater les données pour le graphique
  const chartData = forecast.map((item) => ({
    date: new Date(item.date).toLocaleDateString('fr-FR', { weekday: 'short' }),
    aqi: item.aqi,
    dominantPollutant: item.dominantPollutant,
    ...item.parameters
  }));

  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl ${className}`}>
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-purple-900/50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-2 shadow-lg">
            <FiTrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Prévision sur 5 jours</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              label={{ value: 'AQI', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
              formatter={(value: number, name: string) => {
                if (name === 'aqi') return [value, 'Indice de qualité de l\'air'];
                return [value, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#3B82F6"
              fill="#93C5FD"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{
                fill: '#3B82F6',
                stroke: '#FFFFFF',
                strokeWidth: 2,
                r: 4,
                fillOpacity: 1
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {forecast.slice(0, 3).map((day, index) => (
          <div 
            key={index}
            className="p-5 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: `${getAqiColor(day.aqi)}15`,
              borderColor: getAqiColor(day.aqi)
            }}
          >
            <div className="text-sm font-bold text-gray-700 dark:text-gray-200 capitalize mb-2">
              {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
            </div>
            <div className="text-4xl font-black mt-2 mb-3 drop-shadow-lg" style={{ color: getAqiColor(day.aqi) }}>
              {day.aqi}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded-lg">
              🌫️ {day.dominantPollutant}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AirQualityForecast;
