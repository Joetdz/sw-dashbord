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
  PasswordInput,
} from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { NavbarSimple } from "../components/SideBar";
import { getOneUser, updateUser } from "../store/features/admins/thunk";

import { toast, ToastContainer } from "react-toastify";

const SingleUserPage = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch]);

  const cars = useSelector((state: any) => state.cars);

  const users = useSelector((state: any) => state.admin);

  const [edit, setEdit] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {users.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Container sx={{ height: "100%", width: "100%" }}>
            {!edit ? (
              <Stack>
                <Title order={1}>Détails de l'utilisateur</Title>

                <Flex direction="column">
                  <Flex
                    direction="row"
                    sx={{ width: "50%" }}
                    justify="space-between">
                    <Stack>
                      <Title order={5}>Prénom</Title>

                      <Text>{users.singleUserDetails.firstName}</Text>
                    </Stack>
                    <Stack>
                      <Title order={5}>Nom</Title>

                      <Text>{users.singleUserDetails.lastName}</Text>
                    </Stack>
                  </Flex>
                  <Flex sx={{ width: "50%" }} justify="space-between">
                    <Stack>
                      <Title order={5}>Email</Title>

                      <Text>{users.singleUserDetails.email}</Text>
                    </Stack>
                    {/* <Stack>
                      <Title order={5}>Dévise</Title>

                      <Text>
                        {cars.singleCarDetails.prices &&
                          cars.singleCarDetails.prices.hour.currency}
                      </Text>
                    </Stack> */}
                  </Flex>
                </Flex>

                <Flex direction="row">
                  <Button
                    onClick={() => setEdit(true)}
                    style={{
                      background: "#F31D1D",
                      borderRadius: "25px",
                      marginRight: "2em",
                    }}>
                    Supprimer
                  </Button>

                  <Button
                    onClick={() => setEdit(true)}
                    style={{ background: "#0C3966", borderRadius: "25px" }}>
                    Modifier
                  </Button>
                </Flex>
              </Stack>
            ) : (
              <Stack>
                <Title order={1}>Modifier un compte utilisateur</Title>
                <form
                  onSubmit={form.onSubmit(async () => {
                    if (form.values.password !== form.values.confirmPassword) {
                      toast.error("Les mots de passe ne sont pas identiques");
                    } else {
                      await toast.promise(
                        dispatch(
                          updateUser({
                            id: id,
                            content: {
                              firstName:
                                form.values.firstName.length === 0
                                  ? users.singleUserDetails.firstName
                                  : form.values.firstName,

                              lastName:
                                form.values.lastName.length === 0
                                  ? users.singleUserDetails.lastName
                                  : form.values.lastName,
                              email:
                                form.values.email.length === 0
                                  ? users.singleUserDetails.email
                                  : form.values.email,

                              password:
                                form.values.password.length === 0
                                  ? users.singleUserDetails.password
                                  : form.values.password,
                              key: `${process.env.REACT_APP_ADMINS_KEY}`,
                            },
                          }),
                        ),
                        {
                          pending:
                            "Modification du compte utilisateur en cours !",
                          success: "Modification réussie avec succès !",
                          error:
                            "Une erreur s'est produite lors de la modification du compte utilisateur !",
                        },
                      );

                      navigate("/users", { replace: true });
                    }
                  })}>
                  <Stack></Stack>
                  <Flex direction="column">
                    <Flex
                      direction="row"
                      sx={{ width: "50%", margin: "2em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <TextInput
                          label="Prenom"
                          placeholder={`${users.singleUserDetails.firstName}`}
                          onChange={(event) =>
                            form.setFieldValue(
                              "firstName",
                              event.currentTarget.value,
                            )
                          }
                          required
                          withAsterisk
                        />
                      </Stack>
                      <Stack>
                        <TextInput
                          label="Nom"
                          placeholder={`${users.singleUserDetails.lastName}`}
                          onChange={(event) =>
                            form.setFieldValue(
                              "lastName",
                              event.currentTarget.value,
                            )
                          }
                          required
                          withAsterisk
                        />
                      </Stack>
                    </Flex>
                    <Flex
                      sx={{ width: "50%", margin: "1em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <TextInput
                          required
                          label="Email"
                          //   placeholder="hello@gari.com"
                          placeholder={`${users.singleUserDetails.email}`}
                          //   value={form.values.email}
                          onChange={(event) =>
                            form.setFieldValue(
                              "email",
                              event.currentTarget.value,
                            )
                          }
                          error={form.errors.email && "Invalid email"}
                        />
                      </Stack>
                      <Stack></Stack>
                    </Flex>
                    <Flex
                      sx={{ width: "50%", margin: "1em 0 .5em" }}
                      justify="space-between">
                      <Stack>
                        <PasswordInput
                          required
                          label="Nouveau mot de passe"
                          placeholder="Votre nouveau mot de passe"
                          value={form.values.password}
                          onChange={(event) =>
                            form.setFieldValue(
                              "password",
                              event.currentTarget.value,
                            )
                          }
                          error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                          }
                          //   sx={{ width: "100%" }}
                        />
                      </Stack>
                      <Stack>
                        <PasswordInput
                          required
                          label="Confirmer le nouveau mot de passe"
                          placeholder="Votre nouveau mot de passe"
                          value={form.values.confirmPassword}
                          onChange={(event) =>
                            form.setFieldValue(
                              "confirmPassword",
                              event.currentTarget.value,
                            )
                          }
                          error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                          }
                          //   radius="md"
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

export default SingleUserPage;
