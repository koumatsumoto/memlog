import { ChakraProvider } from '@chakra-ui/react';
import { match } from 'ts-pattern';
import { useApplicationSetup } from '../hooks';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { FullScreenLayout, MainContentsLayout } from './Layout';
import { ToastContainer } from './Toast';
import { theme } from './theme';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const settings = useApplicationSetup();

  const Contents = () =>
    match(settings)
      .with({ appOpenedBy: 'StartedWithOAuthRedirect' }, LoadingView)
      .with({ hasAccessToken: false }, NotLoggedInView)
      .with({ hasAccessToken: true }, LoggedInView)
      .exhaustive();

  return (
    <ChakraProvider theme={theme}>
      <FullScreenLayout>
        <ToastContainer />
        <AppHeader />
        <MainContentsLayout>
          <SuspenseContainer>
            <Contents />
          </SuspenseContainer>
        </MainContentsLayout>
      </FullScreenLayout>
    </ChakraProvider>
  );
}

export default App;
