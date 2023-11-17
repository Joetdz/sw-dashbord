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
export const getSingleDriver = createAsyncThunk("drivers/getSingleDriver", async (id: string | undefined) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}drivers/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})



export const activateDriver = createAsyncThunk("drivers/activateDriver", async (id: string | undefined) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}drivers/activate/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
export const deactivateDriver = createAsyncThunk("drivers/deactivateDriver", async (id: string | undefined) => {
    return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}drivers/deactivate/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})

export const editDriverPassword = createAsyncThunk("drivers/editDriverPassword", async (params: { id: string | undefined, content: any }) => {
    return axios({
        method: "PUT",
        data: params.content,
        url: `${process.env.REACT_APP_API_URL}drivers/reset-password/${params.id}`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.data)
})
