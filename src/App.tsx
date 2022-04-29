import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React, { useEffect, useState } from 'react';
import { FullScreenContainer } from './components/containers';
import { AppHeader } from './components/headers';
import { useLogin } from './hooks';

const LoginButton = () => {
  const login = useLogin();

  return (
    <Button colorScheme="green" onClick={login}>
      Log In
    </Button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [, setAccessToken] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => setAccessToken(token))
        .catch(console.error);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <VStack>
        <Text>Loading</Text>
        <Waveform color="white" />
      </VStack>
    );
  }

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  if (isAuthenticated && user) {
    return (
      <HStack>
        <Avatar name={user.name} src={user.picture} />
        <Text>{user.name}</Text>
      </HStack>
    );
  } else {
    throw new Error('user must exist if isAuthenticated');
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
