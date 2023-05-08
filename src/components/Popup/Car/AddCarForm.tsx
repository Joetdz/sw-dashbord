import {
  Container,
  Flex,
  TextInput,
  NativeSelect,
  rem,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { addNewCar } from "../../../store/features/cars/thunk";

const data = [
  { value: "CDF", label: "CDF" },
  { value: "USD", label: "USD" },
];

type Props = {
  taxType: string;
  price: number;
  currency: string;
  //   onChange: any;
  changePrice: any;
  changeCurrency: any;
};
export const CurrencyInput = ({
  taxType,
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
    <TextInput
      type="number"
      placeholder={`${price}`}
      label={`Prix/${taxType}`}
      value={price}
      rightSection={select}
      rightSectionWidth={92}
      required
      onChange={changePrice}
    />
  );
};

type Prop = {
  close: any;
};

const AddCarForm = ({ close }: Prop) => {
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
          currency: "CDF",
        },

        minute: {
          price: 0,
          currency: "CDF",
        },
      },
    },
  });

  const dispatch = useDispatch<any>();
  return (
    <Container>
      <form
        onSubmit={form.onSubmit(async () => {
          await dispatch(
            addNewCar({
              model: form.values.model,
              prices: {
                km: {
                  price: form.values.prices.km.price,
                  currency: form.values.prices.km.currency,
                },
                hour: {
                  price: form.values.prices.hour.price,
                  currency: form.values.prices.hour.currency,
                },
                minute: {
                  price: form.values.prices.minute.price,
                  currency: form.values.prices.minute.currency,
                },
              },
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
        />
        <Flex>
          <CurrencyInput
            taxType={"km"}
            price={form.values.prices.km.price}
            currency={form.values.prices.km.currency}
            changePrice={(event: any) => {
              form.setFieldValue("prices.km.price", event.currentTarget.value);
            }}
            changeCurrency={(event: any) => {
              form.setFieldValue(
                "prices.km.currency",
                event.currentTarget.value,
              );
            }}
          />
        </Flex>
        <Flex>
          <CurrencyInput
            taxType={"heure"}
            currency={form.values.prices.hour.currency}
            price={form.values.prices.hour.price}
            changePrice={(event: any) => {
              form.setFieldValue(
                "prices.hour.price",
                event.currentTarget.value,
              );
            }}
            changeCurrency={(event: any) => {
              form.setFieldValue(
                "prices.hour.currency",
                event.currentTarget.value,
              );
            }}
          />
        </Flex>
        <Flex>
          <CurrencyInput
            taxType={"minute"}
            price={form.values.prices.minute.price}
            currency={form.values.prices.minute.currency}
            changePrice={(event: any) => {
              form.setFieldValue(
                "prices.minute.price",
                event.currentTarget.value,
              );
            }}
            changeCurrency={(event: any) => {
              form.setFieldValue(
                "prices.minute.currency",
                event.currentTarget.value,
              );
            }}
          />
        </Flex>

        <Button type="submit">Enregistrer</Button>
      </form>
    </Container>
  );
};

export default AddCarForm;
