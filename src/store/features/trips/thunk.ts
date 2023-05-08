import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getTrips = createAsyncThunk("trips/getTrips", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}trips`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
