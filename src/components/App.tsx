import { useApplicationBootstrap } from '../hooks';
import { LoadingView, LoggedInView, NotLoggedInView } from './contents';
import { AppHeader } from './headers';
import { FullScreenLayout, MainContentsLayout } from './layouts';

function App() {
  const { status } = useApplicationBootstrap();

  const Contents = () => {
    switch (status) {
      case 'NotLoggedIn': {
        return <NotLoggedInView />;
      }
      case 'GettingAccessToken': {
        return <LoadingView />;
      }
      case 'LoggedIn': {
        return <LoggedInView />;
      }
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
