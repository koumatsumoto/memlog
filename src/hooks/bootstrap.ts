import { useEffect } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { getUrlQueryParams } from '../utils';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage, useGitHubAccessToken, useGitHubAuthCode } from './auth';

const initialUrlParamsState = atom({ key: 'initialUrlParamsState', default: getUrlQueryParams() });

export const useApplicationBootstrap = () => {
  const urlParams = useRecoilValue(initialUrlParamsState);
  const githubAuthCode = useGitHubAuthCode();
  const githubAccessToken = useGitHubAccessToken();
  const statusType = githubAccessToken ? 'LoggedIn' : githubAuthCode ? 'GettingAccessToken' : 'NotLoggedIn';

  useEffect(() => {
    // page redirected from github login page for oauth
    if (urlParams.code) {
      requestAccessTokenAndSaveToStorage(urlParams.code).then(replaceLocationWithTopPage);
    }
    // page opened by Web Share API
    if (urlParams.title && urlParams.text) {
      alert(`Page opened by Web Share API, title=${urlParams.title}, text=${urlParams.text}`);
      replaceLocationWithTopPage();
    }

    console.log('[info] application bootstrap', { urlParams, loginStatus: statusType });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    statusType,
  } as const;
};
