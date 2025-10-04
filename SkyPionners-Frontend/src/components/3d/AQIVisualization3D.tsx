// src/components/3d/AQIVisualization3D.tsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface AQIDataPoint {
  lat: number;
  lng: number;
  aqi: number;
  level: string;
  location: string;
}

interface AQIVisualization3DProps {
  data: AQIDataPoint[];
  selectedLocation?: string;
  onLocationSelect?: (location: string) => void;
}

const AQIDataSphere: React.FC<{
  position: [number, number, number];
  aqi: number;
  isSelected: boolean;
  onClick: () => void;
}> = ({ position, aqi, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Couleur basée sur l'AQI
  const color = useMemo(() => {
    if (aqi <= 50) return '#10B981'; // green
    if (aqi <= 100) return '#F59E0B'; // yellow
    if (aqi <= 150) return '#F97316'; // orange
    if (aqi <= 200) return '#EF4444'; // red
    if (aqi <= 300) return '#8B5CF6'; // purple
    return '#7F1D1D'; // dark red
  }, [aqi]);

  // Taille basée sur l'AQI (plus l'AQI est élevé, plus la sphère est grande)
  const scale = useMemo(() => {
    const aqiScale = Math.max(0.5, Math.min(2, aqi / 100));
    return isSelected ? aqiScale * 1.5 : aqiScale;
  }, [aqi, isSelected]);

  // Animation de pulsation pour les valeurs élevées
  useFrame((state) => {
    if (meshRef.current && aqi > 150) {
      meshRef.current.scale.setScalar(
        scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      );
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[scale, 16, 16]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* Anneau pour les locations sélectionnées */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[scale * 1.2, scale * 1.5, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};

const AQIGrid: React.FC<{
  data: AQIDataPoint[];
  selectedLocation?: string;
  onLocationSelect?: (location: string) => void;
}> = ({ data, selectedLocation, onLocationSelect }) => {
  const spheres = useMemo(() => {
    return data.map((point) => {
      // Convertir lat/lng en coordonnées 3D (projection simple)
      const x = (point.lng - 2.35) * 10; // Centré sur Paris
      const y = (point.lat - 48.85) * 10;
      const z = (point.aqi - 50) / 20; // Élévation basée sur l'AQI

      return (
        <AQIDataSphere
          key={point.location}
          position={[x, z, y]}
          aqi={point.aqi}
          isSelected={selectedLocation === point.location}
          onClick={() => onLocationSelect?.(point.location)}
        />
      );
    });
  }, [data, selectedLocation, onLocationSelect]);

  return <>{spheres}</>;
};

const Scene: React.FC<{
  data: AQIDataPoint[];
  selectedLocation?: string;
  onLocationSelect?: (location: string) => void;
}> = ({ data, selectedLocation, onLocationSelect }) => {
  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Grille de données AQI */}
      <AQIGrid
        data={data}
        selectedLocation={selectedLocation}
        onLocationSelect={onLocationSelect}
      />

      {/* Repères visuels */}
      <gridHelper args={[20, 20]} position={[0, -1, 0]} />

      {/* Axes */}
      <axesHelper args={[5]} />

      {/* Contrôles de caméra */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        target={[0, 0, 0]}
      />
    </>
  );
};

const AQIVisualization3D: React.FC<AQIVisualization3DProps> = ({
  data,
  selectedLocation,
  onLocationSelect
}) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{
          position: [10, 10, 10],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        <Scene
          data={data}
          selectedLocation={selectedLocation}
          onLocationSelect={onLocationSelect}
        />
      </Canvas>

      {/* Légende 3D */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <h4 className="font-semibold mb-2">Légende AQI 3D</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Bon (0-50)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Modéré (51-100)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Dégradé (101-150)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Mauvais (151-300)</span>
          </div>
        </div>
        <p className="text-xs mt-2 opacity-75">
          • Utilisez la souris pour naviguer<br/>
          • Cliquez sur les sphères pour sélectionner
        </p>
      </div>
    </div>
  );
};

export default AQIVisualization3D;
