import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const WardDataDisplayCard = ({ ward_number, capacity, specialization }) => {
  const wardData = [
    { key: "Ward Number", value: ward_number },
    { key: "Capacity", value: capacity },
    { key: "Specialization", value: specialization },
  ];
  return (
    <Box display={"flex"} pb={6} flexDirection={"column"} gap={2}>
      {wardData.map((ele, idx) => (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Heading  textColor={'teal.300'} size={"md"}>
            {ele?.key} : 
          </Heading>
          <Text as={"b"} fontSize={"xl"}>
            {ele?.value}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default WardDataDisplayCard;
