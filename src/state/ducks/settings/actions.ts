import { Action } from '../../../utils/types';
import { ActionTypes } from './types';

/**
 * SettingsAction - Gabungan tipe aksi untuk pengaturan preferensi pengguna.
 */
export type SettingsAction = Action<ActionTypes.TOGGLE_ON_SCREEN_CONTROLS>;

/**
 * toggleOnScreenControls - Memicu perubahan tampilan tombol kontrol di layar.
 * Berguna untuk pengguna perangkat layar sentuh (mobile) atau mereka yang 
 * lebih memilih menggunakan mouse daripada keyboard.
 */
export const toggleOnScreenControls = (): SettingsAction => ({
  type: ActionTypes.TOGGLE_ON_SCREEN_CONTROLS
});