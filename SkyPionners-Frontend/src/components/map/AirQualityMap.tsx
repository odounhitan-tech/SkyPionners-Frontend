import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Définition du type localement pour éviter la dépendance externe
export interface AirQualityStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  airQualityIndex?: number;
  lastUpdated?: string;
  parameters?: {
    pm25?: number;
    pm10?: number;
    no2?: number;
    o3?: number;
    so2?: number;
    co?: number;
  };
}

// Correction pour les icônes Leaflet avec React
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface AirQualityMapProps {
  stations: AirQualityStation[];
  center?: [number, number];
  zoom?: number;
  onStationSelect?: (station: AirQualityStation) => void;
}

export const AirQualityMap: React.FC<AirQualityMapProps> = ({
  stations = [],
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 13,
  onStationSelect
}) => {
  const mapRef = useRef<L.Map>(null);

  // Mise à jour de la vue lorsque le centre change
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(new L.LatLng(center[0], center[1]), zoom);
    }
  }, [center, zoom]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => {
          // La carte est prête
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => onStationSelect?.(station),
            }}
          >
            <Popup>
              <div className="space-y-1 min-w-[200px]">
                <h3 className="font-semibold text-sm">{station.name}</h3>
                <p className="text-sm">Qualité de l'air: {station.airQualityIndex || 'N/A'}</p>
                <p className="text-xs text-gray-500">
                  Dernière mise à jour: {station.lastUpdated ? new Date(station.lastUpdated).toLocaleString() : 'Inconnue'}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AirQualityMap;
