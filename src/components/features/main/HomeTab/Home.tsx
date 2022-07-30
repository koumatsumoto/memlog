import { Container, VStack } from '@chakra-ui/react';
import { CreateCommitButton } from './CreateCommitButton';
import { UserInfo } from './UserInfo';

export const Home = () => {
  return (
    <Container centerContent>
      <VStack spacing={6}>
        <UserInfo />
        <CreateCommitButton />
      </VStack>
    </Container>
  );
};
