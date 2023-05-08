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
export const getSinglePepoCar = createAsyncThunk("pepo/getSinglePepoCar", async (id: string | undefined) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}pepo-cars/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})
export const updatePepoCar = createAsyncThunk("pepo/updatePepoCar", async (params: { id: string | undefined, content: any }) => {
    return axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}pepo-cars/${params.id}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: params.content
    }).then((response) => response.data)
})
export const addPepoCar = createAsyncThunk("pepo/addPepoCar", async (content: { model: string, price: number, currency: string }) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}pepo-cars/`,
        headers: {
            "Content-Type": "application/json",
        },
        data: content
    }).then((response) => response.data)
})
