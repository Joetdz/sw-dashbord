import { createSlice, } from "@reduxjs/toolkit";
import { getDrivers } from "./thunk";



interface DriverState {
    isLoggedIn: boolean
    isCreating: boolean,
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    items: string[],
    singleDriverDetails: string
}

const initialState = {
    isLoggedIn: false,
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleDriverDetails: ""
} as DriverState;


export const carSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getDrivers.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })

            .addCase(getDrivers.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })
            .addCase(getDrivers.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })
    }

})
export default carSlice