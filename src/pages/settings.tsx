import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { NavbarSimple } from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader,
  Flex,
  Text,
  Switch,
  NativeSelect,
  Button,
  Select,
} from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getSettings, updateTaxType } from "../store/features/settings/thunk";

const SettingsPage = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const settings = useSelector((state: any) => state.settings);

  const [value, setValue] = useState<string>("");

  const handleChange = () => {
    return !checked ? setValue("minute") : setValue("hour");
  };

  const form = useForm({
    initialValues: {
      taxType: settings.items.taxType,
    },
  });

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
      <PageLayoutTemplate>
        {settings.isLoading ? (
          <Flex
            align="center"
            justify="center"
            sx={{ height: "100%", width: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{ width: "70%", margin: "1em auto", height: "100%" }}>
            <form
              onSubmit={form.onSubmit(() => {
                console.log(form.values.taxType);
              })}>
              <NativeSelect
                label="Course taxée par : "
                placeholder="Sélectionner le type"
                data={[
                  { value: "hour", label: "Heure" },
                  { value: "minute", label: "Minute" },
                ]}
                // value={form.values.taxType}
                // defaultValue={settings.items.taxType}
                onChange={(event) =>
                  form.setFieldValue("taxType", event.currentTarget.value)

                  // console.log(event.currentTarget.value)
                }
              />
              <Button type="submit">Change</Button>
            </form>
            {/* <Switch
              checked={checked}
              onLabel="Heure"
              offLabel="Minute"
              onChange={async (event) => {
                setChecked(event.currentTarget.checked);

                handleChange();

                await dispatch(updateTaxType(value));
                await dispatch(getSettings());
              }}
              size="xl"
            /> */}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SettingsPage;
