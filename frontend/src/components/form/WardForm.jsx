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
import { wardSpecializationData } from "../../utils/data";
import { addNewWard, updateWard } from "../../store/features/ward";

const WardForm = ({ editableWardId }) => {
  const { wards } = useSelector((state) => state.ward);
  const dispatch = useDispatch();
  const wardDataForEdit = wards?.find((ward) => ward._id === editableWardId);
  const wardFormValues = {
    ward_number: editableWardId ? wardDataForEdit?.ward_number : "",
    specialization: editableWardId ? wardDataForEdit?.specialization : "",
    capacity: editableWardId ? wardDataForEdit?.capacity : 0,
  };
  const handleSubmit = (data) => {
    if (editableWardId) {
      dispatch(updateWard({ id: editableWardId, updatedData: data }));
    } else {
      dispatch(addNewWard({ wardData: data }));
    }
  };
  return (
    <Box>
      <Formik
        initialValues={wardFormValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={2}>
              <FormControl isRequired={true}>
                <FormLabel htmlFor="ward_number">Ward Number</FormLabel>
                <Field
                  as={Input}
                  id="ward_number"
                  name="ward_number"
                  type="text"
                  placeholder="Ward Number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Department</FormLabel>
                <Field
                  as={Select}
                  name="specialization"
                  id="specialization"
                  placeholder="Department"
                  
                >
                  {wardSpecializationData.map((ele, idx) => (
                    <option style={{backgroundColor:"#181818",color:"#ffff"}} value={ele} key={idx}>
                      {ele}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <FormControl isRequired={true}>
                <FormLabel htmlFor="capacity">Capacity</FormLabel>
                <Field
                  as={Input}
                  name="capacity"
                  type="text"
                  id="capacity"
                  placeholder="Capacity"
                />
              </FormControl>
            </VStack>
            <HStack justifyContent={"flex-end"}>
              <Button colorScheme="teal" type="button" variant={"outline"}>
                Close
              </Button>
              <Button my={4} colorScheme="teal" type="submit">
                {editableWardId ? "Update" : "Submit"}
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default WardForm;
