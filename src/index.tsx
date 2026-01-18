import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './state';

// 1. Inisialisasi Store
const { store } = configureStore();

// 2. Mengambil elemen root dari index.html
const container = document.getElementById('root');

// Pastikan container ada sebelum render
if (container) {
  const root = createRoot(container);
  
  root.render(
    // PERBAIKAN: Hapus StrictMode untuk menghindari double-render
    // yang bisa menyebabkan masalah dengan Redux state updates
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// Mendaftarkan service worker untuk fitur Offline (PWA)
serviceWorker.register();