import { Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./Header";

export const AppLayout = () => {
  return (
    <Container variant="outermost" centerContent bg="#282c34" color="white">
      <Grid templateRows="auto 1fr" boxSize="full">
        <GridItem overflow="hidden">
          <Flex boxSize="full" justify="center">
            <AppHeader />
          </Flex>
        </GridItem>
        <GridItem overflow="hidden">
          <Flex boxSize="full" justify="center">
            <Outlet />
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};
