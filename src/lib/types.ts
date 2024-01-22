export interface TripDataType {
    uid: string;

    pepo: boolean;
    canceled: boolean;
    email: string;
    action: any;
    car: {
        uid: string;
        model: string;
    };
    passenger: {
        uid: string;
        phone: number;
        name: string;
    };
    driver: {
        uid: string;
        phone: number;
        name: string;
    };

    taxType: string;
    locations: {
        distance: number;
        from: {
            latitude: number;
            name: string;
            alias: null;
            longitude: number;
        };
        to: {
            latitude: number;
            name: string;
            alias: null;
            longitude: number;
        };
    };
    timeStamps: {
        command: {
            _seconds: any;
        };

        assignedToADriver: Date;
        passengerFound: Date;
        end: Date;
    };
}
export interface DriverWalletDto {
    amount: number,
    currency: string;
}

export interface WalletHistory {
    amount: number,
    type: string,
    createdAt: {
        _seconds: any,
    },
    tripUid: string
}

export interface DriverWallet {
    amount: number,
    history: WalletHistory[];
}

export enum TransactionType {
    debit = "debit",
    credit = "credit",
}

export interface DriverWallets {
    usd: DriverWallet,
    cdf: DriverWallet
}


export interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

export interface SettingsContentType {
    taxType: string,
    deductablePercentage: number

}