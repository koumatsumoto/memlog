import { Container } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SuspenseContainer } from "../../../shared";
import { CommitHistoryList } from "./CommitHistoryList";
import { CommitHistoryDetail } from "./HistoryDetail";

export const History = () => {
  const [selectedItem, selectItem] = useState<number>();
  const deselectItem = useCallback(() => selectItem(undefined), [selectItem]);

  return (
    <SuspenseContainer>
      <Container centerContent>
        {selectedItem ? (
          <CommitHistoryDetail id={selectedItem} onBackButtonClick={deselectItem} />
        ) : (
          <CommitHistoryList onItemSelected={selectItem} />
        )}
      </Container>
    </SuspenseContainer>
  );
};
