import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { callRetrieveSprintNamesApi } from '../../api/SprintApiService';
import { callRetrieveUserNamesApi } from '../../api/UserApiService';
import { callAddWorkItemApi } from '../../api/WorkItemApiService';
import { AuthContext } from '../../auth/AuthContext';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    width: 500,
    // height: 600,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function CreateWorkItemComponent(){
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, updateTitle] = useState()
    const [titleError, setTitleError] = useState(false)
    const [titleHelperText, setTitleHelperText] = useState()

    const [desc, updateDesc] = useState()
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()

    const [priority, updatePriority] = useState('')
    const [priorityError, setPriorityError] = useState(false)
    const [priorityHelperText, setPriorityHelperText] = useState()

    const [assignee, updateAssignee] = useState()
    const [assigneeError, setAssigneeError] = useState(false)
    const [assigneeHelperText, setAssigneeHelperText] = useState()

    const [sprint, updateSprint] = useState()
    const [sprintError, setSprintError] = useState(false)
    const [sprintHelperText, setSprintHelperText] = useState()

    const [dueDate, updateDueDate] = useState()
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()

    const [sprintList, updateSprintList] = useState([])
    const [assigneeList, updateAssigneeList] = useState([])
    const [initialValuesFetched, setInitialValuesFetched] = useState(false)
    
    const priorityList=["HIGH", "MEDIUM", "LOW"]

    useEffect(() => {
        if(!initialValuesFetched){
            callRetrieveSprintNamesApi(authContext.token)
            .then((resp) => {
                updateSprintList(resp.data)
            })
            .catch((error) => console.log(error))

            callRetrieveUserNamesApi(authContext.token)
            .then((resp) => {
                updateAssigneeList(resp.data)
            })
            .catch((error) => console.log(error))
            setInitialValuesFetched(false)
        }
    })

    function validateIssueContent(){
        var makeApiCall=true

        setTitleError(false)
        setTitleHelperText(null)
        if(title==undefined || (title!=undefined && title.length==0)){
            makeApiCall=false
            setTitleError(true)
            setTitleHelperText("Title cannot be empty.")
        }

        setDescError(false)
        setDescHelperText(null)
        if(desc==undefined || (desc!=undefined && desc.length==0)){
            makeApiCall=false
            setDescError(true)
            setDescHelperText("Description cannot be empty.")
        }

        setPriorityError(false)
        setPriorityHelperText(null)
        if(priority==null || priority==''){
            makeApiCall=false
            setPriorityError(true)
            setPriorityHelperText("Priority cannot be empty.")
        }

        setSprintError(false)
        setSprintHelperText(null)
        if(sprint==null || sprint==''){
            makeApiCall=false
            setSprintError(true)
            setSprintHelperText("Sprint cannot be empty.")
        }

        setAssigneeError(false)
        setAssigneeHelperText(null)
        if(assignee==null || assignee=='' || assignee==undefined){
            makeApiCall=false
            setAssigneeError(true)
            setAssigneeHelperText("Assignee cannot be empty.")
        }

        setDueDateError(false)
        setDueDateHelperText(null)
        if(dueDate==null){
            makeApiCall=false
            setDueDateError(true)
            setDueDateHelperText("Due Date cannot be empty.")
        }

        if(makeApiCall)
            addWorkItem()
    }

    function onTitleChanged(event){
        updateTitle(event.target.value)
    }

    function onDescChanged(event){
        updateDesc(event.target.value)
    }

    function onPriorityChanged(event){
        updatePriority(event.target.value)
    }

    function onDueDateChanged(event){
        updateDueDate(event.target.value)
    }

    function addWorkItem(){
        callAddWorkItemApi(
            {
                workItemTitle: title,
                workItemDescription: desc,
                dueDate: dueDate, 
                priority: priority,
                sprint:sprint,
                assigneeName: assignee,
                status: "NEW",
                // TODO: CHANGE USER NAME
                creatorName: authContext.loggedInUserName
            },
            authContext.token
        )
        .then((resp) => {
            navigate("/workItems")
        })
        .catch((error) => console.log(error))
    }

    function discardChanges(){
        navigate("/workItems")
    }
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Create Task
                                    </Typography> 
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                spacing={2}
                            >
                                <Grid item xs={6}>
                                    <Grid container
                                        spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                error={titleError}
                                                fullWidth={true}
                                                helperText={titleHelperText}
                                                onChange={onTitleChanged}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                error={descError}
                                                helperText={descHelperText}
                                                multiline
                                                fullWidth={true}
                                                rows={6}
                                                onChange={onDescChanged}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Grid container
                                        spacing={2.1}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Priority"
                                                size="small"
                                                fullWidth={true}
                                                error={priorityError}
                                                helperText={priorityHelperText}
                                                onChange={onPriorityChanged}
                                                >
                                                {priorityList.map((priorityItem) => {return (
                                                    <MenuItem value={priorityItem} key={priorityItem}>{priorityItem}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                options={assigneeList}
                                                size="small"
                                                fullWidth={true}
                                                error={assigneeError}
                                                helperText={assigneeHelperText}
                                                onChange={(event, newInputValue) => {
                                                    updateAssignee(newInputValue)
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    updateAssignee(newInputValue)
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Assignee" />}    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={sprintList}
                                                fullWidth={true}
                                                error={sprintError}
                                                helperText={sprintHelperText}
                                                onChange={(event, newInputValue) => {
                                                    updateSprint(newInputValue)
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    updateSprint(newInputValue)
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Sprint" />}    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Due Date"
                                                error={dueDateError}
                                                fullWidth
                                                helperText={dueDateHelperText}
                                                InputLabelProps={{ shrink: true}}
                                                type='date'
                                                onChange={onDueDateChanged}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                        onClick={validateIssueContent}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}