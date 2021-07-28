import { requirePropFactory } from '@material-ui/core';
import axios from 'axios';

export const apiURL = "http://localhost:8080";
const Axios = axios.create({
    baseURL: apiURL,
    responseType: "json",
    // withCredentials: true
})

Axios.interceptors.request.use(
    req => {
        const token = localStorage.getItem('token')
        req.headers.authorization = `Bearer ${token}`

        return req
    }
)

// Axios.interceptors.response.use(
//     res => res,
//     (async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && originalRequest && !originalRequest._isReady) {
//             originalRequest._isReady = true;
//             try {
//                 const responce = await axios.post(`${apiURL}/auth/refresh`)//, {withCredentials: true})
//                 console.log(`INTERCEPTORS: responce:`)
//                 console.log(responce)
//                 localStorage.setItem('token', responce.data.accessToken)
//                 return Axios.request(originalRequest)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         throw error
//     })
// )

export default Axios;

