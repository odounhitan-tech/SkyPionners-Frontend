// src/components/dashboard/AQIMonitor.tsx
import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiTrendingUp, FiTrendingDown, FiMinus, FiInfo } from 'react-icons/fi';

interface AQIData {
  current: number;
  level: string;
  pollutant: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  lastUpdated: string;
  history: Array<{ time: string; value: number }>;
}

interface AQIMonitorProps {
  location?: string;
  onAQIDataChange?: (data: AQIData) => void;
}

const getAQIData = (location?: string): AQIData => {
  // Simulation de données AQI qui varient légèrement
  const baseAQI = location === 'Bureau' ? 78 : location === 'Parc Monceau' ? 32 : 45;
  const variation = Math.floor(Math.random() * 6) - 3; // -3 à +3
  const currentAQI = Math.max(0, Math.min(300, baseAQI + variation));

  return {
    current: currentAQI,
    level: getAQILevel(currentAQI),
    pollutant: 'PM2.5',
    trend: variation > 1 ? 'up' : variation < -1 ? 'down' : 'stable',
    trendValue: Math.abs(variation),
    lastUpdated: new Date().toISOString(),
    history: Array(24).fill(0).map((_, i) => ({
      time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.floor(Math.random() * 30) + 30 + Math.sin(i / 4) * 10
    }))
  };
};

const getAQILevel = (aqi: number): string => {
  if (aqi <= 50) return 'Excellent';
  if (aqi <= 100) return 'Bon';
  if (aqi <= 150) return 'Modéré';
  if (aqi <= 200) return 'Dégradé';
  if (aqi <= 300) return 'Mauvais';
  return 'Très mauvais';
};

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-red-900';
};

const AQIMonitor: React.FC<AQIMonitorProps> = ({ location, onAQIDataChange }) => {
  const [aqiData, setAQIData] = useState<AQIData>(() => getAQIData(location));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getAQIData(location);
      setAQIData(newData);
      if (onAQIDataChange) {
        onAQIDataChange(newData);
      }
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, [location, onAQIDataChange]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newData = getAQIData(location);
    setAQIData(newData);
    if (onAQIDataChange) {
      onAQIDataChange(newData);
    }
    setIsRefreshing(false);
  };

  const getTrendIcon = () => {
    switch (aqiData.trend) {
      case 'up':
        return <FiTrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <FiTrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <FiMinus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (aqiData.trend) {
      case 'up':
        return 'text-red-600 dark:text-red-400';
      case 'down':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Indice de Qualité de l'Air
          </h2>
          {location && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {location}
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900/70 text-blue-600 dark:text-blue-400 transition-colors disabled:opacity-50"
        >
          <FiRefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm">Actualiser</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-end space-x-4">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {aqiData.current}
          </span>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getAQIColor(aqiData.current)}`}>
              {aqiData.level}
            </span>
          </div>
        </div>

        <div className={`h-20 w-20 rounded-full ${getAQIColor(aqiData.current)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
          {aqiData.current}
        </div>
      </div>

      {/* Tendance */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {aqiData.trend === 'up' ? '+' : aqiData.trend === 'down' ? '-' : ''}
            {aqiData.trendValue} points
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          vs dernière mesure
        </span>
      </div>

      {/* Informations détaillées */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Polluant principal:</span>
          <span className="font-medium text-gray-900 dark:text-white">{aqiData.pollutant}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Dernière mise à jour:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {new Date(aqiData.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Indicateur de qualité */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-2">
          <FiInfo className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Information:</p>
            <p>
              {aqiData.level === 'Excellent' || aqiData.level === 'Bon'
                ? "L'air est de bonne qualité. Vous pouvez pratiquer toutes vos activités normalement."
                : aqiData.level === 'Modéré'
                ? "L'air est acceptable mais les personnes sensibles peuvent ressentir des effets mineurs."
                : "L'air est pollué. Réduisez les activités physiques intenses en extérieur."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIMonitor;
