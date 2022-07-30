import { TimeIcon } from '@chakra-ui/icons';
import { Box, Container, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { useGitHub } from '../../../../hooks';

export const CommitHistoryList = () => {
  const { historyFiles } = useGitHub();

  return (
    <List spacing={3} padding="16px 12px" borderRadius={2} background="beige" color="#333333" fontSize="12px" width="min(88%, 70vw)">
      {historyFiles.map((data) => (
        <ListItem key={data.time}>
          <HStack spacing={0} align="start">
            <Box>
              <ListIcon as={TimeIcon} color="green.500" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text>{data.time}</Text>
              <Text>{data.text}</Text>
            </VStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
