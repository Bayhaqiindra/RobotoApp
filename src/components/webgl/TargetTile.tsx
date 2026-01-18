import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, RingGeometry } from 'three';

interface TargetTileProps {
  x: number;
  y: number;
  height: number;
}

/**
 * TargetTile - Clear and Visible Enhanced Version
 */
export const TargetTile: React.FC<TargetTileProps> = ({ x, y, height }) => {
  const ringRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);

  // Animasi pulsing dan rotating
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.8;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      ringRef.current.scale.set(scale, scale, 1);
    }

    if (innerRef.current && innerRef.current.material) {
      (innerRef.current.material as MeshBasicMaterial).opacity = 0.7 + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <group position={[x, y, height + 0.52]}>
      {/* Base glowing plane - lebih terang */}
      <mesh receiveShadow>
        <planeGeometry args={[0.95, 0.95]} />
        <meshBasicMaterial 
          color="#00ff66" 
          transparent 
          opacity={0.4}
        />
      </mesh>

      {/* Outer ring - rotating */}
      <mesh ref={ringRef} position={[0, 0, 0.01]}>
        <ringGeometry args={[0.38, 0.45, 64]} />
        <meshBasicMaterial 
          color="#00ffaa" 
          transparent 
          opacity={0.9}
        />
      </mesh>

      {/* Middle ring - static */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.28, 0.32, 64]} />
        <meshBasicMaterial 
          color="#00ff88" 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Inner pulsing circle */}
      <mesh ref={innerRef} position={[0, 0, 0.002]}>
        <circleGeometry args={[0.22, 64]} />
        <meshBasicMaterial 
          color="#00ffcc" 
          transparent 
          opacity={0.7}
        />
      </mesh>

      {/* Center dot */}
      <mesh position={[0, 0, 0.015]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.9}
        />
      </mesh>

      {/* Cross lines untuk target precision */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.6, 0.03]} />
        <meshBasicMaterial 
          color="#00ffaa" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.6, 0.03]} />
        <meshBasicMaterial 
          color="#00ffaa" 
          transparent 
          opacity={0.6}
        />
      </mesh>

      {/* Corner brackets */}
      {[
        { pos: [-0.42, -0.42], rot: 0 },
        { pos: [0.42, -0.42], rot: Math.PI / 2 },
        { pos: [0.42, 0.42], rot: Math.PI },
        { pos: [-0.42, 0.42], rot: -Math.PI / 2 }
      ].map(({ pos, rot }, i) => (
        <group key={i} position={[pos[0], pos[1], 0.012]} rotation={[0, 0, rot]}>
          {/* L-shape bracket */}
          <mesh position={[0.06, 0, 0]}>
            <planeGeometry args={[0.12, 0.03]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <planeGeometry args={[0.03, 0.12]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </group>
      ))}

      {/* Bright point light untuk glow effect */}
      <pointLight
        color="#00ff88"
        intensity={1.5}
        distance={2}
        decay={2}
        position={[0, 0, 0.3]}
      />
    </group>
  );
};

export default TargetTile;