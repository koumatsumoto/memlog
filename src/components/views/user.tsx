import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Container, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCreateCommitMutation, userFileHistoryQuery, userInformationQuery } from '../../hooks';
import { DataView } from './utils';

export const LoggedInView = () => {
  return (
    <Container padding={0}>
      <VStack spacing={6}>
        <AccountInformation />
        <CreateCommitButton />
        <CommitHistory />
      </VStack>
    </Container>
  );
};

const AccountInformation = () => {
  const data = useRecoilValue(userInformationQuery);

  return (
    <HStack>
      <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} />
      <Text>{data.viewer.name}</Text>
    </HStack>
  );
};

const CommitHistory = () => {
  const files = useRecoilValue(userFileHistoryQuery);

  return (
    <List spacing={3} padding="16px 12px" borderRadius={2} background="beige" color="#333333" fontSize="12px" width="min(88%, 70vw)">
      {files.map((data) => (
        <ListItem key={data.filepath}>
          <HStack spacing={0} align="start">
            <Box>
              <ListIcon as={TimeIcon} color="green.500" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text>{data.dateText}</Text>
              <Text>{data.content}</Text>
            </VStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

const CreateCommitButton = () => {
  const [createCommit, { data, loading, error }] = useCreateCommitMutation();
  const fn = () => createCommit({ owner: 'kouMatsumoto', repositoryName: 'memlog-storage', contents: '日本語でテスト' });

  return (
    <Container padding={0}>
      <VStack spacing={4}>
        <Button isLoading={loading} onClick={fn} colorScheme="green" size="sm">
          Commit
        </Button>

        <>{data && <DataView data={data} />}</>
        <>{error && <DataView data={error} />}</>
      </VStack>
    </Container>
  );
};
