import React, { useEffect, useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { callRetrieveTodoForIdApi, callUpdateTodoApi } from '../../api/TodoApiService';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function EditTodoComponent(){
    const [todoDesc, setTodoDesc] = useState("")
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()
    const [dueDate, setDueDate] = useState()
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()
    const [initialValueFetched, setInitialValueFetched] = useState(false)
    
    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        // console.log(params)
        // TODO: CHANGE USERNAME
        if(!initialValueFetched){
            callRetrieveTodoForIdApi(params.todoId, {userName:"user1"})
            .then((resp) => {
                setTodoDesc(resp.data.todoDescription)
                setDueDate(resp.data.dueDate)
            })
            .catch((error) => console.log(error))
            setInitialValueFetched(true)
        }
    })

    function discardChanges(){
        navigate("/todos")
    }

    function validateTodoContent(){
        var makeApiCall=true

        setDescError(false)
        setDescHelperText(null)
        if(todoDesc==undefined || (todoDesc!=undefined && todoDesc.length==0)){
            makeApiCall=false
            setDescError(true)
            setDescHelperText("Description cannot be empty.")
        }

        setDueDateError(false)
        setDueDateHelperText(null)
        if(dueDate==undefined || (dueDate!=undefined && dueDate.length==0)){
            makeApiCall=false
            setDueDateError(true)
            setDueDateHelperText("Due date cannot be empty.")
        }

        if(makeApiCall)
            addTodo()
    }

    function addTodo(){
        // TODO: CHANGE USER NAME
        callUpdateTodoApi(params.todoId, {userName:"user1", updateType:"content"}, {todoDescription:todoDesc, dueDate})
        .then((resp) => {
            console.log(resp)
            navigate("/todos")
        })
        .catch((error) => console.log(error))
    }

    const onDescChanged = (event) => {
        setTodoDesc(event.target.value);
    };

    const onDueDateChanged = (event) => {
        setDueDate(event.target.value);
    };

    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container
                            direction="column"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">
                                    Edit a Todo
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    error={descError}
                                    helperText={descHelperText}
                                    fullWidth
                                    InputLabelProps={{ shrink: true}}
                                    multiline
                                    value={todoDesc}
                                    rows={4}
                                    onChange={onDescChanged}
                                />  
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Due By"
                                    error={dueDateError}
                                    helperText={dueDateHelperText}
                                    fullWidth
                                    value={dueDate}
                                    InputLabelProps={{ shrink: true}}
                                    type='date'
                                    onChange={onDueDateChanged}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button 
                                            variant="contained"
                                            fullWidth={true}
                                            onClick={discardChanges}
                                        >
                                            Discard
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button 
                                            variant="contained"
                                            fullWidth={true}
                                            onClick={validateTodoContent}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}