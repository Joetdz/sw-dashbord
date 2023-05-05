import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admins/slice";
import carSlice from "./features/cars/slice";
import driverSlice from "./features/drivers/slice";


export const store = configureStore({
    reducer: {
        admin: adminSlice.reducer,
        cars: carSlice.reducer,
        drivers: driverSlice.reducer
    }
})