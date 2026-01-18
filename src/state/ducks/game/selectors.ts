import { Direction } from '../../../mechanics/directions';
import { LevelMap, MovableObject } from '../../../mechanics/types';
import { State } from './types';

interface TileStaticInfo {
  x: number;
  y: number;
  height: number;
  hasTarget: boolean;
}

/**
 * PERBAIKAN: Menggunakan 'type' dan Intersection (&) 
 * agar tidak error saat extend MovableObject
 */
export type MovableObjectsInfo = MovableObject & {
  position: [number, number, number];
};

export const getRobotPosition = (state: State): [number, number, number] => {
  assertMapDefined(state);
  const [x, y] = state.map.robot.position;
  const tile = state.map.tiles[x][y];
  // Z = Tinggi lantai + jumlah objek + offset visual
  const z = tile.height + tile.objects.length + 1;
  return [x, y, z];
};

export const getRobotDirection = (state: State): Direction => {
  assertMapDefined(state);
  return state.map.robot.direction;
};

export const getRobotKey = (state: State): string => {
  assertMapDefined(state);
  return state.map.robot.key;
};

export const getMapDimensions = (state: State): [number, number] => {
  assertMapDefined(state);
  return [state.map.width, state.map.height];
};

export const getTilesInfo = (state: State): TileStaticInfo[] => {
  assertMapDefined(state);
  const { tiles, targets } = state.map;
  const targetSet = new Set(targets.map(([x, y]) => `${x}-${y}`));

  return tiles.flatMap((column, x) =>
    column.map((tile, y) => ({
      x,
      y,
      height: tile.height,
      hasTarget: targetSet.has(`${x}-${y}`),
    }))
  );
};

export const getMovableObjectsInfo = (state: State): MovableObjectsInfo[] => {
  assertMapDefined(state);
  const { tiles } = state.map;

  return tiles.flatMap((column, x) =>
    column.flatMap((tile, y) =>
      tile.objects.map((obj, index) => ({
        ...obj,
        position: [x, y, tile.height + index + 1] as [number, number, number],
      }))
    )
  );
};

export const isLevelCleared = (state: State): boolean => state.finished;

function assertMapDefined(state: State): asserts state is State & { map: LevelMap } {
  if (!state.map) {
    throw Error('No map defined. Pastikan level sudah dimulai.');
  }
}