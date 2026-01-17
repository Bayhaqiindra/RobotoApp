import { DeepReadonly } from 'utility-types';

/**
 * ActionTypes - Konstanta aksi untuk pengaturan.
 * Menggunakan prefix 'settings/' untuk menjaga keteraturan di Redux DevTools.
 */
export enum ActionTypes {
  TOGGLE_ON_SCREEN_CONTROLS = 'settings/TOGGLE_ON_SCREEN_CONTROLS'
}

/**
 * State - Struktur data untuk preferensi pengguna.
 * DeepReadonly memastikan properti seperti onScreenControls tidak bisa diubah langsung.
 */
export type State = DeepReadonly<{
  /** Status apakah tombol kontrol di layar ditampilkan atau disembunyikan */
  onScreenControls: boolean;
}>;