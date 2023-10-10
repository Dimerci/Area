import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'area',
  clientId: 'areaid',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
