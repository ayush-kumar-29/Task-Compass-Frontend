import {apiClient} from "./ApiClient"

export function callRetrieveWorkItemsForFilterApi(sprintFilter, assigneeFilter, newFilter, ongoingFilter, completedFilter){
    return apiClient.get("/workItems", 
        {
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

export function callAddWorkItemApi(workItem){
    return apiClient.post("workItems/addWorkItem", workItem)
}

export function callUpdateWorkItemStatusApi(id, queryParams){
    console.log(queryParams)
    return apiClient.patch(`/workItems/editWorkItem/${id}`, {}, {params: queryParams})
}

export function callUpdateWorkItemApi(id, workItem, queryParams){
    return apiClient.patch(`/workItems/editWorkItem/${id}`, workItem, {params: queryParams})
}

export function callRetrieveWorkItemForIdApi(workItemId){
    return apiClient.get(`/workItems/${workItemId}`)
}

export function callDeleteWorkItemApi(id){   
    return apiClient.delete(`/workItems/deleteWorkItem/${id}`)
}

export function callRetrieveWorkItemCountApi(queryParams){
    return apiClient.get("/workItems/countByType", {params: queryParams})
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



