import React, { useContext, useEffect, useState } from 'react';
import { Button, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import { callRetrieveOngoingWorkItemCountApi, callRetrieveWorkItemCountApi } from '../../api/WorkItemApiService';
import { callDeleteSprintApi, callUpdateSprintStatusApi } from '../../api/SprintApiService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function SprintItemComponent({ sprintId, sprintName, sprintStartDate, sprintEndDate, status, 
    onSprintStatusChanged, onDeleteSprintInvoked, onCloseSprintInvoked}){
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    
    const [ongoingWorkItemCount, updateOngoingWorkItemCount] = useState()
    const [initialValuesFetched, updateInitialValuesFetched] = useState(false)
    const [statusButtonText, setStatusButtonText] = useState("Close Sprint")
    const [sprintStatusChangedFlag, setSprintStatusChangedFlag] = useState(false)
    const [nextSprintStatus, setNextSprintStatus] = useState()

    function sprintStatusChanged(){
        if(status=="ONGOING"){
            // setStatusButtonText("Close Sprint")
            // setNextSprintStatus("CLOSED")
            onCloseSprintInvoked(sprintName, sprintId)
        }
        else
            setSprintStatusChangedFlag(true)
    }

    function editSprintContent(){
        navigate(`/editSprint/${sprintId}`)
    }

    function showDeleteSprintDialog(){
        onDeleteSprintInvoked(sprintName, sprintId)
    }

    useEffect(() =>{
        if(!initialValuesFetched){
            // TODO: CHANGE USER NAME
            callRetrieveWorkItemCountApi({userName:authContext.loggedInUserName, sprintId:sprintId, status:"ONGOING"}, authContext.token)
            .then((resp) => {
                updateOngoingWorkItemCount(resp.data)
            })
            .catch((error) => console.log(error))
            updateInitialValuesFetched(true)

            console.log(status)

            if(status=="UPCOMING"){
                setStatusButtonText("Start Sprint")
                setNextSprintStatus("ONGOING")
            }
            else if(status=="CLOSED"){
                setStatusButtonText("Reopen Sprint")
                setNextSprintStatus("ONGOING")
            }
        }
        if(sprintStatusChangedFlag){
            callUpdateSprintStatusApi(sprintId, {updateType:"status", newStatus:nextSprintStatus}, authContext.token)
            .then((resp) => {
                console.log(resp)
                onSprintStatusChanged()
            })
            .catch((error) => console.log(error))
            setSprintStatusChangedFlag(false)
        }
    }, [initialValuesFetched, sprintStatusChangedFlag])

    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h5">{sprintName}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container 
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item>
                                    <Typography>{`Start Date: ${sprintStartDate}`}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{`End Date: ${sprintEndDate}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container 
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={sprintStatusChanged}
                                    >
                                        {statusButtonText}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Typography>{`Ongoing Work Items: ${ongoingWorkItemCount}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                // fullWidth={true}
                                onClick={editSprintContent}
                            >
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                // fullWidth={true}
                                onClick={showDeleteSprintDialog}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}