import { createSlice } from "@reduxjs/toolkit";
import { getPepoCars, getSinglePepoCar, updatePepoCar, addPepoCar } from "./thunk";



interface PepoCarState {
    isCreating: boolean,
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    items: string[],
    singlePepoCarDetails: string
}



const initialState = {
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singlePepoCarDetails: ""
} as PepoCarState;

export const pepoSlice = createSlice({
    name: "pepo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getPepoCars.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false,
                }
            })

            .addCase(getPepoCars.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })

            .addCase(getPepoCars.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })

            .addCase(getSinglePepoCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                }
            })

            .addCase(getSinglePepoCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    singlePepoCarDetails: action.payload
                }
            })

            .addCase(getSinglePepoCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })

            .addCase(updatePepoCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false,
                }
            })
            .addCase(updatePepoCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false,
                }
            })
            .addCase(updatePepoCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true,
                }
            })

            .addCase(addPepoCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isCreating: true,
                    hasError: false,
                }
            })

            .addCase(addPepoCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: false,
                }
            })

            .addCase(addPepoCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: true,
                }
            })
    }

})
export default pepoSlice