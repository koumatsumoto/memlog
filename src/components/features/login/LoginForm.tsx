import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { login } from "../../hooks";

export const LoginForm = () => {
  return (
    <Container centerContent p="16px">
      <Button onClick={login} colorScheme="green" size="md">
        Login
      </Button>
    </Container>
  );
};
