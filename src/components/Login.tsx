import { Button, Container } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

const navigateToGitHubLoginPage = () => {
  window.location.href =
    'https://github.com/login/oauth/authorize?' +
    new URLSearchParams({
      client_id: '5cb413dcbc4c7e0dccf9',
      redirect_uri: 'http://localhost:3000/',
      state: `${Date.now()}`,
    });
};

export const Login: FunctionComponent = () => {
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
      <Button onClick={navigateToGitHubLoginPage} colorScheme="teal" size="md">
        Login
      </Button>
    </Container>
  );
};
