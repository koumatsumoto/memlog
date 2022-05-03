import { useEffect } from 'react';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage, useGitHubAccessToken, useGitHubAuthCode } from './auth';

export const useApplicationBootstrap = () => {
  const githubAuthCode = useGitHubAuthCode();
  const githubAccessToken = useGitHubAccessToken();
  const loginStatus = githubAccessToken ? 'LoggedIn' : githubAuthCode ? 'GettingAccessToken' : 'NotLoggedIn';

  useEffect(() => {
    if (githubAuthCode) {
      requestAccessTokenAndSaveToStorage(githubAuthCode).then(replaceLocationWithTopPage);
    }

    console.log('[info] application bootstrap', { loginStatus, githubAuthCode, githubAccessToken });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    status: loginStatus,
  } as const;
};
