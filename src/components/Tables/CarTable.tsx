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
} from "@mantine/core";
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
  model: string;
  prices: {
    km: {
      price: number;
      currency: string;
    };
    hour: {
      price: number;
      currency: string;
    };
    minute: {
      price: 1;
      currency: string;
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

export function TableSort({ data }: TableSortProps) {
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

  const rows = sortedData.map((row) => (
    <tr key={row.uid}>
      <td>
        <Link to={`/cars/${row.uid}`}>{row.model}</Link>
      </td>
      <td>
        {row.prices.km.price} {row.prices.km.currency}
      </td>
      <td>
        {row.prices.hour.price} {row.prices.hour.currency}
      </td>
      <td>
        {row.prices.minute.price} {row.prices.minute.currency}
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
              sorted={sortBy === "model"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("model")}>
              Modèle
            </Th>
            <Th
              sorted={sortBy === "prices"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("prices")}>
              Prix/km
            </Th>
            <Th
              sorted={sortBy === "prices"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("prices")}>
              Prix/heure
            </Th>
            <Th
              sorted={sortBy === "prices"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("prices")}>
              Prix/minute
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
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
