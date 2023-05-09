import {
  Container,
  Flex,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../../store/features/admins/thunk";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";

type Prop = {
  close: any;
};

const AddAdminForm = ({ close }: Prop) => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const dispatch = useDispatch<any>();
  return (
    <Container>
      <form
        onSubmit={form.onSubmit(async () => {
          await dispatch(
            createAccount({
              firstName: form.values.firstName,
              lastName: form.values.lastName,
              email: form.values.email,
              password: form.values.password,
              key: `${process.env.REACT_APP_ADMINS_KEY}`,
            }),
          );

        //   close();
        })}>
        <TextInput
          placeholder="Prénom"
          label="Prénom"
          withAsterisk
          required
          value={form.values.firstName}
          onChange={(event) =>
            form.setFieldValue("firstName", event.currentTarget.value)
          }
        />
        <TextInput
          placeholder="Nom"
          label="Nom"
          withAsterisk
          required
          value={form.values.lastName}
          onChange={(event) =>
            form.setFieldValue("lastName", event.currentTarget.value)
          }
        />
        <TextInput
          placeholder="hello@gari.com"
          label="Email"
          withAsterisk
          required
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
        />

        <PasswordInput
          label="Mot de passe"
          placeholder="Mot de passe"
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />

        <Button type="submit">Enregistrer</Button>
      </form>
    </Container>
  );
};

export default AddAdminForm;
