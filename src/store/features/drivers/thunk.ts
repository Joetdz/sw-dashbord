import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getDrivers = createAsyncThunk("drivers/getDrivers", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}drivers`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})

