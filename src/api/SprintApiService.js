import {apiClient} from "./ApiClient"

export function callRetrieveSprintNamesApi(authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/listSprints", {headers})
}

export function callRetrieveSprintsForFilterApi(upcomingFilter, ongoingFilter, closedFilter, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(
        "/sprints", 
        {
            headers, 
            params: {upcomingFilter:upcomingFilter, ongoingFilter:ongoingFilter, closedFilter:closedFilter}
        }
    )
}

export function callAddSprintApi(issue, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.post("/sprints/createSprint", issue, {headers})
}

export function callUpdateSprintStatusApi(sprintId, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/sprints/updateSprint/${sprintId}`, {}, {headers, params: queryParams})
}

export function callUpdateSprintContentApi(sprintId, sprint, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/sprints/updateSprint/${sprintId}`, sprint, {headers, params: queryParams})
}


export function callRetrieveSprintForIdApi(sprintId, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(`/sprints/${sprintId}`, {headers})
}

export function callDeleteSprintApi(sprintId, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.delete(`/sprints/deleteSprint/${sprintId}`, {headers})
}

export function callValidateSprintNameApi(sprintName, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/sprints/exists", {headers, params: {sprintName}})
}

// export function callRetrieveTodoForIdApi(todoId, queryParams){
//     return apiClient.get(`/todos/${todoId}`, {params: queryParams})
// }

// export function callAddTodoApi(todo, queryParams){
//     return apiClient.post("todos/addTodo", todo, {params: queryParams})
// }

// export function callDeleteTodoApi(id, queryParams){   
//     return apiClient.delete(`/todos/deleteTodo/${id}`, {params: queryParams})
// }

// export function callUpdateTodoStatusApi(id, queryParams){   
//     return apiClient.patch(`/todos/updateTodo/${id}`, {}, {params: queryParams})
// }



