import {apiClient} from "./ApiClient"

export function callRetrieveTodoForFilterApi(queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/todos", {headers, params: queryParams})
}

export function callRetrieveTodoForIdApi(todoId, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(`/todos/${todoId}`, {headers, params: queryParams})
}

export function callRetrievTodosCountApi(queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/todos/countByType", {headers, params: queryParams})
}

export function callAddTodoApi(todo, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.post("todos/addTodo", todo, {headers, params: queryParams})
}

export function callDeleteTodoApi(id, queryParams, authToken){
    const headers = {'Authorization': authToken} 
    return apiClient.delete(`/todos/deleteTodo/${id}`, {headers, params: queryParams})
}

export function callUpdateTodoStatusApi(id, queryParams, authToken){   
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/todos/updateTodo/${id}`, {}, {headers, params: queryParams})
}

export function callUpdateTodoApi(id, queryParams, todo, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/todos/updateTodo/${id}`, todo, {headers, params: queryParams})
}

