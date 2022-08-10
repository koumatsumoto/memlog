import { Container } from "@chakra-ui/react";
import { SuspenseContainer } from "../../../shared";
import { CommitHistoryList } from "./CommitHistoryList";

export const History = () => {
  return (
    <SuspenseContainer>
      <Container centerContent>
        <CommitHistoryList />
      </Container>
    </SuspenseContainer>
  );
};
