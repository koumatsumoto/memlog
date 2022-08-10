import React, { useEffect } from "react";
import { match } from "ts-pattern";
import { LoginForm } from "./features/login";
import { MainTabContents } from "./features/main";
import { useAppInitialState } from "./hooks";
import { AppLayout, LoadingLayout } from "./layouts";

const App = () => {
  const { appOpenedBy, isLoggedIn, onceInitializeApp } = useAppInitialState();
  useEffect(() => onceInitializeApp(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return match({ appOpenedBy, isLoggedIn })
    .with({ appOpenedBy: "OAuthRedirect" }, () => <LoadingLayout />)
    .with({ isLoggedIn: false }, () => <AppLayout contents={<LoginForm />} />)
    .with({ isLoggedIn: true }, () => <AppLayout contents={<MainTabContents />} />)
    .exhaustive();
};

export default App;
