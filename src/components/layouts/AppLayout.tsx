import { ChakraProvider, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { LoadingView, SuspenseContainer, ToastContainer } from "../shared";
import { theme } from "../themes";
import { AppHeader } from "./Header";

export const AppLayout = ({ contents }: { contents: ReactElement }) => {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Container variant="outermost" centerContent bg="#282c34" color="white">
        <SuspenseContainer fallback={<LoadingView />}>
          <Grid templateRows="auto 1fr" boxSize="full">
            <GridItem overflow="hidden">
              <Flex boxSize="full" justify="center">
                <AppHeader />
              </Flex>
            </GridItem>
            <GridItem overflow="hidden">
              <Flex boxSize="full" justify="center">
                {contents}
              </Flex>
            </GridItem>
          </Grid>
        </SuspenseContainer>
      </Container>
    </ChakraProvider>
  );
};
