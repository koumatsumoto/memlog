import { TimeIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { useCommitHistory } from "../../../hooks";

export const CommitHistoryList = () => {
  const { history, reloadHistory } = useCommitHistory();

  return (
    <VStack w="100%" spacing="16px">
      <List
        spacing="8px"
        padding="16px 12px"
        borderRadius={2}
        background="#f5f5dc"
        color="#333333"
        fontSize="12px"
        overflow="auto"
        w="full"
      >
        {history.map((data) => (
          <ListItem key={data.time}>
            <HStack spacing={0} align="start">
              <Box>
                <ListIcon as={TimeIcon} color="green.500" />
              </Box>
              <HStack>
                <Text>{formatDateTime(data.time)}</Text>
                <Text>{data.title}</Text>
                <Text>{data.tags.map((t) => `#${t}`).join(" ")}</Text>
              </HStack>
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

const formatDateTime = (time: number) => {
  return format(time, "MM月dd日 HH時mm分", { locale: ja });
};
