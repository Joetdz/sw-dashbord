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
  TextInput,
} from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { getSettings, updateSettings } from "../store/features/settings/thunk";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { log } from "console";

const SettingsPage = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch<any>();
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

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const settings = useSelector((state: any) => state.settings);

  const [value, setValue] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [editSettings, setEditSettings] = useState<{ taxType: boolean, deductablePercentage: boolean }>({
    taxType: false, deductablePercentage: false
  })

  const handleChange = () => {
    return !checked ? setValue("minute") : setValue("hour");
  };

  const form = useForm({
    initialValues: {
      taxType: settings.items.taxType,
      deductablePercentage: settings.items.deductablePercentage
    },
  });

  console.log(settings.items)

  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}
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
            sx={{ width: "100%", margin: "1em auto", height: "100%" }}>
            {!editSettings.taxType ? (
              <>
                <Text>
                  Course taxée par :{" "}
                  {settings.items.taxType === "hour" && "Heure"}
                  {settings.items.taxType === "minute" && "Minute"}
                  {settings.items.taxType === "km" && "KM"}
                </Text>
                <Button
                  onClick={() => setEditSettings({
                    taxType: true,
                    deductablePercentage: false
                  })}
                  sx={[
                    {
                      background: "#0C3966",
                      borderRadius: "25px",
                      marginBottom: "20px",
                      width: "50%",
                    },
                    {
                      "&:hover": {
                        background: "#01101E",
                      },
                    },
                  ]}>
                  Modifier
                </Button>
              </>
            ) : (
              <form
                onSubmit={form.onSubmit(async () => {
                  await toast.promise(
                    dispatch(updateSettings({
                      taxType: form.values.taxType,
                      deductablePercentage: settings.items.deductablePercentage
                    })),
                    {
                      pending: "Modification de la tarification en cours",
                      success:
                        "Modification de la tarification réussie avec succès",
                      error:
                        "Une erreur s'est produite lors de la modification",
                    },
                  );
                  window.location.reload();
                })}>
                <NativeSelect
                  label="Modifier la tarification : "
                  placeholder="Sélectionner le type"
                  data={[
                    { value: "--", label: "--" },
                    { value: "minute", label: "Minute" },
                    { value: "km", label: "KM" },
                    { value: "hour", label: "Heure" },
                  ]}
                  onChange={
                    (event) => {
                      form.setFieldValue("taxType", event.currentTarget.value)
                    }
                  }
                />

                <Flex direction="row" sx={{ margin: "2em 0" }}>
                  <Button
                    onClick={() => setEditSettings({
                      taxType: false,
                      deductablePercentage: false
                    })}
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
                      { background: "#0C3966", borderRadius: "25px", width: "auto" },
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
            )}

            {!editSettings.deductablePercentage ? (
              <>
                <Text>
                  Pourcentage déduit {": "}
                  {settings.items.deductablePercentage} %
                </Text>
                <Button
                  onClick={() => setEditSettings({
                    taxType: false,
                    deductablePercentage: true
                  })}
                  sx={[
                    {
                      background: "#0C3966",
                      borderRadius: "25px",
                      marginBottom: "20px",
                      width: "50%",
                    },
                    {
                      "&:hover": {
                        background: "#01101E",
                      },
                    },
                  ]}>
                  Modifier
                </Button>
              </>
            ) : (
              <form
                onSubmit={form.onSubmit(async () => {

                  await toast.promise(
                    dispatch(updateSettings({
                      taxType: settings.items.taxType,
                      deductablePercentage: +form.values.deductablePercentage
                    })),
                    {
                      pending: "Modification du pourcentage déduit",
                      success:
                        "Modification du pourcentage déduit réussie avec succès",
                      error:
                        "Une erreur s'est produite lors de la modification",
                    },
                  );
                  window.location.reload();

                })}>
                <TextInput
                  label="Modifier le pourcentage déduit : "
                  placeholder="Modifier le pourcentage déduit : "
                  type="number"
                  onChange={
                    (event) => {
                      form.setFieldValue("deductablePercentage", event.currentTarget.value)
                    }
                  }
                />
                <Flex direction="row" sx={{ margin: "2em 0" }}>
                  <Button
                    onClick={() => setEditSettings({
                      taxType: false,
                      deductablePercentage: false
                    })}
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
                      { background: "#0C3966", borderRadius: "25px", width: "auto" },
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
            )}
            <ToastContainer />
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SettingsPage;
