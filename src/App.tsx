import { ApolloProvider } from '@apollo/client';
import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React from 'react';
import { FullScreenContainer } from './components/containers';
import { AppHeader } from './components/headers';
import { useAuth, useGitHubApolloClient, useGitHubUserProfile } from './hooks';

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
  const { loading, loggedIn, login } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (loggedIn) {
    return <UserProfile />;
  }

  return (
    <Container
      centerContent
      sx={{
        color: 'white',
        height: '60px',
        padding: '12px 16px',
        position: 'relative',
      }}
    >
      <Button onClick={login} colorScheme="green" size="md">
        Login
      </Button>
    </Container>
  );
};

function App() {
  const client = useGitHubApolloClient();

  return (
    <ApolloProvider client={client}>
      <FullScreenContainer>
        <AppHeader />
        <Container centerContent padding={4}>
          <Contents />
        </Container>
      </FullScreenContainer>
    </ApolloProvider>
  );
}

export default App;
