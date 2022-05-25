import { ChakraProvider, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { match } from 'ts-pattern';
import { useApplicationSetup } from '../hooks';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { ToastContainer } from './Toast';
import { theme } from './theme';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const settings = useApplicationSetup();

  const Contents = () =>
    match(settings)
      .with({ appOpenedBy: 'StartedWithOAuthRedirect' }, LoadingView)
      .with({ hasAccessToken: false }, NotLoggedInView)
      .with({ hasAccessToken: true }, LoggedInView)
      .exhaustive();

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <SuspenseContainer>
        <Container variant="outermost" centerContent bg="#282c34" color="white">
          <Grid templateRows="auto 1fr" boxSize="full">
            <GridItem>
              <Flex boxSize="full" justify="center">
                <AppHeader />
              </Flex>
            </GridItem>
            <GridItem overflow="auto">
              <Flex boxSize="full" justify="center">
                <Contents />
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </SuspenseContainer>
    </ChakraProvider>
  );
}

export default App;
