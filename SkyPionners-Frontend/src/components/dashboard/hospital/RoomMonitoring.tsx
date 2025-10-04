// src/components/dashboard/hospital/RoomMonitoring.tsx
import React, { useState, useEffect } from 'react';
import { FiActivity, FiUsers, FiThermometer, FiWind, FiEye, FiEyeOff } from 'react-icons/fi';

interface Room {
  id: string;
  name: string;
  type: 'patient' | 'surgery' | 'waiting' | 'icu' | 'corridor';
  capacity: number;
  currentOccupancy: number;
  aqi: number;
  temperature: number;
  humidity: number;
  status: 'good' | 'warning' | 'critical';
  lastUpdated: string;
}

interface RoomMonitoringProps {
  selectedRoom?: string | null;
  onRoomSelect?: (roomId: string) => void;
}

const RoomMonitoring: React.FC<RoomMonitoringProps> = ({ selectedRoom, onRoomSelect }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());

  // Données mockées des salles d'hôpital
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: 'room-301',
        name: 'Salle 301',
        type: 'patient',
        capacity: 4,
        currentOccupancy: 3,
        aqi: 145,
        temperature: 22.5,
        humidity: 45,
        status: 'warning',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'room-205',
        name: 'Salle 205',
        type: 'patient',
        capacity: 2,
        currentOccupancy: 2,
        aqi: 118,
        temperature: 21.8,
        humidity: 42,
        status: 'good',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'icu-1',
        name: 'Soins Intensifs',
        type: 'icu',
        capacity: 8,
        currentOccupancy: 6,
        aqi: 95,
        temperature: 20.5,
        humidity: 40,
        status: 'good',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'surgery-1',
        name: 'Bloc Opératoire 1',
        type: 'surgery',
        capacity: 1,
        currentOccupancy: 1,
        aqi: 75,
        temperature: 19.5,
        humidity: 38,
        status: 'good',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'waiting-1',
        name: 'Salle d\'attente',
        type: 'waiting',
        capacity: 20,
        currentOccupancy: 12,
        aqi: 165,
        temperature: 23.2,
        humidity: 48,
        status: 'critical',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'corridor-a',
        name: 'Couloir A',
        type: 'corridor',
        capacity: 0,
        currentOccupancy: 0,
        aqi: 135,
        temperature: 22.8,
        humidity: 46,
        status: 'warning',
        lastUpdated: new Date().toISOString()
      }
    ];
    setRooms(mockRooms);
  }, []);

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'patient': return <FiUsers className="h-4 w-4" />;
      case 'surgery': return <FiActivity className="h-4 w-4" />;
      case 'icu': return <FiThermometer className="h-4 w-4" />;
      case 'waiting': return <FiUsers className="h-4 w-4" />;
      default: return <FiWind className="h-4 w-4" />;
    }
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case 'patient': return 'Chambre';
      case 'surgery': return 'Bloc';
      case 'icu': return 'SI';
      case 'waiting': return 'Attente';
      case 'corridor': return 'Couloir';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'border-green-200 bg-green-50 dark:bg-green-900/20';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
      case 'critical': return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-800/50';
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 100) return 'text-green-600';
    if (aqi <= 150) return 'text-yellow-600';
    return 'text-red-600';
  };

  const toggleRoomDetails = (roomId: string) => {
    setShowDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Surveillance par salles
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {rooms.length} salles surveillées en temps réel
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {rooms.map((room) => {
            const isSelected = selectedRoom === room.id;
            const hasDetails = showDetails.has(room.id);

            return (
              <div
                key={room.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                    : getStatusColor(room.status)
                }`}
                onClick={() => onRoomSelect?.(room.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      room.type === 'icu' ? 'bg-red-100 text-red-600' :
                      room.type === 'surgery' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getRoomTypeIcon(room.type)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getRoomTypeLabel(room.type)} • {room.currentOccupancy}/{room.capacity} occupants
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getAQIColor(room.aqi)}`}>
                        {room.aqi}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        AQI
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoomDetails(room.id);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {hasDetails ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Détails de la salle */}
                {hasDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Température:</span>
                        <p className="font-medium">{room.temperature}°C</p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Humidité:</span>
                        <p className="font-medium">{room.humidity}%</p>
                      </div>
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                        Voir graphique
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700">
                        Historique
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Informations sur la salle sélectionnée */}
      {selectedRoomData && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Salle sélectionnée: {selectedRoomData.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">AQI Actuel</p>
              <p className={`text-xl font-bold ${getAQIColor(selectedRoomData.aqi)}`}>
                {selectedRoomData.aqi}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Température</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedRoomData.temperature}°C
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Humidité</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedRoomData.humidity}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Taux d'occupation</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedRoomData.currentOccupancy}/{selectedRoomData.capacity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomMonitoring;
