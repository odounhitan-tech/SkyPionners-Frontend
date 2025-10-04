// src/components/dashboard/HospitalDashboard.tsx
import React, { useState, useEffect } from 'react';
import CriticalThresholds from './hospital/CriticalThresholds';
import AlertSystem from './hospital/AlertSystem';
import RoomMonitoring from './hospital/RoomMonitoring';
import DataExport from './hospital/DataExport';

const HospitalDashboard: React.FC = () => {
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Simulation des données d'alertes
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        type: 'critical',
        message: 'PM2.5 dépasse le seuil critique en Salle 301',
        timestamp: new Date().toISOString(),
        room: 'Salle 301',
        parameter: 'PM2.5',
        value: 185,
        threshold: 150
      },
      {
        id: 2,
        type: 'warning',
        message: 'O3 en augmentation rapide en Salle 205',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        room: 'Salle 205',
        parameter: 'O3',
        value: 125,
        threshold: 120
      }
    ];
    setActiveAlerts(mockAlerts);
  }, []);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleAlertDismiss = (alertId: number) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Centre Hospitalier - Surveillance AQI 🏥
        </h1>
        <p className="text-red-100">
          Surveillance en temps réel de la qualité de l'air dans toutes les salles
        </p>
      </div>

      {/* Alertes en temps réel */}
      <AlertSystem
        alerts={activeAlerts}
        onAlertDismiss={handleAlertDismiss}
      />

      {/* Seuils critiques */}
      <CriticalThresholds />

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Surveillance par salles */}
        <RoomMonitoring
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
        />

        {/* Export des données */}
        <DataExport
          selectedRoom={selectedRoom}
        />
      </div>
    </div>
  );
};

export default HospitalDashboard;
