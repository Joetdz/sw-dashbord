import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Group, Button, Loader, Text } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getDrivers } from "../store/features/drivers/thunk";
import { NavbarSimple } from "../components/SideBar";
import { DriverTable } from "../components/Tables/DriverTable";
import Header from "../components/Header";

const DriversPage = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const drivers = useSelector((state: any) => state.drivers);

  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}
      <PageLayoutTemplate>
        {drivers.isLoading ? (
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
            {drivers.items.length <= 0 ? (
              <Text>Une erreur s'est produite lors de la requête</Text>
            ) : (
              <DriverTable data={drivers.items} />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default DriversPage;
