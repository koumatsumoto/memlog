import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCreateCommitMutation, userinfoLoader } from '../../hooks';
import { DataView } from './utils';

export const LoggedInView = () => {
  return (
    <VStack spacing={6}>
      <AccountInformation />
      <CreateCommitButton />
    </VStack>
  );
};

const AccountInformation = () => {
  const data = userinfoLoader.load();

  return (
    <HStack>
      <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} />
      <Text>{data.viewer.name}</Text>
    </HStack>
  );
};

const CreateCommitButton = () => {
  const [createCommit, { data, loading, error }] = useCreateCommitMutation();
  const fn = () => createCommit({ owner: 'kouMatsumoto', repositoryName: 'memlog-storage', contents: '日本語でテスト' });

  return (
    <VStack spacing={4}>
      <Button isLoading={loading} onClick={fn} colorScheme="green" size="sm">
        Commit
      </Button>

      <>{data && <DataView data={data} />}</>
      <>{error && <DataView data={error} />}</>
    </VStack>
  );
};
