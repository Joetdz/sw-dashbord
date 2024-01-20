import { TripDataType } from "./types";
import { createStyles, rem } from "@mantine/core";

export const groupByDate = (data: TripDataType[]): Record<string, TripDataType[]> => {
    const latestDate = new Date(Math.max(...data.map((row) => row.timeStamps.command._seconds * 1000)));

    // Start grouping from the latest date
    return data.reduce((acc, row) => {
        const dateKey = new Date(row.timeStamps.command._seconds * 1000).toLocaleDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(row);
        return acc;
    }, {} as Record<string, TripDataType[]>);
}


export const useStyles = createStyles((theme) => ({
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