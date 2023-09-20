import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Checkbox, Chip, FormControlLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { callUpdateWorkItemStatusApi } from '../../api/WorkItemApiService';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

const sprintName="Sprint Name"

export default function WIItemComponent({workItemId, workItemTitle, dueDate, status, creatorName, onWorkItemStatusChanged}){
    const statusList=["NEW", "ONGOING", "COMPLETED"]

    const [workItemStatus, updateWorkItemStatus] = useState(status)
    const [workItemStatusChangedFlag, updateWorkItemStatusChangedFlag]  = useState(false)

    const navigate = useNavigate()
    
    function workItemStatusChanged(event){
        updateWorkItemStatus(event.target.value)
        updateWorkItemStatusChangedFlag(true)
    }

    function goToMoreInfo(){
        navigate(`/viewWorkItem/${workItemId}`)
    }

    useEffect(() =>{
        if(workItemStatusChangedFlag){
            callUpdateWorkItemStatusApi(workItemId, {updateType:"status", newStatus:workItemStatus.replace(" ", "%20")})
            .then((resp) => {
                console.log(resp)
            })
            .catch((error) => console.log(error))
            updateWorkItemStatusChangedFlag(false)
            onWorkItemStatusChanged()
        }
    })
    
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            {workItemId}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {workItemTitle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography>{`Due Date: ${dueDate}`}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Created By: <Chip label={creatorName}/></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    select={true}
                                    label="Status"
                                    // disabled={true}
                                    value={workItemStatus}
                                    onChange={workItemStatusChanged}
                                    fullWidth={true}
                                    >
                                    {
                                        statusList.map((statusItem) => {
                                            return (
                                                <MenuItem value={statusItem} key={statusItem}>{statusItem}</MenuItem>
                                            )
                                        }
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    onClick={goToMoreInfo}
                                >
                                    More Info
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}