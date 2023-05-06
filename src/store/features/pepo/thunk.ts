import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getPepoCars = createAsyncThunk("pepo/getPepoCars", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}pepo-cars`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
