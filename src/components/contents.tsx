import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCommitMutation, useGitHubUserProfile, useLogin } from '../hooks';
import { Loading } from './Loading';

export const CreateCommitButton = () => {
  const [createCommit, { data, loading, error }] = useCommitMutation();
  const onClick = () =>
    createCommit({
      variables: {
        input: {
          branch: {
            repositoryNameWithOwner: 'kouMatsumoto/memlog-storage',
            branchName: 'main',
          },
          message: { headline: 'Hello from GraphQL!' },
          fileChanges: {
            additions: [
              {
                path: 'GraphQL.md',
                contents: 'YQ==',
              },
            ],
          },
          expectedHeadOid: '04d7a7eb276eadc61c80618411b85d2dc13b5fc0',
        },
      },
    });

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
  const { loading, error, data } = useGitHubUserProfile();

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
