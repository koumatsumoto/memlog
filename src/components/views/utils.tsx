import { Code } from '@chakra-ui/react';
import React from 'react';
import { prettyJson } from '../../utils';

export const DataView = ({ data }: { data: unknown }) => {
  return (
    <Code
      sx={{
        whiteSpace: 'pre',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'scroll',
        padding: '0.78em',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {prettyJson(data)}
    </Code>
  );
};
