import { Action } from '../../../utils/types';
import { ActionTypes } from './types';

/**
 * LevelsAction - Gabungan tipe aksi untuk manajemen progres level.
 */
export type LevelsAction =
  | Action<ActionTypes.SELECT_LEVEL, { level: number }>
  | Action<ActionTypes.CLEAR_LEVEL>;

/**
 * selectLevel - Memicu pemilihan level tertentu.
 * Digunakan saat pemain mengklik daftar level di menu.
 */
export const selectLevel = (level: number): LevelsAction => ({
  type: ActionTypes.SELECT_LEVEL,
  payload: { level }
});

/**
 * clearLevel - Menandai level yang sedang dimainkan sebagai 'Selesai'.
 * Biasanya dipanggil secara otomatis oleh gameReducer saat kondisi menang terpenuhi.
 */
export const clearLevel = (): LevelsAction => ({
  type: ActionTypes.CLEAR_LEVEL
});