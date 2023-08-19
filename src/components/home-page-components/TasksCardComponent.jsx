import React from 'react';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import task_image from "../../assets/task-image.png"

const cardStyle = ()=>({
    // width: 200,
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

export default function TasksCardComponent(){
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
                                <Typography>{"Pending Tasks: 4"}</Typography>
                            </Grid>

                            <Grid item>
                                <Button variant="contained"
                                        fullWidth={true}
                                >
                                    My Tasks
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}