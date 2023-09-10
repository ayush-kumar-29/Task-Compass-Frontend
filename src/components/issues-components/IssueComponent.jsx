import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, ButtonGroup, CardContent, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IssueItemComponent from './IssueItemComponent';
import { callRetrieveUserNamesApi } from '../../api/UserApiService';
import { callRetrieveIssuesForFilterApi } from '../../api/IssueApiService';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function IssueComponent(){
    const navigate = useNavigate()
    const [userNames, setUserNames] = useState([])
    const [newFilter, updateNewFilterStatus] = useState(true)
    const [inProgressFilter, updateInProgressFilterStatus] = useState(false)
    const [resolvedFilter, updateResolvedFilterStatus] = useState(false)
    const [filterModified, setfilterModified] = useState(true)
    const [issueStatusChanged, setIssueStatusChanged] = useState(false)
    // TODO: CHANGE USER NAME
    const [assigneeFilter, setAssigneeFilter] = useState("user1")
    const [issuesList, setIssuesList] = useState([])

    const newFilterChanged =(event) => {
        updateNewFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const inProgressFilterChanged =(event) => {
        updateInProgressFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const resolvedFilterChanged =(event) => {
        updateResolvedFilterStatus(event.target.checked)
        setfilterModified(true)
    }

    useEffect(() => {
        if(filterModified || issueStatusChanged){
            callRetrieveUserNamesApi()
            .then((resp) => {
                setUserNames(resp.data)
            })
            .catch((error) => console.log(error))

            callRetrieveIssuesForFilterApi(assigneeFilter, newFilter, inProgressFilter, resolvedFilter)
            .then((resp) => {
                // console.log(resp.data)
                setIssuesList(resp.data)
            })
            .catch((error) => console.log(error))

            setfilterModified(false)
            setIssueStatusChanged(false)
        }
    })

    function addNewIssue(){
        navigate("/addIssue")
    }

    function onIssueStatusChanged(){
        setIssueStatusChanged(true)
    }

    return(
        <>
            <div style={{position: 'sticky',top: '50px', zIndex: 2}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={0.5}></Grid>

                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                options={userNames}
                                fullWidth={true}
                                value={assigneeFilter}
                                onChange={(event, value) => {
                                    setAssigneeFilter(value)
                                    setfilterModified(true)
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setAssigneeFilter(newInputValue)
                                    setfilterModified(true)
                                }}
                                renderInput={(params) => <TextField {...params} label="Assignee"/>}    
                            />
                        </Grid>
                        
                        <Grid item xs={1}></Grid>

                        <Grid item xs={2}>
                            <Button 
                                variant="contained"
                                fullWidth={true}
                                onClick={addNewIssue}
                            >
                                Create Issue
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={newFilter} 
                                            onChange={newFilterChanged}
                                        />
                                    } 
                                    label="New" 
                                />
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={inProgressFilter} 
                                            onChange={inProgressFilterChanged}
                                        />
                                    } 
                                    label="In Progress" 
                                />
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={resolvedFilter}
                                            onChange={resolvedFilterChanged} 
                                        />
                                    } 
                                    label="Resolved" 
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                    </Grid>
                </Paper>
            </div>
            <main style={{flex: '1', overflowY: 'auto', zIndex: 0}}>
                <Grid container justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <div style={gridPosition}>
                            <Grid container spacing={1} justifyContent="center" direction="column">
                                {issuesList.map(
                                    issue => (
                                        <Grid item key={issue.issueId}>
                                            <IssueItemComponent 
                                                issueId={issue.issueId}
                                                issueTitle={issue.issueTitle}
                                                severity={issue.severity}
                                                creatorName={issue.creatorName}
                                                status={issue.status}
                                                onIssueStatusChanged={onIssueStatusChanged}
                                            />
                                        </Grid>        
                                    )
                                )}
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </>
    )
}