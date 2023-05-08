import React from "react";
import {
  Container,
  Flex,
  TextInput,
  NativeSelect,
  rem,
  Button,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addPepoCar } from "../../../store/features/pepo/thunk";

const data = [
  { value: "CDF", label: "CDF" },
  { value: "USD", label: "USD" },
];

type Props = {
  price: number;
  currency: string;
  changePrice: any;
  changeCurrency: any;
};
export const CurrencyInput = ({
  price,
  currency,
  changePrice,
  changeCurrency,
}: Props) => {
  const select = (
    <>
      <NativeSelect
        data={data}
        styles={{
          input: {
            fontWeight: 500,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: rem(92),
          },
        }}
        value={currency}
        onChange={changeCurrency}
      />
    </>
  );

  return (
    <>
      <NumberInput
        placeholder={`Prix `}
        onChange={changePrice}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value))
            ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            : ""
        }
        value={price}
        rightSection={select}
        rightSectionWidth={92}
        required
        withAsterisk
        sx={{ margin: "0 0 1em" }}
      />
      {/* <TextInput
          type="number"
          placeholder={`${price}`}
          label={`Prix`}
          value={price}
          rightSection={select}
          rightSectionWidth={92}
          required
          onChange={changePrice}
        /> */}
    </>
  );
};

type Prop = {
  close: any;
};

const AddPepoCarForm = ({ close }: Prop) => {
  const form = useForm<{ model: string; price: number; currency: string }>({
    initialValues: {
      model: "",
      price: 0,
      currency: "USD",
    },
  });

  const dispatch = useDispatch<any>();
  return (
    <Container>
      <form
        onSubmit={form.onSubmit(async () => {
          await dispatch(
            addPepoCar({
              model: form.values.model,
              price: form.values.price,
              currency: form.values.currency,
            }),
          );

          close();
        })}>
        <TextInput
          placeholder="Modèle de la voiture"
          label="Modèle de la voiture"
          withAsterisk
          required
          value={form.values.model}
          onChange={(event) =>
            form.setFieldValue("model", event.currentTarget.value)
          }
          sx={{ margin: "1em 0" }}
        />
        <Flex>
          <CurrencyInput
            price={form.values.price}
            currency={form.values.currency}
            changePrice={(event: any) => {
              form.setFieldValue("price", event);
            }}
            changeCurrency={(event: any) => {
              form.setFieldValue("currency", event.currentTarget.value);
            }}
          />
        </Flex>

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
      </form>
    </Container>
  );
};

export default AddPepoCarForm;
