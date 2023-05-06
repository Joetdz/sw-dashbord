import React, { useEffect, useState } from "react";
import { NavbarSimple } from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Flex, Text, Switch } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getSettings } from "../store/features/settings/thunk";

const SettingsPage = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const settings = useSelector((state: any) => state.settings);

  const [value, setValue] = useState<any>(settings.items.taxType);

  const handleChange = () => {
    return !checked ? "minute" : "hour";
  };

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
            <Text>
              Course taxée par :
              {settings.items.taxType === "hour" ? "Heure" : "Minute"}
            </Text>
            <Switch
              checked={checked}
              onLabel="Heure"
              offLabel="Minute"
              onChange={(event) => {
                setChecked(event.currentTarget.checked);

                handleChange();
              }}
              size="xl"
            />
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SettingsPage;
