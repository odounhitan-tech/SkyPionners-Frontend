// src/components/dashboard/FavoriteLocations.tsx
import React from 'react';
import { FiPlus, FiChevronRight } from 'react-icons/fi';

const FavoriteLocations: React.FC = () => {
  const locations = [
    { id: 1, name: 'Domicile', aqi: 32, level: 'Bon', updated: '5 min' },
    { id: 2, name: 'Bureau', aqi: 45, level: 'Bon', updated: '15 min' },
    { id: 3, name: 'Parc du Champs de Mars', aqi: 28, level: 'Excellent', updated: '1h' }
  ];

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-red-900';
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mes lieux favoris
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          <FiPlus className="mr-1" /> Ajouter
        </button>
      </div>
      
      <div className="space-y-3">
        {locations.map((location) => (
          <div 
            key={location.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className={`h-10 w-10 rounded-full ${getAqiColor(location.aqi)} flex items-center justify-center text-white font-bold`}>
                {location.aqi}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {location.level} • Mis à jour il y a {location.updated}
                </p>
              </div>
            </div>
            <FiChevronRight className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteLocations;