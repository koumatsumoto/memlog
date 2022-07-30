import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { match } from 'ts-pattern';
import { toast } from '../components/Toast';
import { state, useAppInitialState } from './state';

export const useApplicationSetup = () => {
  const { appOpenedBy, urlParams, hasAccessToken } = useAppInitialState();
  const [, startGitHubAuth] = useRecoilState(state.gitHubAuthenticationState(urlParams));

  useEffect(() => {
    startGitHubAuth(urlParams);

    match(appOpenedBy)
      .with('StartedWithSharedTargetAPI', async () => {
        toast({ title: 'App opened by Web Share Target API ', description: `title: ${urlParams.title}\ntext: ${urlParams.text}`, status: 'info' });
      })
      .otherwise(() => {});

    console.log('[app] setup completed');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    appOpenedBy,
    hasAccessToken,
  } as const;
};
