import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import { FullScreenContainer } from './components/containers';
import { AppHeader } from './components/headers';
import { useAuth, useLogin } from './hooks';

const LoginButton = () => {
  const login = useLogin();

  return (
    <Button colorScheme="green" onClick={login}>
      Log In
    </Button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <VStack>
        <Text>Loading</Text>
        <Waveform color="white" />
      </VStack>
    );
  } else if (isAuthenticated) {
    return (
      <HStack>
        <Avatar name={user.name} src={user.picture} />
        <Text>{user.name}</Text>
      </HStack>
    );
  } else {
    return <LoginButton />;
  }
};

function App() {
  return (
    <FullScreenContainer>
      <AppHeader />
      <Container centerContent padding={4}>
        <Profile />
      </Container>
    </FullScreenContainer>
  );
}

export default App;
