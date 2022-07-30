import { TimeIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { useCommitHistory } from '../../../../hooks';

export const CommitHistoryList = () => {
  const { history, reloadHistory } = useCommitHistory();

  return (
    <VStack w="100%" spacing="16px">
      <List spacing="8px" padding="16px 12px" borderRadius={2} background="beige" color="#333333" fontSize="12px" width="min(88%, 70vw)">
        {history.map((data) => (
          <ListItem key={data.time}>
            <HStack spacing={0} align="start">
              <Box>
                <ListIcon as={TimeIcon} color="green.500" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>{format(Number(data.time), 'MM月dd日 HH時mm分', { locale: ja })}</Text>
                <Text>{data.text}</Text>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
      <Button colorScheme="green" size="sm" onClick={reloadHistory}>
        Reload
      </Button>
    </VStack>
  );
};
