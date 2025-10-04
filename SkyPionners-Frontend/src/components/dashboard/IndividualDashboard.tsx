// src/pages/dashboard/IndividualDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import IndividualMap from '../dashboard/IndividualMap';
import AQIMonitor from '../dashboard/AQIMonitor';
import Recommendations from '../dashboard/Recommendations';
import AirQualityChart from '../dashboard/AirQualityChart';
import FavoriteLocationsManager from '../dashboard/FavoriteLocationsManager';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  level: string;
}

const IndividualDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [aqiData, setAqiData] = useState<any>(null);

  // Position utilisateur par défaut (Paris)
  const userLocation = { lat: 48.8566, lng: 2.3522 };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleAQIDataChange = (data: any) => {
    setAqiData(data);
  };

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bonjour, {user?.name || 'Utilisateur'} 👋
        </h1>
        <p className="text-blue-100">
          Surveillez la qualité de l'air autour de vous et de vos lieux favoris
        </p>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Moniteur AQI */}
        <div className="lg:col-span-2">
          <AQIMonitor
            location={selectedLocation?.name}
            onAQIDataChange={handleAQIDataChange}
          />
        </div>

        {/* Recommandations */}
        <div className="lg:col-span-1">
          <Recommendations aqi={aqiData?.current || 45} />
        </div>
      </div>

      {/* Carte interactive */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Carte de surveillance AQI
        </h2>
        <IndividualMap
          userLocation={userLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {/* Graphique historique et lieux favoris */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique historique */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Historique sur 24h
          </h2>
          <div className="h-64">
            <AirQualityChart
              data={aqiData?.history || Array(24).fill(0).map((_, i) => ({
                time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
                value: Math.floor(Math.random() * 30) + 30
              }))}
            />
          </div>
        </div>

        {/* Gestion des lieux favoris */}
        <div>
          <FavoriteLocationsManager
            onLocationSelect={handleLocationSelect}
            selectedLocationId={selectedLocation?.id}
          />
        </div>
      </div>

      {/* Informations sur la localisation sélectionnée */}
      {selectedLocation && (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Lieu sélectionné : {selectedLocation.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Indice AQI</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLocation.aqi}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Niveau</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedLocation.level}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Coordonnées</p>
              <p className="text-sm font-mono text-gray-900 dark:text-white">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualDashboard;