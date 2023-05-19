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
import { Link, useNavigate } from "react-router-dom";

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

  email: string;
  action: any;
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
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      (`${item[key]}` as string).toLowerCase().includes(query),
    ),
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return (`${b[sortBy]}` as string).localeCompare(
          `${a[sortBy]}` as string,
        );
      }
      return (`${a[sortBy]}` as string).localeCompare(`${b[sortBy]}` as string);
    }),
    payload.search,
  );
}

export function PassengersTable({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    );
  };

  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  const rows = sortedData.map((row) => (
    <tr key={row.uid}>
      <td>
        <Link to={`/passengers/${row.uid}`}>{row.name}</Link>
      </td>
      <td>
        <Link to={`/passengers/${row.uid}`}>{row.phone}</Link>
      </td>
      <td>{!row.email ? "---" : row.email}</td>
      <td>
        <Button
          onClick={() => {
            navigate(`/passengers/${row.uid}`, { replace: false });
          }}
          sx={{
            background: "#F31D1D",
            borderRadius: "25px",
            fontSize: ".8em",
          }}>
          Voir les détails
        </Button>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Rechercher ici"
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
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}>
              Email
            </Th>
            {/* <Th
              sorted={sortBy === "address"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("address")}>
              Adresse
            </Th> */}

            <Th
              sorted={sortBy === "action"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("action")}>
              Actions utilisateurs
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
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
    </ScrollArea>
  );
}
