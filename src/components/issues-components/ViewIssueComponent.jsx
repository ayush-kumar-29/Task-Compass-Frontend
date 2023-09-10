import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { callRetrieveUserNamesApi } from '../../api/UserApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { callDeleteIssueApi, callRetrieveIssueForIdApi, callUpdateIssueApi } from '../../api/IssueApiService';
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

export default function ViewIssueComponent(){
    const statusList=["NEW", "IN PROGRESS", "RESOLVED"]
    const severityList=["LOW", "MEDIUM", "HIGH"]

    const navigate = useNavigate()

    const params = useParams()

    const [assigneeList, setAssigneeList] = useState([])
    const [viewModeEnabled, setViewModeEnabled] = useState(true)

    const [title, updateTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [titleHelperText, setTitleHelperText] = useState()

    const [desc, updateDesc] = useState('')
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()

    const [status, updateStatus] = useState('')
    const [statusError, setStatusError] = useState(false)
    const [statusHelperText, setStatusHelperText] = useState()
    
    const [severity, updateSeverity] = useState('')
    const [severityError, setSeverityError] = useState(false)
    const [severityHelperText, setSeverityHelperText] = useState()

    const [assignee, updateAssignee] = useState('')
    const [assigneeError, setAssigneeError] = useState(false)
    const [assigneeHelperText, setAssigneeHelperText] = useState()

    const [dueDate, updateDueDate] = useState('')
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()

    const [creatorName, updateCreatorName] = useState('')
    const [creationDate, updateCreationDate] = useState('')
    const [initialValuesFetched, setInitialValuesFetched] = useState(false)

    function onTitleChanged(event){
        updateTitle(event.target.value)
    }

    function onDescChanged(event){
        updateDesc(event.target.value)
    }

    function onStatusChanged(event){
        updateStatus(event.target.value)
    }

    function onSeverityChanged(event){
        updateSeverity(event.target.value)
    }

    function onDueDateChanged(event){
        updateDueDate(event.target.value)
    }

    function enableEditMode(){
        setViewModeEnabled(false)
    }

    function backOrDiscardClicked(){
        if(viewModeEnabled)
            navigate("/issues")    
        else{
            setViewModeEnabled(true)
            setInitialValuesFetched(false)
        }
    }

    function validateIssueContent(){
        if(viewModeEnabled)
            navigate("/issues")  
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
        
        setSeverityError(false)
        setSeverityHelperText(null)
        if(severity==null || severity==''){
            makeApiCall=false
            setSeverityError(true)
            setSeverityHelperText("Severity cannot be empty.")
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
            addIssue()
    }

    function addIssue(){
        // TODO: CHANGE USER NAME
        callUpdateIssueApi(
            params.issueId,
            {
                issueTitle: title,
                issueDescription: desc,
                dueDate: dueDate,
                status: status,
                severity: severity,
                assigneeName: assignee
            },
            {
                updateType: "content",
                newStatus: status
            }
        )
        .then((resp) => {
            setViewModeEnabled(true)
            setInitialValuesFetched(false)
        })
        .catch((error) => console.log(error))
    }

    function deleteIssue(){
        callDeleteIssueApi(params.issueId)
        .then((resp) => {
            navigate("/issues")
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

            callRetrieveIssueForIdApi(params.issueId)
            .then((resp) => {
                updateTitle(resp.data.issueTitle)
                updateDesc(resp.data.issueDescription)
                updateStatus(resp.data.status)
                updateSeverity(resp.data.severity)
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
                                        Issue Id
                                    </Typography> 
                                </Grid>
                                <Grid item xs={2}>
                                   {viewModeEnabled && 
                                    <Button 
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={enableEditMode}
                                    >
                                        Edit
                                    </Button>}
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={deleteIssue}
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
                                                fullWidth={true}
                                                helperText={titleHelperText}
                                                value={title}
                                                onChange={onTitleChanged}
                                                disabled={viewModeEnabled}
                                                InputLabelProps={{ shrink: true}}
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
                                                value={desc}
                                                onChange={onDescChanged}
                                                disabled={viewModeEnabled}
                                                InputLabelProps={{ shrink: true}}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Due Date"
                                                error={dueDateError}
                                                fullWidth={true}
                                                helperText={dueDateHelperText}
                                                type='date'
                                                value={dueDate}
                                                onChange={onDueDateChanged}
                                                disabled={viewModeEnabled}
                                                InputLabelProps={{ shrink: true}}
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
                                                value={status}
                                                error={statusError}
                                                helperText={statusHelperText}
                                                onChange={onStatusChanged}
                                                disabled={viewModeEnabled}
                                            >
                                                {statusList.map((statusItem) => {return (
                                                    <MenuItem value={statusItem} key={statusItem}>{statusItem}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                select={true}
                                                label="Severity"
                                                // disabled={true}
                                                // defaultValue="High"
                                                value={severity}
                                                error={severityError}
                                                helperText={severityHelperText}
                                                fullWidth={true}
                                                onChange={onSeverityChanged}
                                                disabled={viewModeEnabled}
                                                >
                                                {severityList.map((severityItem) => {return (
                                                    <MenuItem value={severityItem} key={severityItem}>{severityItem}</MenuItem>
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
                                        onClick={validateIssueContent}
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