import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Flex, Text, Stack, Title, Container } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { NavbarSimple } from "../components/SideBar";
import { getSingleCar } from "../store/features/cars/thunk";

const SingleCarPage = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getSingleCar(id));
  }, [dispatch]);

    const cars = useSelector((state: any) => state.cars);
    
      console.log(cars.singleCarDetails);
    
  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {cars.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Container sx={{ height: "100%", width: "100%" }}>
            <Stack>
              <Title order={1}>Détails de la voiture</Title>
              <Stack>
                <Title order={3}>Modèle</Title>
                <Text>{cars.singleCarDetails.model}</Text>
              </Stack>
              <Flex direction="column">
                <Flex
                  direction="row"
                  sx={{ width: "50%" }}
                  justify="space-between">
                  <Stack>
                    <Title order={5}>Prix / km</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.km.price}
                    </Text>
                  </Stack>

                  <Stack>
                    <Title order={5}>Dévise</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.km.currency}
                    </Text>
                  </Stack>
                </Flex>
                <Flex sx={{ width: "50%" }} justify="space-between">
                  <Stack>
                    <Title order={5}>Prix / heure</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.hour.price}
                    </Text>
                  </Stack>
                  <Stack>
                    <Title order={5}>Dévise</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.hour.currency}
                    </Text>
                  </Stack>
                </Flex>
                <Flex sx={{ width: "50%" }} justify="space-between">
                  <Stack>
                    <Title order={5}>Prix / minute</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.minute.price}
                    </Text>
                  </Stack>
                  <Stack>
                    <Title order={5}>Dévise</Title>
                    <Text>
                      {cars.singleCarDetails.prices &&
                        cars.singleCarDetails.prices.minute.currency}
                    </Text>
                  </Stack>
                </Flex>
              </Flex>
            </Stack>
          </Container>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SingleCarPage;
