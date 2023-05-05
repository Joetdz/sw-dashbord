import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admins/slice";
import carSlice from "./features/cars/slice";


export const store = configureStore({
    reducer: {
        admin: adminSlice.reducer,
        cars: carSlice.reducer
    }
})