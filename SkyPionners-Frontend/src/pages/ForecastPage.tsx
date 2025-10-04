import React from 'react';
import { Link } from 'react-router-dom';
import AirQualityForecast from '../components/dashboard/AirQualityForecast';
import { FiArrowLeft, FiTrendingUp, FiMapPin, FiCalendar } from 'react-icons/fi';

// Données mockées
const mockForecast = [
  { date: new Date(Date.now()).toISOString(), aqi: 45, dominantPollutant: 'PM2.5', parameters: { pm25: 12, pm10: 24, o3: 48, no2: 15, so2: 8, co: 0.4 } },
  { date: new Date(Date.now() + 86400000).toISOString(), aqi: 52, dominantPollutant: 'O3', parameters: { pm25: 15, pm10: 28, o3: 55, no2: 18, so2: 10, co: 0.5 } },
  { date: new Date(Date.now() + 172800000).toISOString(), aqi: 38, dominantPollutant: 'PM10', parameters: { pm25: 10, pm10: 20, o3: 42, no2: 12, so2: 6, co: 0.3 } },
  { date: new Date(Date.now() + 259200000).toISOString(), aqi: 65, dominantPollutant: 'PM2.5', parameters: { pm25: 22, pm10: 35, o3: 60, no2: 20, so2: 12, co: 0.6 } },
  { date: new Date(Date.now() + 345600000).toISOString(), aqi: 42, dominantPollutant: 'O3', parameters: { pm25: 11, pm10: 22, o3: 50, no2: 14, so2: 7, co: 0.4 } },
];

const ForecastPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-8 group transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-3">
                <FiTrendingUp className="h-8 w-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black">Prévisions de la Qualité de l'Air</h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Anticipez et planifiez avec nos prévisions scientifiques sur 5 jours, alimentées par les données satellitaires NASA TEMPO
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
                <FiMapPin className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium text-white/80">Localisation</p>
                <p className="text-lg font-bold">Paris, France</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
                <FiCalendar className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium text-white/80">Période</p>
                <p className="text-lg font-bold">5 prochains jours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
                <FiTrendingUp className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium text-white/80">Source</p>
                <p className="text-lg font-bold">NASA TEMPO</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Forecast Component */}
          <div className="mb-12">
            <AirQualityForecast forecast={mockForecast} />
          </div>

          {/* Air Quality Index Legend */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 mb-12">
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Comprendre l'Indice de Qualité de l'Air (AQI)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { range: '0-50', label: 'Bon', color: 'bg-green-500', desc: 'Qualité de l\'air satisfaisante, aucun risque' },
                { range: '51-100', label: 'Modéré', color: 'bg-yellow-500', desc: 'Acceptable pour la plupart des personnes' },
                { range: '101-150', label: 'Malsain (sensibles)', color: 'bg-orange-500', desc: 'Groupes sensibles peuvent être affectés' },
                { range: '151-200', label: 'Malsain', color: 'bg-red-500', desc: 'Tout le monde peut ressentir des effets' },
                { range: '201-300', label: 'Très malsain', color: 'bg-purple-600', desc: 'Alerte sanitaire pour tous' },
                { range: '300+', label: 'Dangereux', color: 'bg-red-900', desc: 'Urgence sanitaire' },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`${item.color} rounded-lg p-3 text-white font-black text-sm shadow-lg`}>
                      {item.range}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{item.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pollutants Explanation */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              Principaux Polluants Atmosphériques
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'PM2.5', fullName: 'Particules fines', icon: '🌫️', desc: 'Particules de moins de 2,5 microns pouvant pénétrer profondément dans les poumons et la circulation sanguine.' },
                { name: 'PM10', fullName: 'Particules', icon: '💨', desc: 'Particules de moins de 10 microns provenant de la poussière, du pollen et de la combustion.' },
                { name: 'O3', fullName: 'Ozone', icon: '☀️', desc: 'Gaz irritant formé par réaction chimique en présence de lumière solaire et de polluants.' },
                { name: 'NO2', fullName: 'Dioxyde d\'azote', icon: '🚗', desc: 'Gaz provenant principalement de la combustion des véhicules et des centrales électriques.' },
                { name: 'SO2', fullName: 'Dioxyde de soufre', icon: '🏭', desc: 'Gaz provenant de la combustion de charbon et de pétrole dans les industries.' },
                { name: 'CO', fullName: 'Monoxyde de carbone', icon: '⚠️', desc: 'Gaz incolore et inodore produit par combustion incomplète des carburants.' },
              ].map((pollutant, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-blue-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{pollutant.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-black text-xl text-gray-900 dark:text-white">{pollutant.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">• {pollutant.fullName}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{pollutant.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link 
              to="/login"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Accéder au Dashboard complet</span>
              <FiArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Créez un compte pour accéder à des fonctionnalités avancées et des alertes personnalisées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
