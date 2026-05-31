import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { store } from './store/store';
import './index.css';
import App from './App.jsx';

// Configure Axios Default Base URL for Laravel REST API Backend
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
