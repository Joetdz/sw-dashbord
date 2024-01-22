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
    CopyButton, ActionIcon, Tooltip,
    Select,
    Flex
} from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useDispatch } from "react-redux";
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
import { WalletHistory, DriverWallet, DriverWallets, TransactionType } from "../../lib/types";
import TableHeader from "./TableHeader";

const ROWS_PER_PAGE = 10;

interface WalletTableProps {
    data: DriverWallets;
}

function filterWallet(wallet: string, history: WalletHistory[], type: TransactionType, selectedDate: Date | null) {
    const filteredHistory = history.filter((transaction) => {
        const isCurrencyMatch = wallet ? wallet.toLowerCase() === transaction.type.toLowerCase() : true;
        const isTypeMatch = type ? type.toLowerCase() === transaction.type.toLowerCase() : true;
        const isDateMatch = selectedDate ? selectedDate.toDateString() === transaction.createdAt._seconds.toDateString() : true;
        return isCurrencyMatch && isTypeMatch && isDateMatch;
    });

    return {
        history: filteredHistory,
    };
}

function filterWalletHistory(history: WalletHistory[], type: string): WalletHistory[] {
    return history && history.filter((transaction) => {
        const isTypeMatch = type && type.toLowerCase() === transaction.type.toLowerCase();
        //const isDateMatch = selectedDate ? selectedDate.toDateString() === transaction.createdAt.toDateString() : true;
        return isTypeMatch
        //|| isDateMatch;
    });
}

function filterWalletData(wallet: string, amount: number, history: WalletHistory[], type: string) {
    return wallet === "cdf" ?
        {
            amount: amount,
            history: filterWalletHistory(history, type),
        }
        : {
            amount: amount,
            history: filterWalletHistory(history, type),
        }

};


const WalletHistoryTable = ({ data }: WalletTableProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [walletFilterTerm, setWalletFilterTerm] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [sortedData, setSortedData] = useState<WalletHistory[]>();
    const [sortBy, setSortBy] = useState<keyof WalletHistory | null>(null);
    // const [sortBy, setSortBy] = useState<'timeStamps.command' | null>('timeStamps.command');
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const filterAndSortData = useCallback(
        (data: WalletHistory[], wallet: string, type: any, selectedDate: Date | null) => {
            let filteredData = filterWalletData(wallet, 0, data, type);

            return filteredData;
        },
        []
    );

    //const setSorting = (field: keyof DriverWallet | null) => {
    //    setSortedData(filterAndSortData(data,  walletFilterTerm, type, selectedDate));
    //};

    const handleSearchChange = () => {
        //setSortedData(filterWalletData(wallet, , data.cdf.history, type, selectedDate););
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // Update the sorted data when filters change
        //setSortedData(filterAndSortData(data, currencyFilter, typeFilter, selectedDate));
    }, [data, typeFilter, selectedDate, filterAndSortData]);


    const filteredData = filterWalletData(walletFilterTerm, walletFilterTerm === "cdf" ? data && data.cdf.amount : data && data.usd.amount, walletFilterTerm === "cdf" ? data && data.cdf.history : data && data.usd.history, typeFilter);

    const rows = data && filteredData.history.map((row, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {row.amount}
            </td>
            <td>
                {row.type}
            </td>
            <td>
                <span>
                    {new Date(row.createdAt._seconds * 1000).toLocaleString()}
                </span>
            </td>
        </tr>
    ));

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const paginatedRows = rows.slice(startIndex, endIndex);

    return (
        <>
            <Flex direction="row" gap={15}>
                <Select
                    searchable
                    searchValue={walletFilterTerm}
                    onSearchChange={setWalletFilterTerm}
                    onChange={(option: string) => {
                        setWalletFilterTerm(option)
                    }}
                    data={["usd", "cdf"]}
                    defaultValue="cdf"
                    label="Devise ou Compte"
                />
                <Select
                    searchable
                    searchValue={typeFilter}
                    onSearchChange={setTypeFilter}
                    onChange={(option: string) => {
                        setTypeFilter(option)
                    }}
                    data={["credit", "debit"]}
                    defaultValue="credit"
                    label="Type d'opération"
                />
            </Flex>
            <ScrollArea>
                <Table
                    horizontalSpacing="md"
                    verticalSpacing="xs"
                    miw={800}
                    sx={{ tableLayout: "fixed", width: "" }}>
                    <thead>
                        <tr>
                            <TableHeader
                                sorted={sortBy === "amount"}
                                reversed={reverseSortDirection}
                                onSort={() => console.log("amount")}>
                                #
                            </TableHeader>
                            <TableHeader
                                sorted={sortBy === "amount"}
                                reversed={reverseSortDirection}
                                onSort={() => console.log("amount")}>
                                Montant
                            </TableHeader>
                            <TableHeader
                                sorted={sortBy === "type"}
                                reversed={reverseSortDirection}
                                onSort={() => console.log("type")}>
                                Type d'opération
                            </TableHeader>
                            <TableHeader
                                sorted={sortBy === "createdAt"}
                                reversed={reverseSortDirection}
                                onSort={() => console.log("createdAt")}>
                                Date
                            </TableHeader>
                        </tr>
                    </thead>
                    <tbody>

                        {paginatedRows.length > 0 ? (
                            paginatedRows
                        ) : (
                            <tr>
                                <td
                                // colSpan={Object.keys(filteredData.history && filteredData.history[0]).length}
                                >
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
    )
}

export default WalletHistoryTable