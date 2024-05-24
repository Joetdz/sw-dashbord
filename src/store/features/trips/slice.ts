import { createSlice } from "@reduxjs/toolkit";
import { getTrips, createTrip, cancelTrip } from "./thunk";



interface TripState {
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    isSaving: boolean,
    items: string[],
    singleSettingDetails: string;
    locations: {
        from: {
            name: string,
            latitude: number,
            longitude: number,
        },
        to: {
            name: string,
            latitude: number,
            longitude: number,
        },
        distance: number
    },
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
    locations: {
        from: {
            name: "",
            latitude: 0,
            longitude: 0,
        },
        to: {
            name: "",
            latitude: 0,
            longitude: 0,
        },
        distance: 0
    },
    uid: "",

} as TripState;

export const tripSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
        setLocation(state, action) {
            void (state.locations = action.payload)
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

            .addCase(cancelTrip.pending, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false
                }
            })

            .addCase(cancelTrip.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false
                }
            })

            .addCase(cancelTrip.rejected, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true
                }
            })

    }

})


export const { setLocation } = tripSlice.actions;

export default tripSlice