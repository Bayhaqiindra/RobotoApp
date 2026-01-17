import React from 'react';
import { createRoot } from 'react-dom/client'; // Menggunakan API React 18
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './state';

// 1. Inisialisasi Store dan History
const { store, history } = configureStore();

// 2. Mengambil elemen root dari index.html
const container = document.getElementById('root');

// Pastikan container ada sebelum render (mencegah error 'null')
if (container) {
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      {/* Provider: Menghubungkan Redux Store */}
      <Provider store={store}>
        {/* ConnectedRouter: Sinkronisasi State Redux dengan URL */}
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  );
}

// Mendaftarkan service worker untuk fitur Offline (PWA)
serviceWorker.register();