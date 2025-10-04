// src/components/dashboard/Recommendations.tsx
import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiWind, FiDroplet, FiSun } from 'react-icons/fi';

interface RecommendationsProps {
  aqi: number;
}

const Recommendations: React.FC<RecommendationsProps> = ({ aqi }) => {
  const getRecommendations = () => {
    if (aqi <= 50) {
      return {
        level: 'excellent',
        icon: <FiCheckCircle className="text-green-500 text-xl" />,
        items: [
          { icon: <FiWind className="text-blue-500" />, text: 'Aération recommandée' },
          { icon: <FiSun className="text-yellow-500" />, text: 'Idéal pour les activités extérieures' }
        ]
      };
    } else if (aqi <= 100) {
      return {
        level: 'modéré',
        icon: <FiAlertCircle className="text-yellow-500 text-xl" />,
        items: [
          { icon: <FiDroplet className="text-blue-400" />, text: 'Buvez régulièrement' },
          { icon: <FiWind className="text-blue-500" />, text: 'Évitez les zones très polluées' }
        ]
      };
    } else {
      return {
        level: 'défavorable',
        icon: <FiAlertCircle className="text-red-500 text-xl" />,
        items: [
          { icon: <FiWind className="text-blue-500" />, text: 'Évitez les activités exténuantes' },
          { icon: <FiDroplet className="text-blue-400" />, text: 'Portez un masque en extérieur' }
        ]
      };
    }
  };

  const { level, icon, items } = getRecommendations();

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-full border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recommandations
        </h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
          {icon}
          <span className="ml-2 capitalize">{level}</span>
        </span>
      </div>
      
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="mt-0.5">{item.icon}</span>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{item.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Voir toutes les recommandations
        </button>
      </div>
    </div>
  );
};

export default Recommendations;