import { useState } from "react";
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
} from "@mantine/core";
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
  IconSearch,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

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

interface RowData {
  uid: string;
  name: string;
  password: string;
  phone: string;
  gender: string;
  active: boolean;
  car: {
    model: string;
    plaque: string;
    isSelfOwner: true;
    images: [string];
    owner: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

interface TableSortProps {
  data: RowData[];
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
          {/* <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center> */}
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  //   return data.filter((item) =>
  //     keys(data[0]).some((key) => item.key.toLowerCase().includes(query)),
  //   );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  //   return filterData(
  //     [...data].sort((a, b) => {
  //       if (payload.reversed) {
  //         return b[sortBy].localeCompare(a[sortBy]);
  //       }

  //       return a[sortBy].localeCompare(b[sortBy]);
  //     }),
  //     payload.search,
  //   );
}

export function DriverTable({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    // setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // setSortedData(
    //   sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    // );
  };

  const dispatch = useDispatch<any>();

  const rows = sortedData.map((row) => (
    <tr key={row.uid}>
      <td>
        <Link to={`/drivers/${row.uid}`}>{row.name}</Link>
      </td>
      <td>
        <Link to={`/drivers/${row.uid}`}>{row.phone}</Link>
      </td>
      <td>
        <Link to={`/drivers/${row.uid}`}>{row.car && row.car.model}</Link>
      </td>
      <td>
        {row.active ? (
          <Text color="green">Compte activé</Text>
        ) : (
          <Text color="red">Compte désactivé</Text>
        )}
      </td>
      <td>
        {row.active ? (
          <Button
            onClick={async () => {
              await dispatch(deactivateDriver(row.uid));
              await dispatch(getDrivers());
            }}>
            Désactiver
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await dispatch(activateDriver(row.uid));
              await dispatch(getDrivers());
            }}>
            Activer
          </Button>
        )}
      </td>
    </tr>
  ));

  console.log(data);

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}>
              Nom
            </Th>
            <Th
              sorted={sortBy === "phone"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("phone")}>
              Numéro de téléphone
            </Th>
            <Th
              sorted={sortBy === "car"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("car")}>
              Véhicule utilisé
            </Th>
            <Th
              sorted={sortBy === "active"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("active")}>
              Etat du compte
            </Th>
            <Th
              sorted={sortBy === "active"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("active")}>
              Actions utilisateurs
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows}
          {/* {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )} */}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
