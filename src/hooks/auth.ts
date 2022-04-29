import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export const useLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return useCallback(() => {
    loginWithRedirect().catch(alert);
  }, [loginWithRedirect]);
};

export const useLogout = () => {
  const { logout } = useAuth0();

  return useCallback(() => {
    logout();
  }, [logout]);
};
