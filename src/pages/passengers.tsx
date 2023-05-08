import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Group, Button, Loader, Text } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { PassengersTable } from "../components/Tables/PassengersTable";
import { NavbarSimple } from "../components/SideBar";
import { getPassengers } from "../store/features/passengers/thunk";

const PassengersPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPassengers());
  }, [dispatch]);

  const passengers = useSelector((state: any) => state.passengers);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
      <PageLayoutTemplate>
        {passengers.isLoading ? (
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
            {passengers.items.length <= 0 ? (
              <Text>Une erreur s'est produite lors de la requête</Text>
            ) : (
              <PassengersTable data={passengers.items} />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default PassengersPage;
