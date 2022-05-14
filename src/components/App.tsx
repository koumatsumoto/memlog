import { match } from 'ts-pattern';
import { useApplicationSetup } from '../hooks';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { FullScreenLayout, MainContentsLayout } from './Layout';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const settings = useApplicationSetup();

  const Contents = () =>
    match(settings)
      .with({ appOpenedBy: 'StartedWithOAuthRedirect' }, LoadingView)
      .with({ hasAccessToken: true }, LoggedInView)
      .with({ hasAccessToken: false }, NotLoggedInView)
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
