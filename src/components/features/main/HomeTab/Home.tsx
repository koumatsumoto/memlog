import { Container, VStack } from '@chakra-ui/react';
import { AddCommitForm } from './AddCommitForm';
import { UserInfo } from './UserInfo';

export const Home = () => {
  return (
    <Container centerContent>
      <VStack spacing={6}>
        <UserInfo />
        <AddCommitForm />
      </VStack>
    </Container>
  );
};
