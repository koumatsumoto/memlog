import React, { useEffect } from 'react';
import { match } from 'ts-pattern';
import { useAppInitialState } from '../hooks';
import { LoadingView } from './features/loading';
import { LoginForm } from './features/login';
import { MainTabContents } from './features/main';
import { AppLayout } from './layouts/AppLayout';

const App = () => {
  const { appOpenedBy, hasAccessToken, onceInitializeApp } = useAppInitialState();
  useEffect(() => onceInitializeApp(), []); // eslint-disable-line react-hooks/exhaustive-deps

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
