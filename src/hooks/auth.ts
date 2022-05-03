import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { getUrlQueryParams } from '../utils';

type AccessTokenResponse = { data: { access_token: string; scope: string; token_type: 'bearer' }; error: undefined } | { data: undefined; error: string | 'bad_verification_code' };
const requestAccessToken = async ({ code }: { code: string }): Promise<AccessTokenResponse> => {
  return await fetch('https://memlog-auth.deno.dev', { method: 'post', body: JSON.stringify({ code }) }).then((res) => res.json());
};

const getCurrentUrlWithoutParameters = () => {
  const url = new URL(window.location.href);
  return url.origin + url.pathname;
};

const removeGitHubCodeFromURL = () => {
  window.history.replaceState({ time: Date.now() }, document.title, getCurrentUrlWithoutParameters());
};

const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: window.localStorage.getItem('accessToken'),
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        if (value) {
          window.localStorage.setItem('AccessToken', value);
        } else {
          window.localStorage.removeItem('AccessToken');
        }
      });
    },
  ],
});

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const { code: githubAuthCode } = getUrlQueryParams(); // exists if redirected from github login page

  useEffect(() => {
    if (!accessToken && githubAuthCode && !loading) {
      setLoading(true);
      requestAccessToken({ code: githubAuthCode })
        .then(({ data, error }) => {
          if (!data) {
            throw error;
          }

          setAccessToken(data.access_token);
        })
        .catch((e) => {
          alert(`AccessToken request failed: ${JSON.stringify(e)}`);
          window.location.replace('/');
        })
        .finally(() => {
          removeGitHubCodeFromURL();
          setLoading(false);
        });
    }
  }, [loading, githubAuthCode, accessToken, setAccessToken]);

  return { loading, loggedIn: Boolean(accessToken), token: accessToken ?? '' };
};
