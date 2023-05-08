import { createSlice } from "@reduxjs/toolkit";
import { getSettings, updateTaxType } from "./thunk";



interface SettingState {

    isCreating: boolean,

    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,

    items: string[],
    singleSettingDetails: string
}



const initialState = {
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleSettingDetails: ""
} as SettingState;

export const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getSettings.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false,
                }
            })

            .addCase(getSettings.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })

            .addCase(getSettings.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true
                }
            })


            .addCase(updateTaxType.pending, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false
                }
            })
            .addCase(updateTaxType.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false
                }
            })
            .addCase(updateTaxType.rejected, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true
                }
            })




    }

})
export default settingSlice