import { ChakraProvider, Container } from '@chakra-ui/react';
import { LoadingView } from '../shared';
import { theme } from '../themes';

export const LoadingLayout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container variant="outermost" centerContent bg="#282c34" color="white">
        <LoadingView />
      </Container>
    </ChakraProvider>
  );
};
