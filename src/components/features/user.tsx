import { TimeIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  List,
  ListIcon,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { match, P } from 'ts-pattern';
import { toast, useGitHub } from '../../hooks';
import { DeveloperTab } from './DeveloperTab';

export const LoggedInView = () => {
  return (
    <Tabs boxSize="full" colorScheme="green" isLazy={true}>
      <Grid boxSize="full" templateRows="1fr auto">
        <GridItem overflow="auto">
          <TabPanels>
            <TabPanel>
              <VStack spacing={6}>
                <AccountInformation />
                <CreateCommitButton />
                <CommitHistoryComponent />
              </VStack>
            </TabPanel>
            <TabPanel>
              <DeveloperTab />
            </TabPanel>
          </TabPanels>
        </GridItem>
        <GridItem>
          <TabList justifyContent="end" borderColor="bg-dark">
            <Tab>Home</Tab>
            <Tab>Developer</Tab>
          </TabList>
        </GridItem>
      </Grid>
    </Tabs>
  );
};

const AccountInformation = () => {
  const { userinfo } = useGitHub();

  return (
    <HStack>
      <Avatar name={userinfo.name} src={userinfo.avatarUrl} />
      <Text>{userinfo.name}</Text>
    </HStack>
  );
};

const CommitHistoryComponent = () => {
  const [showing, setShowing] = useState(false);
  const { historyFiles } = useGitHub();

  return (
    <Container centerContent>
      <Button onClick={() => setShowing(!showing)} colorScheme="green" size="sm">
        History
      </Button>

      <>
        {showing && (
          <List spacing={3} padding="16px 12px" borderRadius={2} background="beige" color="#333333" fontSize="12px" width="min(88%, 70vw)">
            {historyFiles.map((data) => (
              <ListItem key={data.time}>
                <HStack spacing={0} align="start">
                  <Box>
                    <ListIcon as={TimeIcon} color="green.500" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text>{data.time}</Text>
                    <Text>{data.text}</Text>
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
  const { createCommit, createCommitResult } = useGitHub();
  const fn = () => createCommit({ contents: '日本語でテスト' });

  useEffect(() => {
    match(createCommitResult)
      .with({ loading: false, data: P.not(P.nullish) }, () =>
        toast({ title: 'OK', description: `commit created successfully, #${createCommitResult.data?.lastCommitId}`, status: 'info' }),
      )
      .with({ loading: false, error: P.not(P.nullish) }, () =>
        toast({
          title: 'Error',
          description: `commit failed with an error, ${createCommitResult.error?.message ?? String(createCommitResult.error)}`,
          status: 'error',
        }),
      )
      .otherwise(() => {});
  }, [createCommitResult]);

  return (
    <Container padding={0}>
      <VStack spacing={4}>
        <Button isLoading={createCommitResult.loading} onClick={fn} colorScheme="green" size="sm">
          Commit
        </Button>
      </VStack>
    </Container>
  );
};
