import { Box, Container, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PageTitle from "../components/pagetitle/PageTitle";
import { hospitalIcon, patientIcon, wardIcon } from "../assets";
import DashboardCard from "../components/card/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsData } from "../store/features/patient";
import { fetchWardData } from "../store/features/ward";
import { occupencyRate } from "../utils";

const Hospital = () => {
  const { patients } = useSelector((state) => state.patient);
  const { wards } = useSelector((state) => state.ward);
  const dispatch = useDispatch();
  const cardData = [
    {
      cardTitle: "Total Patients",
      cardBodyText: patients?.length,
      icon: patientIcon,
    },
    {
      cardTitle: "Current Occupancy Rate",
      cardBodyText: occupencyRate(patients, wards),
      icon: wardIcon,
    },
    {
      cardTitle: "Average Length of Stay",
      cardBodyText: "14 Days",
      icon: hospitalIcon,
    },
    {
      cardTitle: "Top Performing Ward",
      cardBodyText: "Orthopedic",
      icon: wardIcon,
    },
  ];

  useEffect(() => {
    dispatch(fetchPatientsData());
    dispatch(fetchWardData());
  }, []);

  return (
    <>
      <Container py={8} maxW={"container.xl"}>
        <PageTitle title="Hospital" />
        <Grid my={4} templateColumns={"repeat(4,1fr)"} gap={4}>
          {cardData.map((ele, idx) => (
            <DashboardCard key={idx} {...ele} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Hospital;
