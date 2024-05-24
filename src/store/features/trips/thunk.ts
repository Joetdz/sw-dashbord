import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type Content = {
    passenger: {
        name: string,
        phone: string
    },
    locations: {
        from: {
            name: string,
            latitude: number,
            longitude: number,
        },
        to: {
            name: string,
            latitude: number,
            longitude: number,
        },
        distance: number
    },
    car: {
        model: string,
        uid: string
    },
    driver: {
        name: string,
        uid: string,
        phone: string
    }
    taxType: string,
}


export const getTrips = createAsyncThunk("trips/getTrips", async () => {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}trips`,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.data)
})


export const createTrip = createAsyncThunk("trips/createTrip", async (content: Content) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}trips`,
        headers: {
            "Content-Type": "application/json",
        },
        data: content
    }).then((response) => response.data)
})

type CancelDto = {
    uid: string,
    reason: string
}

export const cancelTrip = createAsyncThunk("trips/cancelTrip", async (content: CancelDto) => {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}trips/cancel`,
        headers: {
            "Content-Type": "application/json",
        },
        data: content
    }).then((response) => response.data)
})
