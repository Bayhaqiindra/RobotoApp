import { combineReducers } from 'redux-loop';

// Mengimpor reducer dari setiap modul
import game from './game';
import levels from './levels';
import settings from './settings';

// Import State dari masing-masing modul
import type { State as GameState } from './game';
import type { State as LevelsState } from './levels';
import type { State as SettingsState } from './settings';

/**
 * Root State - Struktur data lengkap aplikasi Sokobot (Tanpa Router State)
 */
export interface State {
  readonly game: GameState;
  readonly levels: LevelsState;
  readonly settings: SettingsState;
}

/**
 * RootState - Alias untuk kompabilitas dengan selector yang sudah ada
 * Ini penting agar semua file yang menggunakan RootState tetap berfungsi
 */
export type RootState = State;

/**
 * createRootReducer - Menggabungkan semua reducer menjadi satu
 */
const createRootReducer = () => {
  return combineReducers({
    game: game as any,
    levels: levels as any,
    settings: settings as any,
  }) as any;
}

export default createRootReducer;

// Re-export semua actions dan selectors untuk kemudahan akses
export { gameActions, gameSelectors } from './game';
export { levelsActions, levelsSelectors } from './levels';
export { settingsActions, settingsSelectors } from './settings';