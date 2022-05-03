import { useCallback, useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { getUrlQueryParams } from '../utils';
import { storage } from './storage';

type AccessTokenResponse = { data: { access_token: string; scope: string; token_type: 'bearer' }; error: undefined } | { data: undefined; error: string | 'bad_verification_code' };
const requestAccessToken = async ({ code }: { code: string }) => {
  const { data, error } = await fetch('https://memlog-auth.deno.dev/login', { method: 'POST', body: JSON.stringify({ code }) }).then((res) => res.json() as Promise<AccessTokenResponse>);
  if (!data) {
    throw error;
  }

  return data;
};
const requestLogout = async ({ token }: { token: string }): Promise<{}> => {
  return await fetch('https://memlog-auth.deno.dev/logout', { method: 'POST', body: JSON.stringify({ token }) }).then((res) => res.json());
};

const moveToGitHubLoginPage = () => {
  window.location.href = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: '5cb413dcbc4c7e0dccf9',
    redirect_uri: 'http://localhost:3000/',
    state: `${Date.now()}`,
  })}`;
};

const getCurrentUrlWithoutParameters = () => {
  const url = new URL(window.location.href);
  return url.origin + url.pathname;
};

const removeGitHubCodeFromURL = () => {
  window.history.replaceState({ time: Date.now() }, document.title, getCurrentUrlWithoutParameters());
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
  const { code: githubAuthCode } = getUrlQueryParams(); // exists if redirected from github login page

  useEffect(() => {
    if (!loading && !loggedIn && githubAuthCode) {
      setLoading(true);
      requestAccessToken({ code: githubAuthCode })
        .then((data) => {
          setAccessToken(data.access_token);
        })
        .catch((error) => {
          setAccessToken(null);
          alert(`AccessToken request failed: ${JSON.stringify(error)}`);
          reloadToTopPage();
        })
        .finally(() => {
          removeGitHubCodeFromURL();
          setLoading(false);
        });
    }
  }, [loading, loggedIn, githubAuthCode, setAccessToken, setLoading]);

  return {
    loading,
    loggedIn,
    token: accessToken ?? '',
    logout: useCallback(() => requestLogout({ token: accessToken ?? '' }).finally(reloadToTopPage), [accessToken]),
    login: moveToGitHubLoginPage,
  } as const;
};
