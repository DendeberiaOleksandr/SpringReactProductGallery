import axios from "axios";
import {API_URL} from "../index";


export default class AuthService {
    static async login(username, password){
       return axios.post(API_URL + '/login', {
           username: username,
           password: password
       })
    }

    static async register(username, password){
        return axios.post(API_URL + '/users', {
            username: username,
            password: password
        })
    }

    static async logout(){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }
}