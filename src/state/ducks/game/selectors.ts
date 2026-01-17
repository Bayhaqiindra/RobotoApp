import { Direction } from '../../../mechanics/directions';
import { LevelMap, MovableObject } from '../../../mechanics/types';
import { State } from './types';

/**
 * Tipe data untuk informasi tile yang bersifat statis (tidak berubah selama level berjalan).
 */
interface TileStaticInfo {
  x: number;
  y: number;
  height: number;
  hasTarget: boolean;
}

/**
 * Tipe data untuk objek yang bisa bergerak, dilengkapi dengan posisi 3D [x, y, z].
 */
interface MovableObjectsInfo extends MovableObject {
  position: [number, number, number];
}

/**
 * Selector untuk mendapatkan posisi robot dalam koordinat 3D.
 * Tinggi (Z) dihitung berdasarkan tinggi lantai + jumlah objek di bawah robot.
 */
export const getRobotPosition = (state: State): [number, number, number] => {
  assertMapDefined(state);

  const [x, y] = state.map.robot.position;
  const tile = state.map.tiles[x][y];
  // Z = Tinggi lantai + jumlah objek + offset visual (1)
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

/**
 * Mengambil informasi dasar seluruh petak di map.
 * Digunakan untuk merender struktur lantai dan target.
 */
export const getTilesInfo = (state: State): TileStaticInfo[] => {
  assertMapDefined(state);

  const { tiles, targets } = state.map;
  // Optimasi: Gunakan Set dengan string template untuk pencarian cepat
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

/**
 * Mengambil semua objek yang bisa didorong (box/kotak) di seluruh map.
 * Menghitung koordinat Z setiap objek secara dinamis berdasarkan urutan tumpukan.
 */
export const getMovableObjectsInfo = (state: State): MovableObjectsInfo[] => {
  assertMapDefined(state);

  const { tiles } = state.map;

  return tiles.flatMap((column, x) =>
    column.flatMap((tile, y) =>
      tile.objects.map((obj, index) => ({
        ...obj,
        // Posisi Z = Tinggi lantai + indeks tumpukan + offset (1)
        position: [x, y, tile.height + index + 1] as [number, number, number],
      }))
    )
  );
};

export const isLevelCleared = (state: State): boolean => state.finished;

/**
 * TypeScript Assertion: Memastikan map sudah dimuat sebelum selector dijalankan.
 */
function assertMapDefined(state: State): asserts state is State & { map: LevelMap } {
  if (!state.map) {
    throw Error('No map defined. Pastikan level sudah dimulai sebelum mengakses data map.');
  }
}