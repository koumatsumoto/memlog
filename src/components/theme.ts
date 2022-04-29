import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
  },
  styles: {
    global: {
      html: { height: '100%' },
      body: { height: '100%' },
      '#root': { height: '100%' },
    },
  },
});
