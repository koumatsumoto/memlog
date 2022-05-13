import { Avatar, Button, Code, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React from 'react';
import { useCreateCommitMutation, useLogin } from '../../hooks';
import { userinfoLoader } from '../../hooks/github/loader';
import { prettyJson } from '../../utils';

const DataView = ({ data }: { data: unknown }) => {
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
    return <DataView data={error} />;
  } else if (loading) {
    return <LoadingView />;
  } else {
    return (
      <VStack spacing={4}>
        <Button onClick={onClick} colorScheme="green" size="sm">
          Create Commit
        </Button>
        {data && <DataView data={data} />}
        {error && <DataView data={error} />}
      </VStack>
    );
  }
};

export const LoggedInView = () => {
  const data = userinfoLoader.load();

  return (
    <VStack spacing={8}>
      <HStack>
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} />
        <Text>{data.viewer.name}</Text>
      </HStack>
      <CreateCommitButton />
    </VStack>
  );
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
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};
