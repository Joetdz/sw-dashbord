import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";

import { Loader, Text } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { TableSort } from "../components/Tables/CarTable";
import { getCars } from "../store/features/cars/thunk";
import { getUsers } from "../store/features/admins/thunk";
import { Flex, Group, Button } from "@mantine/core";
import CarPopup from "../components/Popup/Car/CarPopUp";

import { UsersTable } from "../components/Tables/UsersTable";
import AddAdminForm from "../components/Popup/Admin/AddAdminForm";

const UsersPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const admins = useSelector((state: any) => state.admin);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {admins.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100vh" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{
              width: "100%",
              margin: "1em auto",
              height: "100%",
            }}>
            <Flex>
              <Group position="center">
                <Button
                  onClick={open}
                  sx={[
                    {
                      background: "#0C3966",
                      borderRadius: "25px",
                      marginBottom: "20px",
                    },
                    {
                      "&:hover": {
                        background: "#01101E",
                      },
                    },
                  ]}>
                  Ajouter un utilisateur
                </Button>
              </Group>
            </Flex>

            {admins.items.length <= 0 ? (
              <Text>
                Une erreur s'est produite lors de la reque veuillez réessayer
              </Text>
            ) : (
              <UsersTable data={admins.items} />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>

      <CarPopup
        title="Ajouter un utilisateur"
        content={<AddAdminForm close={close} />}
        open={open}
        close={close}
        opened={opened}
      />
    </div>
  );
};

export default UsersPage;
