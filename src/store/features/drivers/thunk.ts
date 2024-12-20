import { createAsyncThunk } from "@reduxjs/toolkit";
import { DriverWalletDto } from "../../../lib/types";
import axios from "axios";

export const getDrivers = createAsyncThunk("drivers/getDrivers", async () => {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}users?type=drivers`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.data);
});
export const getSingleDriver = createAsyncThunk(
  "drivers/getSingleDriver",
  async (id: string | undefined) => {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}drivers/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);

export const activateDriver = createAsyncThunk(
  "drivers/activateDriver",
  async (id: string | undefined) => {
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}users/${id}/change-active-state`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        active: true,
      },
    }).then((response) => response.data);
  }
);
export const deactivateDriver = createAsyncThunk(
  "drivers/deactivateDriver",
  async (id: string | undefined) => {
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}users/${id}/change-active-state`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        active: false,
      },
    }).then((response) => response.data);
  }
);

export const editDriverPassword = createAsyncThunk(
  "drivers/editDriverPassword",
  async (params: { id: string | undefined; content: any }) => {
    return axios({
      method: "PUT",
      data: params.content,
      url: `${process.env.REACT_APP_API_URL}drivers/reset-password/${params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);

// Credit driver wallet
export const creditDriverWallet = createAsyncThunk(
  "drivers/creditDriverWallet",
  async (params: { id: string | undefined; content: DriverWalletDto }) => {
    return axios({
      method: "POST",
      data: params.content,
      url: `${process.env.REACT_APP_API_URL}drivers/${params.id}/credit-wallet`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);
