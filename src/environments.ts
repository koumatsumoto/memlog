const isLocalhost = Boolean(
  globalThis.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    globalThis.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    globalThis.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);
const isProduction = process.env.NODE_ENV === 'production';
const publicURL = process.env.PUBLIC_URL;
const version = process.env.REACT_APP_VERSION?.slice(0, 6);
const oauthRedirectUrl = isLocalhost ? 'http://localhost:3000/' : 'https://koumatsumoto.github.io/memlog/';
const oauthClientId = isLocalhost ? '5cb413dcbc4c7e0dccf9' : 'd63100b983d6c453f86e';

export const ENV = {
  version,
  publicURL,
  isLocalhost,
  isProduction,
  oauthRedirectUrl,
  oauthClientId,
} as const;
