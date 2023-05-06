import { createSlice } from "@reduxjs/toolkit";
import { getPepoCars } from "./thunk";



interface PepoCarState {

    isCreating: boolean,

    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,

    items: string[],
    singleCarDetails: string
}



const initialState = {
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleCarDetails: ""
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


    }

})
export default pepoSlice