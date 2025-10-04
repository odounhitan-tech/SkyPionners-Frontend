// src/components/dashboard/IndividualMap.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  level: string;
}

interface IndividualMapProps {
  userLocation?: { lat: number; lng: number };
  favoriteLocations?: Location[];
  onLocationSelect?: (location: Location) => void;
}

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return '#10B981'; // green
  if (aqi <= 100) return '#F59E0B'; // yellow
  if (aqi <= 150) return '#F97316'; // orange
  if (aqi <= 200) return '#EF4444'; // red
  if (aqi <= 300) return '#8B5CF6'; // purple
  return '#7F1D1D'; // dark red
};

const createCustomIcon = (aqi: number, isSelected = false) => {
  const color = getAqiColor(aqi);
  const size = isSelected ? 35 : 30;
  return new DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: ${isSelected ? '4px' : '3px'} solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${isSelected ? '14px' : '12px'};
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
      ">${aqi}</div>
    `,
    className: 'custom-div-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 11);
  }, [center, map]);

  return null;
};

const IndividualMap: React.FC<IndividualMapProps> = ({
  userLocation = { lat: 48.8566, lng: 2.3522 }, // Paris par défaut
  favoriteLocations = [],
  onLocationSelect
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Données mockées de stations de surveillance autour de Paris
  const defaultLocations: Location[] = [
    { id: 1, name: 'Domicile', lat: 48.8566, lng: 2.3522, aqi: 45, level: 'Bon' },
    { id: 2, name: 'Bureau', lat: 48.8666, lng: 2.3622, aqi: 78, level: 'Modéré' },
    { id: 3, name: 'Parc Monceau', lat: 48.8798, lng: 2.3076, aqi: 32, level: 'Excellent' },
    { id: 4, name: 'Tour Eiffel', lat: 48.8584, lng: 2.2945, aqi: 56, level: 'Bon' },
    { id: 5, name: 'Louvre', lat: 48.8606, lng: 2.3376, aqi: 89, level: 'Modéré' },
    { id: 6, name: 'Montmartre', lat: 48.8867, lng: 2.3431, aqi: 41, level: 'Bon' },
  ];

  const displayLocations = favoriteLocations.length > 0 ? favoriteLocations : defaultLocations;

  const handleLocationClick = (location: Location) => {
    setSelectedLocationId(location.id);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapController center={[userLocation.lat, userLocation.lng]} />

        {/* Marqueur de position utilisateur */}
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={new Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          <Popup>
            <div className="text-center">
              <strong>🏠 Votre position</strong>
              <p className="text-sm text-gray-600">Localisation actuelle</p>
              <p className="text-xs text-blue-600 mt-1">Centre de vos données AQI</p>
            </div>
          </Popup>
        </Marker>

        {/* Marqueurs des lieux favoris */}
        {displayLocations.map((location) => {
          const isSelected = selectedLocationId === location.id;
          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.aqi, isSelected)}
              eventHandlers={{
                click: () => handleLocationClick(location),
              }}
            >
              <Popup>
                <div className="text-center min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: getAqiColor(location.aqi) }}
                    >
                      AQI: {location.aqi}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                      {location.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isSelected ? '📍 Sélectionné' : 'Cliquez pour sélectionner'}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default IndividualMap;
