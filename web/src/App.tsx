import React, { useEffect } from 'react';
import keycloak from './keycloakConfig';
import { useAuth } from './utils/AuthContext';
import AppRouter from './utils/Router';

const App: React.FC = () => {
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' })
      .then(authenticated => {
        setIsAuthenticated(authenticated);
      })
      .catch(err => {
        console.error("Failed to initialize authentication", err);
      });
  }, [setIsAuthenticated]);

  return <AppRouter />;
};

export default App;
