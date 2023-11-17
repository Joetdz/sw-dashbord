import { createSlice, } from "@reduxjs/toolkit";
import { getDrivers, activateDriver, deactivateDriver, getSingleDriver, editDriverPassword } from "./thunk";



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


export const driverSlice = createSlice({
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

            .addCase(activateDriver.pending, (state: any, action) => {
                return {
                    ...state,
                    isActiving: true,
                    hasError: false
                }
            })

            .addCase(activateDriver.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isActiving: false,
                    hasError: false
                }
            })

            .addCase(activateDriver.rejected, (state: any, action) => {
                return {
                    ...state,
                    isActiving: false,
                    hasError: true
                }
            })
            .addCase(deactivateDriver.pending, (state: any, action) => {
                return {
                    ...state,
                    isDeactivating: true,
                    hasError: false
                }
            })

            .addCase(deactivateDriver.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isDeactivating: false,
                    hasError: false
                }
            })


            .addCase(deactivateDriver.rejected, (state: any, action) => {
                return {
                    ...state,
                    isDeactivating: false,
                    hasError: false
                }
            })
        
            .addCase(getSingleDriver.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })
        
            .addCase(getSingleDriver.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    singleDriverDetails: action.payload

                }
            })
        
        
            .addCase(getSingleDriver.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true
                }
            })

            .addCase(editDriverPassword.pending, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false
                }
            })

            .addCase(editDriverPassword.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false
                }
            })

            .addCase(editDriverPassword.rejected, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true
                }
            })
    }


})
export default driverSlice