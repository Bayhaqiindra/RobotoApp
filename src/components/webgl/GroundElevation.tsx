import React from 'react';

interface GroundElevationProps {
  x: number;
  y: number;
  height: number;
}

/**
 * GroundElevation - Versi Modern
 * Merupakan elemen statis tanah dengan ketinggian tertentu.
 */
export const GroundElevation: React.FC<GroundElevationProps> = ({ x, y, height }) => {
  return (
    <mesh 
      position={[x, y, (1 + height) / 2]} 
      castShadow 
      receiveShadow
    >
      {/* Di versi terbaru, cukup gunakan boxGeometry */}
      <boxGeometry args={[1, 1, height]} />
      
      {/* meshPhongMaterial memberikan pantulan cahaya yang lebih baik untuk elevasi tanah */}
      <meshPhongMaterial color={0x555555} />
    </mesh>
  );
};

export default GroundElevation;