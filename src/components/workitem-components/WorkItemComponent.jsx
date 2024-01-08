import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, ButtonGroup, CardContent, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import WIItemComponent from './WIItemComponent';
import { useNavigate } from 'react-router-dom';
import { callRetrieveSprintNamesApi } from '../../api/SprintApiService';
import { callRetrieveUserNamesApi } from '../../api/UserApiService';
import { callRetrieveWorkItemsForFilterApi } from '../../api/WorkItemApiService';
import { AuthContext } from '../../auth/AuthContext';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function WorkItemComponent(){
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    
    const [sprintList, updateSprintList] = useState([])
    const [userNames, setUserNames] = useState([])
    const [filterModified, setfilterModified] = useState(true)
    const [workItemStatusChanged, setWorkItemStatusChanged] = useState(false)
    const [newFilter, updateNewFilterStatus] = useState(false)
    const [ongoingFilter, updateOngoingFilterStatus] = useState(true)
    const [completedFilter, updateCompletedFilterStatus] = useState(false)
    const [initialValuesFetched, updateInitialValuesFetched] = useState(false)
    // TODO: CHANGE SPRINT NAME
    const [sprintFilter, setSprintFilter] = useState("")
    // TODO: CHANGE USER NAME
    const [assigneeFilter, setAssigneeFilter] = useState(authContext.loggedInUserName)
    const [workItemList, setWorkItemList] = useState([])

    useEffect(() => {
        if(filterModified || workItemStatusChanged){
            if(!initialValuesFetched){
                callRetrieveSprintNamesApi(authContext.token)
                .then((resp) => {
                    updateSprintList(resp.data)
                    setSprintFilter(resp.data[0])
                })
                .catch((error) => console.log(error))

                callRetrieveUserNamesApi(authContext.token)
                .then((resp) => {
                    setUserNames(resp.data)
                })
                .catch((error) => console.log(error))
                updateInitialValuesFetched(true)
            }
            
            callRetrieveWorkItemsForFilterApi(sprintFilter, assigneeFilter, newFilter, 
                ongoingFilter, completedFilter, authContext.token)
            .then((resp) => {
                setWorkItemList(resp.data)
            })
            .catch((error) => console.log(error))

            setfilterModified(false)
            setWorkItemStatusChanged(false)
        }
    })

    function addNewIssue(){
        navigate("/addWorkItem")
    }

    const newFilterChanged =(event) => {
        updateNewFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const ongoingFilterChanged =(event) => {
        updateOngoingFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const completedFilterChanged =(event) => {
        updateCompletedFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    function onWorkItemStatusChanged(){
        setWorkItemStatusChanged(true)
    }

    const taskIds=["Task-1", "Task-2", "Task-3"]
    return(
        <div>
            <div style={{position: 'sticky',top: '50px', zIndex: 1}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                options={sprintList}
                                value={sprintFilter}
                                fullWidth={true}
                                onChange={(event, value) => {
                                    setSprintFilter(value)
                                    setfilterModified(true)
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setSprintFilter(newInputValue)
                                    setfilterModified(true)
                                }}
                                renderInput={(params) => <TextField {...params} label="Sprint" />}    
                            />
                        </Grid>

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
                                renderInput={(params) => <TextField {...params} label="Assignee" />}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Button 
                                variant="contained"
                                fullWidth={true}
                                onClick={addNewIssue}
                            >
                                Create Work Item
                            </Button>
                        </Grid>

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
                                            checked={ongoingFilter} 
                                            onChange={ongoingFilterChanged}
                                        />
                                    } 
                                    label="Ongoing" 
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
                        {/* <Grid item xs={1}></Grid> */}
                    </Grid>
                </Paper>
            </div>
            <main style={{flex: '1', overflowY: 'auto', zIndex: 0}}>
                <Grid container justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <div style={gridPosition}>
                            <Grid container spacing={1} justifyContent="center" direction="column">
                                {workItemList.map(
                                    workItem => (
                                        <Grid item >
                                            <WIItemComponent
                                                workItemId={workItem.workItemId}
                                                workItemTitle={workItem.workItemTitle}
                                                dueDate={workItem.dueDate}
                                                status={workItem.status}
                                                creatorName={workItem.creatorName}
                                                onWorkItemStatusChanged={onWorkItemStatusChanged}
                                            />
                                        </Grid>
                                    )
                                )}
                                {/* <Grid item>
                                    <WIItemComponent/>
                                </Grid>
                                <Grid item>
                                    <WIItemComponent/>
                                </Grid>
                                <Grid item>
                                    <WIItemComponent/>
                                </Grid>
                                <Grid item>
                                    <WIItemComponent/>
                                </Grid> */}
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}