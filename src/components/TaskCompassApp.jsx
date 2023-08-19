import LoginComponent from "./login-components/LoginComponent"
import SignupComponent from "./signup-components/SignupComponents"
import HomePageComponent from "./home-page-components/HomePageComponent"
import TodoComponent from "./todo-components/TodoComponent"
import AddTodoComponent from "./todo-components/AddTodoComponent"
import EditTodoComponent from "./todo-components/EditTodoComponent"
import NavBarComponent from "./nav-bar-components/NavBarComponent"

export default function TaskCompassApp(){
    return(
        <div>
            <NavBarComponent/>
            {/* <LoginComponent/> */}
            {/* <SignupComponent/> */}
            {/* <HomePageComponent/> */}
            {/* <TodoComponent/> */}
            {/* <AddTodoComponent/> */}
            <EditTodoComponent/>
        </div>
    )
}