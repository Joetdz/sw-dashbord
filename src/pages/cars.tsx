import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { TableSort } from "../components/CarTable";
import { getCars } from "../store/features/cars/thunk";
import { Flex, Group, Button } from "@mantine/core";
import CarPopup from "../components/Popup/Car/CarPopUp";
import AddCarForm from "../components/Popup/Car/AddCarForm";

const CarsPage = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const cars = useSelector((state: any) => state.cars);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        {cars.isLoading ? (
          <Flex align="center" justify="center" sx={{ height: "100%" }}>
            <Loader />
          </Flex>
        ) : (
          <Flex
            direction="column"
            sx={{ width: "90%", margin: "1em auto", height: "100%" }}>
            <Flex>
              <Group position="center">
                <Button onClick={open}>Ajouter une voiture</Button>
              </Group>
            </Flex>
            <TableSort data={cars.items} />
          </Flex>
        )}
      </PageLayoutTemplate>

      <CarPopup
        title="Ajouter une voiture"
        content={<AddCarForm close={close} />}
        open={open}
        close={close}
        opened={opened}
      />
    </div>
  );
};

export default CarsPage;
