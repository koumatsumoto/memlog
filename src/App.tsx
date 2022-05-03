import { Container, VStack, Text } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import { Login } from './components/Login';
import { FullScreenContainer } from './components/containers';
import { AppHeader } from './components/headers';
import { useAuth } from './hooks';

const Loading = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};

const Contents = () => {
  const { loading, accessToken } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (accessToken) {
    return <div>Logged In</div>;
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
