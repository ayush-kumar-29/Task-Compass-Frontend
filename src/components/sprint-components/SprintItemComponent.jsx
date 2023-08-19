import React from 'react';
import { Button, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';

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

export default function SprintItemComponent(){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
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
                                        <Typography>Start Date: 2023-08-31</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>End Date: 2023-08-31</Typography>
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
                                        >
                                            Close Sprint
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Pending Tasks: 31</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    // fullWidth={true}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    // fullWidth={true}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}