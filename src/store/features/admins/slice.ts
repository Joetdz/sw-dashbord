import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "./thunk";


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

export const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            return {
                ...state,
                isLoggedIn: action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: any, action: any) => {
                return {
                    ...state,
                    logging: "pending"
                }
            })
            .addCase(login.fulfilled, (state: any, action) => {
                return {
                    ...state,
                    logging: "succeeded",
                    loggedUser: action.payload
                }
            })
            .addCase(login.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    logging: "failed"
                }
            })

            // .addCase(createAccount.pending, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isCreating: true,
            //         hasError: false
            //     }
            // })

            // .addCase(createAccount.fulfilled, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isCreating: false,
            //         hasError: false,
            //         new: action.payload
            //     }
            // })

            // .addCase(createAccount.rejected, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isCreating: false,
            //         hasError: true
            //     }
            // })

            // .addCase(updateUser.pending, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isUpdating: true,
            //         hasError: false
            //     }
            // })
            // .addCase(updateUser.fulfilled, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isUpdating: false,
            //         hasError: false
            //     }
            // })
            // .addCase(updateUser.rejected, (state: any, action: any) => {
            //     return {
            //         ...state,
            //         isUpdating: false,
            //         hasError: true
            //     }
            // })

            // .addCase(getCompanyUsers.pending, (state: any, action) => {
            //     return {
            //         ...state,
            //         isLoading: true,
            //         hasError: false
            //     }
            // })
            // .addCase(getCompanyUsers.fulfilled, (state: any, action) => {
            //     return {
            //         ...state,
            //         isLoading: false,
            //         hasError: false,
            //         items: action.payload
            //     }
            // })
            // .addCase(getCompanyUsers.rejected, (state: any, action) => {
            //     return {
            //         ...state,
            //         isLoading: false,
            //         hasError: true,
            //     }
            // })
    }
})


export const { setAuth } = adminSlice.actions;


export default adminSlice;