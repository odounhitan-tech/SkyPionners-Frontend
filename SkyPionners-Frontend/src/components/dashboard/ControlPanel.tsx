import React from 'react';
import type { Location } from '../../types/openaq';

interface ControlPanelProps {
  locations: Location[];
  selectedLocationId?: number;
  onLocationChange: (locationId: number) => void;
  onTempoLayerChange: (layer: string) => void;
  selectedTempoLayer: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  locations, 
  selectedLocationId, 
  onLocationChange, 
  onTempoLayerChange,
  selectedTempoLayer
}) => {
  return (
    <div className="bg-primary p-4 rounded-lg">
      <h3 className="text-xl font-bold text-light mb-4">Monitoring Stations</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-secondary mb-1">Select Station</label>
          <select 
            id="location" 
            value={selectedLocationId || ''}
            onChange={(e) => onLocationChange(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-dark text-light border border-secondary"
          >
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tempo-layer" className="block text-secondary mb-1">TEMPO Satellite Layer</label>
          <select 
            id="tempo-layer" 
            value={selectedTempoLayer}
            onChange={(e) => onTempoLayerChange(e.target.value)}
            className="w-full p-2 rounded-md bg-dark text-light border border-secondary"
          >
            <option value="">None</option>
            <option value="TEMPO_NO2_L3_Tropospheric_Column">Nitrogen Dioxide (NO₂)</option>
            <option value="TEMPO_O3_L3_Column_Amount">Ozone (O₃)</option>
            {/* Add other TEMPO layers here */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
