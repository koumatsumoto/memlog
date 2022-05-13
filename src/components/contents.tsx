import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCreateCommitMutation, useLogin, useUserProfileQuery } from '../hooks';
import { Loading } from './Loading';

export const CreateCommitButton = () => {
  const [createCommit, { data, loading, error }] = useCreateCommitMutation();
  const onClick = () => createCommit({ owner: 'kouMatsumoto', repositoryName: 'memlog-storage', contents: '日本語でテスト' });

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Button onClick={onClick} colorScheme="green" size="md">
          Create Commit
        </Button>
        <pre>{JSON.stringify(data)}</pre>
      </>
    );
  }
};

export const LoggedInView = () => {
  const { loading, error, data } = useUserProfileQuery();

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <VStack>
        <HStack>
          <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} />
          <Text>{data.viewer.name}</Text>
        </HStack>
        <CreateCommitButton />
      </VStack>
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
