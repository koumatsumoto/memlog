import { Container } from '@chakra-ui/react';
import { CommitHistoryList } from './CommitHistoryList';

export const History = () => {
  return (
    <Container centerContent>
      <CommitHistoryList />
    </Container>
  );
};
