import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';

export const useLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return useCallback(() => {
    loginWithRedirect().catch(alert);
  }, [loginWithRedirect]);
};

type GitHubUserData = { [key: string]: any };

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => setAccessToken(token))
        .catch(console.error);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // debug
  if (isAuthenticated && !user) {
    throw new Error('Unexpected data, authenticated but user data is not found');
  }

  return { isLoading, isAuthenticated, user, accessToken } as
    | { isLoading: true; isAuthenticated: false; user: undefined; accessToken: undefined }
    | { isLoading: false; isAuthenticated: false; user: undefined; accessToken: undefined }
    | { isLoading: false; isAuthenticated: true; user: GitHubUserData; accessToken: string | undefined };
};

export const useLogout = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth0();

  return {
    canLogout: isAuthenticated,
    logout: useCallback(() => logout(), [logout]),
  };
};
