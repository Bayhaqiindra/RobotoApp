import { Maybe } from '../utils/types';
import { Direction, move, Point2D } from './directions';
import { Tile } from './types';

/**
 * getTile - Mengambil data petak pada koordinat tertentu.
 * Menggunakan Optional Chaining (?.) untuk mencegah error jika koordinat di luar batas array.
 */
export const getTile = (tiles: Tile[][], [x, y]: Point2D): Maybe<Tile> => {
  return tiles[x]?.[y];
};

/**
 * getRelevantTiles - Mengambil 3 petak penting untuk validasi pergerakan:
 * 1. Petak tempat Robot berdiri sekarang.
 * 2. Petak tujuan Robot (target).
 * 3. Petak di belakang target (tempat kotak akan mendarat jika didorong).
 */
export const getRelevantTiles = (
  tiles: Tile[][], 
  robotPosition: Point2D, 
  moveDirection: Direction
): [Tile, Maybe<Tile>, Maybe<Tile>] => {
  const targetPosition = move(robotPosition, moveDirection);
  const pushedObjectsPosition = move(targetPosition, moveDirection);

  return [
    getTile(tiles, robotPosition)!, // Robot pasti berdiri di atas petak yang valid
    getTile(tiles, targetPosition),
    getTile(tiles, pushedObjectsPosition)
  ];
};

export default getRelevantTiles;