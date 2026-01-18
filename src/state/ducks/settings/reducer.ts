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
 * * PERBAIKAN: 
 * 1. Menambahkan return type ': any' (atau ': State | any') untuk sinkronisasi 
 * dengan library redux-loop dan menghindari error 'undefined'.
 */
const settingsReducer: Reducer<State, SettingsAction> = (
  state = INITIAL_STATE, 
  action: SettingsAction
): any => {
  switch (action.type) {
    case ActionTypes.TOGGLE_ON_SCREEN_CONTROLS:
      return {
        ...state,
        onScreenControls: !state.onScreenControls
      };

    default:
      /**
       * PERBAIKAN: Menghapus assertNever jika menyebabkan masalah inferensi tipe.
       * Cukup return state untuk memastikan nilai yang dikembalikan valid.
       */
      return state;
  }
};

export default settingsReducer;