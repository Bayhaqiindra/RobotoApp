import reducer from './reducer';
import * as gameActions from './actions';
import * as gameSelectors from './selectors';

/**
 * Modul State Game
 * Mengekspor action, selector, dan reducer utama untuk digunakan dalam Root Store.
 */

export {
  gameActions,
  gameSelectors
};

export * from './types'; // Mengekspor tipe data agar bisa diakses secara global
export default reducer;