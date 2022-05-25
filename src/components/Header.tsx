import { CloseIcon } from '@chakra-ui/icons';
import { HStack, Heading, IconButton } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { FunctionComponent } from 'react';
import { ENV } from '../environments';
import { useLogin } from '../hooks';

export const AppHeader: FunctionComponent = () => {
  const { canLogout, logoutWithReload } = useLogin();

  return (
    <HStack width="full" height="headerHeight" justify="center" position="relative">
      <Heading as="h1" sx={{ fontSize: '16px' }}>
        memlog
        <small>
          @{ENV.version}, {format(new Date(ENV.buildTimestamp), 'yyyy-MM-dd HH:mm:ss')}
        </small>
      </Heading>

      <>
        {canLogout && (
          <IconButton
            onClick={logoutWithReload}
            size="xs"
            colorScheme="white"
            aria-label="Logout"
            icon={<CloseIcon />}
            sx={{ position: 'absolute', right: '16px', top: '30px', transform: 'translateY(-50%)' }}
          />
        )}
      </>
    </HStack>
  );
};
