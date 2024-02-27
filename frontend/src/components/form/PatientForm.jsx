import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPatient,
  updatePatientData,
} from "../../store/features/patient";

const PatientForm = ({ editablePatientId, onClose }) => {
  const { wards } = useSelector((state) => state.ward);
  const { patients } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const patientDataForEdit = patients.find(
    (data) => data._id === editablePatientId
  );

  const patientFormValues = {
    name: editablePatientId ? patientDataForEdit.name : "",
    age: editablePatientId ? patientDataForEdit.age : 0,
    gender: editablePatientId ? patientDataForEdit.gender : "",
    contact: editablePatientId ? patientDataForEdit.contact : "",
    medical_history: editablePatientId
      ? patientDataForEdit?.medical_history
      : "",
    ward: editablePatientId ? patientDataForEdit?.ward?._id : "",
  };

  const handleSubmit = (data) => {
    if (editablePatientId) {
      dispatch(updatePatientData({ id: editablePatientId, updatedData: data }));
    } else {
      dispatch(createNewPatient(data));
    }
  };

  return (
    <Box>
      <Formik
        initialValues={patientFormValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm(patientFormValues);
          onClose();
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={2}>
              <FormControl isRequired={true}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Field
                  as={Select}
                  name="gender"
                  type="text"
                  id="gender"
                  placeholder="Gender"
                >
                  <option
                    style={{ backgroundColor: "#181818", color: "#ffff" }}
                    value={"Male"}
                  >
                    Male
                  </option>
                  <option
                    style={{ backgroundColor: "#181818", color: "#ffff" }}
                    value={"Female"}
                  >
                    Female
                  </option>
                </Field>
              </FormControl>
              <FormControl isRequired={true}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Field
                  as={Input}
                  name="age"
                  type="number"
                  id="age"
                  placeholder="Age"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="contact">Contact</FormLabel>
                <Field
                  as={Input}
                  name="contact"
                  type="text"
                  id="contact"
                  placeholder="Contact Number"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="medical_history">Medical History</FormLabel>
                <Field
                  as={Textarea}
                  name="medical_history"
                  type="text"
                  id="medical_history"
                  placeholder="Medical History"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ward Number</FormLabel>
                <Field
                  as={Select}
                  placeholder="Ward Number"
                  id="ward"
                  name="ward"
                >
                  {wards.map((ele, idx) => (
                    <option
                      style={{ backgroundColor: "#181818", color: "#ffff" }}
                      key={idx}
                      value={ele._id}
                    >
                      {ele.ward_number}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </VStack>
            <HStack justifyContent={"flex-end"}>
              <Button
                onClick={onClose}
                colorScheme="teal"
                type="button"
                variant={"outline"}
              >
                Close
              </Button>
              <Button my={4} colorScheme="teal" type="submit">
                {editablePatientId ? "Update" : "Submit"}
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PatientForm;
