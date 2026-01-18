import { applyMiddleware, compose, createStore } from 'redux';
import { install, StoreCreator } from 'redux-loop';
import createRootReducer, { State } from './ducks';
import { loadPersistedState, setupStatePersistence } from './localStorage';

const PERSISTENT_SLICES: Array<keyof State> = ['levels', 'settings'];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

/**
 * configureStore - Versi Simplified (Tanpa Connected Router)
 */
export function configureStore() {
  const persistedState = loadPersistedState(PERSISTENT_SLICES);
  
  // Tidak lagi menggunakan routerMiddleware karena routing dihandle oleh BrowserRouter
  const enhancer = composeEnhancers(
    install() 
  );

  const enhancedCreateStore = createStore as StoreCreator;
  const store = enhancedCreateStore(
    createRootReducer(), // Tidak ada parameter - sudah diperbaiki!
    persistedState as State, 
    enhancer
  );

  setupStatePersistence(store, PERSISTENT_SLICES);

  // Hot Module Replacement untuk development
  if (import.meta.hot) {
    import.meta.hot.accept('./ducks', () => {
      const newRootReducer = createRootReducer(); // Tidak ada parameter
      store.replaceReducer(newRootReducer as any);
    });
  }

  return { store };
}

export default configureStore;