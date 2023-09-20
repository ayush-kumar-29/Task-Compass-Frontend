import React, { useEffect, useState } from 'react';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import task_image from "../../assets/task-image.png"
import { useNavigate } from 'react-router-dom';
import { callRetrieveWorkItemCountApi } from '../../api/WorkItemApiService';

const cardStyle = ()=>({
    width: 200,
    // height: 300,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

const imageStyle={
    width: '130px', 
    height: '120px',
}

export default function WorkItemCardComponent(){
    const navigate = useNavigate()

    const [workItemCount, updateWorkItemCount] = useState(0)

    function goToWorkItemsPage(){
        navigate("/workItems")
    }

    useEffect(() => {
        var count=0
        // TODO: CHANGE USER NAME
        callRetrieveWorkItemCountApi({userName:"user1", sprintId:-1, status:"NEW"})
        .then((resp) => {
            count+=resp.data
        })
        .catch((error) => console.log(error))
        
        // TODO: CHANGE USER NAME
        callRetrieveWorkItemCountApi({userName:"user1", sprintId:-1, status:"ONGOING"})
        .then((resp) => {
            count+=resp.data
            updateWorkItemCount(count)
        })
        .catch((error) => console.log(error))
    }, [workItemCount])
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <img src={task_image} style={imageStyle}/>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography>{`Pending Work Items: ${workItemCount}`}</Typography>
                            </Grid>

                            <Grid item>
                                <Button 
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={goToWorkItemsPage}
                                >
                                    My Work Items
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}