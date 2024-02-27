import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const PatientDataDisplayCard = ({
  name,
  age,
  gender,
  ward_number,
  contact,
  medical_history,
}) => {
  const patientData = [
    { key: "Name", value: name },
    { key: "Age", value: age },
    { key: "Gender", value: gender },
    { key: "Ward Number", value: ward_number },
    { key: "Contact", value: contact },
    { key: "Medical History", value: medical_history },
  ];
  return (
    <Box display={"flex"} pb={6} flexDirection={"column"} gap={2}>
      {patientData.map((ele, idx) => (
        <Box
          display={"flex"}
          gap={2}
          flexDirection={"row"}
          alignItems={"center"}
          key={idx}
        >
          <Heading textColor={'teal.300'} size={"md"}>{ele.key} : </Heading>
          <Text as={"b"} fontSize={"xl"}>
            {ele.value}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default PatientDataDisplayCard;
