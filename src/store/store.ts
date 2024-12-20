import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admins/slice";
import carSlice from "./features/cars/slice";
import driverSlice from "./features/drivers/slice";
import pepoSlice from "./features/pepo/slice";
import settingSlice from "./features/settings/slice";
import tripSlice from "./features/trips/slice";
import passengerSlice from "./features/passengers/slice";


export const store = configureStore({
    reducer: {
        admin: adminSlice.reducer,
        cars: carSlice.reducer,
        drivers: driverSlice.reducer,
        pepo: pepoSlice.reducer,
        settings: settingSlice.reducer,
        trips: tripSlice.reducer,
        passengers: passengerSlice.reducer
    }
})