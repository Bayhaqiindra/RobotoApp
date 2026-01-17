import { LevelMap } from '../../../mechanics/types';

/**
 * ActionTypes - Daftar semua aksi yang mungkin terjadi dalam gameplay.
 * Menggunakan string literal yang deskriptif untuk mempermudah debugging di Redux DevTools.
 */
export enum ActionTypes {
  START_LEVEL = 'game/START_LEVEL',
  FINISH_LEVEL = 'game/FINISH_LEVEL',
  MOVE = 'game/MOVE',
  MOVE_FORWARD = 'game/MOVE_FORWARD',
  MOVE_BACKWARD = 'game/MOVE_BACKWARD',
  TURN_RIGHT = 'game/TURN_RIGHT',
  TURN_LEFT = 'game/TURN_LEFT'
}

/**
 * State - Struktur data utama untuk game reducer.
 */
export interface State {
  /** Menandakan apakah level saat ini sudah diselesaikan */
  readonly finished: boolean;
  
  /** * Data peta level aktif. 
   * Bersifat opsional (?) karena saat aplikasi baru dimuat, 
   * level mungkin belum dipilih.
   */
  readonly map?: LevelMap;
}