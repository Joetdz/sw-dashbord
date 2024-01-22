import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SettingsContentType } from "../../../lib/types";


export const getSettings = createAsyncThunk("setting/getSettings", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}settings`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})


export const updateSettings = createAsyncThunk("setting/updateTaxType", async (content: SettingsContentType) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}settings`,
        headers: {
            "Content-Type": "application/json",
        },
        data: content,
    }).then((response) => response.data)
})
