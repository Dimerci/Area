import React from 'react';
import keycloak from '../keycloakConfig';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Keycloak</button>
    </div>
  );
};

export default LoginPage;
