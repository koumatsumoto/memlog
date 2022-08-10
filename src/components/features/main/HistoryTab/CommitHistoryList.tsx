import { AtSignIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, List, ListIcon, ListItem, Spacer, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { useCommitHistory } from "../../../hooks";

export const CommitHistoryList = () => {
  const { history, reloadHistory } = useCommitHistory();

  return (
    <VStack w="100%" spacing="16px">
      <List spacing="0" padding="0" borderRadius={2} color="#ffffff" fontSize="13px" overflow="auto" w="full">
        {history.map((data) => (
          <ListItem
            key={data.time}
            p="12px 8px"
            borderRadius="1px"
            borderTop="1px solid #999"
            borderLeft="1px solid #999"
            borderRight="1px solid #999"
            _last={{ borderBottom: "1px solid #999" }}
          >
            <HStack spacing="8px" align="stretch">
              <VStack align="start" py="4px">
                <ListIcon as={AtSignIcon} m="0" />
              </VStack>
              <VStack align="start" spacing="2px">
                <HStack>
                  <Text>{formatDateTime(data.time)}</Text>
                  <Text>{data.tags.map((t) => `#${t}`).join(" ")}</Text>
                </HStack>
                <Text>{data.title}</Text>
              </VStack>
              <Spacer />
              <VStack justify="center">
                <ListIcon as={ChevronRightIcon} />
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

const formatDateTime = (time: number) => {
  return format(time, "MM月dd日 HH時mm分", { locale: ja });
};
