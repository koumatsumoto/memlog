import { Button, Code, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import { PropsWithChildren, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { match } from 'ts-pattern';
import { logout } from '../hooks';
import { identity, isError, isString, notask, prettyJson, printError } from '../utils';
import { toast } from './Toast';

const ErrorFallback = ({ error }: { error: unknown; resetErrorBoundary: (...args: Array<unknown>) => void }) => {
  const print = () => match(error).when(isString, identity).when(isError, printError).otherwise(prettyJson);
  const reset = () => window.location.reload();

  useEffect(() => {
    const errorType = match(error)
      .with({ name: 'HttpError', response: { data: { message: 'Bad credentials' } } }, () => 'OAuthAccessTokenMaybeExpiredOrRevoked' as const)
      .otherwise(() => 'UnknownApplicationError');
    toast({ title: 'Error', description: errorType, status: 'error' });

    match(errorType).with('OAuthAccessTokenMaybeExpiredOrRevoked', logout).otherwise(notask);
  }, [error]);

  return (
    <Container>
      <HStack padding={4} align="center" justify="center">
        <Text>Something Broken</Text>
        <Button onClick={reset} size="xs" colorScheme="yellow">
          Try again
        </Button>
      </HStack>

      <Code
        sx={{
          fontSize: '13px',
          whiteSpace: 'pre',
          maxWidth: '100%',
          maxHeight: '100%',
          overflow: 'scroll',
          padding: '0.78em',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {print()}
      </Code>
    </Container>
  );
};

const LoadingFallback = () => {
  return (
    <VStack>
      <Text>Loading</Text>
      <Waveform color="white" />
    </VStack>
  );
};

export const SuspenseContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
