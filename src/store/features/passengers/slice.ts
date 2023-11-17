import { createSlice } from "@reduxjs/toolkit";
import {
  getPassengers,
  getSinglePassenger,
  editPassengerPassword,
} from "./thunk";

interface PassengerState {
  isLoggedIn: boolean;
  isCreating: boolean;
  hasError: boolean;
  isUpdating: boolean;
  new: string;
  isLoading: boolean;
  items: string[];
  singlePassengerDetails: string;
  isActiving: boolean;
  isDeactivating: boolean;
}

const initialState = {
  isLoggedIn: false,
  isCreating: false,
  hasError: false,
  isUpdating: false,
  new: "",
  items: [],
  isLoading: false,
  singlePassengerDetails: "",
  isActiving: false,
  isDeactivating: false,
} as PassengerState;

export const passengerSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPassengers.pending, (state: any, action) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })

      .addCase(getPassengers.fulfilled, (state: any, action) => {
        return {
          ...state,
          isLoading: false,
          hasError: false,
          items: action.payload,
        };
      })
      .addCase(getPassengers.rejected, (state: any, action) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      })

      .addCase(getSinglePassenger.pending, (state: any, action) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })

      .addCase(getSinglePassenger.fulfilled, (state: any, action) => {
        return {
          ...state,
          isLoading: false,
          hasError: false,
          singlePassengerDetails: action.payload,
        };
      })

      .addCase(getSinglePassenger.rejected, (state: any, action) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      })

      .addCase(editPassengerPassword.pending, (state: any, action) => {
        return {
          ...state,
          isUpdating: true,
          hasError: false,
        };
      })

      .addCase(editPassengerPassword.fulfilled, (state: any, action) => {
        return {
          ...state,
          isUpdating: false,
          hasError: false,
        };
      })

      .addCase(editPassengerPassword.rejected, (state: any, action) => {
        return {
          ...state,
          isUpdating: false,
          hasError: true,
        };
      });
  },
});
export default passengerSlice;
