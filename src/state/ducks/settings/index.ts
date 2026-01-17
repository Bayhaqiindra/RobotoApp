import reducer from './reducer';
import * as settingsActions from './actions';
import * as settingsSelectors from './selectors';

/**
 * Modul Settings
 * Mengelola preferensi pengguna seperti tampilan UI, kontrol, dan opsi audio.
 */

export {
  settingsActions,
  settingsSelectors
};

// Mengekspor tipe data agar bisa digunakan oleh Root State
export * from './types';

export default reducer;