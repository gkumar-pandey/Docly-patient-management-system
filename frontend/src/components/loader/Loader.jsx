import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box display={"flex"} gap={2} flexDirection={"column"} alignItems={"center"}>
      <Spinner size={"lg"} color="teal" />
      <Text as={"b"} size="lg">
        Loading...
      </Text>
    </Box>
  );
};

export default Loader;
