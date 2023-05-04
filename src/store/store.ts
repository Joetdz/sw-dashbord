import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admins/slice";


export const store = configureStore({
    reducer: {
        admin: adminSlice.reducer
    }
})