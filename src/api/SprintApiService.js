import {apiClient} from "./ApiClient"

export function callRetrieveSprintNamesApi(){
    return apiClient.get("/listSprints")
}

export function callRetrieveSprintsForFilterApi(upcomingFilter, ongoingFilter, closedFilter){
    return apiClient.get("/sprints", {params: {upcomingFilter:upcomingFilter, ongoingFilter:ongoingFilter, closedFilter:closedFilter}})
}

export function callAddSprintApi(issue){
    return apiClient.post("/sprints/createSprint", issue)
}

export function callUpdateSprintStatusApi(sprintId, queryParams){
    console.log(queryParams)
    return apiClient.patch(`/sprints/updateSprint/${sprintId}`, {}, {params: queryParams})
}

export function callUpdateSprintContentApi(sprintId, sprint, queryParams){
    return apiClient.patch(`/issues/editIssue/${sprintId}`, sprint, {params: queryParams})
}


export function callRetrieveSprintForIdApi(sprintId){
    return apiClient.get(`/sprints/${sprintId}`)
}

export function callDeleteSprintApi(sprintId){
    return apiClient.delete(`/sprints/deleteSprint/${sprintId}`)
}

export function callValidateSprintNameApi(sprintName){
    return apiClient.get("/sprints/exists", {params: {sprintName}})
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



