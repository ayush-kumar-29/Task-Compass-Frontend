import {apiClient} from "./ApiClient"

export function callRetrieveTodoForFilterApi(queryParams){
    return apiClient.get("/todos", {params: queryParams})
}

export function callRetrieveTodoForIdApi(todoId, queryParams){
    return apiClient.get(`/todos/${todoId}`, {params: queryParams})
}

export function callAddTodoApi(todo, queryParams){
    return apiClient.post("todos/addTodo", todo, {params: queryParams})
}

export function callDeleteTodoApi(id, queryParams){   
    return apiClient.delete(`/todos/deleteTodo/${id}`, {params: queryParams})
}

export function callUpdateTodoStatusApi(id, queryParams){   
    return apiClient.patch(`/todos/updateTodo/${id}`, {}, {params: queryParams})
}

export function callUpdateTodoApi(id, queryParams, todo){
    return apiClient.patch(`/todos/updateTodo/${id}`, todo, {params: queryParams})
}

