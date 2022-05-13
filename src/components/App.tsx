import { useApplicationBootstrap } from '../hooks';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { FullScreenLayout, MainContentsLayout } from './Layout';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const { statusType } = useApplicationBootstrap();

  const Contents = () => {
    switch (statusType) {
      case 'NotLoggedIn':
        return <NotLoggedInView />;
      case 'GettingAccessToken':
        return <LoadingView />;
      case 'LoggedIn':
        return (
          <SuspenseContainer>
            <LoggedInView />
          </SuspenseContainer>
        );
    }
  };

  return (
    <FullScreenLayout>
      <AppHeader />
      <MainContentsLayout>
        <Contents />
      </MainContentsLayout>
    </FullScreenLayout>
  );
}

export default App;
