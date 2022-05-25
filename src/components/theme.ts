import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
    'bg-dark': '#282c34',
  },
  sizes: {
    full: '100%',
    headerHeight: '60px',
  },
  styles: {
    global: {
      html: { height: '100%' },
      body: { height: '100%' },
      '#root': { height: '100%' },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { background: 'transparent', borderColor: 'transparent' },
      '::-webkit-scrollbar-thumb': { background: '#7d9586', borderRadius: '10vh' },
    },
  },
  components: {
    Container: {
      variants: {
        outermost: {
          width: 'min(100%, 100vw)',
          maxWidth: '100%',
          height: 'min(100%, 100vh)',
          maxHeight: '100%',
          overflow: 'hidden',
          padding: '0',
          margin: '0',
        },
      },
    },
  },
});
