import { Store } from 'redux';
import { State } from './ducks';

/**
 * loadPersistedState - Memuat potongan state tertentu dari Local Storage.
 */
function loadPersistedState(slices: Array<keyof State>): Partial<State> {
  // PERBAIKAN: Gunakan 'any' pada inisialisasi agar properti readonly bisa diisi 
  // selama proses inisialisasi awal.
  const persistedState: any = {};

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
  
  // Cast kembali ke Partial<State> saat dikembalikan
  return persistedState as Partial<State>;
}

/**
 * setupStatePersistence - Mekanisme "Observer" yang mengawasi perubahan state.
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
 * saveSliceState - Helper internal untuk menulis ke disk.
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