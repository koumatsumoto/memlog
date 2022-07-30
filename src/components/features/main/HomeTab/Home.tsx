import { VStack } from '@chakra-ui/react';
import { CommitHistoryList } from './CommitHistoryList';
import { CreateCommitButton } from './CreateCommitButton';
import { UserInfo } from './UserInfo';

export const Home = () => {
  return (
    <VStack spacing={6}>
      <UserInfo />
      <CreateCommitButton />
      <CommitHistoryList />
    </VStack>
  );
};
