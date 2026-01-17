import { State } from './types';

/**
 * Selector untuk mengecek apakah kontrol di layar (on-screen controls) 
 * harus ditampilkan.
 */
export const displayOnScreenControls = (state: State): boolean => {
  return state.onScreenControls;
};