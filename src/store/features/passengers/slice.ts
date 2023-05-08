import { createSlice, } from "@reduxjs/toolkit";
import { getPassengers } from "./thunk";



interface DriverState {
    isLoggedIn: boolean
    isCreating: boolean,
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    items: string[],
    singleDriverDetails: string,
    isActiving: boolean,
    isDeactivating: boolean,
}

const initialState = {
    isLoggedIn: false,
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleDriverDetails: "",
    isActiving: false,
    isDeactivating: false
} as DriverState;


export const passengerSlice = createSlice({
    name: "passengers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPassengers.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })

            .addCase(getPassengers.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })
            .addCase(getPassengers.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })
    }

})
export default passengerSlice