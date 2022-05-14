import { match } from 'ts-pattern';
import { useApplicationBootstrap } from '../hooks';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { FullScreenLayout, MainContentsLayout } from './Layout';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const { statusType } = useApplicationBootstrap();

  const Contents = () =>
    match(statusType)
      .with('NotLoggedIn', () => <NotLoggedInView />)
      .with('GettingAccessToken', () => <LoadingView />)
      .with('LoggedIn', () => <LoggedInView />)
      .exhaustive();

  return (
    <FullScreenLayout>
      <AppHeader />
      <MainContentsLayout>
        <SuspenseContainer>
          <Contents />
        </SuspenseContainer>
      </MainContentsLayout>
    </FullScreenLayout>
  );
}

export default App;
