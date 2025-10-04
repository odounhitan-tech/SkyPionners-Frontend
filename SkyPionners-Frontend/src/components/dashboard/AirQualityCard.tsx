// src/components/dashboard/AirQualityCard.tsx
import React from 'react';
import { FiRefreshCw, FiInfo } from 'react-icons/fi';

interface AirQualityCardProps {
  aqi: number;
  level: string;
  pollutant: string;
  lastUpdated: string;
}

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-red-900';
};

const AirQualityCard: React.FC<AirQualityCardProps> = ({ 
  aqi, 
  level, 
  pollutant,
  lastUpdated 
}) => {
  const aqiColor = getAqiColor(aqi);
  
  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Indice de Qualité de l'Air
            </h2>
            <div className="flex items-end mt-2">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">
                {aqi}
              </span>
              <span className="ml-2 mb-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {level}
              </span>
            </div>
          </div>
          <div className={`h-16 w-16 rounded-full ${aqiColor} flex items-center justify-center text-white text-2xl font-bold`}>
            {aqi}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FiInfo className="mr-2" />
          <span>Polluant principal: {pollutant}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-3 flex justify-between items-center text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Dernière mise à jour: {new Date(lastUpdated).toLocaleTimeString()}
        </span>
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          <FiRefreshCw className="mr-1" /> Actualiser
        </button>
      </div>
    </div>
  );
};

export default AirQualityCard;