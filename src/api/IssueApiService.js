import {apiClient} from "./ApiClient"

export function callRetrieveIssuesForFilterApi(assigneeFilter, newFilter, inProgressFilter, resolvedFilter){
    return apiClient.get("/issues", {params: {assignee:assigneeFilter, newIssue:newFilter, 
        inProgress:inProgressFilter, resolved:resolvedFilter}})
}

export function callRetrieveIssueCountApi(queryParams){
    return apiClient.get("/issues/countByType", {params: queryParams})
}

export function callAddIssueApi(issue){
    return apiClient.post("issues/addIssue", issue)
}

export function callUpdateIssueStatusApi(id, queryParams){
    console.log(queryParams)
    return apiClient.patch(`/issues/editIssue/${id}`, {}, {params: queryParams})
}

export function callUpdateIssueApi(id, issue, queryParams){
    return apiClient.patch(`/issues/editIssue/${id}`, issue, {params: queryParams})
}


export function callRetrieveIssueForIdApi(issueId){
    return apiClient.get(`/issues/${issueId}`)
}

export function callDeleteIssueApi(id){   
    return apiClient.delete(`/issues/deleteIssue/${id}`)
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



