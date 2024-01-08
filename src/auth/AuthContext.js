import {createContext, useState} from "react";
import { callLoginUserApi, callLogoutUserApi, callRegisterUserApi } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    // Putting some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [loggedInUserName, setLoggedInUserName] = useState(null)
    const [token, setToken] = useState(null)

    async function authenticateUserCreds(username, password){
        try{
            const resp = await callLoginUserApi(username, password)
            console.log(resp.status)
            if(resp.status==200){
                console.log(resp.data)
                setAuthenticated(true)
                setLoggedInUserName(username)
                const bearerToken = "Bearer "+resp.data.token
                // localStorage.setItem('authToken', bearerToken);
                setToken(bearerToken)
                console.log(bearerToken)
                // apiClient.interceptors.request.use(
                //     (config)=>{
                //         config.headers.Authorization=bearerToken
                //         return config
                //     }
                // )
                return true
            }
            else{
                setAuthenticated(false)
                setLoggedInUserName(null)
                setToken(null)
                return false
            }
        }
        catch(error){
            setAuthenticated(false)
            setLoggedInUserName(null)
            setToken(null)
            return false
        }  
    }
    
    async function deauthenticateUserCreds(){
        try{
            const resp = await callLogoutUserApi(token)
            setAuthenticated(false)
                setLoggedInUserName(null)
                setToken(null)
                // localStorage.removeItem('authToken');
                // removeAuthorizationInterceptor()
                return true
        }
        catch(error){
            setAuthenticated(false)
            setLoggedInUserName(null)
            setToken(null)
            return false
        }  
    }

    function removeAuthorizationInterceptor(){
        const interceptorId = apiClient.interceptors.request.use(
            (config) => {
                config.headers.Authorization = token;
                return config;
            }
        );
        apiClient.interceptors.request.eject(interceptorId);
    }

    async function registerNewUser(username, password, emailId){
        try{
            const resp = await callRegisterUserApi(username, password, emailId)
            if(resp.status==200){
                console.log(resp.data)
                setAuthenticated(true)
                setLoggedInUserName(username)
                const bearerToken = "Bearer "+resp.data.token
                localStorage.setItem('authToken', bearerToken);
                console.log(localStorage.getItem("authToken"))
                setToken(bearerToken)
                // apiClient.interceptors.request.use(
                //     (config)=>{
                //         config.headers.Authorization=bearerToken
                //         return config
                //     }
                // )
                return true
            }
            else{
                setAuthenticated(false)
                setLoggedInUserName(null)
                setToken(null)
                return false
            }
        }
        catch(error){
            setAuthenticated(false)
            setLoggedInUserName(null)
            setToken(null)
            return false
        }  
    }

    return (
        <AuthContext.Provider 
            value={ {isAuthenticated, loggedInUserName, authenticateUserCreds, deauthenticateUserCreds, registerNewUser, token} }
        >
            {children}
        </AuthContext.Provider>
    )
}