import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { logoIcon } from "../../assets";

const Logo = () => {
  return (
    <>
      <Flex textColor={"white"} gap={4}  alignItems={"center"}>
        <Image width={'50px'} src={logoIcon} />
        <Heading>Docly</Heading>
      </Flex>
    </>
  );
};

export default Logo;
