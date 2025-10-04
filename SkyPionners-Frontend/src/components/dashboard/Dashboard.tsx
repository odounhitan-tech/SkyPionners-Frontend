import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiInfo, FiMapPin, FiClock, FiWind, FiDroplet, FiSun } from 'react-icons/fi';
import { AirQualityMap } from '../map/AirQualityMap';
import AirQualityForecast from './AirQualityForecast';
import type { AirQualityStation } from '../../types/airQuality';
import { useGeolocation } from '../../hooks/useGeolocation';

// Données factices pour la démonstration
const mockStations: AirQualityStation[] = [
  {
    id: '1',
    name: 'Station Centrale',
    latitude: 48.8566,
    longitude: 2.3522,
    airQualityIndex: 68,
    lastUpdated: new Date().toISOString(),
    parameters: {
      pm25: 12.5,
      pm10: 20,
      no2: 25,
      o3: 45,
      so2: 5,
      co: 0.5
    }
  },
  // Ajoutez plus de stations si nécessaire
];

const mockForecast = [
  { date: '2025-10-01', aqi: 65, dominantPollutant: 'PM2.5', parameters: { pm25: 15, pm10: 22, no2: 23, o3: 48 } },
  { date: '2025-10-02', aqi: 72, dominantPollutant: 'O3', parameters: { pm25: 18, pm10: 25, no2: 20, o3: 55 } },
  { date: '2025-10-03', aqi: 58, dominantPollutant: 'PM10', parameters: { pm25: 10, pm10: 28, no2: 18, o3: 42 } },
  { date: '2025-10-04', aqi: 45, dominantPollutant: 'NO2', parameters: { pm25: 8, pm10: 15, no2: 30, o3: 38 } },
  { date: '2025-10-05', aqi: 82, dominantPollutant: 'O3', parameters: { pm25: 20, pm10: 30, no2: 25, o3: 65 } },
];

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50) return { label: 'Bon', color: 'text-green-500' };
  if (aqi <= 100) return { label: 'Modéré', color: 'text-yellow-500' };
  if (aqi <= 150) return { label: 'Malsain pour les groupes sensibles', color: 'text-orange-500' };
  if (aqi <= 200) return { label: 'Malsain', color: 'text-red-500' };
  if (aqi <= 300) return { label: 'Très malsain', color: 'text-purple-500' };
  return { label: 'Dangereux', color: 'text-red-700' };
};

