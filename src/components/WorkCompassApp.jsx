import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import LoginComponent from "./login-components/LoginComponent"
import SignupComponent from "./signup-components/SignupComponents"

import HomePageComponent from "./home-page-components/HomePageComponent"

import TodoComponent from "./todo-components/TodoComponent"
import AddTodoComponent from "./todo-components/AddTodoComponent"
import EditTodoComponent from "./todo-components/EditTodoComponent"

import NavBarComponent from "./nav-bar-components/NavBarComponent"

import SprintComponent from "./sprint-components/SprintComponent"
import CreateSprintComponent from "./sprint-components/CreateSprintComponent"
import EditSprintComponent from "./sprint-components/EditSprintComponent"
import CloseSprintComponent from "./sprint-components/CloseSprintComponent"
import DeleteSprintComponent from "./sprint-components/DeleteSprintComponent"

import WorkItemComponent from "./workitem-components/WorkItemComponent"
import CreateWorkItemComponent from "./workitem-components/CreateWorkItemComponent"
import ViewWorkItemComponent from "./workitem-components/ViewWorkItemComponent"

import IssueComponent from "./issues-components/IssueComponent"
import CreateIssueComponent from "./issues-components/CreateIssueComponent"
import ViewIssueComponent from "./issues-components/ViewIssueComponent"
import { useContext } from "react"
import AuthProvider, { AuthContext } from "../auth/AuthContext"
import LogoutComponent from "./logout-components/LogoutComponent"

function AuthenticatedRoute({children}){
    const authContext = useContext(AuthContext)
    console.log("authContext.isAuthenticated - "+authContext.isAuthenticated)
    if(authContext.isAuthenticated){
        return (children)
    }
    else return <Navigate to="/"/>
}

export default function WorkCompassApp(){
    return(
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <div>
                        {/* <AuthenticatedRoute> */}
                            <NavBarComponent/>
                        {/* </AuthenticatedRoute> */}
                        <Routes>
                            <Route path="/" element={<LoginComponent/>}/>
                            <Route path="/login" element={<LoginComponent/>}/>
                            <Route path="/signup" element={<SignupComponent/>}/>
                            <Route path="/logout" element={<LogoutComponent/>}/>

                            <Route path="/home" element={
                                <AuthenticatedRoute>
                                    <HomePageComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/todos" element={
                                <AuthenticatedRoute>
                                    <TodoComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/addTodo" element={
                                <AuthenticatedRoute>
                                    <AddTodoComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/editTodo/:todoId" element={
                                <AuthenticatedRoute>
                                    <EditTodoComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/issues" element={
                                <AuthenticatedRoute>
                                    <IssueComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/addIssue" element={
                                <AuthenticatedRoute>
                                    <CreateIssueComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/viewIssue/:issueId" element={
                                <AuthenticatedRoute>
                                    <ViewIssueComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/workItems" element={
                                <AuthenticatedRoute>
                                    <WorkItemComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/addWorkItem" element={
                                <AuthenticatedRoute>
                                    <CreateWorkItemComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/viewWorkItem/:workItemId" element={
                                <AuthenticatedRoute>
                                    <ViewWorkItemComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/sprints" element={
                                <AuthenticatedRoute>
                                    <SprintComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/createSprint" element={
                                <AuthenticatedRoute>
                                    <CreateSprintComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/editSprint/:sprintId" element={
                                <AuthenticatedRoute>
                                    <EditSprintComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/closeSprint" element={
                                <AuthenticatedRoute>
                                    <CloseSprintComponent/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/deleteSprint" element={
                                <AuthenticatedRoute>
                                    <DeleteSprintComponent/>
                                </AuthenticatedRoute>
                            }/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}