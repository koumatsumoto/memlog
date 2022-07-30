import { ChakraProvider, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { match } from 'ts-pattern';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage, useAppInitialState } from '../hooks';
import { prettyJson } from '../utils';
import { SuspenseContainer } from './Container';
import { AppHeader } from './Header';
import { toast, ToastContainer } from './Toast';
import { theme } from './theme';
import { LoadingView, LoggedInView, NotLoggedInView } from './views';

function App() {
  const { appOpenedBy, urlParams, hasAccessToken } = useAppInitialState();

  useEffect(() => {
    // OAuth Redirect
    if (urlParams.code) {
      requestAccessTokenAndSaveToStorage(urlParams.code)
        .catch((e) => alert(prettyJson(e)))
        .finally(() => replaceLocationWithTopPage());
    }

    // SharedTargetAPI
    if (appOpenedBy === 'SharedTargetAPI') {
      toast({
        title: 'App opened by Web Share Target API ',
        description: `title: ${urlParams.title}\ntext: ${urlParams.text}`,
        status: 'info',
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Contents = () =>
    match({ appOpenedBy, hasAccessToken })
      .with({ appOpenedBy: 'OAuthRedirect' }, LoadingView)
      .with({ hasAccessToken: false }, NotLoggedInView)
      .with({ hasAccessToken: true }, LoggedInView)
      .exhaustive();

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Container variant="outermost" centerContent bg="#282c34" color="white">
        <SuspenseContainer>
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
          </Grid>{' '}
        </SuspenseContainer>
      </Container>
    </ChakraProvider>
  );
}

export default App;
