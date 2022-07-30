import React, { useEffect } from 'react';
import { match } from 'ts-pattern';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage, notifySuccess, useAppInitialState } from '../hooks';
import { prettyJson } from '../utils';
import { LoadingView } from './features/loading';
import { LoginForm } from './features/login';
import { MainTabContents } from './features/main';
import { AppLayout } from './layouts/AppLayout';

const App = () => {
  const { appOpenedBy, urlParams, hasAccessToken } = useAppInitialState();

  useEffect(() => {
    // OAuth Redirect
    if (urlParams.code) {
      requestAccessTokenAndSaveToStorage(urlParams.code)
        .catch((e) => alert(prettyJson(e)))
        .finally(() => replaceLocationWithTopPage());
    }

    // SharedTargetAPI
    if (appOpenedBy === 'SharedTargetAPI') {
      notifySuccess(`App opened from Web Share Target API\n title: ${urlParams.title}\ntext: ${urlParams.text}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Contents = () =>
    match({ appOpenedBy, hasAccessToken })
      .with({ appOpenedBy: 'OAuthRedirect' }, LoadingView)
      .with({ hasAccessToken: false }, LoginForm)
      .with({ hasAccessToken: true }, MainTabContents)
      .exhaustive();

  return (
    <AppLayout>
      <Contents />
    </AppLayout>
  );
};

export default App;
