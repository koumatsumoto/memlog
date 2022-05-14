import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
  },
  sizes: {
    fill: 'min(100%, 100vw)',
  },
  styles: {
    global: {
      html: { height: '100%' },
      body: { height: '100%' },
      '#root': { height: '100%' },
    },
  },
  components: {
    Container: {
      baseStyle: {
        width: 'min(100%, 100vw)',
      },
    },
  },
});
