import { TripDataType } from "./types";

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