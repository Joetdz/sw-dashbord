import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Group, Button, Loader, Text } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { PassengersTable } from "../components/Tables/PassengersTable";
import { TripsTable } from "../components/Tables/TripsTable";
import { NavbarSimple } from "../components/SideBar";
import { getPassengers } from "../store/features/passengers/thunk";
import { getTrips } from "../store/features/trips/thunk";

const TripsPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  const trips = useSelector((state: any) => state.trips);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
      <PageLayoutTemplate>
        {trips.isLoading ? (
          <Flex
            align="center"
            justify="center"
            sx={{ height: "100%", width: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{ width: "100%", margin: "1em auto", height: "100%" }}>
            {trips.items.length <= 0 ? (
              <Text>Une erreur s'est produite lors de la requête</Text>
            ) : (
              <TripsTable data={trips.items} />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default TripsPage;
