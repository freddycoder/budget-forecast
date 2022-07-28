import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import './i18n';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Chargement...</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

