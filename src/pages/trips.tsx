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

const PAGE_SIZES = [10, 15, 20];

const TripsPage = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

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



  console.log(trips.items.filter((trips: any) => trips.pepo));

  
  
   

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />
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
              <TripsTable data={trips.items} />

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
