import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Text, Flex, Button, Group } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getPepoCars } from "../store/features/pepo/thunk";
import { PepoCarTable } from "../components/Tables/PepoCarTable";
import CarPopup from "../components/Popup/Car/CarPopUp";
import AddPepoCarForm from "../components/Popup/Car/AddPepoCarForm";
import Header from "../components/Header";

const ServicesPage = () => {
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
    dispatch(getPepoCars());
  }, [dispatch]);

  const pepoCars = useSelector((state: any) => state.pepo);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}
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
            sx={{ width: "100%", margin: "1em auto", height: "100%" }}>
            <Group position="left">
              <Button
                onClick={open}
                sx={[
                  {
                    background: "#0C3966",
                    borderRadius: "25px",
                    marginBottom: "20px",
                  },
                  {
                    "&:hover": {
                      background: "#01101E",
                    },
                  },
                ]}>
                Ajouter une voiture
              </Button>
            </Group>

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
      <CarPopup
        title="Ajouter une voiture"
        content={<AddPepoCarForm close={close} />}
        open={open}
        close={close}
        opened={opened}
      />
    </div>
  );
};

export default ServicesPage;
