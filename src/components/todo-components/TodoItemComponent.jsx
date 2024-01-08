import React, { useContext } from 'react';
import { Button, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import {useNavigate} from "react-router-dom"
import { callDeleteTodoApi, callUpdateTodoStatusApi } from '../../api/TodoApiService';
import { AuthContext } from '../../auth/AuthContext';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function TodoItemComponent({todoId, todoDesc, dueDate, status, updateOnFiltersChanged}){
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    function markTodoAsDone(){
        callUpdateTodoStatusApi(todoId, {userName: authContext.loggedInUserName, updateType: "status"}, authContext.token)
        .then((resp) => {
            updateOnFiltersChanged(true)
        })
        .catch((error) => console.log(error))
    }

    function updateTodo(){
        navigate(`/editTodo/${todoId}`)
    }

    function deleteTodo(){
        // TODO: CHANGE USER NAME
        callDeleteTodoApi(todoId, {userName: authContext.loggedInUserName}, authContext.token)
        .then((resp) => {
            updateOnFiltersChanged(true)
        })
        .catch((error) => console.log(error))
    }
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant="body1">{todoDesc}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography>{"Due Date: "+dueDate}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            // variant="contained"
                                            fullWidth={true}
                                            onClick={markTodoAsDone}
                                        >
                                            {"Mark as "+ (status?"Open":"Completed")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={updateTodo}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={deleteTodo}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}