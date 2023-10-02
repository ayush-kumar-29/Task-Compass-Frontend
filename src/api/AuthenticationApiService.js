import {apiClient} from "./ApiClient"

export function callLoginUserApi(username, password){
    var requestPayload = {
        userName: username,
        password: password
    }
    return apiClient.post("/authenticate", requestPayload)
}

export function callLogoutUserApi(){
    return apiClient.post("/logout")
}

export function callRegisterUserApi(username, password, emailId){
    var requestPayload = {
        userName: username,
        password: password,
        emailId: emailId
    }
    return apiClient.post("/register", requestPayload)
}