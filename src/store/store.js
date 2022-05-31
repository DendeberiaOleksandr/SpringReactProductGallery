import {makeAutoObservable} from "mobx";
import AuthService from "../service/auth.service";
import axios from "axios";
import {API_URL} from "../index";
import jwtDecode from "jwt-decode";

export default class Store {

    isAdmin = false
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsAdmin(isAdmin){
        this.isAdmin = isAdmin
    }

    setAuth(isAuth){
        this.isAuth = isAuth
    }

    setLoading(isLoading){
        this.isLoading = isLoading
    }

    getDecodedToken(){
        const token = localStorage.getItem("accessToken")
        try {
            return jwtDecode(token)
        } catch (e){

        }
    }

    async login(username, password){
        const response = await AuthService.login(username, password)
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
    }

    async register(username, password){
        await AuthService.register(username, password);
    }

    async logout(){
        await AuthService.logout()
        this.setAuth(false)
    }

    async checkAuth(){
        try {
            this.setLoading(true)
            const response = await axios.get(`${API_URL}/token/refresh`, {withCredentials: true,
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
            }})
            localStorage.setItem("accessToken", response.data.access_token);
            this.setAuth(true)
        } catch (e){
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }
}