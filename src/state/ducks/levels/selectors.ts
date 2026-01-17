import { getLevelNames } from '../../../levels';
import { Maybe } from '../../../utils/types';
import { State } from './types';

/**
 * Mendapatkan indeks level yang sedang dipilih atau dimainkan saat ini.
 */
export const getSelectedLevel = (state: State): Maybe<number> => {
  return state.selectedLevel;
};

/**
 * Mengecek apakah suatu level sudah terbuka (unlocked) berdasarkan progres pemain.
 * @param level - Indeks level yang ingin dicek.
 */
export const isUnlocked = (state: State, level: number): boolean => {
  return level < state.unlockedLevels;
};

/**
 * Menentukan indeks level berikutnya jika tersedia.
 * Digunakan untuk tombol "Next Level" setelah pemain memenangkan sebuah level.
 */
export const getNextLevel = (state: State): Maybe<number> => {
  if (state.selectedLevel !== undefined) {
    const nextLevel = state.selectedLevel + 1;
    const allLevelNames = getLevelNames();

    // Memastikan level berikutnya memang ada di dalam daftar level game
    if (nextLevel >= 0 && nextLevel < allLevelNames.length) {
      return nextLevel;
    }
  }
  return undefined;
};