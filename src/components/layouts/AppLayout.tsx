import { ChakraProvider, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { ToastContainer } from '../../hooks';
import { SuspenseContainer } from '../shared';
import { theme } from '../theme';
import { AppHeader } from './Header';

export const AppLayout = ({ contents }: { contents: ReactElement }) => {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Container variant="outermost" centerContent bg="#282c34" color="white">
        <SuspenseContainer>
          <Grid templateRows="auto 1fr" boxSize="full">
            <GridItem overflow="hidden">
              <Flex boxSize="full" justify="center">
                <AppHeader />
              </Flex>
            </GridItem>
            <GridItem overflow="hidden">
              <Flex boxSize="full" justify="center">
                {contents}
              </Flex>
            </GridItem>
          </Grid>
        </SuspenseContainer>
      </Container>
    </ChakraProvider>
  );
};
