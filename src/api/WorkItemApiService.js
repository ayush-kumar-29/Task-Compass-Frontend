import {apiClient} from "./ApiClient"

export function callRetrieveWorkItemsForFilterApi(sprintFilter, assigneeFilter, newFilter, ongoingFilter, completedFilter, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/workItems", 
        {
            headers,
            params: {
                sprintName: sprintFilter,
                assignee:assigneeFilter, 
                newFilter:newFilter,
                ongoingFilter:ongoingFilter, 
                completedFilter:completedFilter
            }
        }
    )
}

export function callAddWorkItemApi(workItem, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.post("workItems/addWorkItem", workItem, {headers})
}

export function callUpdateWorkItemStatusApi(workItemId, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/workItems/editWorkItem/${workItemId}`, {}, {headers, params: queryParams})
}

export function callUpdateWorkItemApi(workItemId, workItem, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/workItems/editWorkItem/${workItemId}`, workItem, {headers, params: queryParams})
}

export function callRetrieveWorkItemForIdApi(workItemId, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(`/workItems/${workItemId}`, {headers})
}

export function callDeleteWorkItemApi(workItemId, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.delete(`/workItems/deleteWorkItem/${workItemId}`, {headers})
}

export function callRetrieveWorkItemCountApi(queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get("/workItems/countByType", {headers, params: queryParams})
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



