import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store';
import Loader from '@components/Loader.tsx';
import App from './App.tsx';
import './global.css';

ChartJS.register(...registerables);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
