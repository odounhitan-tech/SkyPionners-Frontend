// src/components/dashboard/FavoriteLocationsManager.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiMapPin, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

interface FavoriteLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  level: string;
  isCustom?: boolean;
}

interface FavoriteLocationsManagerProps {
  onLocationSelect?: (location: FavoriteLocation) => void;
  selectedLocationId?: number;
}

const FavoriteLocationsManager: React.FC<FavoriteLocationsManagerProps> = ({
  onLocationSelect,
  selectedLocationId
}) => {
  const [locations, setLocations] = useState<FavoriteLocation[]>([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [editingLocation, setEditingLocation] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  // Lieux par défaut
  const defaultLocations: FavoriteLocation[] = [
    { id: 1, name: 'Domicile', lat: 48.8566, lng: 2.3522, aqi: 45, level: 'Bon' },
    { id: 2, name: 'Bureau', lat: 48.8666, lng: 2.3622, aqi: 78, level: 'Modéré' },
    { id: 3, name: 'Parc Monceau', lat: 48.8798, lng: 2.3076, aqi: 32, level: 'Excellent' },
    { id: 4, name: 'Tour Eiffel', lat: 48.8584, lng: 2.2945, aqi: 56, level: 'Bon' },
    { id: 5, name: 'Louvre', lat: 48.8606, lng: 2.3376, aqi: 89, level: 'Modéré' },
    { id: 6, name: 'Montmartre', lat: 48.8867, lng: 2.3431, aqi: 41, level: 'Bon' },
  ];

  useEffect(() => {
    // Charger les lieux depuis le localStorage ou utiliser les valeurs par défaut
    const savedLocations = localStorage.getItem('favoriteLocations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    } else {
      setLocations(defaultLocations);
    }
  }, []);

  useEffect(() => {
    // Sauvegarder dans localStorage quand les lieux changent
    localStorage.setItem('favoriteLocations', JSON.stringify(locations));
  }, [locations]);

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-red-900';
  };

  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      const newLocation: FavoriteLocation = {
        id: Date.now(),
        name: newLocationName.trim(),
        lat: 48.8566 + (Math.random() - 0.5) * 0.1, // Position aléatoire autour de Paris
        lng: 2.3522 + (Math.random() - 0.5) * 0.1,
        aqi: Math.floor(Math.random() * 100) + 20,
        level: 'Bon',
        isCustom: true
      };

      setLocations(prev => [...prev, newLocation]);
      setNewLocationName('');
      setIsAddingLocation(false);
    }
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const handleEditLocation = (id: number, newName: string) => {
    if (newName.trim()) {
      setLocations(prev => prev.map(loc =>
        loc.id === id ? { ...loc, name: newName.trim() } : loc
      ));
      setEditingLocation(null);
      setEditName('');
    }
  };

  const startEditing = (location: FavoriteLocation) => {
    setEditingLocation(location.id);
    setEditName(location.name);
  };

  const cancelEditing = () => {
    setEditingLocation(null);
    setEditName('');
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mes lieux favoris
        </h2>
        <button
          onClick={() => setIsAddingLocation(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          <span className="text-sm">Ajouter</span>
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {isAddingLocation && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              placeholder="Nom du lieu..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
            />
            <button
              onClick={handleAddLocation}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              <FiCheck className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setIsAddingLocation(false);
                setNewLocationName('');
              }}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Liste des lieux */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
              selectedLocationId === location.id
                ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700'
                : 'bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => onLocationSelect?.(location)}
          >
            <div className="flex items-center space-x-4">
              <div className={`h-10 w-10 rounded-full ${getAqiColor(location.aqi)} flex items-center justify-center text-white font-bold`}>
                {location.aqi}
              </div>
              <div className="flex-1">
                {editingLocation === location.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleEditLocation(location.id, editName);
                        if (e.key === 'Escape') cancelEditing();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditLocation(location.id, editName)}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <FiCheck className="h-4 w-4" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.level} • AQI: {location.aqi}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(location);
                }}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiEdit2 className="h-4 w-4" />
              </button>
              {location.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLocation(location.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FiMapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Aucun lieu favori</p>
          <p className="text-sm">Ajoutez des lieux pour suivre leur qualité de l'air</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteLocationsManager;
