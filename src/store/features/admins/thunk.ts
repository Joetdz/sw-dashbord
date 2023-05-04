/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const loginUser = createAsyncThunk("user/loginUser", async (content: { name: string, password: string }) => {
//     return axios({
//         method: "POST",
//         data: {
//             name: content.name,
//             password: content.password
//         },
//         url: `${process.env.REACT_APP_API_URL}/auth/login`,
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then((response) => {
//             response.data.user
//             localStorage.setItem("trinity", response.data.token)
//             localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
//         })
// })
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
})



// export const createAccount = createAsyncThunk("user/createAccount", async (content: { name: string, email: string, password: string }) => {
//     return axios({
//         method: "POST",
//         data: {
//             name: content.name,
//             email: content.email,
//             password: content.password,
//         },
//         url: `${process.env.REACT_APP_API_URL}/user/signup`,
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then((response) => response.data)
// })

// export const updateUser = createAsyncThunk("user/updateUser", async (content: { id: string, company: string, rule: string }) => {
//     return axios({
//         method: "PATCH",
//         data: {
//             company: content.company,
//             rule: content.rule,
//         },
//         url: `${process.env.REACT_APP_API_URL}/user/update/${content.id}`,
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then((response) => response.data.article)
// })



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