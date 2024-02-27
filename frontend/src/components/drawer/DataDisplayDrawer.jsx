import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

const DataDisplayDrawer = ({ onClose, isOpen, children, title }) => {
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} size={"lg"}>
        <ModalOverlay />
        <ModalContent textColor={"white"} backgroundColor={"#181818"}>
          <ModalCloseButton />
          <ModalHeader textTransform={"uppercase"}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DataDisplayDrawer;
