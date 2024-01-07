import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Group, Button, Loader, Text } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import { PassengersTable } from "../components/Tables/PassengersTable";
import { TripsTable } from "../components/Tables/TripsTable";

import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { NavbarSimple } from "../components/SideBar";
import { getPassengers } from "../store/features/passengers/thunk";
import { getTrips } from "../store/features/trips/thunk";
import { DataTable } from "mantine-datatable";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const PAGE_SIZES = [10, 15, 20];

const TripsPage = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
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
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);


  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  const trips = useSelector((state: any) => state.trips);

  const [records, setRecords] = useState(trips.items.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(trips.items.slice(from, to));
  }, [page, pageSize]);

  const navigate = useNavigate();




  return (
    <div style={{ display: "flex" }}>
      {windowSize[0] <= 700 ? <Header /> : <NavbarSimple />}
      <PageLayoutTemplate>
        {trips.isLoading ? (
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
            {trips.items.length <= 0 ? (
              <Text>Une erreur s'est produite lors de la requête</Text>
            ) : (

              <Flex direction="column"
                sx={{
                  width: "100%",
                  left: "300px",
                  margin: "1em auto",
                  height: "100%",
                }}>
                <Flex>
                  <Group position="center">
                    <Button

                      onClick={(event) => {
                        event.preventDefault();
                        navigate(`/trips/new-trip`, { replace: false });
                      }}

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
                      Créer une course instantané
                    </Button>
                  </Group>
                </Flex>
                <TripsTable data={trips.items} />

              </Flex>

              // <DataTable
              //   withBorder
              //   records={records}
              //   columns={[
              //     {
              //       accessor: "locations.from.name",
              //       width: 100,
              //       title: "Lieu de depart",
              //     },
              //     {
              //       accessor: "locations.to.name",
              //       width: 100,
              //       title: "Lieu de destination",
              //     },
              //     { accessor: "passenger.name", width: 100, title: "Passager" },
              //     { accessor: "driver.name", width: 100, title: "Chauffeur" },
              //     { accessor: "car.model", width: 100, title: "Voiture" },
              //   ]}
              //   totalRecords={trips.items.length}
              //   paginationColor="grape"
              //   recordsPerPage={pageSize}
              //   page={page}
              //   onPageChange={(p) => setPage(p)}
              //   recordsPerPageOptions={PAGE_SIZES}
              //   onRecordsPerPageChange={setPageSize}
              // />
            )}
          </Flex>
        )}
      </PageLayoutTemplate>
    </div>
  );
};

export default TripsPage;
