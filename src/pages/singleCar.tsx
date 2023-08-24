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
} from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { NavbarSimple } from "../components/SideBar";
import { getSingleCar, updateCar } from "../store/features/cars/thunk";
import { CurrencyInput } from "../components/Popup/Car/AddCarForm";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

const SingleCarPage = () => {
  const { id } = useParams<{ id?: string }>();
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
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingleCar(id));
  }, [dispatch]);

  const cars = useSelector((state: any) => state.cars);

  const [edit, setEdit] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      model: "",
      prices: {
        km: {
          price: 0,
          currency: "CDF",
        },
        hour: {
          price: 0,
          currency: "USD",
        },

        minute: {
          price: 0,
          currency: "CDF",
        },
      },
    },
    // validate: {
    //   model: hasLength(
    //     { min: 2, max: 30 },
    //     "Le modèle doit avoir au minimun 2  characters long",
    //   ),
    //   prices: {
    //     km: {
    //       price: isNotEmpty("Ne peut pas être vide"),
    //       currency: isNotEmpty("Ne peut pas être vide"),
    //     },
    //     hour: {
    //       price: isNotEmpty("Ne peut pas être vide"),
    //       currency: isNotEmpty("Ne peut pas être vide"),
    //     },

    //     minute: {
    //       price: isNotEmpty("Ne peut pas être vide"),
    //       currency: isNotEmpty("Ne peut pas être vide"),
    //     },
    //   },
    // },
  });

  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 700 ? <Header /> : <NavbarSimple/>}

      <PageLayoutTemplate>
        {cars.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Container sx={{ height: "100%", width: "100%" }}>
            {!edit ? (
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

                <Flex direction="row">
                  {/* <Button
                    onClick={() => setEdit(true)}
                    style={{
                      background: "#F31D1D",
                      borderRadius: "25px",
                      marginRight: "2em",
                    }}>
                    Supprimer
                  </Button> */}

                  <Button
                    onClick={() => setEdit(true)}
                    style={{ background: "#0C3966", borderRadius: "25px" }}>
                    Modifier
                  </Button>
                </Flex>
              </Stack>
            ) : (
              <Stack>
                <Title order={1}>Modifier une voiture</Title>
                <form
                  onSubmit={form.onSubmit(async () => {
                    await toast.promise(
                      dispatch(
                        updateCar({
                          id: id,
                          content: {
                            model:
                              form.values.model.length === 0
                                ? cars.singleCarDetails.model
                                : form.values.model,
                            prices: {
                              km: {
                                price:
                                  form.values.prices.km.price === 0
                                    ? cars.singleCarDetails.prices.km.price
                                    : form.values.prices.km.price,

                                currency: form.values.prices.km.currency,
                              },
                              hour: {
                                price:
                                  form.values.prices.hour.price === 0
                                    ? cars.singleCarDetails.prices.hour.price
                                    : form.values.prices.hour.price,

                                currency: form.values.prices.hour.currency,
                              },
                              minute: {
                                price:
                                  form.values.prices.minute.price === 0
                                    ? cars.singleCarDetails.prices.minute.price
                                    : form.values.prices.minute.price,

                                currency: form.values.prices.minute.currency,
                              },
                            },
                          },
                        }),
                      ),
                      {
                        pending: "Modification",
                        success: "Modification réussie avec succès",
                        error:
                          "Une erreur s'est produite lors de la modification",
                      },
                    );
                    navigate("/cars", { replace: true });
                    window.location.reload();
                  })}>
                  <Stack>
                    <Title order={3}>Modèle</Title>

                    <TextInput
                      placeholder={`${cars.singleCarDetails.model}`}
                      onChange={(event) =>
                        form.setFieldValue("model", event.currentTarget.value)
                      }
                      required
                      withAsterisk
                      // value={form.values.model}
                    />
                  </Stack>
                  <Flex direction="column">
                    <Flex
                      direction="row"
                      sx={{ width: "50%", margin: "2em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <Title order={5}>Prix / km</Title>

                        <NumberInput
                          placeholder={`${cars.singleCarDetails.prices.km.price}`}
                          onChange={(event) => {
                            form.setFieldValue("prices.km.price", event);
                          }}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                              ? `${value}`.replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ",",
                                )
                              : ""
                          }
                          // value={form.values.prices.km.price}
                          required
                          withAsterisk
                        />
                      </Stack>
                      <Stack>
                        <Title order={5}>Dévise</Title>

                        <NativeSelect
                          data={["CDF", "USD"]}
                          onChange={(event) =>
                            form.setFieldValue(
                              "prices.km.currency",
                              event.currentTarget.value,
                            )
                          }
                          defaultValue="CDF"
                          // value={form.values.prices.km.currency}
                          required
                          withAsterisk
                        />
                      </Stack>
                    </Flex>
                    <Flex
                      sx={{ width: "50%", margin: "1em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <Title order={5}>Prix / heure</Title>

                        <NumberInput
                          placeholder={`${cars.singleCarDetails.prices.hour.price}`}
                          onChange={(event) => {
                            form.setFieldValue("prices.hour.price", event);
                          }}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                              ? `${value}`.replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ",",
                                )
                              : ""
                          }
                          required
                          withAsterisk
                        />
                      </Stack>
                      <Stack>
                        <Title order={5}>Dévise</Title>

                        <NativeSelect
                          data={["CDF", "USD"]}
                          onChange={(event) =>
                            form.setFieldValue(
                              "prices.hour.currency",
                              event.currentTarget.value,
                            )
                          }
                          defaultValue="CDF"
                          required
                          withAsterisk
                        />
                      </Stack>
                    </Flex>
                    <Flex
                      sx={{ width: "50%", margin: "1em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <Title order={5}>Prix / minute</Title>

                        <NumberInput
                          placeholder={`${cars.singleCarDetails.prices.minute.price}`}
                          onChange={(event) => {
                            form.setFieldValue("prices.minute.price", event);
                          }}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                              ? `${value}`.replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ",",
                                )
                              : ""
                          }
                          // value={form.values.prices.minute.price}
                          required
                          withAsterisk
                        />
                      </Stack>
                      <Stack>
                        <Title order={5}>Dévise</Title>

                        <NativeSelect
                          data={["CDF", "USD"]}
                          onChange={(event) =>
                            form.setFieldValue(
                              "prices.minute.currency",
                              event.currentTarget.value,
                            )
                          }
                          defaultValue="CDF"
                          required
                          withAsterisk
                        />
                      </Stack>
                    </Flex>
                  </Flex>

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
                      ]}>
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      sx={[
                        { background: "#0C3966", borderRadius: "25px" },
                        {
                          "&:hover": {
                            background: "#F9A507",
                          },
                        },
                      ]}>
                      Enregistrer
                    </Button>
                  </Flex>
                </form>
                <ToastContainer />
              </Stack>
            )}
          </Container>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SingleCarPage;
