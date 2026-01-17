import { Store } from 'redux';
import { State } from './ducks';

/**
 * loadPersistedState - Memuat potongan state tertentu dari Local Storage.
 * Digunakan saat inisialisasi store untuk mengembalikan data tersimpan.
 */
function loadPersistedState(slices: Array<keyof State>): Partial<State> {
  const persistedState: Partial<State> = {};

  slices.forEach(sliceName => {
    try {
      const serializedSliceState = localStorage.getItem(sliceName);

      if (serializedSliceState) {
        // Mengubah string JSON kembali menjadi objek state
        persistedState[sliceName] = JSON.parse(serializedSliceState);
      }
    } catch (err) {
      console.warn(`Gagal memuat state untuk slice "${sliceName}":`, err);
    }
  });
  return persistedState;
}

/**
 * setupStatePersistence - Mekanisme "Observer" yang mengawasi perubahan state.
 * Hanya menyimpan ke Local Storage jika data pada slice tersebut benar-benar berubah.
 */
function setupStatePersistence(store: Store<State>, slices: Array<keyof State>) {
  // Menggunakan Map untuk efisiensi perbandingan state lama dan baru
  let previousState = new Map(Object.entries(store.getState()));

  store.subscribe(() => {
    const currentState = store.getState();
    const newStateMap = new Map(Object.entries(currentState));
    
    // Filter hanya slice yang berubah nilainya (Shallow Comparison)
    const changedSlices = slices.filter(
      sliceName => newStateMap.get(sliceName) !== previousState.get(sliceName)
    );

    changedSlices.forEach(sliceName => {
      // TypeScript Assertion: Kita yakin slice ini ada karena hasil filter
      const sliceData = currentState[sliceName];
      if (sliceData) {
        saveSliceState(sliceName, sliceData);
      }
    });

    if (changedSlices.length > 0) {
      previousState = newStateMap;
    }
  });
}

/**
 * saveSliceState - Helper internal untuk melakukan JSON stringify dan menulis ke disk.
 */
function saveSliceState<K extends keyof State>(sliceName: K, sliceState: State[K]) {
  try {
    const serializedSlice = JSON.stringify(sliceState);
    localStorage.setItem(sliceName, serializedSlice);
  } catch (err) {
    console.warn(`Gagal menyimpan state untuk slice "${sliceName}":`, err);
  }
}

export {
  loadPersistedState,
  setupStatePersistence
};