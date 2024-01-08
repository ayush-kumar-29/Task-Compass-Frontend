import React, { useContext, useEffect, useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { callRetrieveSprintForIdApi, callUpdateSprintContentApi, callValidateSprintNameApi } from '../../api/SprintApiService';
import { AuthContext } from '../../auth/AuthContext';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function EditSprintComponent(){
    const params = useParams()
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const [sprint, updateSprint] = useState()
    const [sprintError, setSprintError] = useState(false)
    const [sprintHelperText, setSprintHelperText] = useState()

    const [startDate, updateStartDate] = useState()
    const [startDateError, setStartDateError] = useState(false)
    const [startDateHelperText, setStartDateHelperText] = useState()

    const [endDate, updateEndDate] = useState()
    const [endDateError, setEndDateError] = useState(false)
    const [endDateHelperText, setEndDateHelperText] = useState()

    const [sprintStatus, updateSprintStatus] = useState(false)
    const [initialValuesFetched, setInitialValuesFetched] = useState(false)

    function onSprintNameChanged(event){
        updateSprint(event.target.value)
    }

    function onStartDateChanged(event){
        updateStartDate(event.target.value)
    }

    function onEndDateChanged(event){
        updateEndDate(event.target.value)
    }
    
    function discardChanges(){
        navigate("/sprints")
    }

    function validateSprintContent(){
        var makeApiCall=true

        setSprintError(false)
        setSprintHelperText(null)
        if(sprint==undefined || (sprint!=undefined && sprint.length==0)){
            console.log(1)
            makeApiCall=false
            setSprintError(true)
            setSprintHelperText("Sprint name cannot be empty.")
        }
        // else if(sprintNameExists){
        //     makeApiCall=false
        //     setSprintError(true)
        //     setSprintHelperText("Sprint name already exists.")
        // }

        setStartDateError(false)
        setStartDateHelperText(null)
        if(startDate==undefined || (startDate!=undefined && startDate.length==0)){
            makeApiCall=false
            setStartDateError(true)
            setStartDateHelperText("Start date cannot be empty.")
        }

        setEndDateError(false)
        setEndDateHelperText(null)
        if(endDate==undefined || (endDate!=undefined && endDate.length==0)){
            makeApiCall=false
            setEndDateError(true)
            setEndDateHelperText("End date cannot be empty.")
        }

        if(makeApiCall){
            callValidateSprintNameApi(sprint, authContext.token)
            .then((resp) => {
                if(resp.data){
                    setSprintError(true)
                    setSprintHelperText("Sprint name already exists.")
                }
                else
                editSprintContent()
            })
            .catch((error) => console.log(error))
        }
    }

    function editSprintContent(){
        callUpdateSprintContentApi(
            params.sprintId,
            {
                sprintName: sprint,
                sprintStartDate: startDate,
                sprintEndDate: endDate, 
                status: sprintStatus
            },
            {
                updateType: "content",
                newStatus: sprintStatus
            },
            authContext.token
        )
        .then((resp) => {
            navigate("/sprints")
        })
        .catch((error) => console.log(error))
    }

    useEffect(() =>{
        if(!initialValuesFetched){
            callRetrieveSprintForIdApi(params.sprintId, authContext.token)
            .then((resp) => {
                console.log(resp)
                updateSprint(resp.data.sprintName)
                updateStartDate(resp.data.sprintStartDate)
                updateEndDate(resp.data.sprintEndDate)
                updateSprintStatus(resp.data.status)
            })
            .catch((error) => console.log(error))
            setInitialValuesFetched(true)
        }
    }, [initialValuesFetched])

    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container
                            direction="column"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">
                                    Edit Sprint
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Sprint Name"
                                    error={sprintError}
                                    helperText={sprintHelperText}
                                    value={sprint}
                                    onChange={onSprintNameChanged}
                                    InputLabelProps={{ shrink: true}}
                                />  
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Sprint Start Date"
                                    error={startDateError}
                                    fullWidth
                                    helperText={startDateHelperText}
                                    InputLabelProps={{ shrink: true}}
                                    type='date'
                                    value={startDate}
                                    onChange={onStartDateChanged}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Sprint End Date"
                                    error={endDateError}
                                    fullWidth
                                    helperText={endDateHelperText}
                                    InputLabelProps={{ shrink: true}}
                                    type='date'
                                    value={endDate}
                                    onChange={onEndDateChanged}
                                />
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
                                            onClick={validateSprintContent}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}
/*
Upcoming
    -> Ongoing(Start)
Ongoing 
    -> Closed(Close)
Closed
    -> Ongoing(Reopen)
*/