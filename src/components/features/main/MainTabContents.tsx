import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Developer } from './DeveloperTab/Developer';
import { History } from './HistoryTab/History';
import { Home } from './HomeTab/Home';

export const MainTabContents = () => {
  return (
    <Tabs boxSize="full" colorScheme="green" isLazy={true}>
      <Grid boxSize="full" templateRows="1fr auto">
        <GridItem overflow="auto">
          <TabPanels>
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel>
              <History />
            </TabPanel>
            <TabPanel>
              <Developer />
            </TabPanel>
          </TabPanels>
        </GridItem>
        <GridItem>
          <TabList justifyContent="end" borderColor="bg-dark">
            <Tab>Home</Tab>
            <Tab>History</Tab>
            <Tab>Developer</Tab>
          </TabList>
        </GridItem>
      </Grid>
    </Tabs>
  );
};
