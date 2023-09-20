import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { callRetrieveUserNamesApi } from '../../api/UserApiService';
import { callRetrieveSprintNamesApi } from '../../api/SprintApiService';
import { callDeleteWorkItemApi, callRetrieveWorkItemForIdApi, callUpdateWorkItemApi } from '../../api/WorkItemApiService';
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

export default function ViewWorkItemComponent(){
    const statusList=["NEW", "ONGOING", "CLOSED"]
    const priorityList=["HIGH", "MEDIUM", "LOW"]

    const navigate = useNavigate()

    const params = useParams()
    
    const [assigneeList, setAssigneeList] = useState([])
    const [sprintList, updateSprintList] = useState([])
    const [viewModeEnabled, setViewModeEnabled] = useState(true)

    const [title, updateTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [titleHelperText, setTitleHelperText] = useState()

    const [desc, updateDesc] = useState('')
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()

    const [sprint, updateSprint] = useState('')
    const [sprintError, setSprintError] = useState(false)
    const [sprintHelperText, setSprintHelperText] = useState()

    const [status, updateStatus] = useState('')
    const [statusError, setStatusError] = useState(false)
    const [statusHelperText, setStatusHelperText] = useState()
    
    const [priority, updatePriority] = useState('')
    const [priorityError, setPriorityError] = useState(false)
    const [priorityHelperText, setPriorityHelperText] = useState()

    const [assignee, updateAssignee] = useState('')
    const [assigneeError, setAssigneeError] = useState(false)
    const [assigneeHelperText, setAssigneeHelperText] = useState()

    const [dueDate, updateDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()

    const [creatorName, updateCreatorName] = useState('')
    const [creationDate, updateCreationDate] = useState('')
    const [initialValuesFetched, setInitialValuesFetched] = useState(false)

    function validateWorkItemContent(){
        if(viewModeEnabled)
            navigate("/workItems")
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

        setStatusError(false)
        setStatusHelperText(null)
        if(status==null || status==''){
            makeApiCall=false
            setStatusError(true)
            setStatusHelperText("Status cannot be empty.")
        }
        
        setSprintError(false)
        setSprintHelperText(null)
        if(sprint==null || sprint==''){
            makeApiCall=false
            setSprintError(true)
            setSprintHelperText("Severity cannot be empty.")
        }

        setPriorityError(false)
        setPriorityHelperText(null)
        if(priority==null || priority==''){
            makeApiCall=false
            setPriorityError(true)
            setPriorityHelperText("Severity cannot be empty.")
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
            setDueDateHelperText("Assignee cannot be empty.")
        }

        if(makeApiCall)
            updateWorkItem()
    }

    function updateWorkItem(){
        // TODO: CHANGE USER NAME
        callUpdateWorkItemApi(
            params.workItemId,
            {
                workItemTitle: title,
                workItemDescription: desc,
                dueDate: dueDate,
                status: status,
                priority: priority,
                sprint: sprint,
                assigneeName: assignee
            },
            {
                updateType: "content",
                newStatus: status
            }
        )
        .then((resp) => {
            navigate("/workItems")
            // setViewModeEnabled(true)
            // setInitialValuesFetched(false)
        })
        .catch((error) => console.log(error))
    }

    function onTitleChanged(event){
        updateTitle(event.target.value)
    }

    function onDescChanged(event){
        updateDesc(event.target.value)
    }

    function onStatusChanged(event){
        updateStatus(event.target.value)
    }

    function onPriorityChanged(event){
        updatePriority(event.target.value)
    }

    function onDueDateChanged(event){
        updateDueDate(event.target.value)
    }

    function enableEditMode(){
        setViewModeEnabled(false)
    }

    function backOrDiscardClicked(){
        if(viewModeEnabled)
            navigate("/workItems")    
        else{
            setViewModeEnabled(true)
            setInitialValuesFetched(false)
            setTitleError(false)
            setTitleHelperText(null)
            setDescError(false)
            setDescHelperText(null)
            setStatusError(false)
            setStatusHelperText(null)
            setSprintError(false)
            setSprintHelperText(null)
            setPriorityError(false)
            setPriorityHelperText(null)
            setAssigneeError(false)
            setAssigneeHelperText(null)
            setDueDateError(false)
            setDueDateHelperText(null)
        }
    }

    function deleteWorkItem(){
        callDeleteWorkItemApi(params.workItemId)
        .then((resp) => {
            navigate("/workItems")
        })
        .catch((error) => console.log(error))
    }

    
    useEffect(() => {
        if(!initialValuesFetched){
            callRetrieveUserNamesApi()
            .then((resp) => {
                setAssigneeList(resp.data)
            })
            .catch((error) => console.log(error))

            callRetrieveSprintNamesApi()
            .then((resp) => {
                updateSprintList(resp.data)
            })
            .catch((error) => console.log(error))

            callRetrieveWorkItemForIdApi(params.workItemId)
            .then((resp) => {
                console.log(resp)
                updateTitle(resp.data.workItemTitle)
                updateDesc(resp.data.workItemDescription)
                updateStatus(resp.data.status)
                updatePriority(resp.data.priority)
                updateSprint(resp.data.sprint)
                updateAssignee(resp.data.assigneeName)
                updateDueDate(resp.data.dueDate)
                updateCreatorName(resp.data.creatorName)
                updateCreationDate(resp.data.creationDate)
            })
            .catch((error) => console.log(error))

            setInitialValuesFetched(true)
        }
    })

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
                                spacing={2}
                            >
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5">
                                        Task Id
                                    </Typography> 
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={enableEditMode}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={deleteWorkItem}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                spacing={3}
                            >
                                <Grid item xs={7.5}>
                                    <Grid container
                                        spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                error={titleError}
                                                value={title}
                                                fullWidth={true}
                                                helperText={titleHelperText}
                                                onChange={onTitleChanged}
                                                disabled={viewModeEnabled}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                error={descError}
                                                helperText={descHelperText}
                                                multiline
                                                fullWidth={true}
                                                rows={2.75}
                                                value={desc}
                                                onChange={onDescChanged}
                                                disabled={viewModeEnabled}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={sprintList}
                                                fullWidth={true}
                                                disabled={viewModeEnabled}
                                                value={sprint}
                                                onChange={(event, newInputValue) => {
                                                    updateSprint(newInputValue)
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    updateSprint(newInputValue)
                                                }}
                                                renderInput={
                                                    (params) => 
                                                        <TextField
                                                            {...params} 
                                                            label="Sprint"
                                                            error={sprintError}
                                                            helperText={sprintHelperText}
                                                        />
                                                }    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Due Date"
                                                error={dueDateError}
                                                fullWidth={true}
                                                value={dueDate}
                                                helperText={dueDateHelperText}
                                                type='date'
                                                InputLabelProps={{ shrink: true}}
                                                onChange={onDueDateChanged}
                                                disabled={viewModeEnabled}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item xs={4.5}>
                                    <Grid container
                                        spacing={1.5}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Status"
                                                fullWidth={true}
                                                error={statusError}
                                                value={status}
                                                helperText={statusHelperText}
                                                onChange={onStatusChanged}
                                                disabled={viewModeEnabled}
                                            >
                                                {statusList.map((statusItem) => {return (
                                                    <MenuItem value={statusItem}>{statusItem}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                select={true}
                                                label="Priority"
                                                error={priorityError}
                                                helperText={priorityHelperText}
                                                value={priority}
                                                fullWidth={true}
                                                onChange={onPriorityChanged}
                                                disabled={viewModeEnabled}
                                            >
                                                {priorityList.map((priorityList) => {return (
                                                    <MenuItem value={priorityList}>{priorityList}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={assigneeList}
                                                fullWidth={true}
                                                value={assignee}
                                                disabled={viewModeEnabled}
                                                onChange={(event, newInputValue) => {
                                                    updateAssignee(newInputValue)
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    updateAssignee(newInputValue)
                                                }}
                                                renderInput={
                                                    (params) => 
                                                        <TextField 
                                                            {...params} 
                                                            label="Assignee" 
                                                            error={assigneeError}
                                                            helperText={assigneeHelperText}
                                                        />
                                                }    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container
                                                spacing={1.2}
                                            >
                                                <Grid item xs={12}></Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled
                                                        label="Created By"
                                                        fullWidth={true}
                                                        size="small"
                                                        value={creatorName}
                                                        InputLabelProps={{ shrink: true}}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}></Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled
                                                        label="Created On"
                                                        fullWidth={true}
                                                        size="small"
                                                        value={creationDate}
                                                        InputLabelProps={{ shrink: true}}
                                                    />
                                                </Grid>
                                            </Grid>
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
                                        onClick={backOrDiscardClicked}
                                    >
                                        {viewModeEnabled?"Back":"Discard"}
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={validateWorkItemContent}
                                    >
                                        Save
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