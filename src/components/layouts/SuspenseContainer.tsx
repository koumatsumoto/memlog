import { Button, Code, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Waveform } from '@uiball/loaders';
import { PropsWithChildren, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { identity, isError, isString } from 'remeda';
import { match } from 'ts-pattern';
import { logout, notifyError } from '../../hooks';
import { prettyJson, printError } from '../../utils';

const ErrorFallback = ({ error }: { error: unknown; resetErrorBoundary: (...args: Array<unknown>) => void }) => {
  const print = () => match(error).when(isString, identity).when(isError, printError).otherwise(prettyJson);
  const reset = () => window.location.reload();

  useEffect(() => {
    const errorType = match(error)
      // from GraphQL query client
      .with({ response: { status: 401 } }, () => 'BadCredentialsError' as const)
      .with(
        { name: 'HttpError', response: { data: { message: 'Bad credentials' } } },
        () => 'OAuthAccessTokenMaybeExpiredOrRevoked' as const,
      )
      .otherwise(() => 'UnknownApplicationError');
    notifyError(errorType);

    match(errorType)
      .with('BadCredentialsError', logout)
      .with('OAuthAccessTokenMaybeExpiredOrRevoked', logout)
      .otherwise(() => {});
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
    <Flex boxSize="full" align="center" justify="center">
      <VStack>
        <Text>Loading</Text>
        <Waveform color="white" />
      </VStack>
    </Flex>
  );
};

export const SuspenseContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
