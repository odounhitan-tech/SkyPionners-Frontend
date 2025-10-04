import React, { useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import TempoLayer from './TempoLayer';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from '../../types/openaq';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  locations: Location[];
  onLocationChange: (locationId: number) => void;
  selectedLocationId?: number;
  tempoLayer: string;
}

const DEFAULT_CENTER: [number, number] = [38.9072, -77.0369];

const Map: React.FC<MapProps> = ({ 
  locations, 
  onLocationChange, 
  selectedLocationId, 
  tempoLayer 
}) => {
  const center: [number, number] = useMemo(() => 
    locations.length > 0 
      ? [locations[0].coordinates.latitude, locations[0].coordinates.longitude]
      : DEFAULT_CENTER,
    [locations]
  );

  const handleMarkerClick = useCallback((id: number) => {
    onLocationChange(id);
  }, [onLocationChange]);

  return (
    <MapContainer 
      center={center} 
      zoom={10} 
      style={{ height: '100%', width: '100%' }} 
      className="rounded-lg z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {tempoLayer && <TempoLayer layer={tempoLayer} time={'2024-09-29'} />}
      {locations.map(loc => {
        const position: [number, number] = [loc.coordinates.latitude, loc.coordinates.longitude];
        const opacity = selectedLocationId === loc.id ? 1 : 0.6;
        
        return (
          <Marker 
            key={loc.id} 
            position={position}
            eventHandlers={{
              click: () => handleMarkerClick(loc.id),
            }}
            opacity={opacity}
          >
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.city}, {loc.country}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default React.memo(Map);
