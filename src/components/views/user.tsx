import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Container, Grid, GridItem, HStack, List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { match, P } from 'ts-pattern';
import { useCreateCommit, userFileHistoryQuery, userInformationQuery } from '../../hooks';
import { noop } from '../../utils';
import { toast } from '../Toast';
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
  const data = useRecoilValue(userInformationQuery);

  return (
    <HStack>
      <Avatar name={data.name} src={data.avatarUrl} />
      <Text>{data.name}</Text>
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
            {contents.map((data) => (
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
  const [createCommit, result] = useCreateCommit();
  const fn = () => createCommit({ contents: '日本語でテスト' });

  useEffect(() => {
    match(result)
      .with({ loading: false, data: P.not(P.nullish) }, () => toast({ title: 'OK', description: `commit created successfully, #${result.data?.lastCommitId}`, status: 'info' }))
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
