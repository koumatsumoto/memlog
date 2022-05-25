import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Container, Grid, GridItem, HStack, List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { match, P } from 'ts-pattern';
import { useCreateCommitMutation, userFileHistoryQuery, userInformationQuery } from '../../hooks';
import { noop } from '../../utils';
import { toast } from '../Toast';

export const LoggedInView = () => {
  return (
    <Tabs boxSize="full" colorScheme="green">
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
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </GridItem>
        <GridItem>
          <TabList justifyContent="end" borderColor="bg-dark">
            <Tab>Home</Tab>
            <Tab>Tab B</Tab>
            <Tab>Tab C</Tab>
          </TabList>
        </GridItem>
      </Grid>
    </Tabs>
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
  const [createCommit, result] = useCreateCommitMutation();
  const fn = () => createCommit({ owner: 'kouMatsumoto', repositoryName: 'memlog-storage', contents: '日本語でテスト' });

  useEffect(() => {
    match(result)
      .with({ loading: false, data: P.not(P.nullish) }, () =>
        toast({ title: 'OK', description: `commit created successfully, #${result.data?.createCommitOnBranch.commit.oid}`, status: 'info' }),
      )
      .with({ loading: false, error: P.not(P.nullish) }, () =>
        toast({ title: 'Error', description: `commit failed with an error, ${result.error?.message ?? String(result.error)}`, status: 'error' }),
      )
      .otherwise(noop);
  }, [result]);

  return (
    <Container padding={0}>
      <VStack spacing={4}>
        <Button isLoading={result.loading} onClick={fn} colorScheme="green" size="sm">
          Commit
        </Button>
      </VStack>
    </Container>
  );
};
