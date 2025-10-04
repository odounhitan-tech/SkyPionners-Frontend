// src/components/3d/TempoVisualization3D.tsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { TempoDataPoint } from '../../services/nasaTempo';

interface TempoVisualization3DProps {
  data: TempoDataPoint[];
  selectedParameter: 'no2' | 'o3' | 'aod';
  onDataPointSelect?: (point: TempoDataPoint) => void;
}

const TempoParticles: React.FC<{
  data: TempoDataPoint[];
  parameter: 'no2' | 'o3' | 'aod';
  onPointSelect?: (point: TempoDataPoint) => void;
}> = ({ data, parameter, onPointSelect }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Créer la géométrie des particules
  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(data.length * 3);
    const colors = new Float32Array(data.length * 3);
    const sizes = new Float32Array(data.length);

    data.forEach((point, index) => {
      // Convertir lat/lng en coordonnées 3D
      const x = (point.longitude - 2.35) * 8; // Centré sur Paris
      const z = (point.latitude - 48.85) * 8;  // Inversé pour correspondre à la vue 3D
      const y = (point[parameter] - 50) / 10; // Élévation basée sur la valeur

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;

      // Couleur basée sur la valeur
      const intensity = Math.min(point[parameter] / getParameterMax(parameter), 1);

      if (parameter === 'no2') {
        // Rouge pour NO2
        colors[index * 3] = 1; // R
        colors[index * 3 + 1] = intensity * 0.2; // G
        colors[index * 3 + 2] = intensity * 0.2; // B
      } else if (parameter === 'o3') {
        // Orange pour O3
        colors[index * 3] = 1; // R
        colors[index * 3 + 1] = intensity * 0.6; // G
        colors[index * 3 + 2] = 0; // B
      } else {
        // Violet pour AOD
        colors[index * 3] = intensity * 0.8; // R
        colors[index * 3 + 1] = 0; // G
        colors[index * 3 + 2] = 1; // B
      }

      // Taille basée sur la confiance
      sizes[index] = (point.confidence * 2 + 1) * (1 + intensity);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;

        void main() {
          vColor = color;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Animation de pulsation
          float pulse = 1.0 + sin(time * 2.0 + position.x * 0.01) * 0.1;

          gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);

          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    return { geometry, material };
  }, [data, parameter]);

  // Animation
  useFrame((state) => {
    if (material && material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
    }

    // Rotation lente du groupe
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();

    // Trouver le point de données le plus proche du clic
    const point = event.point;
    let closestPoint: TempoDataPoint | null = null;
    let closestDistance = Infinity;

    data.forEach((dataPoint) => {
      const x = (dataPoint.longitude - 2.35) * 8;
      const z = (dataPoint.latitude - 48.85) * 8;
      const y = (dataPoint[parameter] - 50) / 10;

      const distance = Math.sqrt(
        Math.pow(point.x - x, 2) +
        Math.pow(point.y - y, 2) +
        Math.pow(point.z - z, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = dataPoint;
      }
    });

    if (closestPoint && closestDistance < 2) {
      onPointSelect?.(closestPoint);
    }
  };

  return (
    <group ref={groupRef}>
      <points
        ref={particlesRef}
        geometry={geometry}
        material={material}
        onClick={handleClick}
      />
    </group>
  );
};

const getParameterMax = (parameter: string) => {
  switch (parameter) {
    case 'no2': return 60;
    case 'o3': return 150;
    case 'aod': return 1.5;
    default: return 100;
  }
};

const TempoScene: React.FC<{
  data: TempoDataPoint[];
  parameter: 'no2' | 'o3' | 'aod';
  onPointSelect?: (point: TempoDataPoint) => void;
}> = ({ data, parameter, onPointSelect }) => {
  return (
    <>
      {/* Éclairage ambiant */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Fond étoilé */}
      <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade />

      {/* Particules TEMPO */}
      <TempoParticles
        data={data}
        parameter={parameter}
        onPointSelect={onPointSelect}
      />

      {/* Contrôles de caméra */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const TempoVisualization3D: React.FC<TempoVisualization3DProps> = ({
  data,
  selectedParameter,
  onDataPointSelect
}) => {
  return (
    <div className="w-full h-96 bg-black rounded-xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{
          position: [20, 20, 20],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true
        }}
      >
        <TempoScene
          data={data}
          parameter={selectedParameter}
          onPointSelect={onDataPointSelect}
        />
      </Canvas>

      {/* Interface utilisateur */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <h4 className="font-semibold mb-2">Visualisation TEMPO 3D</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>NO₂ - Dioxyde d'azote</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span>O₃ - Ozone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span>AOD - Épaisseur optique des aérosols</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <h4 className="font-semibold mb-2">Contrôles</h4>
        <div className="text-xs space-y-1 opacity-75">
          <p>• Rotation automatique activée</p>
          <p>• Cliquez sur les particules</p>
          <p>• Zoom avec molette souris</p>
          <p>• Panoramique avec clic droit</p>
        </div>
      </div>

      {/* Informations sur les données */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="space-y-1">
          <p><strong>Points de données:</strong> {data.length}</p>
          <p><strong>Paramètre:</strong> {selectedParameter.toUpperCase()}</p>
          <p><strong>Résolution:</strong> 2.5 km</p>
          <p><strong>Source:</strong> NASA TEMPO</p>
        </div>
      </div>
    </div>
  );
};

export default TempoVisualization3D;
