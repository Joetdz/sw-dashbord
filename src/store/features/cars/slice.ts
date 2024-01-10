import { createSlice } from "@reduxjs/toolkit";
import { getCars, addNewCar, getSingleCar, updateCar } from "./thunk";



interface CarState {
    loggedUser: string,
    user: string;
    logging: 'idle' | 'pending' | 'succeeded' | 'failed',
    isLoggedIn: boolean
    isCreating: boolean,
    hasError: boolean,
    isUpdating: boolean,
    new: string,
    isLoading: boolean,
    items: string[],
    singleCarDetails: string
}



const initialState = {
    logging: "idle",
    user: "",
    loggedUser: "",
    isLoggedIn: false,
    isCreating: false,
    hasError: false,
    isUpdating: false,
    new: "",
    items: [],
    isLoading: false,
    singleCarDetails: ""
} as CarState;

export const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCars.pending, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: true
                }
            })

            .addCase(getCars.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                    items: action.payload
                }
            })

            .addCase(getCars.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true
                }
            })

            .addCase(addNewCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isCreating: true,
                    hasError: false
                }
            })

            .addCase(addNewCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: false
                }
            })

            .addCase(addNewCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: true
                }
            })

            .addCase(getSingleCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })

            .addCase(getSingleCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    singleCarDetails: action.payload
                }
            })

            .addCase(getSingleCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })

            .addCase(updateCar.pending, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false,
                }
            })

            .addCase(updateCar.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false,
                }
            })
            .addCase(updateCar.rejected, (state: any, action) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true,
                }
            })


    }

})
export default carSlice