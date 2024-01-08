import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, CardContent, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import TodoItemComponent from './TodoItemComponent';
import { useNavigate } from 'react-router-dom';
import { callRetrieveTodoForFilterApi } from '../../api/TodoApiService';
import { AuthContext } from '../../auth/AuthContext';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function TodoComponent(){
    const navigate = useNavigate()
    const [openFilter, updateOpenFilterStatus] = useState(true)
    const [completedFilter, updateCompletedFilterStatus] = useState(false)
    const [onFiltersChanged, updateOnFiltersChanged] = useState(true)
    const [todosList, updateTodosList] = useState([])
    const authContext = useContext(AuthContext)

    const openFilterChanged =(event) => {
        updateOpenFilterStatus(event.target.checked)
        updateOnFiltersChanged(true)
    }
    const completedFilterChanged =(event) => {
        updateCompletedFilterStatus(event.target.checked)
        updateOnFiltersChanged(true)
    }

    function addNewTodo(){
        navigate("/addTodo")
    }

    useEffect(() => {
        // TODO: CHANGE USERNAME
        if(onFiltersChanged){
            callRetrieveTodoForFilterApi(
                {userName:authContext.loggedInUserName, open:openFilter, completed:completedFilter}, 
                authContext.token
            )
            .then((resp) => {
                updateTodosList(resp.data)
            })
            .catch((error) => console.log(error))
            updateOnFiltersChanged(false)
        }
    })

    return(
        <div>
            <div style={{position: 'sticky',top: '50px', zIndex: 1}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container>
                        <Grid item xs={2}></Grid>

                        <Grid item xs={4}>
                            <Button variant="contained"
                                fullWidth={true}
                                onClick={addNewTodo}
                            >
                                Add a new Todo
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={openFilter}
                                            onChange={openFilterChanged}
                                        />
                                    } 
                                    label="Open"
                                />
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={completedFilter}
                                            onChange={completedFilterChanged}
                                        />
                                    } 
                                    label="Completed" 
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={1}></Grid>
                    </Grid>
                </Paper>
            </div>
            <main style={{flex: '1', overflowY: 'auto', zIndex: 0}}>
                <Grid container justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <div style={gridPosition}>
                            <Grid container spacing={1} justifyContent="center" direction="column">
                                {todosList.map(
                                    todo =>(
                                        <Grid item key={todo.todoId}>
                                            <TodoItemComponent 
                                                todoId={todo.todoId}
                                                todoDesc={todo.todoDescription} 
                                                dueDate={todo.dueDate}
                                                status={todo.isDone}
                                                updateOnFiltersChanged={updateOnFiltersChanged}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}