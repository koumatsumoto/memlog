import { Button, Container, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React from 'react';
import { login } from '../../hooks';

export { LoggedInView } from './user';

export const NotLoggedInView = () => {
  return (
    <Container
      centerContent
      sx={{
        color: 'white',
        height: '60px',
        padding: '12px 16px',
        position: 'relative',
      }}
    >
      <Button onClick={login} colorScheme="green" size="md">
        Login
      </Button>
    </Container>
  );
};

export const LoadingView = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};
