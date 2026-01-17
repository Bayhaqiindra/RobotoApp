import { Maybe } from '../utils/types';
import { Tile } from './types';

/**
 * isMoveValid - Versi Modern
 * Mengecek aturan validasi pergerakan berdasarkan ketinggian dan rintangan.
 */
export const isMoveValid = (
  currentTile: Tile, 
  targetTile: Maybe<Tile>, 
  pushedObjectsTile: Maybe<Tile>
): boolean => {
  // 1. Validasi Petak Tujuan (Target)
  if (!isValidTile(targetTile)) {
    // Target di luar map atau merupakan lubang (void)
    return false;
  }

  // Robot hanya bisa naik jika perbedaan tinggi maksimal adalah jumlah objek di atas petak saat ini
  const currentTotalHeight = currentTile.height + currentTile.objects.length;
  
  if (targetTile.height > currentTotalHeight) {
    // Mencoba menabrak dinding yang terlalu tinggi
    return false;
  }

  // 2. Logika Mendorong Objek (Pushing)
  // Objek yang terdorong adalah objek di targetTile yang berada di atas level pijakan Robot
  const pushedObjects = targetTile.objects.slice(Math.max(0, currentTotalHeight - targetTile.height));

  if (pushedObjects.length > 0) {
    if (!isValidTile(pushedObjectsTile)) {
      // Tidak bisa mendorong kotak ke luar map atau ke dalam lubang
      return false;
    }

    const nextTotalHeight = pushedObjectsTile.height + pushedObjectsTile.objects.length;
    
    if (nextTotalHeight > currentTotalHeight) {
      // Tidak bisa mendorong kotak menabrak dinding atau tumpukan objek lain
      return false;
    }
  }

  return true;
};

/**
 * isValidTile - Type Guard untuk memastikan tile ada dan bukan lubang
 */
export const isValidTile = (tile: Maybe<Tile>): tile is Tile => {
  return tile !== undefined && tile.height > 0;
};

export default isMoveValid;