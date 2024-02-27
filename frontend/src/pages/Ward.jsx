import {
  Box,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/pagetitle/PageTitle";
import WardForm from "../components/form/WardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardData } from "../store/features/ward";
import DataTable from "../components/datatable/DataTable";
import Loader from "../components/loader/Loader";

const Ward = () => {
  const [editableWardId, setEditableWardId] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { wards, isLoading, error } = useSelector((state) => state.ward);
  const wardTableHeader = [
    "SI NO",
    "Ward Number",
    "Department",
    "Capacity",
    "Action",
  ];
  useEffect(() => {
    if (wards.length === 0) {
      dispatch(fetchWardData());
    }
  }, []);
  const handleEditWard = (id) => {
    setEditableWardId(id);
    onOpen();
  };
  return (
    <>
      <Container py={8} maxW={"container.xl"}>
        <PageTitle title="Wards" />
        <Box my={4}>
          <Button
            onClick={() => {
              setEditableWardId("");
              onOpen();
            }}
            colorScheme="teal"
            variant="solid"
          >
            Add Ward
          </Button>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            tableHeadData={wardTableHeader}
            tableBodyData={wards}
            type={"ward"}
            editBtnHandler={handleEditWard}
          />
        )}
      </Container>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"#181818"} color={"white"}>
          <ModalHeader>
            {editableWardId ? "Update Ward" : "Add Ward"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WardForm editableWardId={editableWardId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Ward;
