import React, { useContext, useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { callAddTodoApi } from '../../api/TodoApiService';
import { AuthContext } from '../../auth/AuthContext';
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

export default function AddTodoComponent(){
    const authContext = useContext(AuthContext)
    const [desc, updateDesc] = useState()
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()

    const [dueDate, updateDueDate] = useState()
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()

    const navigate = useNavigate()

    function onDescEntered(event){
        updateDesc(event.target.value)
    }

    function onDueDateEntered(event){
        updateDueDate(event.target.value)
    }

    function discardChanges(){
        navigate("/todos")
    }

    function validateTodoContent(){
        var makeApiCall=true

        setDescError(false)
        setDescHelperText(null)
        if(desc==undefined || (desc!=undefined && desc.length==0)){
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
        callAddTodoApi({todoDescription:desc, dueDate}, {userName:authContext.loggedInUserName}, authContext.token)
        .then((resp) => {
            console.log(resp)
            navigate("/todos")
        })
        .catch((error) => console.log(error))
    }

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
                                    Add a new Todo
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    error={descError}
                                    helperText={descHelperText}
                                    onChange={onDescEntered}
                                    value={desc}
                                    multiline
                                    fullWidth
                                    rows={4}
                                />  
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Due By"
                                    error={dueDateError}
                                    helperText={dueDateHelperText}
                                    onChange={onDueDateEntered}
                                    fullWidth
                                    InputLabelProps={{ shrink: true}}
                                    type='date'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container
                                    spacing={1}
                                >
                                    <Grid item xs={6}>
                                        <Button variant="contained"
                                            fullWidth={true}
                                            onClick={discardChanges}
                                        >
                                            Discard
                                        </Button>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Button variant="contained"
                                            fullWidth={true}
                                            onClick={validateTodoContent}
                                        >
                                            Add
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