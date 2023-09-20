import React, { useEffect, useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { callAddSprintApi, callValidateSprintNameApi } from '../../api/SprintApiService';
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

export default function CreateSprintComponent(){
    const navigate = useNavigate()

    const [sprint, updateSprint] = useState()
    const [sprintError, setSprintError] = useState(false)
    const [sprintHelperText, setSprintHelperText] = useState()

    const [startDate, updateStartDate] = useState()
    const [startDateError, setStartDateError] = useState(false)
    const [startDateHelperText, setStartDateHelperText] = useState()

    const [endDate, updateEndDate] = useState()
    const [endDateError, setEndDateError] = useState(false)
    const [endDateHelperText, setEndDateHelperText] = useState()

    const [sprintNameExists, updateSprintNameExists] = useState(false)

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

    // async function isSprintNameDuplicate(){
    //     try{
    //         const resp=await 
    //         return resp.data
    //     }
    //     catch(error){
    //         console.log(error)
    //         return false
    //     }
        
        
    // }

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
        else if(sprintNameExists){
            makeApiCall=false
            setSprintError(true)
            setSprintHelperText("Sprint name already exists.")
        }

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

        if(makeApiCall)
            createSprint()
    }

    function createSprint(){
        callAddSprintApi(
            {
                sprintName: sprint,
                sprintStartDate: startDate,
                sprintEndDate: endDate, 
            }
        )
        .then((resp) => {
            navigate("/sprints")
        })
        .catch((error) => console.log(error))
    }

    useEffect(() =>{
        callValidateSprintNameApi(sprint)
        .then((resp) => {
            if(resp.data)
                updateSprintNameExists(true)
            else
                updateSprintNameExists(false)
        })
        .catch((error) => console.log(error))
    }, [sprint])

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
                                    Create Sprint
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Sprint Name"
                                    error={sprintError}
                                    helperText={sprintHelperText}
                                    value={sprint}
                                    onChange={onSprintNameChanged}
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
                                            Create
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