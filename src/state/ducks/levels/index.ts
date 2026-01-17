import reducer from './reducer';
import * as levelsActions from './actions';
import * as levelsSelectors from './selectors';

/**
 * Modul Levels
 * Mengelola progres permainan, daftar level yang tersedia, dan level yang sudah terbuka.
 */

export {
  levelsActions,
  levelsSelectors
};

// Mengekspor semua tipe data dari folder ini (misal: State, LevelInfo)
export * from './types'; 

export default reducer;