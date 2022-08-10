import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { formatDateTime } from "../../../../utils";
import { useFileDetail } from "../../../hooks";

export const CommitHistoryDetail = ({ id, onBackButtonClick }: { id: number; onBackButtonClick: () => void }) => {
  const data = useFileDetail(id);

  return (
    <VStack w="100%" spacing="16px">
      <VStack align="start" spacing="2px" fontSize="14px">
        <HStack>
          <Text>{formatDateTime(data.time)}</Text>
          <Text>{data.tags.map((t) => `#${t}`).join(" ")}</Text>
        </HStack>
        <Text>{data.title}</Text>
        <Text>{data.text}</Text>
      </VStack>
      <Button colorScheme="green" size="sm" onClick={onBackButtonClick}>
        Back
      </Button>
    </VStack>
  );
};
