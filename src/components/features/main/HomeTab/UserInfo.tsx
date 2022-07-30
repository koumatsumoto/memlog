import { Avatar, HStack, Text } from '@chakra-ui/react';
import { useGitHub } from '../../../../hooks';

export const UserInfo = () => {
  const { userinfo } = useGitHub();

  return (
    <HStack>
      <Avatar name={userinfo.name} src={userinfo.avatarUrl} />
      <Text>{userinfo.name}</Text>
    </HStack>
  );
};
