import {apiClient} from "./ApiClient"

export function callRetrieveUserNamesApi(){
    return apiClient.get("/listUsers")
}

export function callValidateUserNamesApi(queryParams){
    return apiClient.get("/validateUser", {params: queryParams})
}