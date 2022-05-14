import { atom, atomFamily, selector } from 'recoil';
import { getUrlQueryParams, isFalsy, isNonEmptyString, prettyJson } from '../../utils';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage } from '../login';
import { storage } from '../storage';

const urlQueryParams = atom({ key: 'urlQueryParams', default: getUrlQueryParams() });

const gitHubAuthCode = selector({ key: 'gitHubAuthCode', get: ({ get }) => isNonEmptyString(get(urlQueryParams)) });
const gitHubAuthenticationState = atomFamily<{ code?: string; startTime?: number; endTime?: number }, { code?: string }>({
  key: 'gitHubAuthenticationJob',
  default: {},
  effects: ({ code }) => [
    ({ setSelf }) => {
      if (isFalsy(code)) {
        return;
      }

      const startTime = Date.now();
      setSelf({ code, startTime });
      requestAccessTokenAndSaveToStorage(code)
        .then(() => setSelf({ code, startTime, endTime: Date.now() }))
        .catch((e) => alert(prettyJson(e)))
        .finally(() => replaceLocationWithTopPage());
    },
  ],
});

const githubAccessToken = atom({ key: 'githubAccessToken', default: storage.loadAccessToken() });
const hasGitHubAccessToken = selector({ key: 'hasGitHubAccessToken', get: ({ get }) => isNonEmptyString(get(githubAccessToken)) });

export const state = {
  urlQueryParams,
  gitHubAuthCode,
  gitHubAuthenticationState,
  githubAccessToken,
  hasGitHubAccessToken,
} as const;
