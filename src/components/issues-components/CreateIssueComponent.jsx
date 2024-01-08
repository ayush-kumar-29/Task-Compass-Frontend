import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { callRetrieveUserNamesApi, callValidateUserNamesApi } from '../../api/UserApiService';
import { callAddIssueApi } from '../../api/IssueApiService';
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

export default function CreateIssueComponent(){
    // const assigneeList=["User-1", "User-2", "User-3"]
    const priority=["HIGH", "MEDIUM", "LOW"]
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const [title, updateTitle] = useState()
    const [titleError, setTitleError] = useState(false)
    const [titleHelperText, setTitleHelperText] = useState()

    const [desc, updateDesc] = useState()
    const [descError, setDescError] = useState(false)
    const [descHelperText, setDescHelperText] = useState()

    const [severity, updateSeverity] = useState('')
    const [severityError, setSeverityError] = useState(false)
    const [severityHelperText, setSeverityHelperText] = useState()

    const [assignee, updateAssignee] = useState()
    const [assigneeError, setAssigneeError] = useState(false)
    const [assigneeHelperText, setAssigneeHelperText] = useState()

    const [dueDate, updateDueDate] = useState()
    const [dueDateError, setDueDateError] = useState(false)
    const [dueDateHelperText, setDueDateHelperText] = useState()

    const [assigneeList, setAssigneeList] = useState([])
    const [userListFetched, setUserListFetched] = useState(false)

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

    function onTitleChanged(event){
        updateTitle(event.target.value)
    }

    function onDescChanged(event){
        updateDesc(event.target.value)
    }

    function onSeverityChanged(event){
        updateSeverity(event.target.value)
    }

    function onDueDateChanged(event){
        updateDueDate(event.target.value)
    }

    useEffect(() => {
        if(!userListFetched){
            callRetrieveUserNamesApi(authContext.token)
            .then((resp) => {
                setAssigneeList(resp.data)
            })
            .catch((error) => console.log(error))
            setUserListFetched(true)
        }
    })

    function addIssue(){
        // TODO: CHANGE USER NAME
        callAddIssueApi(
            {
                issueTitle: title,
                issueDescription: desc,
                dueDate: dueDate, 
                severity: severity,
                assigneeName: assignee,
                // TODO: CHANGE USER NAME
                creatorName: authContext.loggedInUserName
            }, 
            authContext.token
        )
        .then((resp) => {
            navigate("/issues")
        })
        .catch((error) => console.log(error))
    }


    function discardChanges(){
        navigate("/issues")
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
                                        Create Issue
                                    </Typography> 
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                spacing={3}
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
                                                rows={3}
                                                onChange={onDescChanged}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Grid container
                                        spacing={2.3}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Severity"
                                                size="small"
                                                value={severity}
                                                error={severityError}
                                                helperText={severityHelperText}
                                                fullWidth={true}
                                                onChange={onSeverityChanged}
                                                >
                                                {priority.map((priority) => {return (
                                                    <MenuItem value={priority} key={priority}>{priority}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                options={assigneeList}
                                                size="small"
                                                fullWidth={true}
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
                                            <TextField
                                                label="Due Date"
                                                error={dueDateError}
                                                fullWidth={true}
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