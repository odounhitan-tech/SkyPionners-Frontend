// src/components/dashboard/hospital/AlertSystem.tsx
import React, { useState } from 'react';
import { FiX, FiAlertTriangle, FiInfo, FiCheckCircle, FiClock, FiEye, FiMapPin } from 'react-icons/fi';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  room: string;
  parameter: string;
  value: number;
  threshold: number;
  acknowledged?: boolean;
}

interface AlertSystemProps {
  alerts: Alert[];
  onAlertDismiss: (alertId: number) => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, onAlertDismiss }) => {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <FiAlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning': return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <FiInfo className="h-5 w-5 text-blue-500" />;
      default: return <FiInfo className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-800/50';
    }
  };

  const toggleAlertExpansion = (alertId: number) => {
    setExpandedAlerts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'À l\'instant';
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
    if (diffMinutes < 1440) return `Il y a ${Math.floor(diffMinutes / 60)}h`;
    return date.toLocaleDateString();
  };

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical');
  const warningAlerts = alerts.filter(alert => alert.type === 'warning');

  if (alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <FiCheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Aucun problème détecté
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Toutes les mesures sont dans les seuils normaux
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Alertes en temps réel
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            {criticalAlerts.length > 0 && (
              <span className="flex items-center space-x-1 text-red-600">
                <FiAlertTriangle className="h-4 w-4" />
                <span>{criticalAlerts.length} critique{criticalAlerts.length > 1 ? 's' : ''}</span>
              </span>
            )}
            {warningAlerts.length > 0 && (
              <span className="flex items-center space-x-1 text-yellow-600">
                <FiAlertTriangle className="h-4 w-4" />
                <span>{warningAlerts.length} attention{warningAlerts.length > 1 ? 's' : ''}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {alerts.map((alert) => {
          const isExpanded = expandedAlerts.has(alert.id);
          return (
            <div
              key={alert.id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        alert.type === 'critical' ? 'text-red-800 dark:text-red-200' :
                        alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                        'text-blue-800 dark:text-blue-200'
                      }`}>
                        {alert.message}
                      </p>

                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <FiClock className="h-3 w-3" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiMapPin className="h-3 w-3" />
                          <span>{alert.room}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleAlertExpansion(alert.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onAlertDismiss(alert.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Détails étendus */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Paramètre:</span>
                          <p className="font-medium">{alert.parameter}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Valeur actuelle:</span>
                          <p className="font-medium">{alert.value} μg/m³</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Seuil:</span>
                          <p className="font-medium">{alert.threshold} μg/m³</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Écart:</span>
                          <p className={`font-medium ${
                            alert.value > alert.threshold ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {alert.value > alert.threshold ? '+' : ''}
                            {((alert.value - alert.threshold) / alert.threshold * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                          Voir détails
                        </button>
                        <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700">
                          Historique
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertSystem;
