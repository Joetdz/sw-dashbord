import { createSlice } from "@reduxjs/toolkit";
import { getTrips } from "./thunk";



interface TripState {
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    items: string[],
    singleSettingDetails: string
}



const initialState = {
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleSettingDetails: ""
} as TripState;

export const tripSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTrips.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false,
                }
            })

            .addCase(getTrips.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })

            .addCase(getTrips.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true
                }
            })
    }

})
export default tripSlice