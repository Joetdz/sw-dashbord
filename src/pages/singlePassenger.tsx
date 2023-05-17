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
import { PassengerTripsTable } from "../components/Tables/PassengerTripsTable";
import { getTrips } from "../store/features/trips/thunk";
import { getSinglePassenger } from "../store/features/passengers/thunk";

const SinglePassenger = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSinglePassenger(id));
    dispatch(getTrips());
  }, [dispatch]);

   const passengers = useSelector((state: any) => state.passengers);

   const trips = useSelector((state: any) => state.trips);

   const passengersTrips = trips.items.filter(
     (trips: any) => trips.passenger && trips.passenger.uid === id,
   );
  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {passengers.isLoading ? (
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

                        <Text>{passengers.singlePassengerDetails.name}</Text>
                      </Stack>
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Numéro de téléphone</Title>

                        <Text>{passengers.singlePassengerDetails.phone}</Text>
                      </Stack>
                    </Flex>
                    {/* <Flex sx={{ width: "50%" }} justify="space-between">
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Sexe</Title>

                        <Text>{passengers.singlePassengerDetails.gender}</Text>
                      </Stack>
                      <Stack sx={{ width: "50%" }}>
                        <Title order={5}>Véhicule utilisé</Title>
                        <Text>
                          {passengers.singlePassengerDetails.car &&
                            passengers.singlePassengerDetails.car.model}
                        </Text>
                      </Stack>
                    </Flex> */}
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
                    {passengersTrips.length <= 0 ? (
                      <Text>
                        Aucune course n'a été effectué par cet utilisateur
                      </Text>
                    ) : (
                      <PassengerTripsTable data={passengersTrips} />
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

export default SinglePassenger;