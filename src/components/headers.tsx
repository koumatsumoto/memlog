import { Container } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { ENV } from '../environments';

export const AppHeader: FunctionComponent = () => {
  return (
    <Container
      centerContent
      sx={{
        color: 'white',
        padding: '16px',
      }}
    >
      <p>
        memlog<small>@{ENV.version}</small>
      </p>
    </Container>
  );
};
