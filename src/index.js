import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import Store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const API_URL = "http://localhost:5000/api/v1"

export const linkNoUnderlineStyle = {
    textDecoration: "none"
}

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const store = new Store()

export const Context = createContext({
    store
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401) {
        try {
            const response = await axios.get(API_URL + "/token/refresh", {
                withCredentials: true,
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("refreshToken")}`
                }
            });
            localStorage.setItem("accessToken", response.data.access_token)
            return api.request(originalRequest)
        } catch (e){
            console.log(e)
        }
    }
})

root.render(
    <Context.Provider value={{store: store}}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);
