import {
  Box,
  Button,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataDisplayDrawer from "../drawer/DataDisplayDrawer";
import PatientDataDisplayCard from "../displaydata/PatientDataDisplayCard";
import { useDispatch } from "react-redux";
import { deletePatient } from "../../store/features/patient";
import WardDataDisplayCard from "../displaydata/WardDataDisplayCard";
import { deleteWard } from "../../store/features/ward";

const WardTableBody = ({
  idx,
  ward_number,
  capacity,
  specialization,
  editBtnHandler,
  _id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  return (
    <>
      <Tr>
        <Td>{idx + 1}</Td>
        <Td>
          <Button onClick={onOpen} variant={"link"}>
            {ward_number}
          </Button>
        </Td>
        <Td>{specialization}</Td>
        <Td>{capacity}</Td>
        <Td>
          <HStack gap={3}>
            <IconButton
              size={"sm"}
              variant={"outline"}
              colorScheme="teal"
              aria-label="Send email"
              icon={<FaEdit />}
              onClick={() => editBtnHandler(_id)}
            />
            <IconButton
              size={"sm"}
              colorScheme="red"
              variant={"outline"}
              icon={<MdDelete />}
              onClick={() => dispatch(deleteWard({ id: _id }))}
            />
          </HStack>
        </Td>
      </Tr>
      <DataDisplayDrawer
        title={"Ward Details"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <WardDataDisplayCard
          ward_number={ward_number}
          capacity={capacity}
          specialization={specialization}
        />
      </DataDisplayDrawer>
    </>
  );
};

const PatientTableBody = ({
  idx,
  name,
  age,
  gender,
  ward,
  contact,
  medical_history,
  editBtnHandler,
  _id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  return (
    <>
      <Tr>
        <Td>{idx + 1}</Td>
        <Td>
          <Button onClick={onOpen} variant={"link"}>
            {name}
          </Button>
        </Td>
        <Td>{age}</Td>
        <Td>{gender}</Td>
        <Td>{ward.ward_number}</Td>
        <Td>
          <HStack gap={3}>
            <IconButton
              size={"sm"}
              variant={"outline"}
              colorScheme="teal"
              aria-label="Send email"
              icon={<FaEdit />}
              onClick={() => editBtnHandler(_id)}
            />
            <IconButton
              size={"sm"}
              colorScheme="red"
              variant={"outline"}
              icon={<MdDelete />}
              onClick={() => dispatch(deletePatient({ id: _id }))}
            />
          </HStack>
        </Td>
      <DataDisplayDrawer
        title={"Patient Details"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <PatientDataDisplayCard
          name={name}
          age={age}
          gender={gender}
          ward_number={ward.ward_number}
          medical_history={medical_history}
          contact={contact}
        />
      </DataDisplayDrawer>
      </Tr>
    </>
  );
};

const DataTable = ({ tableHeadData, tableBodyData, type, editBtnHandler }) => {
  return (
    <Box my={6}>
      <TableContainer>
        <Table
          textColor={"white"}
          bgColor={"#181818"}
          border={"1px solid #D9E1EC"}
          variant="simple"
          size={"md"}
        >
          <Thead>
            <Tr>
              {tableHeadData.map((ele, idx) => (
                <Td key={idx}>
                  <Text as={"b"}>{ele}</Text>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableBodyData.map((data, idx) => {
              if (type === "patient") {
                return (
                  <PatientTableBody
                    {...data}
                    idx={idx}
                    editBtnHandler={editBtnHandler}
                    key={data?._id}
                  />
                );
              } else if (type === "ward") {
                return (
                  <WardTableBody
                    {...data}
                    idx={idx}
                    editBtnHandler={editBtnHandler}
                    key={data?._id}
                  />
                );
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
