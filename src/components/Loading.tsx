import { Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import React from 'react';

export const Loading = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};
