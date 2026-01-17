import { assertNever, Reducer } from '../../../utils/types';
import { SettingsAction } from './actions';
import { ActionTypes, State } from './types';

/**
 * INITIAL_STATE - Secara default, kontrol di layar diaktifkan.
 */
export const INITIAL_STATE: State = {
  onScreenControls: true
};

/**
 * settingsReducer - Mengelola konfigurasi dan preferensi pengguna.
 */
const settingsReducer: Reducer<State, SettingsAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_ON_SCREEN_CONTROLS:
      // Membalikkan nilai (true menjadi false, dan sebaliknya)
      return {
        ...state, // Praktik terbaik: selalu spread state lama meskipun hanya ada satu properti
        onScreenControls: !state.onScreenControls
      };

    default:
      // Exhaustive checking untuk memastikan semua tipe aksi ditangani
      assertNever(action.type as never);
      return state;
  }
};

export default settingsReducer;