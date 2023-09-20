import {BrowserRouter, Routes, Route} from "react-router-dom"

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



export default function WorkCompassApp(){
    return(
        <div>
            <NavBarComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<HomePageComponent/>}/>
                    <Route path="/todos" element={<TodoComponent/>}/>
                    <Route path="/addTodo" element={<AddTodoComponent/>}/>
                    <Route path="/editTodo/:todoId" element={<EditTodoComponent/>}/>
                    <Route path="/issues" element={<IssueComponent/>}/>
                    <Route path="/addIssue" element={<CreateIssueComponent/>}/>
                    <Route path="/viewIssue/:issueId" element={<ViewIssueComponent/>}/>
                    <Route path="/workItems" element={<WorkItemComponent/>}/>
                    <Route path="/addWorkItem" element={<CreateWorkItemComponent/>}/>
                    <Route path="/viewWorkItem/:workItemId" element={<ViewWorkItemComponent/>}/>
                    <Route path="/sprints" element={<SprintComponent/>}/>
                    <Route path="/createSprint" element={<CreateSprintComponent/>}/>
                    <Route path="/editSprint/:sprintId" element={<EditSprintComponent/>}/>
                    <Route path="/closeSprint" element={<CloseSprintComponent/>}/>
                    <Route path="/deleteSprint" element={<DeleteSprintComponent/>}/>
                </Routes>
            </BrowserRouter>
            {/* <LoginComponent/> */}
            {/* <SignupComponent/> */}
        </div>
    )
}