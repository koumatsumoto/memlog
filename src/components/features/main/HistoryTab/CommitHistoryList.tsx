import { TimeIcon } from '@chakra-ui/icons';
import { Box, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
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
              <Text>{format(Number(data.time), 'MM月dd日 HH時mm分', { locale: ja })}</Text>
              <Text>{data.text}</Text>
            </VStack>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
