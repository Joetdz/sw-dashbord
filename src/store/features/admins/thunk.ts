/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk("admin/login", async (content: { email: string, password: string }) => {
    return axios({
        method: "POST",
        data: {
            email: content.email,
            password: content.password
        },
        url: `${process.env.REACT_APP_API_URL}auth/login`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            response.data.user
            localStorage.setItem("gari", response.data.token)
            localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
        })

        .catch((error) => error.status)
})


export const getUsers = createAsyncThunk("admin/getUsers", async () => {
    return axios({
        method: "GET",

        url: `${process.env.REACT_APP_API_URL}admins`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) =>
            response.data
        )

        .catch((error) => error.status)
})



export const createAccount = createAsyncThunk("admin/createAccount", async (content: { firstName: string, lastName: string, email: string, password: string, key: string }) => {
    return axios({
        method: "POST",
        data: {
            firstName: content.firstName,
            lastName: content.lastName,
            email: content.email,
            password: content.password,
            key: content.key
        },
        url: `${process.env.REACT_APP_API_URL}admins`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.data)

})


export const getOneUser = createAsyncThunk("admin/getOneUser", async (id: string | undefined) => {
    return axios({
        method: "GET",

        url: `${process.env.REACT_APP_API_URL}admins/${id}`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) =>
            response.data
        )
        .catch((error) => error.status)
})



export const updateUser = createAsyncThunk("user/updateUser", async (params: { id: string | undefined, content: any }) => {
    return axios({
        method: "PATCH",
        data: params.content,
        url: `${process.env.REACT_APP_API_URL}admins/${params.id}`,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.data)
})



// export const getCompanyUsers = createAsyncThunk("user/getCompanyUsers", async (company: string) => {
//     return axios({
//         method: "GET",
//         url: `${process.env.REACT_APP_API_URL}/user/${company}`,
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then((response) => response.data)
// })