// src/components/dashboard/hospital/CriticalThresholds.tsx
import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus, FiAlertTriangle } from 'react-icons/fi';

interface PollutantData {
  name: string;
  current: number;
  threshold: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

const CriticalThresholds: React.FC = () => {
  const pollutants: PollutantData[] = [
    {
      name: 'PM2.5',
      current: 145,
      threshold: 150,
      unit: 'μg/m³',
      trend: 'up',
      status: 'warning'
    },
    {
      name: 'O3',
      current: 118,
      threshold: 120,
      unit: 'μg/m³',
      trend: 'stable',
      status: 'good'
    },
    {
      name: 'NO2',
      current: 85,
      threshold: 100,
      unit: 'μg/m³',
      trend: 'down',
      status: 'good'
    },
    {
      name: 'CO',
      current: 2.1,
      threshold: 2.5,
      unit: 'mg/m³',
      trend: 'up',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <FiTrendingDown className="h-4 w-4 text-green-500" />;
      default: return <FiMinus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getProgressBarColor = (current: number, threshold: number) => {
    const percentage = (current / threshold) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Seuils Critiques - Vue d'ensemble
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FiAlertTriangle className="h-4 w-4" />
          <span>Actualisé il y a 2 min</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pollutants.map((pollutant, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border-2 ${getStatusColor(pollutant.status)} transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">{pollutant.name}</h3>
              <div className="flex items-center space-x-2">
                {getTrendIcon(pollutant.trend)}
                <span className={`text-sm font-medium ${
                  pollutant.trend === 'up' ? 'text-red-600' :
                  pollutant.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {pollutant.trend === 'up' ? '+' : pollutant.trend === 'down' ? '-' : ''}
                  {Math.abs(pollutant.current - pollutant.threshold * 0.95).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold">
                  {pollutant.current}
                </span>
                <span className="text-sm opacity-75">
                  / {pollutant.threshold} {pollutant.unit}
                </span>
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(pollutant.current, pollutant.threshold)}`}
                  style={{ width: `${Math.min((pollutant.current / pollutant.threshold) * 100, 100)}%` }}
                />
              </div>

              {/* Statut */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  pollutant.status === 'critical' ? 'bg-red-100 text-red-800' :
                  pollutant.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {pollutant.status === 'critical' ? 'Critique' :
                   pollutant.status === 'warning' ? 'Attention' : 'Normal'}
                </span>

                <span className="text-xs opacity-75">
                  {pollutant.current > pollutant.threshold
                    ? `+${((pollutant.current / pollutant.threshold - 1) * 100).toFixed(0)}%`
                    : `${((pollutant.threshold - pollutant.current) / pollutant.threshold * 100).toFixed(0)}% sous le seuil`
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Attention</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Critique</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalThresholds;
