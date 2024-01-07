import { createSlice } from "@reduxjs/toolkit";
import { getTrips, createTrip } from "./thunk";



interface TripState {
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    isSaving: boolean,
    items: string[],
    singleSettingDetails: string;
    center: {
        latitude: number;
        longitude: number;
    }
    uid: string;
}



const initialState = {
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    isSaving: false,
    singleSettingDetails: "",
    center: {
        latitude: 0,
        longitude: 0
    },
    uid: "",

} as TripState;

export const tripSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
        setLocation(state, action) {
            void (state.center = action.payload)
        },
    },
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

            .addCase(createTrip.pending, (state: any, action) => {
                return {
                    ...state,
                    isSaving: true,
                    hasError: false,
                }
            })

            .addCase(createTrip.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isSaving: false,
                    hasError: false,
                    new: action.payload
                }
            })

            .addCase(createTrip.rejected, (state: any, action) => {
                return {
                    ...state,
                    isSaving: false,
                    hasError: true
                }
            })
    }

})


export const { setLocation } = tripSlice.actions;

export default tripSlice