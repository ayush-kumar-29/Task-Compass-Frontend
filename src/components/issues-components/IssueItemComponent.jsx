import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Checkbox, Chip, FormControlLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { callUpdateIssueStatusApi } from '../../api/IssueApiService';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function IssueItemComponent({issueId, issueTitle, severity, creatorName, status, onIssueStatusChanged}){
    const statusList=["NEW", "IN PROGRESS", "RESOLVED"]

    const navigate = useNavigate()

    const [issueStatus, updateIssueStatus]  = useState(status)
    const [issueStatusChangedFlag, updateIssueStatusChangedFlag]  = useState(false)

    function issueStatusChanged(event){
        updateIssueStatus(event.target.value)
        updateIssueStatusChangedFlag(true)
    }

    useEffect(() =>{
        if(issueStatusChangedFlag){
            callUpdateIssueStatusApi(issueId, {updateType:"status", newStatus:issueStatus.replace(" ", "%20")})
            .then((resp) => {
                console.log(resp)
            })
            .catch((error) => console.log(error))
            updateIssueStatusChangedFlag(false)
            onIssueStatusChanged()
        }
    })

    function goToMoreInfo(){
        navigate(`/viewIssue/${issueId}`)
    }
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
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
                                        {issueId}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {issueTitle}
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
                                    <Typography>Severity: <Chip label={severity}/></Typography>
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
                                value={issueStatus}
                                onChange={issueStatusChanged}
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
                                // fullWidth={true}
                            >
                                More Info
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}