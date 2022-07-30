import { Flex, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';

export const LoadingView = () => {
  return (
    <Flex boxSize="full" align="center" justify="center">
      <VStack transform="translateY(-16vh)">
        <Text>Loading</Text>
        <Waveform color="white" />
      </VStack>
    </Flex>
  );
};
