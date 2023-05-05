import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCars = createAsyncThunk("cars/getCars", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}cars`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})