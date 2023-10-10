import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './utils/AuthContext';
// src/index.tsx or src/index.js
import './index.css';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
