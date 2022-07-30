import { Button, Container, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React from 'react';
import { login } from '../../hooks';

export { LoggedInView } from './user';

export const NotLoggedInView = () => {
  return (
    <Container centerContent p="16px">
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
