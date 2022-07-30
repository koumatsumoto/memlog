import React, { useEffect } from 'react';
import { match } from 'ts-pattern';
import { useAppInitialState } from '../hooks';
import { LoginForm } from './features/login';
import { MainTabContents } from './features/main';
import { AppLayout } from './layouts/AppLayout';
import { LoadingLayout } from './layouts/LoadingLayout';

const App = () => {
  const { appOpenedBy, hasAccessToken, onceInitializeApp } = useAppInitialState();
  useEffect(() => onceInitializeApp(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return match({ appOpenedBy, hasAccessToken })
    .with({ appOpenedBy: 'OAuthRedirect' }, () => <LoadingLayout />)
    .with({ hasAccessToken: false }, () => <AppLayout contents={<LoginForm />} />)
    .with({ hasAccessToken: true }, () => <AppLayout contents={<MainTabContents />} />)
    .exhaustive();
};

export default App;
