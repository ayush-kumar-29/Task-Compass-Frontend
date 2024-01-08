import {apiClient} from "./ApiClient"

export function callRetrieveIssuesForFilterApi(assigneeFilter, newFilter, inProgressFilter, resolvedFilter, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(
        "/issues", 
        {
            headers, 
            params: {assignee:assigneeFilter, newIssue:newFilter, inProgress:inProgressFilter, resolved:resolvedFilter}
        }
    )
}

export function callRetrieveIssueCountApi(queryParams, authToken){
    const headers = {'Authorization': authToken}
    console.log(queryParams)
    return apiClient.get("/issues/countByType", {headers, params: queryParams})
}

export function callAddIssueApi(issue, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.post("issues/addIssue", issue, {headers})
}

export function callUpdateIssueStatusApi(id, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/issues/editIssue/${id}`, {}, {headers, params: queryParams})
}

export function callUpdateIssueApi(id, issue, queryParams, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.patch(`/issues/editIssue/${id}`, issue, {headers, params: queryParams})
}


export function callRetrieveIssueForIdApi(issueId, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.get(`/issues/${issueId}`, {headers})
}

export function callDeleteIssueApi(id, authToken){
    const headers = {'Authorization': authToken}
    return apiClient.delete(`/issues/deleteIssue/${id}`, {headers})
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



