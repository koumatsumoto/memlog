import { Avatar, HStack, Text } from "@chakra-ui/react";
import { useUserinfo } from "../../../../hooks";

export const UserInfo = () => {
  const { userinfo } = useUserinfo();

  return (
    <HStack>
      <Avatar name={userinfo.name} src={userinfo.avatarUrl} />
      <Text>{userinfo.name}</Text>
    </HStack>
  );
};
