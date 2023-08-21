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

import TasksComponent from "./tasks-components/TasksComponent"
import CreateTaskComponent from "./tasks-components/CreateTaskComponent"
import ViewTaskComponent from "./tasks-components/ViewTaskComponent"

import IssueComponent from "./issues-components/IssueComponent"
import CreateIssueComponent from "./issues-components/CreateIssueComponent"
import ViewIssueComponent from "./issues-components/ViewIssueComponent"



export default function WorkCompassApp(){
    return(
        <div>
            <NavBarComponent/>
            {/* <LoginComponent/> */}
            {/* <SignupComponent/> */}
            {/* <HomePageComponent/> */}
            {/* <TodoComponent/> */}
            {/* <AddTodoComponent/> */}
            {/* <EditTodoComponent/> */}
            {/* <SprintComponent/> */}
            {/* <CreateSprintComponent/> */}
            {/* <EditSprintComponent/> */}
            {/* <CloseSprintComponent/> */}
            {/* <DeleteSprintComponent/> */}
            {/* <TasksComponent/> */}
            {/* <CreateTaskComponent/> */}
            {/* <ViewTaskComponent/> */}
            {/* <IssueComponent/> */}
            {/* <CreateIssueComponent/> */}
            <ViewIssueComponent/>
        </div>
    )
}