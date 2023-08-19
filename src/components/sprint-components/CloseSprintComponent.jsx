import React from 'react';
import { Button, CardContent, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
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

export default function CloseSprintComponent(){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5">
                                Warning: All the tasks will be closed!
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                direction="column"
                            >
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h6">
                                        Open Tasks: 12
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Link underline="hover">Show Open Tasks</Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Grid container
                                spacing={2}
                            >
                                <Grid item xs={6}>
                                    <Button variant="contained"
                                            fullWidth={true}
                                    >
                                        Go Back
                                    </Button>

                                </Grid>

                                <Grid item xs={6}>
                                    <Button variant="contained"
                                            fullWidth={true}
                                    >
                                        Close Sprint
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}