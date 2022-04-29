import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './components/theme';
import { ENV } from './environments';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const AUTH0_CONFIG = {
  domain: 'dev-rfm-ej96.us.auth0.com',
  clientId: 'zs2IueWS5SahYSkqXXFrvU0YREwCnNfh',
  redirectUri: ENV.isLocalhost ? 'http://localhost:3000/' : 'https://koumatsumoto.github.io/memlog/',
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={AUTH0_CONFIG.domain} clientId={AUTH0_CONFIG.clientId} redirectUri={AUTH0_CONFIG.redirectUri}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
