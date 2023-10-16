import React from 'react';
import keycloak from '../keycloakConfig';
import WeatherSearchBox from '../components/WeatherSearchBox';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div>
      <WeatherSearchBox />
    </div>
  );
};

export default LoginPage;
