import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, CardContent, Dialog, DialogTitle, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import SprintItemComponent from './SprintItemComponent';
import { useNavigate } from 'react-router-dom';
import { callRetrieveSprintsForFilterApi } from '../../api/SprintApiService';
import DeleteSprintComponent from './DeleteSprintComponent';
import CloseSprintComponent from './CloseSprintComponent';
import { AuthContext } from '../../auth/AuthContext';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function SprintComponent(){
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [filterModified, setfilterModified] = useState(true)
    const [upcomingFilter, updateUpcomingFilterStatus] = useState(true)
    const [ongoingFilter, updateOngoingFilterStatus] = useState(false)
    const [closedFilter, updateClosedFilterStatus] = useState(false)
    const [sprintList, setSprintList] = useState([])
    const [sprintStatusChanged, setSprintStatusChanged] = useState(false)
    const [showDeleteSprintDialog, setShowDeleteSprintDialog] = useState(false)
    const [showCloseSprintDialog, setShowCloseSprintDialog] = useState(false)
    const [sprintNameToUpdate, setSprintNameToUpdate] = useState()
    const [sprintIdToUpdate, setSprintIdToUpdate] = useState()

    const upcomingFilterChanged =(event) => {
        updateUpcomingFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const ongoingFilterChanged =(event) => {
        updateOngoingFilterStatus(event.target.checked)
        setfilterModified(true)
    }
    const closedFilterChanged =(event) => {
        updateClosedFilterStatus(event.target.checked)
        setfilterModified(true)
    }

    function createSprint(){
        navigate("/createSprint")
    }

    function onSprintStatusChanged(){
        setSprintStatusChanged(true)
    }

    function onDeleteSprintInvoked(sprintName, sprintId){
        setSprintNameToUpdate(sprintName)
        setSprintIdToUpdate(sprintId)
        setShowDeleteSprintDialog(true)
    }

    function onCloseSprintInvoked(sprintName, sprintId){
        setSprintNameToUpdate(sprintName)
        setSprintIdToUpdate(sprintId)
        setShowCloseSprintDialog(true)
    }

    useEffect(() => {
        if(filterModified || sprintStatusChanged){
            callRetrieveSprintsForFilterApi(upcomingFilter, ongoingFilter, closedFilter, authContext.token)
            .then((resp) => {
                setSprintList(resp.data)
            })
            .catch((error) => console.log(error))

            setfilterModified(false)
            setSprintStatusChanged(false)
        }
    })

    return(
        <div>
            {
                showDeleteSprintDialog && 
                <DeleteSprintComponent 
                    openFlag={showDeleteSprintDialog} 
                    setOpenFlag={setShowDeleteSprintDialog} 
                    sprintName={sprintNameToUpdate}
                    sprintId={sprintIdToUpdate}
                    setSprintStatusChanged={setSprintStatusChanged}
                />
            }
            {
                showCloseSprintDialog && 
                <CloseSprintComponent
                    openFlag={showCloseSprintDialog} 
                    setOpenFlag={setShowCloseSprintDialog}
                    onSprintStatusChanged={onSprintStatusChanged}
                    sprintName={sprintNameToUpdate}
                    sprintId={sprintIdToUpdate}
                />
            }
            <div style={{position: 'sticky',top: '50px', zIndex: 1}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>

                        <Grid item xs={4}>
                            <Button 
                                variant="contained"
                                fullWidth={true}
                                onClick={createSprint}
                            >
                                Create a new Sprint
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={5}>
                            <FormGroup row>
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            checked={upcomingFilter}
                                            onChange={upcomingFilterChanged}
                                        />
                                    } 
                                    label="Upcoming" 
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
                                            checked={closedFilter}
                                            onChange={closedFilterChanged}
                                        />
                                    } 
                                    label="Closed" 
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
                                {sprintList.map(
                                    sprintItem => (
                                        <Grid item >
                                            <SprintItemComponent
                                                sprintId={sprintItem.sprintId}
                                                sprintName={sprintItem.sprintName}
                                                sprintStartDate={sprintItem.sprintStartDate}
                                                sprintEndDate={sprintItem.sprintEndDate}
                                                status={sprintItem.status}
                                                onSprintStatusChanged={onSprintStatusChanged}
                                                onDeleteSprintInvoked={onDeleteSprintInvoked}
                                                onCloseSprintInvoked={onCloseSprintInvoked}
                                            />
                                        </Grid>
                                    )
                                )}
                                {/* <Grid item >
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid> */}
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}