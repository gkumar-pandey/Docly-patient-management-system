import { Box, Button, VStack } from "@chakra-ui/react";
import React from "react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { FaRegHospital } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";


const SideBar = () => {
  const navlinks = [
    { icon: <FaRegHospital />, link: "/", text: "Hospital" },
    { text: "Patient", link: "/patient", icon: <FaBriefcaseMedical /> },
    { text: "Ward", link: "/ward", icon: <FaBed /> },
  ];
  return (
    <Box top={0} p={4}>
      <Box my={6}>
        <Logo />
      </Box>
      <Box display={"flex"} gap={4} flexDirection={"column"}>
        {navlinks.map((ele, idx) => (
          <Link to={ele?.link} key={idx}>
            <Button
              justifyContent={"flex-start"}
              leftIcon={ele?.icon}
              variant="outline"
              colorScheme="gray"
              textColor={"gray.50"}
              _hover={{ bgColor: "gray.50", textColor: "black" }}
              w={"100%"}
            >
              {ele?.text}
            </Button>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
