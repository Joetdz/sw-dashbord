import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { TableSort } from "../components/CarTable";
import { getCars } from "../store/features/cars/thunk";
import { Flex } from "@mantine/core";

const CarsPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const cars = useSelector((state: any) => state.cars);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {cars.isLoading ? (
          <Flex align="center" justify="center" sx={{height: "100%"}}>
            <Loader />
          </Flex>
        ) : (
          <TableSort data={cars.items} />
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default CarsPage;
