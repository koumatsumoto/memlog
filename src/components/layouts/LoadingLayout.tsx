import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { theme } from '../theme';
import { LoadingIndicator } from './LoadingIndicator';

export const LoadingLayout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container variant="outermost" centerContent bg="#282c34" color="white">
        <Flex boxSize="full" align="center" justify="center">
          <LoadingIndicator />
        </Flex>
      </Container>
    </ChakraProvider>
  );
};
