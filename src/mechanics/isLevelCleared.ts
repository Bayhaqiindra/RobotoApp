import { LevelMap, Tile } from './types';

/**
 * isLevelCleared - Versi Modern
 * Mengecek apakah semua kotak sudah berada di posisi target.
 */
export const isLevelCleared = (levelMap: LevelMap): boolean => {
  const { tiles, targets } = levelMap;

  // Helper untuk mengecek apakah sebuah tile memiliki box
  const hasBox = (tile: Tile) => tile.objects.some(o => o.type === 'box');

  // 1. Optimasi: Buat Set string dari koordinat target untuk pencarian instan O(1)
  const targetLookup = new Set(targets.map(([x, y]) => `${x},${y}`));

  // 2. Validasi: Apakah ada target yang belum diisi box?
  const allTargetsFilled = targets.every(([x, y]) => hasBox(tiles[x][y]));
  if (!allTargetsFilled) return false;

  // 3. Validasi: Apakah ada box yang berada di luar target?
  // Kita iterasi semua tiles, jika ada box, dia HARUS ada di dalam targetLookup.
  const allBoxesOnTargets = tiles.every((column, x) =>
    column.every((tile, y) => {
      if (hasBox(tile)) {
        return targetLookup.has(`${x},${y}`);
      }
      return true;
    })
  );

  return allBoxesOnTargets;
};

export default isLevelCleared;