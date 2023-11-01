import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain="dev-zqudvtrv6sw7xe6c.us.auth0.com"
    clientId="cx4hdbUF3doZRcilukkHUajuKYSdOFKA"
    {...({redirectUri: window.location.origin} as any)}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);


reportWebVitals();