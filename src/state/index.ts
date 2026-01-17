import { State } from './ducks';
import { gameActions, gameSelectors } from './ducks/game';
import { levelsActions, levelsSelectors } from './ducks/levels';
import { settingsActions, settingsSelectors } from './ducks/settings';
import configureStore from './configureStore';

/**
 * RootState - Representasi tipe data dari seluruh pohon state aplikasi.
 * Digunakan oleh hook `useSelector` untuk mendapatkan auto-complete yang akurat.
 */
export type RootState = State;

/**
 * Exporting all modules
 * Memungkinkan akses mudah: import { gameActions } from '../state';
 */
export {
  configureStore,
  gameActions,
  gameSelectors,
  levelsActions,
  levelsSelectors,
  settingsActions,
  settingsSelectors
};