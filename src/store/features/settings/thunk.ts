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


export const updateTaxType = createAsyncThunk("setting/updateTaxType", async (taxtType: string) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}settings/tax-type/`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            taxType: taxtType
        },
    }).then((response) => response.data)
})
