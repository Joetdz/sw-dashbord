import { useState, useEffect, useCallback } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Button,
  CopyButton, ActionIcon, Tooltip
} from "@mantine/core";
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useDispatch } from "react-redux";
import {
  activateDriver,
  getDrivers,
  deactivateDriver,
} from "../../store/features/drivers/thunk";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  //IconSearch,
  IconLink,
  IconCheck
} from "@tabler/icons-react";
//import { Link } from "react-router-dom";
import { TripDataType } from "../../lib/types";


const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    whiteSpace: 'nowrap',

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));


interface TableSortProps {
  data: TripDataType[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: TripDataType[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      (`${item[key]}` as string).toLowerCase().includes(query),
    ),
  );
}


const ROWS_PER_PAGE = 10;

export function TripsTable({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof TripDataType | null>(null);
  // const [sortBy, setSortBy] = useState<'timeStamps.command' | null>('timeStamps.command');
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<Date | null | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(1);


  function filterByDate(data: TripDataType[], selectedDateRange: Date | null | undefined): TripDataType[] {
    if (!selectedDateRange) {
      return data;
    }

    return data.filter((item) => {
      const timestamp = new Date(item.timeStamps.command._seconds * 1000);
      return timestamp.toDateString() === selectedDateRange.toDateString();
    });
  }



  const sortData = useCallback(
    (data: TripDataType[], payload: { sortBy: keyof TripDataType | null; reversed: boolean; selectedDateRange: Date | null | undefined }) => {
      const { sortBy, selectedDateRange } = payload;

      let filteredData = filterByDate(data, selectedDateRange);

      if (!sortBy) {
        return filteredData;
      }

      if (!selectedDateRange) {
        return data.slice().sort((a, b) => a.timeStamps.command._seconds - b.timeStamps.command._seconds);
      }

      return filteredData.sort((a, b) => {
        if (payload.reversed) {
          return (`${b[sortBy]}` as string).localeCompare(`${a[sortBy]}` as string);
        }
        return a.timeStamps.command._seconds - b.timeStamps.command._seconds;
      });
    },
    []
  );


  const setSorting = (field: keyof TripDataType | null) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);

    if (field === 'timeStamps') {
      setSortedData(sortData(data, { sortBy: 'timeStamps', reversed, selectedDateRange }));
    } else {
      setSortedData(sortData(data, { sortBy: field, reversed, selectedDateRange }));
    }
    setSortedData(sortData(data, { sortBy: field, reversed, selectedDateRange }));
  };

  const handleSearchChange = (selectedDateRange: Date | null | undefined) => {

    setSortedData(
      sortData(data, { sortBy: 'timeStamps', reversed: reverseSortDirection, selectedDateRange }),
    );

    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    // Update the sorted data when selectedDateRange changes
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, selectedDateRange }));
  }, [data, sortBy, reverseSortDirection, selectedDateRange, sortData]);
  const rows = sortedData.map((row) => (
    <tr key={row.uid}>
      <td>
        {row.locations.from.name}
      </td>
      <td>
        {row.locations.to.name}
      </td>
      <td>
        <span>
          {new Date(row.timeStamps.command._seconds * 1000).toLocaleString()}
        </span>
      </td>
      <td>
        <span style={{ color: "#F31D1D" }}>{row.canceled && "Annulée"}</span>

        <span style={{ color: "#0C3966" }}>
          {row.timeStamps.command &&
            !row.timeStamps.assignedToADriver &&
            !row.canceled &&
            !row.timeStamps.end &&
            "En attente"}
        </span>
        <span style={{ color: "#F55D2C" }}>
          {row.timeStamps.command &&
            row.timeStamps.assignedToADriver &&
            !row.canceled &&
            !row.timeStamps.end &&
            "En cours"}
        </span>
        <span style={{ color: "green" }}>
          {row.timeStamps.command &&
            row.timeStamps.assignedToADriver &&
            !row.canceled &&
            row.timeStamps.end &&
            "Terminée"}
        </span>
      </td>
      <td>
        {row.passenger && row.passenger.name}
      </td>
      <td>
        {row.driver && row.driver.name}
      </td>
      <td>
        {row.car && row.car.model}
      </td>
      <td>{row.pepo ? "Pepo" : "Express"}</td>
      <td><CopyButton value={`${process.env.REACT_APP_CHRONO_DOMAIN}/trips/${row.uid}`} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copié' : 'Copier'} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
              {copied ? (
                <IconCheck style={{ width: rem(16) }} />
              ) : (
                <IconLink style={{ width: rem(16) }} />
              )}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton></td>
    </tr>
  ));

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <>
      <DatePickerInput
        label="Sélectionnez une date"
        placeholder="Sélectionnez une date"
        value={selectedDateRange}
        onChange={(event: any) => {
          setSelectedDateRange(event)
          handleSearchChange(event)
        }}
        allowDeselect
        valueFormat="DD/MM/YYYY"
        defaultValue={new Date()}
        defaultDate={new Date()}

      />
      <ScrollArea>


        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={1400}
          sx={{ tableLayout: "fixed", width: "" }}>
          <thead>
            <tr>
              <Th
                sorted={sortBy === "locations"}
                //sorted={sortBy === 'timeStamps.command'}
                reversed={reverseSortDirection}
                onSort={() => setSorting("locations")}>
                Départ
              </Th>
              <Th
                sorted={sortBy === "locations"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("locations")}>
                Destination
              </Th>
              <Th
                sorted={sortBy === "timeStamps"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("timeStamps")}>
                Date
              </Th>
              <Th
                sorted={sortBy === "timeStamps"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("timeStamps")}>
                Etat de la course
              </Th>
              <Th
                sorted={sortBy === "passenger"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("passenger")}>
                Passager
              </Th>
              <Th
                sorted={sortBy === "driver"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("driver")}>
                Chauffeur
              </Th>

              <Th
                sorted={sortBy === "car"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("car")}>
                Véhicule utilisé
              </Th>

              <Th
                sorted={sortBy === "action"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("action")}>
                Type de course
              </Th>
              <Th
                sorted={sortBy === "action"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("action")}>
                Lien de la course
              </Th>
            </tr>
          </thead>
          <tbody>

            {paginatedRows.length > 0 ? (
              paginatedRows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Aucun résultat trouvé
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Group position="left">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
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
            Page précédente
          </Button>
          <span>{`Page ${currentPage}`}</span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= rows.length}
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
            Page suivante
          </Button>
        </Group>
      </ScrollArea>
    </>
  );
}
