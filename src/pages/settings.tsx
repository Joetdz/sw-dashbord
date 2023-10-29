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
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

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
      {windowSize[0] <= 700 ? <Header /> : <NavbarSimple />}
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
            {!edit ? (
              <>
                <Text>
                  Course taxée par :{" "}
                  {settings.items.taxType === "hour" && "Heure"}
                  {settings.items.taxType === "minute" && "Minute"}
                  {settings.items.taxType === "km" && "KM"}
                </Text>
                <Button
                  onClick={() => setEdit(true)}
                  sx={[
                    {
                      background: "#0C3966",
                      borderRadius: "25px",
                      marginBottom: "20px",
                      width: "20%",
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
                    dispatch(updateTaxType(form.values.taxType)),
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
                    { value: "hour", label: "Heure" },
                    { value: "minute", label: "Minute" },
                    { value: "km", label: "KM" },
                  ]}
                  onChange={
                    (event) => {
                      console.log(event.currentTarget.value)
                      form.setFieldValue("taxType", event.currentTarget.value)
                    }
                  }
                />

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
            )}
            <ToastContainer />
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default SettingsPage;
