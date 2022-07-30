import { Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';

export const LoadingIndicator = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};
