const keys = {
  accessToken: "AccessToken",
  userinfo: "UserInfo",
} as const;

type UserInfo = {
  name: string;
  avatarUrl: string;
  updatedAt: string;
};

const createAppStorage = (storage = window.localStorage) => {
  return {
    loadAccessToken() {
      return storage.getItem(keys.accessToken) || null;
    },
    saveAccessToken(value: string | null) {
      if (value) {
        storage.setItem(keys.accessToken, value);
      } else {
        storage.removeItem(keys.accessToken);
      }
    },
    resetAll() {
      storage.removeItem(keys.accessToken);
      storage.removeItem(keys.userinfo);
    },
  } as const;
};

export const AppStorage = createAppStorage();
