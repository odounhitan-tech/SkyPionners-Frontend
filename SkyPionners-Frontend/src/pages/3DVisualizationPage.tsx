// src/pages/3DVisualizationPage.tsx
import React, { useState, useEffect } from 'react';
import AQIVisualization3D from '../components/3d/AQIVisualization3D';
import TempoVisualization3D from '../components/3d/TempoVisualization3D';
import type { TempoDataPoint } from '../services/nasaTempo';

interface AQIDataPoint {
  lat: number;
  lng: number;
  aqi: number;
  level: string;
  location: string;
}

const Visualization3DPage: React.FC = () => {
  // const { user } = useAuth(); // Temporairement commenté car non utilisé
  const [aqiData, setAqiData] = useState<AQIDataPoint[]>([]);
  const [tempoData, setTempoData] = useState<TempoDataPoint[]>([]);
  const [selectedAqiLocation, setSelectedAqiLocation] = useState<string>('');
  const [selectedTempoPoint, setSelectedTempoPoint] = useState<TempoDataPoint | null>(null);
  const [activeVisualization, setActiveVisualization] = useState<'aqi' | 'tempo'>('aqi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Données mockées temporairement pour le build
        const mockAQIData: AQIDataPoint[] = [
          { lat: 48.8566, lng: 2.3522, aqi: 45, level: 'Bon', location: 'Paris Centre' },
          { lat: 48.8606, lng: 2.3376, aqi: 52, level: 'Bon', location: 'Louvre' },
          { lat: 48.8534, lng: 2.3488, aqi: 38, level: 'Excellent', location: 'Notre-Dame' },
          { lat: 48.8738, lng: 2.2950, aqi: 61, level: 'Modéré', location: 'Arc de Triomphe' }
        ];
        setAqiData(mockAQIData);

        // Données TEMPO mockées
        const mockTempoData: TempoDataPoint[] = [
          {
            latitude: 48.85,
            longitude: 2.35,
            no2: 45.2,
            o3: 125.8,
            aod: 0.85,
            confidence: 0.92,
            timestamp: new Date().toISOString()
          },
          {
            latitude: 48.87,
            longitude: 2.33,
            no2: 38.7,
            o3: 118.3,
            aod: 0.72,
            confidence: 0.88,
            timestamp: new Date().toISOString()
          }
        ];
        setTempoData(mockTempoData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTempoPointSelect = (point: TempoDataPoint) => {
    setSelectedTempoPoint(point);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des visualisations 3D...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Visualisations 3D Avancées 🌀
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explorez les données de qualité de l'air dans des environnements 3D immersifs
          </p>
        </div>

        {/* Sélecteur de visualisation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-1">
              {[
                { key: 'aqi', label: 'Données AQI 3D', icon: '🏭' },
                { key: 'tempo', label: 'Satellite TEMPO', icon: '🛰️' }
              ].map((viz) => (
                <button
                  key={viz.key}
                  onClick={() => setActiveVisualization(viz.key as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeVisualization === viz.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{viz.icon}</span>
                  <span>{viz.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualisation principale */}
        <div className="mb-8">
          {activeVisualization === 'aqi' ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Visualisation 3D des Stations AQI
              </h2>
              <AQIVisualization3D
                data={aqiData}
                selectedLocation={selectedAqiLocation}
                onLocationSelect={setSelectedAqiLocation}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Visualisation 3D des Données TEMPO
              </h2>
              <TempoVisualization3D
                data={tempoData}
                selectedParameter="no2"
                onDataPointSelect={handleTempoPointSelect}
              />
            </div>
          )}
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations sur la localisation sélectionnée */}
          {selectedAqiLocation && activeVisualization === 'aqi' && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Station sélectionnée: {selectedAqiLocation}
              </h3>
              {(() => {
                const locationData = aqiData.find(l => l.location === selectedAqiLocation);
                return locationData ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400">AQI Actuel</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{locationData.aqi}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400">Niveau</p>
                        <p className="text-lg font-medium text-green-700 dark:text-green-300">{locationData.level}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Coordonnées</p>
                      <p className="font-mono text-gray-900 dark:text-white">
                        {locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Informations sur le point TEMPO sélectionné */}
          {selectedTempoPoint && activeVisualization === 'tempo' && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Point de données TEMPO
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">NO₂</p>
                  <p className="text-xl font-bold text-red-700 dark:text-red-300">
                    {selectedTempoPoint.no2.toFixed(1)} μg/m³
                  </p>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <p className="text-sm text-orange-600 dark:text-orange-400">O₃</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
                    {selectedTempoPoint.o3.toFixed(1)} μg/m³
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Coordonnées</p>
                <p className="font-mono text-gray-900 dark:text-white">
                  {selectedTempoPoint.latitude.toFixed(4)}, {selectedTempoPoint.longitude.toFixed(4)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Confiance: {(selectedTempoPoint.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          )}

          {/* Statistiques générales */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Statistiques des données
            </h3>

            {activeVisualization === 'aqi' ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Stations surveillées:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{aqiData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">AQI moyen:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {aqiData.length > 0 ? Math.round(aqiData.reduce((sum, d) => sum + d.aqi, 0) / aqiData.length) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Niveau dominant:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {aqiData.length > 0 ?
                      aqiData.reduce((prev, current) =>
                        (prev.aqi > current.aqi) ? prev : current
                      ).level : 'N/A'
                    }
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Points de données:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{tempoData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">NO₂ moyen:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {tempoData.length > 0 ?
                      (tempoData.reduce((sum, d) => sum + d.no2, 0) / tempoData.length).toFixed(1) : '0'
                    } μg/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Confiance moyenne:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {tempoData.length > 0 ?
                      Math.round((tempoData.reduce((sum, d) => sum + d.confidence, 0) / tempoData.length) * 100) : 0
                    }%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            Comment utiliser les visualisations 3D :
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-300">
            <div>
              <h4 className="font-medium mb-2">🖱️ Navigation</h4>
              <ul className="space-y-1">
                <li>• <strong>Clic gauche + glisser</strong> : Rotation de la vue</li>
                <li>• <strong>Molette souris</strong> : Zoom avant/arrière</li>
                <li>• <strong>Clic droit + glisser</strong> : Panoramique</li>
                <li>• <strong>Double-clic</strong> : Centrer sur un point</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 Interaction</h4>
              <ul className="space-y-1">
                <li>• <strong>Cliquer sur les éléments</strong> : Sélectionner des données</li>
                <li>• <strong>Survoler les éléments</strong> : Voir les informations</li>
                <li>• <strong>Rotation automatique</strong> : Activée par défaut</li>
                <li>• <strong>Données temps réel</strong> : Mise à jour automatique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization3DPage;
