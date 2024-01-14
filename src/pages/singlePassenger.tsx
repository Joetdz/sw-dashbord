import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconIdBadge2,
  IconBrandTripadvisor,
  IconSettings,
} from "@tabler/icons-react";
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
  PasswordInput,
  Tabs,
} from "@mantine/core";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { NavbarSimple } from "../components/SideBar";
import { PassengerTripsTable } from "../components/Tables/PassengerTripsTable";
import { getTrips } from "../store/features/trips/thunk";
import {
  getSinglePassenger,
  editPassengerPassword,
} from "../store/features/passengers/thunk";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

const SinglePassenger = () => {
  const { id } = useParams<{ id?: string }>();
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSinglePassenger(id));
    dispatch(getTrips());
  }, [dispatch]);

  const passengers = useSelector((state: any) => state.passengers);

  const trips = useSelector((state: any) => state.trips);

  const passengersTrips = trips.items.filter(
    (trips: any) => trips.passenger && trips.passenger.uid === id
  );

  const [edit, setEdit] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      password: "",
    },
  });
  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}

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
                  icon={<IconIdBadge2 size="0.8rem" />}
                >
                  Identité
                </Tabs.Tab>
                <Tabs.Tab
                  value="trips"
                  icon={<IconBrandTripadvisor size="0.8rem" />}
                >
                  Courses
                </Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  icon={<IconSettings size="0.8rem" />}
                >
                  Paramètres
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="identity" pt="xs">
                <Stack>
                  <Flex direction="column">
                    <Flex
                      direction="row"
                      sx={{ width: "50%", marginBottom: "1em" }}
                      justify="space-between"
                    >
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
                    sx={{ height: "100%", width: "100%" }}
                  >
                    <Loader />
                  </Flex>
                ) : (
                  <Flex
                    direction="column"
                    sx={{ width: "100%", margin: "1em auto", height: "100%" }}
                  >
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

              <Tabs.Panel value="settings" pt="xs">
                <Flex sx={{ width: "50%" }} justify="space-between">
                  {!edit ? (
                    <Stack>
                      <Flex direction="row">
                        <Button
                          onClick={() => setEdit(true)}
                          style={{
                            background: "#0C3966",
                            borderRadius: "25px",
                          }}
                        >
                          Modifier le mot de passe
                        </Button>
                      </Flex>
                    </Stack>
                  ) : (
                    <Stack>
                      <Title order={3}>Modifier le mot de passe</Title>
                      <form
                        onSubmit={form.onSubmit(async () => {
                          await toast.promise(
                            dispatch(
                              editPassengerPassword({
                                id: id,
                                content: {
                                  password:
                                    form.values.password.length === 0
                                      ? passengers.singlePassengerDetails
                                        .password
                                      : form.values.password,
                                },
                              })
                            ),
                            {
                              pending: "Modification",
                              success: "Modification réussie avec succès",
                              error:
                                "Une erreur s'est produite lors de la modification",
                            }
                          );
                          navigate("/passengers", { replace: true });
                          // window.location.reload();
                        })}
                      >
                        <Stack>
                          <PasswordInput
                            onChange={(event) => {
                              form.setFieldValue(
                                "password",
                                event.currentTarget.value
                              );
                            }}
                          />
                        </Stack>

                        <Flex direction="row" sx={{ margin: "2em 0" }}>
                          <Button
                            onClick={() => setEdit(false)}
                            sx={[
                              {
                                background: "#F31D1D",
                                borderRadius: "25px",

                                marginRight: "2em",
                              },
                              {
                                "&:hover": {
                                  background: "#F9A507",
                                },
                              },
                            ]}
                          >
                            Annuler
                          </Button>
                          <Button
                            type="submit"
                            sx={[
                              {
                                background: "#0C3966",
                                borderRadius: "25px",
                              },
                              {
                                "&:hover": {
                                  background: "#F9A507",
                                },
                              },
                            ]}
                          >
                            Enregistrer
                          </Button>
                        </Flex>
                      </form>
                      <ToastContainer />
                    </Stack>
                  )}
                </Flex>
              </Tabs.Panel>
            </Tabs>
          </Container>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SinglePassenger;
