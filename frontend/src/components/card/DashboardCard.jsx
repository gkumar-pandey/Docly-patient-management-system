import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";

const DashboardCard = ({ cardTitle, icon, cardBodyText }) => {
  return (
    <>
      <Card
        textColor={"white"}
        bgGradient="linear(to-l, #03A48A, #1D1D1D)"
        boxShadow={"md"}
        maxW={"500px"}
      >
        <CardHeader>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading size={"md"}>{cardTitle}</Heading>
            <Image
              boxSize={"30px"}
              objectFit="cover"
              src={icon}
              alt="Dan Abramov"
            />
          </Box>
        </CardHeader>
        <CardBody>
          <Heading
            flexDirection={"row"}
            alignItems={"center"}
            display={"flex"}
            as={"h1"}
            size={"lg"}
          >
            <Box>{cardBodyText}</Box>
          </Heading>
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardCard;
