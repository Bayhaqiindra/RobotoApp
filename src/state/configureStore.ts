import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { install, StoreCreator } from 'redux-loop';
import createRootReducer, { State } from './ducks';
import { loadPersistedState, setupStatePersistence } from './localStorage';

const PERSISTENT_SLICES: Array<keyof State> = ['levels', 'settings'];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

/**
 * configureStore - Versi Vite Compatible
 */
export function configureStore() {
  const persistedState = loadPersistedState(PERSISTENT_SLICES);
  
  // Menggunakan basename kosong jika tidak dideploy di sub-folder
  const history = createBrowserHistory();
  
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    install() 
  );

  const enhancedCreateStore = createStore as StoreCreator;
  const store = enhancedCreateStore(
    createRootReducer(history), 
    persistedState as State, 
    enhancer
  );

  setupStatePersistence(store, PERSISTENT_SLICES);

  // PERBAIKAN: Menggunakan import.meta.hot untuk Vite sebagai pengganti module.hot
  if (import.meta.hot) {
    import.meta.hot.accept('./ducks', () => {
      const newRootReducer = createRootReducer(history);
      store.replaceReducer(newRootReducer as any);
    });
  }

  return {
    store,
    history
  };
}

export default configureStore;