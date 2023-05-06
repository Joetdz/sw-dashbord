import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Group, Button, Loader } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getDrivers } from "../store/features/drivers/thunk";
import { NavbarSimple } from "../components/SideBar";
import { DriverTable } from "../components/Tables/DriverTable";

const DriversPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const drivers = useSelector((state: any) => state.drivers);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
      <PageLayoutTemplate>
        {drivers.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%", width: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{ width: "70%", margin: "1em auto", height: "100%" }}>
            <DriverTable data={drivers.items} />
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default DriversPage;
