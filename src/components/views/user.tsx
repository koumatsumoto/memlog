import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Container, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useCreateCommitMutation, userFileHistoryQuery, userInformationQuery } from '../../hooks';
import { DataView } from './utils';

export const LoggedInView = () => {
  return (
    <Container padding={0}>
      <VStack spacing={6}>
        <AccountInformation />
        <CreateCommitButton />
        <CommitHistoryComponent />
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

const CommitHistoryComponent = () => {
  const [showing, setShowing] = useState(false);
  const contents = useRecoilValue(userFileHistoryQuery);

  return (
    <Container centerContent>
      <Button onClick={() => setShowing(!showing)} colorScheme="green" size="sm">
        History
      </Button>

      <>
        {showing && (
          <List spacing={3} padding="16px 12px" borderRadius={2} background="beige" color="#333333" fontSize="12px" width="min(88%, 70vw)">
            {contents.map((data: any) => (
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
        )}
      </>
    </Container>
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
