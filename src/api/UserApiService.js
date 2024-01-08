import {apiClient} from "./ApiClient"

export function callRetrieveUserNamesApi(authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/listUsers", {headers})
}

export function callValidateUserNamesApi(queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/validateUser", {headers, params: queryParams})
}