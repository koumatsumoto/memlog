import { Container } from "@chakra-ui/react";
import { LoadingView } from "../shared";

export const LoadingLayout = () => {
  return (
    <Container variant="outermost" centerContent bg="#282c34" color="white">
      <LoadingView />
    </Container>
  );
};
