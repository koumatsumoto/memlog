import { Avatar, Button, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useGitHubUserProfile, useLogin } from '../hooks';
import { Loading } from './Loading';

export const LoggedInView = () => {
  const { loading, error, data } = useGitHubUserProfile();

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

export const NotLoggedInView = () => {
  const { loginWithRedirect } = useLogin();

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
      <Button onClick={loginWithRedirect} colorScheme="green" size="md">
        Login
      </Button>
    </Container>
  );
};

export const LoadingView = () => {
  return <Loading />;
};
