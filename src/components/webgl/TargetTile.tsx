import React from 'react';

interface TargetTileProps {
  x: number;
  y: number;
  height: number;
}

/**
 * TargetTile - Versi Modern
 * Menampilkan penanda lantai (target) di mana box harus diletakkan.
 */
export const TargetTile: React.FC<TargetTileProps> = ({ x, y, height }) => {
  return (
    <mesh 
      position={[x, y, height + 0.51]} 
      receiveShadow
    >
      {/* planeBufferGeometry sekarang cukup ditulis planeGeometry */}
      <planeGeometry args={[1, 1]} />
      
      {/* Warna hijau terang untuk menandakan area target */}
      <meshLambertMaterial color={0x00ff00} transparent opacity={0.8} />
    </mesh>
  );
};

export default TargetTile;