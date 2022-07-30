import { Button, Container, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { match, P } from 'ts-pattern';
import { toast, useGitHub } from '../../../../hooks';

export const CreateCommitButton = () => {
  const { createCommit, createCommitResult } = useGitHub();
  const fn = () => createCommit({ contents: '日本語でテスト' });

  useEffect(() => {
    match(createCommitResult)
      .with({ loading: false, data: P.not(P.nullish) }, () =>
        toast({ title: 'OK', description: `commit created successfully, #${createCommitResult.data?.lastCommitId}`, status: 'info' }),
      )
      .with({ loading: false, error: P.not(P.nullish) }, () =>
        toast({
          title: 'Error',
          description: `commit failed with an error, ${createCommitResult.error?.message ?? String(createCommitResult.error)}`,
          status: 'error',
        }),
      )
      .otherwise(() => {});
  }, [createCommitResult]);

  return (
    <Container padding={0}>
      <VStack spacing={4}>
        <Button isLoading={createCommitResult.loading} onClick={fn} colorScheme="green" size="sm">
          Commit
        </Button>
      </VStack>
    </Container>
  );
};
