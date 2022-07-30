import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ENV } from '../../environments';
import { useAppInitialState } from '../../hooks';

export const DeveloperTab = () => {
  const appInitialState = useAppInitialState();

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>key</Th>
            <Th>value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>URL</Td>
            <Td>{appInitialState.startUrl}</Td>
          </Tr>
          <Tr>
            <Td>URL Params</Td>
            <Td>{JSON.stringify(appInitialState.urlParams)}</Td>
          </Tr>
          <Tr>
            <Td>App Type</Td>
            <Td>{appInitialState.appOpenedBy}</Td>
          </Tr>
          <Tr>
            <Td>Access Token</Td>
            <Td>{appInitialState.accessToken?.slice(0, 9).concat('*******')}</Td>
          </Tr>
          <Tr>
            <Td>Build Version</Td>
            <Td>
              #{ENV.version} / {format(new Date(ENV.buildTimestamp), 'yyyy-MM-dd HH:mm:ss')}
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>key</Th>
            <Th>value</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
