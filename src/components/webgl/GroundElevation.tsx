import React, { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';

interface GroundElevationProps {
  x: number;
  y: number;
  height: number;
}

/**
 * GroundElevation - Lightweight Enhanced Version
 */
export const GroundElevation: React.FC<GroundElevationProps> = ({ x, y, height }) => {
  // Material dengan variasi warna sederhana
  const topMaterial = useMemo(() => {
    const variation = ((x + y) % 2) * 0.05;
    
    return new MeshStandardMaterial({
      color: `hsl(210, 20%, ${45 + variation * 10}%)`,
      roughness: 0.6,
      metalness: 0.4,
    });
  }, [x, y]);

  const sideMaterial = useMemo(() => 
    new MeshStandardMaterial({
      color: '#3a4a5a',
      roughness: 0.8,
      metalness: 0.2,
    }), 
  []
  );

  return (
    <group position={[x, y, (1 + height) / 2]}>
      {/* Main ground block */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, height]} />
        <primitive object={sideMaterial} attach="material" />
      </mesh>

      {/* Top surface */}
      <mesh position={[0, 0, height / 2]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0.05]} />
        <primitive object={topMaterial} attach="material" />
      </mesh>

      {/* Corner indicators */}
      {[
        [-0.48, -0.48],
        [0.48, -0.48],
        [-0.48, 0.48],
        [0.48, 0.48]
      ].map(([px, py], i) => (
        <mesh key={i} position={[px, py, height / 2 + 0.01]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
          <meshStandardMaterial 
            color="#5a90d0"
            emissive="#4a80c0"
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Grid pattern sederhana */}
      <mesh position={[0, 0, height / 2 + 0.026]} receiveShadow>
        <planeGeometry args={[0.95, 0.95, 2, 2]} />
        <meshStandardMaterial 
          color="#4a6a8a" 
          transparent 
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
};

export default GroundElevation;