import React from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Stack,
  Image,
} from "@mantine/core";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/admins/thunk";
import { setError, setAuth, setLogging } from "../store/features/admins/slice";
import axios from "axios";

const ErrorMessage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>
        Une erreur s`est produite, le mot de passe ou le nom d`utilisateur est
        incorrect !
      </p>

      <Button
        type="reset"
        onClick={() => {
          // dispatch(setLogging(false));
          dispatch(setError(false));
          window.location.reload();
        }}
      >
        veuillez réessayer
      </Button>
    </div>
  );
};

const LoginPage = (props: PaperProps) => {
  const [type, toggle] = useToggle(["Se connecter", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const hasError = useSelector((state: any) => state.admin.hasError);
  const logging = useSelector((state: any) => state.admin.logging);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        background: "#8e2cff",
        padding: "0 2rem",
      }}
    >
      <Image
        maw={240}
        mx="auto"
        radius="md"
        src="/sw-logo.png"
        alt="Random image"
        sx={{ margin: "1em 0" }}
      />
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Bienvenu sur votre espace administrateur
        </Text>

        <form
          onSubmit={form.onSubmit(async () => {
            await toast.promise(
              axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}auth/admin-login`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  email: form.values.email,
                  password: form.values.password,
                },
              })
                .then((response) => {
                  localStorage.setItem("gari", response.data.token);
                  localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(response.data.user)
                  );

                  navigate("/", { replace: true });
                  setTimeout(() => {
                    dispatch(setAuth(true));

                    dispatch(setLogging(true));
                    window.location.reload();
                  }, 5000);
                  toast.success(
                    "Connexion réussie ! Vous serez redirigés dans quelques sécondes",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                    }
                  );
                })
                .catch((error) => {
                  dispatch(setError(true));
                  toast.error(<ErrorMessage />, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }),
              {
                pending: "Connexion en cours",
                success: "Connexion reussie !",
                error: "Une erreur s'est produite lors de la connexion",
              }
            );
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@superwewa.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              type="submit"
              radius="xl"
              sx={[
                {
                  background: "#0C3966",
                  borderRadius: "25px",
                  marginBottom: "20px",
                },
                {
                  "&:hover": {
                    background: "#F9A507",
                  },
                },
              ]}
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>

        <ToastContainer />
      </Paper>
    </div>
  );
};

export default LoginPage;
