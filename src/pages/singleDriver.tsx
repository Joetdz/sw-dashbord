import React, { useEffect, useState } from "react";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader,
  Flex,
  Text,
  Stack,
  Title,
  Container,
  TextInput,
  Button,
  NumberInput,
  NativeSelect,
  Tabs,
} from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { NavbarSimple } from "../components/SideBar";
import {
  getSingleDriver,
  getDrivers,
  activateDriver,
  deactivateDriver,
} from "../store/features/drivers/thunk";
import { CurrencyInput } from "../components/Popup/Car/AddCarForm";
import { toast, ToastContainer } from "react-toastify";

const SingleDriver = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleDriver(id));
  }, [dispatch]);

  const drivers = useSelector((state: any) => state.drivers);
  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {drivers.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Container sx={{ height: "100%", width: "100%" }}>
            <Tabs defaultValue="identity">
              <Tabs.List>
                <Tabs.Tab
                  value="identity"

                  //   icon={<IconPhoto size="0.8rem" />}
                >
                  Identité
                </Tabs.Tab>
                <Tabs.Tab
                  value="trips"
                  //   icon={<IconMessageCircle size="0.8rem" />}
                >
                  Courses
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="identity" pt="xs">
                <Stack>
                  <Flex direction="column">
                    <Flex
                      direction="row"
                      sx={{ width: "50%", marginBottom: "1em" }}
                      justify="space-between">
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Nom</Title>

                        <Text>{drivers.singleDriverDetails.name}</Text>
                      </Stack>
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Numéro de téléphone</Title>

                        <Text>{drivers.singleDriverDetails.phone}</Text>
                      </Stack>
                    </Flex>
                    <Flex sx={{ width: "50%" }} justify="space-between">
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Sexe</Title>

                        <Text>{drivers.singleDriverDetails.gender}</Text>
                      </Stack>
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Véhicule utilisé</Title>
                        <Text>
                          {drivers.singleDriverDetails.car &&
                            drivers.singleDriverDetails.car.model}
                        </Text>
                      </Stack>
                    </Flex>
                  </Flex>

                  <Flex direction="row">
                    {drivers.singleDriverDetails.active ? (
                      <Button
                        onClick={async () => {
                          await dispatch(deactivateDriver(id));
                          await dispatch(getDrivers());
                        }}
                        sx={{
                          background: "#F31D1D",
                          borderRadius: "25px",
                          fontSize: ".8em",
                        }}>
                        Désactiver
                      </Button>
                    ) : (
                      <Button
                        onClick={async () => {
                          await dispatch(activateDriver(id));
                          await dispatch(getDrivers());
                        }}
                        sx={{
                          background: "#0C3966",
                          borderRadius: "25px",
                          fontSize: ".8em",
                        }}>
                        Activer
                      </Button>
                    )}
                  </Flex>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="trips" pt="xs">
                Trips tab content
              </Tabs.Panel>
            </Tabs>
          </Container>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SingleDriver;
