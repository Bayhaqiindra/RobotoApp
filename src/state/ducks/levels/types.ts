import { DeepReadonly } from 'utility-types';

/**
 * ActionTypes - Konstanta aksi untuk modul Levels.
 * Menggunakan prefix 'levels/' agar unik dan mudah dikenali di Redux DevTools.
 */
export enum ActionTypes {
  SELECT_LEVEL = 'levels/SELECT_LEVEL',
  CLEAR_LEVEL = 'levels/CLEAR_LEVEL',
}

/**
 * State - Struktur data untuk melacak progres level pemain.
 * Menggunakan DeepReadonly untuk memastikan integritas data (immutability).
 */
export type State = DeepReadonly<{
  /** Jumlah level yang sudah berhasil dibuka oleh pemain */
  unlockedLevels: number;
  
  /** Indeks level yang sedang dipilih atau dimainkan (opsional) */
  selectedLevel?: number;
}>;