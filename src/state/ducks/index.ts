import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux-loop';

// Mengimpor reducer dari setiap modul
import game from './game';
import levels from './levels';
import settings from './settings';

// Mengimpor tipe data State untuk definisi Root State
import { State as GameState } from './game/types';
import { State as LevelsState } from './levels/types';
import { State as SettingsState } from './settings/types';

/**
 * Root State - Struktur data lengkap aplikasi Sokobot Anda.
 */
export type State = {
  readonly game: GameState;
  readonly levels: LevelsState;
  readonly router: RouterState<any>;
  readonly settings: SettingsState;
}

/**
 * createRootReducer - Menggabungkan semua reducer menjadi satu.
 * PERBAIKAN: Menambahkan casting 'as any' pada combineReducers 
 * untuk menangani perbedaan antara Reducer standar dan Redux-Loop Reducer.
 */
const createRootReducer = (history: History) => {
  return combineReducers({
    game: game as any,
    levels: levels as any,
    settings: settings as any,
    router: connectRouter(history) as any,
  }) as any;
}

export default createRootReducer;