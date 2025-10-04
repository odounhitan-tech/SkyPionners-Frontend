// src/components/dashboard/HeatmapTEMPO.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { FiPlay, FiPause, FiRotateCcw, FiZoomIn, FiZoomOut, FiInfo } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

interface TempoData {
  id: string;
  timestamp: string;
  bounds: [[number, number], [number, number]];
  no2: number;
  o3: number;
  aod: number;
  confidence: number;
}

interface HeatmapTEMPOProps {
  onDataLoad?: (data: TempoData[]) => void;
}

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const HeatmapTEMPO: React.FC<HeatmapTEMPOProps> = ({ onDataLoad }) => {
  const [tempoData, setTempoData] = useState<TempoData[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<'no2' | 'o3' | 'aod'>('no2');
  const [showLegend, setShowLegend] = useState(true);
  const [mapZoom, setMapZoom] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);

  // Centre sur la France
  const center: [number, number] = [46.2276, 2.2137];

  // Simulation des données TEMPO
  useEffect(() => {
    const mockTempoData: TempoData[] = [
      {
        id: 'tempo_001',
        timestamp: '2024-09-29T12:00:00Z',
        bounds: [[45.0, 1.0], [47.0, 3.0]],
        no2: 45.2,
        o3: 125.8,
        aod: 0.85,
        confidence: 0.92
      },
      {
        id: 'tempo_002',
        timestamp: '2024-09-29T12:00:00Z',
        bounds: [[46.0, 2.0], [48.0, 4.0]],
        no2: 38.7,
        o3: 118.3,
        aod: 0.72,
        confidence: 0.88
      },
      {
        id: 'tempo_003',
        timestamp: '2024-09-29T12:00:00Z',
        bounds: [[44.0, 0.5], [46.0, 2.5]],
        no2: 52.1,
        o3: 135.2,
        aod: 0.95,
        confidence: 0.95
      },
      {
        id: 'tempo_004',
        timestamp: '2024-09-29T12:00:00Z',
        bounds: [[47.0, 3.0], [49.0, 5.0]],
        no2: 41.3,
        o3: 112.7,
        aod: 0.68,
        confidence: 0.87
      },
      {
        id: 'tempo_005',
        timestamp: '2024-09-29T12:00:00Z',
        bounds: [[43.0, 1.5], [45.0, 3.5]],
        no2: 48.9,
        o3: 128.4,
        aod: 0.78,
        confidence: 0.91
      }
    ];

    setTempoData(mockTempoData);
    onDataLoad?.(mockTempoData);
  }, [onDataLoad]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapZoom(prev => Math.max(prev - 1, 3));
  }, []);

  const getParameterColor = (value: number, parameter: string) => {
    const normalizedValue = Math.min(value / getParameterMax(parameter), 1);

    if (parameter === 'no2') {
      // Rouge pour NO2 (plus c'est élevé, plus c'est rouge)
      return `rgba(220, 38, 38, ${normalizedValue})`;
    } else if (parameter === 'o3') {
      // Orange pour O3
      return `rgba(249, 115, 22, ${normalizedValue})`;
    } else {
      // Violet pour AOD
      return `rgba(124, 58, 237, ${normalizedValue})`;
    }
  };

  const getParameterMax = (parameter: string) => {
    switch (parameter) {
      case 'no2': return 60; // μg/m³
      case 'o3': return 150; // μg/m³
      case 'aod': return 1.5; // unité AOD
      default: return 100;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* En-tête avec contrôles */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Heatmap NASA TEMPO
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className={`p-2 rounded-lg transition-colors ${
                showLegend
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiInfo className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contrôles temporels */}
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handlePlayPause}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
            <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiRotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
              {mapZoom}
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sélecteur de paramètre */}
        <div className="flex space-x-2">
          {[
            { key: 'no2', label: 'NO₂', color: 'bg-red-500' },
            { key: 'o3', label: 'O₃', color: 'bg-orange-500' },
            { key: 'aod', label: 'AOD', color: 'bg-purple-500' }
          ].map((param) => (
            <button
              key={param.key}
              onClick={() => setSelectedParameter(param.key as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedParameter === param.key
                  ? `${param.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${param.color}`} />
              <span>{param.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Carte avec heatmap */}
      <div className="relative h-96">
        <MapContainer
          center={center}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          className="rounded-b-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapController center={center} zoom={mapZoom} />

          {/* Overlay des données TEMPO */}
          {tempoData.map((data) => (
            <div
              key={data.id}
              className="absolute z-10 pointer-events-none"
              style={{
                top: `${((data.bounds[1][0] - center[0]) / 2 + 0.5) * 100}%`,
                left: `${((data.bounds[0][1] - center[1]) / 2 + 0.5) * 100}%`,
                width: `${Math.abs(data.bounds[1][1] - data.bounds[0][1]) / 2 * 100}%`,
                height: `${Math.abs(data.bounds[1][0] - data.bounds[0][0]) / 2 * 100}%`,
                backgroundColor: getParameterColor(data[selectedParameter], selectedParameter),
                opacity: 0.6,
                borderRadius: '4px',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              title={`${data[selectedParameter]} ${selectedParameter.toUpperCase()} - Confiance: ${(data.confidence * 100).toFixed(0)}%`}
            />
          ))}
        </MapContainer>

        {/* Légende interactive */}
        {showLegend && (
          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              Légende - {selectedParameter.toUpperCase()}
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Élevé (&gt;{Math.round(getParameterMax(selectedParameter) * 0.8)})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-yellow-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Moyen ({Math.round(getParameterMax(selectedParameter) * 0.4)} - {Math.round(getParameterMax(selectedParameter) * 0.8)})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Faible (&lt;{Math.round(getParameterMax(selectedParameter) * 0.4)})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Informations temporelles */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400">
              Données: {new Date(tempoData[0]?.timestamp || Date.now()).toLocaleDateString()}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Source: NASA TEMPO
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 text-xs">Données en temps réel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapTEMPO;
