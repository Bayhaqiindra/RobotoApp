import React, { useMemo } from 'react';
import { animated } from '@react-spring/three';
import { MeshStandardMaterial } from 'three';
import { useSimpleMovementAnimation } from '../../utils/hooks';

interface CardboardBoxProps {
  position: [number, number, number];
}

export const CardboardBox: React.FC<CardboardBoxProps> = ({ position }) => {
  const springProps = useSimpleMovementAnimation({ position });

  // Material kardus yang realistis tapi ringan
  const materials = useMemo(() => {
    const baseMaterial = new MeshStandardMaterial({
      color: '#d2a679',
      roughness: 0.9,
      metalness: 0.1,
    });

    const tapeMaterial = new MeshStandardMaterial({
      color: '#e8d4a0',
      roughness: 0.6,
      metalness: 0.2,
    });

    return { baseMaterial, tapeMaterial };
  }, []);

  return (
    <animated.group {...springProps}>
      {/* Main box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.88, 0.88]} /> 
        <primitive object={materials.baseMaterial} attach="material" />
      </mesh>

      {/* Tape horizontal */}
      <mesh castShadow position={[0, 0, 0.44]}>
        <boxGeometry args={[0.9, 0.12, 0.03]} />
        <primitive object={materials.tapeMaterial} attach="material" />
      </mesh>

      {/* Tape vertical */}
      <mesh castShadow position={[0, 0, 0.44]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.9, 0.12, 0.03]} />
        <primitive object={materials.tapeMaterial} attach="material" />
      </mesh>

      {/* Corner protectors */}
      {[
        [0.44, 0.44, 0.44],
        [-0.44, 0.44, 0.44],
        [0.44, -0.44, 0.44],
        [-0.44, -0.44, 0.44],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial 
            color="#8b6f47"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Simple shadow */}
      <mesh position={[0, 0, -0.44]} rotation={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </animated.group>
  );
};

export default CardboardBox;