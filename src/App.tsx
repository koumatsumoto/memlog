import { Avatar, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import { Login } from './components/Login';
import { FullScreenContainer } from './components/containers';
import { AppHeader } from './components/headers';
import { useAuth } from './hooks';
import { useGitHubUserProfile } from './hooks/github';

const Loading = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};

const UserProfile = () => {
  const { token } = useAuth();
  const { loading, error, data } = useGitHubUserProfile(token);

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <HStack>
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} />
        <Text>{data.viewer.name}</Text>
      </HStack>
    );
  }
};

const Contents = () => {
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (loggedIn) {
    return <UserProfile />;
  }

  return <Login />;
};

function App() {
  return (
    <FullScreenContainer>
      <AppHeader />
      <Container centerContent padding={4}>
        <Contents />
      </Container>
    </FullScreenContainer>
  );
}

export default App;
