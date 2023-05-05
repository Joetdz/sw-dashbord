import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCars, addNewCar } from "./thunk";



interface UsersState {
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
    isLoading: false
} as UsersState;

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
    }

})
export default carSlice