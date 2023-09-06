import {apiClient} from "./ApiClient"

export function callRetrieveTodoApi(queryParams){
    return apiClient.get("/todos", {params: queryParams})
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

export function callGetTodoApi(username, id){   
    return apiClient.get(`/users/${username}/todos/${id}`)
}

export function callUpdateTodoApi(username, id, todo){
    return apiClient.put(`/users/${username}/todos/${id}`, todo)
}

