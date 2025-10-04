// src/components/dashboard/TempoAnalysis.tsx
import React, { useState } from 'react';
import { FiTarget, FiTrendingUp, FiBarChart, FiDownload, FiEye, FiEyeOff } from 'react-icons/fi';

interface AnalysisPoint {
  id: string;
  lat: number;
  lng: number;
  no2: number;
  o3: number;
  aod: number;
  timestamp: string;
}

interface TempoAnalysisProps {
  tempoData?: any[];
  onPointSelect?: (point: AnalysisPoint | null) => void;
  selectedPoint?: AnalysisPoint | null;
}

const TempoAnalysis: React.FC<TempoAnalysisProps> = ({
  tempoData = [],
  selectedPoint
}) => {
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [analysisMode, setAnalysisMode] = useState<'point' | 'area' | 'trend'>('point');

  const exportAnalysis = () => {
    const analysisData = {
      mode: analysisMode,
      timestamp: new Date().toISOString(),
      selectedPoint,
      measurements: showMeasurements,
      data: tempoData
    };

    // Simulation d'export
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `tempo_analysis_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Outils d'analyse TEMPO
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMeasurements(!showMeasurements)}
            className={`p-2 rounded-lg transition-colors ${
              showMeasurements
                ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {showMeasurements ? <FiEye className="h-4 w-4" /> : <FiEyeOff className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Modes d'analyse */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Mode d'analyse
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'point', label: 'Point', icon: <FiTarget className="h-4 w-4" /> },
            { key: 'area', label: 'Zone', icon: <FiTarget className="h-4 w-4" /> },
            { key: 'trend', label: 'Tendance', icon: <FiTrendingUp className="h-4 w-4" /> }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setAnalysisMode(mode.key as any)}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium transition-all ${
                analysisMode === mode.key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Informations sur le point sélectionné */}
      {selectedPoint && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Point d'analyse sélectionné
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Coordonnées:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Horodatage:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(selectedPoint.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <p className="text-xs text-red-600 dark:text-red-400">NO₂</p>
              <p className="font-bold text-red-700 dark:text-red-300">{selectedPoint.no2.toFixed(1)} μg/m³</p>
            </div>
            <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
              <p className="text-xs text-orange-600 dark:text-orange-400">O₃</p>
              <p className="font-bold text-orange-700 dark:text-orange-300">{selectedPoint.o3.toFixed(1)} μg/m³</p>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="text-xs text-purple-600 dark:text-purple-400">AOD</p>
              <p className="font-bold text-purple-700 dark:text-purple-300">{selectedPoint.aod.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques globales */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Statistiques des données
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FiBarChart className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-gray-500 dark:text-gray-400">Points de données</p>
            <p className="font-bold text-gray-900 dark:text-white">{tempoData.length}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FiTrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-gray-500 dark:text-gray-400">Couverture</p>
            <p className="font-bold text-gray-900 dark:text-white">95%</p>
          </div>
        </div>
      </div>

      {/* Instructions d'utilisation */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Comment utiliser les outils d'analyse :
        </h4>
        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <li>• <strong>Point</strong> : Cliquez sur la carte pour analyser un point spécifique</li>
          <li>• <strong>Zone</strong> : Sélectionnez une zone pour analyse régionale</li>
          <li>• <strong>Tendance</strong> : Visualisez l'évolution temporelle</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={exportAnalysis}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <FiDownload className="h-4 w-4" />
          <span>Exporter l'analyse</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <FiBarChart className="h-4 w-4" />
          <span>Générer un rapport</span>
        </button>
      </div>
    </div>
  );
};

export default TempoAnalysis;
