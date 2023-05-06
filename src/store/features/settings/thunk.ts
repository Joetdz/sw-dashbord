import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSettings = createAsyncThunk("setting/getSettings", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}settings`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
