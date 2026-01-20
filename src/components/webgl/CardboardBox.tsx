import React, { useMemo } from 'react';
import { animated } from '@react-spring/three';
import { MeshPhysicalMaterial, Color, DoubleSide } from 'three';
import { useSimpleMovementAnimation } from '../../utils/hooks';

interface GlassBoxProps {
  position: [number, number, number];
}

export const GlassBox: React.FC<GlassBoxProps> = ({ position }) => {
  const springProps = useSimpleMovementAnimation({ position });

  const iceMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      color: new Color('#e0f7ff'), // Putih salju kebiruan
      metalness: 0.1,
      roughness: 0.15,          // Sedikit buram agar tekstur es terasa
      transmission: 0.7,        // Es tidak sepenuhnya bening
      thickness: 1.5,           // Ketebalan es yang padat
      ior: 1.31,                // Index Refraction spesifik untuk Es (Ice)
      transparent: true,
      opacity: 0.9,
      reflectivity: 0.8,
      clearcoat: 1,             // Lapisan luar yang licin/basah
      clearcoatRoughness: 0.1,
      attenuationColor: new Color('#ffffff'),
      attenuationDistance: 0.5,
    });
  }, []);

  const crystalSpikeMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      color: '#ffffff',
      emissive: '#b0e0ff',
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.6,
    });
  }, []);

  return (
    <animated.group {...springProps}>
      {/* 1. BADAN UTAMA: Blok Kristal Es */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.82, 0.82]} />
        <primitive object={iceMaterial} attach="material" />
      </mesh>

      {/* 2. EFEK RETAKAN INTERNAL (Inner Crystal Spikes) */}
      {/* Membuat ilusi ada kristal tajam di dalam blok es */}
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <primitive object={crystalSpikeMaterial} attach="material" />
        </mesh>
      </group>

      {/* 3. BINGKAI SALJU (Snowy Edges) */}
      {/* Memberikan tekstur putih di sudut agar terlihat seperti bekuan salju */}
      {[
        [0.41, 0.41, 0], [-0.41, 0.41, 0], [0.41, -0.41, 0], [-0.41, -0.41, 0]
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0]}>
          <boxGeometry args={[0.06, 0.06, 0.83]} />
          <meshStandardMaterial color="#ffffff" roughness={1} emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* 4. PENCAHAYAAN DINGIN (Cold Ambient Glow) */}
      <pointLight 
        color="#a0d8ff" 
        intensity={2.5} 
        distance={2} 
        position={[0, 0, 0.2]} 
      />

      {/* 5. EFEK "FROST" DI LANTAI */}
      <mesh position={[0, 0, -0.41]} receiveShadow>
        <planeGeometry args={[0.9, 0.9]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          side={DoubleSide} 
        />
      </mesh>

      {/* 6. PARTIKEL DINGIN (Sparkles) */}
      {/* Bola-bola kecil putih sebagai serpihan es kristal */}
      {[
        [0.3, 0.3, 0.3], [-0.3, -0.2, 0.1], [0.1, -0.3, -0.2], [-0.2, 0.3, -0.1]
      ].map((pos, i) => (
        <mesh key={`sparkle-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </mesh>
      ))}
    </animated.group>
  );
};

export default GlassBox;