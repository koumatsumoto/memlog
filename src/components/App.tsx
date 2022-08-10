import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./features/login";
import { MainTabContents } from "./features/main";
import { useAppInitialState } from "./hooks";
import { AppLayout, LoadingLayout } from "./layouts";
import { LoadingView, SuspenseContainer, ToastContainer } from "./shared";
import { theme } from "./themes";

const App = () => {
  const { appOpenedBy, onceInitializeApp } = useAppInitialState();
  useEffect(() => onceInitializeApp(), []); // eslint-disable-line react-hooks/exhaustive-deps

  if (appOpenedBy === "OAuthRedirect") {
    return <LoadingLayout />;
  }

  return (
    <ChakraProvider theme={theme}>
      <SuspenseContainer fallback={<LoadingView />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="login" element={<LoginForm />} />
              <Route path="" element={<MainTabContents />} />
              <Route path="*" element={<MainTabContents />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SuspenseContainer>
      <ToastContainer />
    </ChakraProvider>
  );
};

export default App;
