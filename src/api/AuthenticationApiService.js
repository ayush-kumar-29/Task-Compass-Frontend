import {apiClient} from "./ApiClient"

export function callLoginUserApi(username, password){
    var requestPayload = {
        userName: username,
        password: password
    }
    return apiClient.post("/authenticate", requestPayload)
}

export function callLogoutUserApi(authToken){
    const headers = {'Authorization': authToken}
    return apiClient.post("/logout", {}, {headers})
}

export function callRegisterUserApi(username, password, emailId){
    var requestPayload = {
        userName: username,
        password: password,
        emailId: emailId
    }
    return apiClient.post("/register", requestPayload)
}