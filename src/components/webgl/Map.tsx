import React, { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors, RootState } from '../../state';
import CardboardBox from './CardboardBox';
import GroundElevation from './GroundElevation';
import Robot from './Robot';
import TargetTile from './TargetTile';

export const Map: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game);

  // 1. Guard Clause yang lebih ketat
  if (!gameState || !gameState.map) {
    return null;
  }

  const mapDimensions = gameSelectors.getMapDimensions(gameState);
  const tilesInfo = gameSelectors.getTilesInfo(gameState);
  const robotKey = gameSelectors.getRobotKey(gameState);

  // 2. Ambil data Box dengan fallback jika key tidak ditemukan
  const movableObjectsInfo = gameSelectors.getMovableObjectsInfo(gameState) as Array<{
    key: string;
    position: [number, number, number];
  }>;

  const groupPosition = useMemo(() => {
    const [xSize, ySize] = mapDimensions;
    return [(1 - xSize) / 2, (1 - ySize) / 2, -0.5] as [number, number, number];
  }, [mapDimensions]);

  return (
    <group position={groupPosition}>
      {/* Robot selalu butuh key yang stabil untuk React-Three-Fiber */}
      <Robot key={robotKey || 'player-robot'} />

      {/* Render lantai dan target */}
      {tilesInfo.map(({ x, y, height, hasTarget }, index) => (
        // Menggunakan kombinasi koordinat untuk key yang sangat unik
        <Fragment key={`tile-group-${x}-${y}-${index}`}>
          {height > 0 && <GroundElevation x={x} y={y} height={height} />}
          {hasTarget && <TargetTile x={x} y={y} height={height} />}
        </Fragment>
      ))}

      {/* Render Box dengan proteksi key duplikat/undefined */}
      {movableObjectsInfo.map((box, index) => {
        // PERBAIKAN: Jika box.key undefined karena masalah di levels.ts, 
        // kita buatkan fallback agar tidak muncul warning console.
        const safeKey = box.key || `box-fallback-${index}-${box.position.join('-')}`;
        
        return (
          <CardboardBox 
            key={safeKey} 
            position={box.position} 
          />
        );
      })}
    </group>
  );
};

export default Map;