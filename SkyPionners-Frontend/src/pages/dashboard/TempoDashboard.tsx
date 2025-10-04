// src/pages/dashboard/TempoDashboard.tsx
import React, { useState } from 'react';
import HeatmapTEMPO from '../../components/dashboard/HeatmapTEMPO';
import TempoControls from '../../components/dashboard/TempoControls';
import TempoAnalysis from '../../components/dashboard/TempoAnalysis';

interface TempoData {
  id: string;
  timestamp: string;
  bounds: [[number, number], [number, number]];
  no2: number;
  o3: number;
  aod: number;
  confidence: number;
}

const TempoDashboard: React.FC = () => {
  const [tempoData, setTempoData] = useState<TempoData[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const handleDataLoad = (data: TempoData[]) => {
    setTempoData(data);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  // const handleSpeedChange = (speed: number) => {
  //   // Implémentation de la gestion de vitesse si nécessaire
  // };

  const handlePointSelect = (point: any) => {
    setSelectedPoint(point);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Heatmap NASA TEMPO 🛰️
        </h1>
        <p className="text-purple-100">
          Visualisation avancée des données satellite de qualité de l'air
        </p>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Heatmap principale */}
        <div className="xl:col-span-2">
          <HeatmapTEMPO onDataLoad={handleDataLoad} />
        </div>

        {/* Panneau d'analyse */}
        <div className="xl:col-span-1">
          <TempoAnalysis
            tempoData={tempoData}
            onPointSelect={handlePointSelect}
            selectedPoint={selectedPoint}
          />
        </div>
      </div>

      {/* Contrôles temporels avancés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TempoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={86400} // 24 heures en secondes
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onTimeChange={handleTimeChange}
          onSpeedChange={() => {}} // Placeholder function
        />

        {/* Informations techniques */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informations techniques
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Satellite:</span>
              <span className="font-medium text-gray-900 dark:text-white">TEMPO (NASA)</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Résolution spatiale:</span>
              <span className="font-medium text-gray-900 dark:text-white">2.5 km × 2.5 km</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Résolution temporelle:</span>
              <span className="font-medium text-gray-900 dark:text-white">Toutes les heures</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Couverture géographique:</span>
              <span className="font-medium text-gray-900 dark:text-white">Amérique du Nord</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Paramètres mesurés:</span>
              <span className="font-medium text-gray-900 dark:text-white">NO₂, O₃, AOD</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Dernière mise à jour:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Précision: 95%</span>
              <span>Latence: 2h</span>
              <span>Source: NASA/JPL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Point d'analyse sélectionné */}
      {selectedPoint && (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analyse du point sélectionné
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Coordonnées</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}
              </p>
            </div>

            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">NO₂</p>
              <p className="text-xl font-bold text-red-700 dark:text-red-300">
                {selectedPoint.no2.toFixed(1)} μg/m³
              </p>
            </div>

            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-sm text-orange-600 dark:text-orange-400">O₃</p>
              <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
                {selectedPoint.o3.toFixed(1)} μg/m³
              </p>
            </div>

            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-600 dark:text-purple-400">AOD</p>
              <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                {selectedPoint.aod.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              Voir l'historique
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Exporter les données
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempoDashboard;
