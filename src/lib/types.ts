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

export interface DriverWallet {
    amount: number,
    currency: string;
}