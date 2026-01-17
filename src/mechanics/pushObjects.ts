import { Direction, move, Point2D } from './directions';
import { Tile } from './types';

/**
 * pushObjects - Versi Modern
 * Memindahkan objek dari satu petak ke petak berikutnya berdasarkan arah dorongan.
 */
export const pushObjects = (tiles: Tile[][], robotPosition: Point2D, direction: Direction): Tile[][] => {
  const from = move(robotPosition, direction);
  const to = move(from, direction);

  const [fromX, fromY] = from;
  const [toX, toY] = to;

  // Mengambil data petak robot untuk menghitung ambang batas ketinggian dorongan
  const [robotX, robotY] = robotPosition;
  const robotTile = tiles[robotX][robotY];
  const robotTotalHeight = robotTile.height + robotTile.objects.length;

  return tiles.map((column, x) =>
    column.map((tile, y) => {
      // 1. Petak Asal (Tempat objek sebelumnya berada)
      if (x === fromX && y === fromY) {
        return {
          ...tile,
          // Sisakan objek yang berada di bawah ketinggian robot
          objects: tile.objects.slice(0, Math.max(0, robotTotalHeight - tile.height))
        };
      }

      // 2. Petak Tujuan (Tempat objek mendarat setelah didorong)
      if (x === toX && y === toY) {
        const fromTile = tiles[fromX][fromY];
        // Ambil objek dari petak asal (yang berada di atas ketinggian robot)
        const pushedObjects = fromTile.objects.slice(Math.max(0, robotTotalHeight - fromTile.height));
        
        return {
          ...tile,
          objects: [...tile.objects, ...pushedObjects]
        };
      }

      // 3. Petak lainnya tetap tidak berubah
      return tile;
    })
  );
};

export default pushObjects;