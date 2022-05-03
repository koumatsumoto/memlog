const keys = {
  accessToken: 'AccessToken',
} as const;

export class Storage {
  loadAccessToken = () => window.localStorage.getItem(keys.accessToken) || null;
  saveAccessToken = (value: string | null) => {
    if (value) {
      window.localStorage.setItem(keys.accessToken, value);
    } else {
      window.localStorage.removeItem(keys.accessToken);
    }
  };
  resetAccessToken = () => window.localStorage.removeItem(keys.accessToken);
}

export const storage = new Storage();
