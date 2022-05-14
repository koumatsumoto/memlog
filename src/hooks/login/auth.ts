import { useCallback } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { ENV } from '../../environments';
import { getUrlQueryParams } from '../../utils';
import { storage } from '../storage';

type AccessTokenResponse = { data: { access_token: string; scope: string; token_type: 'bearer' }; error: undefined } | { data: undefined; error: string | 'bad_verification_code' };
export const requestAccessTokenAndSaveToStorage = async (code: string) => {
  const { data, error } = await fetch('https://memlog-auth.deno.dev/login', { method: 'POST', body: JSON.stringify({ code, isDev: ENV.isLocalhost }) }).then(
    (res) => res.json() as Promise<AccessTokenResponse>,
  );
  if (!data) {
    throw error;
  }

  storage.saveAccessToken(data.access_token);
};

const requestLogout = async ({ token }: { token: string }): Promise<{}> => {
  return await fetch('https://memlog-auth.deno.dev/logout', { method: 'POST', body: JSON.stringify({ token, isDev: ENV.isLocalhost }) }).then((res) => res.json());
};

const redirectToGitHubLoginPage = () => {
  window.location.href = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: ENV.oauthClientId,
    redirect_uri: ENV.oauthRedirectUrl,
    scope: 'read:user repo',
  })}`;
};

export const replaceLocationWithTopPage = () => {
  window.location.replace(ENV.routes.top);
};

const githubAuthCodeState = atom({ key: 'githubAuthCodeState', default: getUrlQueryParams().code });
const githubAccessTokenState = atom({ key: 'githubAccessTokenState', default: storage.loadAccessToken() });

export const useGitHubAuthCode = () => useRecoilValue(githubAuthCodeState);
export const useGitHubAccessToken = () => useRecoilValue(githubAccessTokenState);

export const useLogin = () => {
  const accessToken = useGitHubAccessToken();
  const loginWithRedirect = redirectToGitHubLoginPage;
  const logoutWithReload = useCallback(async () => {
    await requestLogout({ token: accessToken ?? '' });
    storage.resetAll();
    replaceLocationWithTopPage();
  }, [accessToken]);

  return {
    canLogout: Boolean(accessToken),
    logoutWithReload,
    loginWithRedirect,
  } as const;
};
