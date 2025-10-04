import React from 'react';
import { TileLayer } from 'react-leaflet';

interface TempoLayerProps {
  layer: string; // e.g., 'TEMPO_NO2_L3_Tropospheric_Column'
  time: string;  // e.g., '2024-09-29'
}

const TempoLayer: React.FC<TempoLayerProps> = ({ layer, time }) => {
  const template = 
    '//gibs.earthdata.nasa.gov/wmts/epsg4326/best/' + 
    `${layer}/default/${time}/2km/{z}/{y}/{x}.png`;

  return (
    <TileLayer
      url={template}
      attribution='<a href="https://earthdata.nasa.gov/gibs">NASA GIBS</a>'
      opacity={0.7}
      zIndex={10}
    />
  );
};

export default TempoLayer;
