import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getPassengers = createAsyncThunk("drivers/getPassengers", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}users`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
export const getSinglePassenger = createAsyncThunk("drivers/getSinglePassenger", async (id: string | undefined) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}users/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})

