import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Text, Flex } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getPepoCars } from "../store/features/pepo/thunk";
import { PepoCarTable } from "../components/Tables/PepoCarTable";

const ServicesPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPepoCars());
  }, [dispatch]);

  const pepoCars = useSelector((state: any) => state.pepo);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
      <PageLayoutTemplate>
        {pepoCars.isLoading ? (
          <Flex
            align="center"
            justify="center"
            sx={{ height: "100%", width: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{ width: "70%", margin: "1em auto", height: "100%" }}>
            {pepoCars.items.length <= 0 ? (
              <Text>
                Une erreur s'est produite lors de la reque veuillez réessayer
              </Text>
            ) : (
              <PepoCarTable data={pepoCars.items} />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default ServicesPage;
