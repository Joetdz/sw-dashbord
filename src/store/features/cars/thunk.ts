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


type Content = {
    model: string,
    prices: {
        km: {
            price: number,
            currency: string
        },
        hour: {
            price: number,
            currency: string
        },
        minute: {
            price: number,
            currency: string
        }
    }
}


export const addNewCar = createAsyncThunk("cars/addNewCar", async (content: Content) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}cars`,

        headers: {
            "Content-Type": "application/json",
        },
        data: content
    }).then((response) => response.data)
})


export const getSingleCar = createAsyncThunk("cars/getSingleCar", async (id: string | undefined) => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}cars/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})