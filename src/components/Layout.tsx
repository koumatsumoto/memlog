import { Container } from '@chakra-ui/react';
import React, { FunctionComponent, PropsWithChildren } from 'react';

export const FullScreenLayout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container
      centerContent
      sx={{
        width: '100vw',
        minWidth: '100vw',
        height: '100%',
        bg: '#282c34',
        color: 'white',
        overflow: 'auto',
        padding: '0',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent', borderColor: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: '#7d9586', borderRadius: '10vh' },
      }}
    >
      {children}
    </Container>
  );
};

export const MainContentsLayout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container centerContent sx={{ padding: '16px' }}>
      {children}
    </Container>
  );
};
