import { useCallback, useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { ENV } from '../environments';
import { storage } from './storage';

type AccessTokenResponse = { data: { access_token: string; scope: string; token_type: 'bearer' }; error: undefined } | { data: undefined; error: string | 'bad_verification_code' };
const requestAccessToken = async (code: string) => {
  const { data, error } = await fetch('https://memlog-auth.deno.dev/login', { method: 'POST', body: JSON.stringify({ code, isDev: ENV.isLocalhost }) }).then(
    (res) => res.json() as Promise<AccessTokenResponse>,
  );
  if (!data) {
    throw error;
  }

  return data;
};

const requestLogout = async ({ token }: { token: string }): Promise<{}> => {
  return await fetch('https://memlog-auth.deno.dev/logout', { method: 'POST', body: JSON.stringify({ token, isDev: ENV.isLocalhost }) }).then((res) => res.json());
};

const moveToGitHubLoginPage = () => {
  window.location.href = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: ENV.oauthClientId,
    redirect_uri: ENV.oauthRedirectUrl,
    state: `${Date.now()}`,
  })}`;
};

const consumeGitHubAuthCodeInURL = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  url.searchParams.delete('code');

  const newPath = Array.from(url.searchParams.keys()).length ? `${url.pathname}?${url.searchParams}` : url.pathname;
  window.history.replaceState({}, document.title, newPath);

  return code;
};

export const reloadToTopPage = () => {
  setTimeout(() => window.location.replace('/'), 100);
};

const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: storage.loadAccessToken(),
  effects: [({ onSet }) => onSet(storage.saveAccessToken)],
});

export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [loading, setLoading] = useState(false);
  const loggedIn = Boolean(accessToken);

  useEffect(() => {
    const githubAuthCode = consumeGitHubAuthCodeInURL();
    if (!loading && !loggedIn && githubAuthCode) {
      setLoading(true);
      requestAccessToken(githubAuthCode)
        .then((data) => {
          setAccessToken(data.access_token);
        })
        .catch((error) => {
          setAccessToken(null);
          alert(`AccessToken request failed: ${JSON.stringify(error)}`);
          reloadToTopPage();
        })
        .finally(() => {
          setLoading(false);
          reloadToTopPage();
        });
    }
  }, [loading, loggedIn, setAccessToken, setLoading]);

  return {
    loading,
    loggedIn,
    token: accessToken ?? '',
    logout: useCallback(
      () =>
        requestLogout({ token: accessToken ?? '' }).finally(() => {
          storage.resetAccessToken();
          reloadToTopPage();
        }),
      [accessToken],
    ),
    login: moveToGitHubLoginPage,
  } as const;
};
