import { Avatar, Button, Code, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCreateCommitMutation, useLogin, useQuery } from '../hooks';
import { GQL } from '../hooks/github/gql';
import { prettyJson } from '../utils';
import { Loading } from './Loading';

const DataViewer = ({ data }: { data: unknown }) => {
  return (
    <Container>
      <Code
        sx={{
          whiteSpace: 'pre',
          maxWidth: '100%',
          maxHeight: '100%',
          overflow: 'scroll',
          padding: '0.78em',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {prettyJson(data)}
      </Code>
    </Container>
  );
};

export const CreateCommitButton = () => {
  const [createCommit, { data, loading, error }] = useCreateCommitMutation();
  const onClick = () => createCommit({ owner: 'kouMatsumoto', repositoryName: 'memlog-storage', contents: '日本語でテスト' });

  if (error) {
    return <DataViewer data={error} />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <VStack spacing={4}>
        <Button onClick={onClick} colorScheme="green" size="sm">
          Create Commit
        </Button>
        {data && <DataViewer data={data} />}
        {error && <DataViewer data={error} />}
      </VStack>
    );
  }
};

export const LoggedInView = () => {
  const { loading, error, data } = useQuery(GQL.USER_INFORMATION, { repositoryName: 'memlog-storage' });

  if (error) {
    return <DataViewer data={error} />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <VStack spacing={8}>
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
