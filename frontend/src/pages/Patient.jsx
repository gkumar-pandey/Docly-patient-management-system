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
import PatientForm from "../components/form/PatientForm";
import DataTable from "../components/datatable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsData } from "../store/features/patient";
import Loader from "../components/loader/Loader";

const Patient = () => {
  const [editablePatientId, setEditablePatientId] = useState("");
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { patients, isLoading, error } = useSelector((state) => state.patient);
  const patientDataTableHeader = [
    "SI No",
    "Name",
    "Gender",
    "Age",
    "Ward Number",
    "Action",
  ];
  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatientsData());
    }
  }, []);

  const handlePatientEditBtn = (id) => {
    setEditablePatientId(id);
    onOpen();
  };

  return (
    <>
      <Container py={8} maxW={"container.xl"}>
        <PageTitle title="Patient" />
        <Box my={4}>
          <Button
            onClick={() => {
              setEditablePatientId("");
              onOpen();
            }}
            colorScheme="teal"
            variant="solid"
          >
            Add Patient
          </Button>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            type={"patient"}
            tableHeadData={patientDataTableHeader}
            tableBodyData={patients}
            editBtnHandler={handlePatientEditBtn}
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
          <ModalHeader>Add Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PatientForm
              onClose={onClose}
              editablePatientId={editablePatientId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Patient;
