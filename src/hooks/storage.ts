const keys = {
  accessToken: 'AccessToken',
  userinfo: 'UserInfo',
} as const;

type UserInfo = {
  name: string;
  avatarUrl: string;
  updatedAt: string;
};

export class Storage {
  loadAccessToken = () => window.localStorage.getItem(keys.accessToken) || null;
  saveAccessToken = (value: string | null) => {
    if (value) {
      window.localStorage.setItem(keys.accessToken, value);
    } else {
      window.localStorage.removeItem(keys.accessToken);
    }
  };

  loadUserInfo = () => {
    const data = window.localStorage.getItem(keys.userinfo);
    return data ? (JSON.parse(data) as UserInfo) : null;
  };
  saveUserInfo = (data: { name: string; avatarUrl: string }) => {
    window.localStorage.setItem(keys.userinfo, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
  };

  resetAll = () => {
    window.localStorage.removeItem(keys.accessToken);
    window.localStorage.removeItem(keys.userinfo);
  };
}

export const storage = new Storage();
