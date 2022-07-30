import { ChakraProvider, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { ToastContainer } from '../../hooks';
import { theme } from '../theme';
import { AppHeader } from './Header';
import { SuspenseContainer } from './SuspenseContainer';

export const AppLayout = ({ children }: PropsWithChildren<{}>) => {
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
                {children}
              </Flex>
            </GridItem>
          </Grid>
        </SuspenseContainer>
      </Container>
    </ChakraProvider>
  );
};