const Dashboard: React.FC = () => {
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const [selectedStation, setSelectedStation] = useState<AirQualityStation | null>(mockStations[0]);
  const [loading, setLoading] = useState(true);

  // Position par défaut (Paris) ou position de l'utilisateur
  const currentPosition = {
    lat: latitude || 48.8566,
    lon: longitude || 2.3522
  };

  useEffect(() => {
    // Attendre que la géolocalisation soit chargée
    if (!geoLoading) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [geoLoading]);

  useEffect(() => {
    // Gérer le scroll vers les prévisions si hash présent
    if (window.location.hash === '#previsions') {
      setTimeout(() => {
        const element = document.getElementById('previsions');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  const handleStationSelect = (station: AirQualityStation) => {
    setSelectedStation(station);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4 shadow-xl"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (geoError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4">
              <FiAlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3 text-gray-900 dark:text-white">Erreur de géolocalisation</h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {geoError}
          </p>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Nous utiliserons une position par défaut (Paris) pour afficher les données.
          </p>
        </div>
      </div>
    );
  }

  const aqiStatus = selectedStation?.airQualityIndex ? getAqiStatus(selectedStation.airQualityIndex) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-gray-900 dark:text-white">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Carte */}
          <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-blue-900/50">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2 shadow-lg">
                  <FiMapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Carte de la qualité de l'air</h2>
              </div>
            </div>
            <div className="h-[500px] w-full relative">
              <AirQualityMap 
                stations={mockStations}
                center={[currentPosition.lat, currentPosition.lon]}
                zoom={12}
                onStationSelect={handleStationSelect}
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">📍 Position actuelle</p>
              </div>
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-8">
            {/* Carte AQI actuelle */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700/50 dark:to-green-900/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-lg p-2 shadow-lg">
                    <FiInfo className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Qualité de l'air actuelle</h2>
                </div>
              </div>
              <div className="p-8">
                {selectedStation ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {selectedStation.name}
                      </h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${aqiStatus?.color} bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600`}>
                        {aqiStatus?.label}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl blur-3xl"></div>
                      <div className="relative text-7xl font-black text-center my-10">
                        <span className={`${aqiStatus?.color} drop-shadow-2xl`}>{selectedStation.airQualityIndex}</span>
                        <span className="text-3xl text-gray-400 ml-3 font-semibold">AQI</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-blue-900/50 p-4 rounded-2xl shadow-md border border-blue-100 dark:border-blue-800/50">
                        <FiMapPin className="text-blue-600 dark:text-blue-400 mb-2 h-5 w-5" />
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Localisation</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">
                          {selectedStation.latitude.toFixed(4)}, {selectedStation.longitude.toFixed(4)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700/50 dark:to-green-900/50 p-4 rounded-2xl shadow-md border border-green-100 dark:border-green-800/50">
                        <FiClock className="text-green-600 dark:text-green-400 mb-2 h-5 w-5" />
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Dernière mise à jour</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">
                          {new Date(selectedStation.lastUpdated || '').toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h4 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Polluants principaux</h4>
                      <div className="space-y-3">
                        {selectedStation.parameters && Object.entries(selectedStation.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300">
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{key.toUpperCase()}</span>
                            <span className="font-black text-blue-600 dark:text-blue-400">{value} <span className="text-xs font-medium text-gray-500">µg/m³</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-6 w-20 h-20 mx-auto mb-4 shadow-xl">
                      <FiMapPin className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Sélectionnez une station sur la carte</p>
                  </div>
                )}
              </div>
            </div>

            {/* Prévisions */}
            <div id="previsions">
              <AirQualityForecast forecast={mockForecast} />
            </div>
          </div>
        </div>

        {/* Section d'informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2 shadow-lg">
                <FiInfo className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recommandations</h3>
            </div>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-blue-900/50 p-4 rounded-xl shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-3">
                  <FiInfo className="text-blue-600 dark:text-blue-400 flex-shrink-0 h-4 w-4" />
                </div>
                <span className="font-medium mt-1">Évitez les activités extérieures intenses</span>
              </li>
              <li className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-blue-900/50 p-4 rounded-xl shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-3">
                  <FiInfo className="text-blue-600 dark:text-blue-400 flex-shrink-0 h-4 w-4" />
                </div>
                <span className="font-medium mt-1">Gardez les fenêtres fermées</span>
              </li>
              <li className="flex items-start bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-blue-900/50 p-4 rounded-xl shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-3">
                  <FiInfo className="text-blue-600 dark:text-blue-400 flex-shrink-0 h-4 w-4" />
                </div>
                <span className="font-medium mt-1">Utilisez un purificateur d'air si disponible</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg p-2 shadow-lg">
                <FiSun className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Météo actuelle</h3>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-5xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">24°C</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium mt-2">Ensoleillé</p>
              </div>
              <div className="text-6xl animate-pulse">☀️</div>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700/50 dark:to-cyan-900/50 p-4 rounded-xl shadow-sm">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Vent</span>
                <span className="flex items-center font-bold text-gray-900 dark:text-white">
                  <FiWind className="mr-2 text-cyan-600 dark:text-cyan-400" /> 12 km/h
                </span>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700/50 dark:to-cyan-900/50 p-4 rounded-xl shadow-sm">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Humidité</span>
                <span className="flex items-center font-bold text-gray-900 dark:text-white">
                  <FiDroplet className="mr-2 text-blue-600 dark:text-blue-400" /> 45%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-2 shadow-lg">
                <span className="text-xl">🌞</span>
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Indice UV</h3>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full"></div>
                <div className="relative text-6xl font-black text-orange-500 drop-shadow-xl">5</div>
              </div>
              <div className="flex-1 ml-6">
                <div className="w-full h-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-white/40" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold mb-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700/50 dark:to-orange-900/50 p-3 rounded-xl">Modéré - Protection recommandée</p>
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Conseils de protection :</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700/50 dark:to-red-900/50 p-3 rounded-xl">
                  <span className="mr-2">☀️</span> Crème solaire SPF 30+
                </li>
                <li className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700/50 dark:to-red-900/50 p-3 rounded-xl">
                  <span className="mr-2">🕶️</span> Lunettes de soleil
                </li>
                <li className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700/50 dark:to-red-900/50 p-3 rounded-xl">
                  <span className="mr-2">🧢</span> Chapeau recommandé
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
