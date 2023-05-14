import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IconIdBadge2, IconBrandTripadvisor } from "@tabler/icons-react";
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
import { getTrips } from "../store/features/trips/thunk";
import { DriversTripsTable } from "../components/Tables/DriverTripsTable";

const SingleDriver = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleDriver(id));
    dispatch(getTrips());
  }, [dispatch]);

  const drivers = useSelector((state: any) => state.drivers);

  const trips = useSelector((state: any) => state.trips);

  const driversTrips = trips.items.filter(
    (trips: any) => trips.driver && trips.driver.uid === id,
  );

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
                  icon={<IconIdBadge2 size="0.8rem" />}>
                  Identité
                </Tabs.Tab>
                <Tabs.Tab
                  value="trips"
                  icon={<IconBrandTripadvisor size="0.8rem" />}>
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
                    {driversTrips.length <= 0 ? (
                      <Text>
                        Aucune course n'a été effectué par ce chauffeur
                      </Text>
                    ) : (
                      <DriversTripsTable data={driversTrips} />
                    )}
                  </Flex>
                )}
              </Tabs.Panel>
            </Tabs>
          </Container>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SingleDriver;
