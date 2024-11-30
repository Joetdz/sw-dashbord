import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPassengers = createAsyncThunk(
  "passengers/getPassengers",
  async () => {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users?type=passengers`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);
export const getSinglePassenger = createAsyncThunk(
  "passengers/getSinglePassenger",
  async (id: string | undefined) => {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);

export const editPassengerPassword = createAsyncThunk(
  "passengers/editPassengerPassword",
  async (params: { id: string | undefined; content: any }) => {
    return axios({
      method: "PUT",
      data: params.content,
      url: `${process.env.REACT_APP_API_URL}users/reset-password/${params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  }
);
