import React, { useEffect, useState } from "react";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { getSinglePepoCar, updatePepoCar } from "../store/features/pepo/thunk";
import { CurrencyInput } from "../components/Popup/Car/AddCarForm";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

const PepoCarDetails = () => {
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
  useEffect(() => {
    dispatch(getSinglePepoCar(id));
  }, [dispatch]);

  const pepo = useSelector((state: any) => state.pepo);

  const [edit, setEdit] = useState<boolean>(false);

  const form = useForm<{
    model: string;
    price: number | "";
    currency: string;
  }>({
    initialValues: {
      model: "",
      price: 0,
      currency: "USD",
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
      {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}

      <PageLayoutTemplate>
        {pepo.isLoading ? (
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

                  <Text>{pepo.singlePepoCarDetails.model}</Text>
                </Stack>
                <Flex direction="column">
                  <Flex
                    direction="row"
                    sx={{ width: "50%" }}
                    justify="space-between">
                    <Stack>
                      <Title order={5}>Prix</Title>

                      <Text>{pepo.singlePepoCarDetails.price}</Text>
                    </Stack>
                    <Stack>
                      <Title order={5}>Dévise</Title>

                      <Text>{pepo.singlePepoCarDetails.currency}</Text>
                    </Stack>
                  </Flex>
                </Flex>

                <Flex direction="row">
                  <Button onClick={() => setEdit(true)}>Supprimer</Button>

                  <Button onClick={() => setEdit(true)}>Modifier</Button>
                </Flex>
              </Stack>
            ) : (
              <Stack>
                <Title order={1}>Modifier une voiture</Title>
                <form
                  onSubmit={form.onSubmit(async () => {
                    await toast.promise(
                      dispatch(
                        updatePepoCar({
                          id: id,
                          content: {
                            model: form.values.model,
                            price: form.values.price,
                            currency: form.values.currency,
                          },
                        }),
                      ),
                      {
                        pending: "Modification en cours",
                        success: "Modification réussie avec succès",
                        error:
                          "Une erreur s'est produite lors de la modification",
                      },
                    );

                    // window.location.reload();
                  })}>
                  <Stack>
                    <Title order={3}>Modèle</Title>

                    <TextInput
                      placeholder={`${pepo.singlePepoCarDetails.model}`}
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
                      sx={{ width: "50%" }}
                      justify="space-between">
                      <Stack>
                        <Title order={5}>Prix / km</Title>

                        <NumberInput
                          placeholder={`${pepo.singlePepoCarDetails.price}`}
                          onChange={(event) => {
                            form.setFieldValue("price", event);
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
                          //   value={form.values.price}
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
                              "currency",
                              event.currentTarget.value,
                            )
                          }
                          defaultValue="USD"
                          // value={form.values.prices.km.currency}
                          required
                          withAsterisk
                        />
                      </Stack>
                    </Flex>
                  </Flex>

                  <Flex direction="row">
                    <Button onClick={() => setEdit(false)}>Annuler</Button>
                    <Button type="submit">Enregistrer</Button>
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

export default PepoCarDetails;
