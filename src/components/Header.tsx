import { CloseIcon } from '@chakra-ui/icons';
import { Container, Heading, IconButton } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { FunctionComponent } from 'react';
import { ENV } from '../environments';
import { useLogin } from '../hooks';

export const AppHeader: FunctionComponent = () => {
  const { canLogout, logoutWithReload } = useLogin();

  return (
    <Container
      centerContent
      sx={{
        color: 'white',
        height: '60px',
        padding: '12px 16px',
        position: 'relative',
      }}
    >
      <Heading as="h1" sx={{ fontSize: '16px' }}>
        memlog
        <small>
          @{ENV.version}, {format(new Date(ENV.buildTimestamp), 'yyyy-MM-dd HH:mm:ss')}
        </small>
      </Heading>

      {canLogout && (
        <IconButton onClick={logoutWithReload} size="xs" colorScheme="white" aria-label="Logout" icon={<CloseIcon />} sx={{ position: 'absolute', right: '8px', top: '12px' }} />
      )}
    </Container>
  );
};
