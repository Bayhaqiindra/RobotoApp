import React from 'react';
import { animated } from '@react-spring/three';
import { useSimpleMovementAnimation } from '../../utils/hooks';

interface CardboardBoxProps {
  position: [number, number, number];
}

export const CardboardBox: React.FC<CardboardBoxProps> = ({ position }) => {
  const springProps = useSimpleMovementAnimation({ position });

  return (
    // Kita bungkus dengan group agar posisi visual tetap di tengah tile
    <animated.group {...springProps}>
      <mesh castShadow receiveShadow>
        {/* Perkecil skala ke 0.85 agar ada celah antar kotak seperti di referensi */}
        <boxGeometry args={[0.85, 0.85, 0.85]} /> 
        <meshStandardMaterial 
          color="#aa8844" 
          roughness={0.6}
          metalness={0.2} 
        />
      </mesh>
    </animated.group>
  );
};

export default CardboardBox;