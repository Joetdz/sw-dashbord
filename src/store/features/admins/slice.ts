import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, getUsers, createAccount, getOneUser, updateUser } from "./thunk";



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
    singleUserDetails: string
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
    singleUserDetails: ""
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
        setLogging: (state, action) => {
            return {
                ...state,
                logging: action.payload,
            };
        },
        setError(state, action: PayloadAction<boolean>) {
            return {
                ...state,
                hasError: action.payload
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
                    loggedUser: action.payload,

                }
            })
            .addCase(login.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    logging: "failed",
                    hasError: true
                }
            })

            .addCase(getUsers.pending, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })

            .addCase(getUsers.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    items: action.payload
                }
            })

            .addCase(getUsers.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true
                }
            })
            .addCase(createAccount.pending, (state: any, action: any) => {
                return {
                    ...state,
                    isCreating: true,
                    hasError: false
                }
            })

            .addCase(createAccount.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: false,
                    new: action.payload
                }
            })

            .addCase(createAccount.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    isCreating: false,
                    hasError: true
                }
            })

            .addCase(getOneUser.pending, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false
                }
            })

            .addCase(getOneUser.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: false,
                    singleUserDetails: action.payload
                }
            })

            .addCase(getOneUser.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                }
            })

            .addCase(updateUser.pending, (state: any, action: any) => {
                return {
                    ...state,
                    isUpdating: true,
                    hasError: false
                }
            })
            .addCase(updateUser.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: false
                }
            })
            .addCase(updateUser.rejected, (state: any, action: any) => {
                return {
                    ...state,
                    isUpdating: false,
                    hasError: true
                }
            })

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


export const { setAuth, setError, setLogging } = adminSlice.actions;


export default adminSlice;