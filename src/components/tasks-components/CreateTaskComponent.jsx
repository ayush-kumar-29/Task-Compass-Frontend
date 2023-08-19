import React from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    width: 500,
    // height: 600,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function CreateTaskComponent(){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container
                        direction="column"
                        // spacing={2}
                    >
                        <Grid item xs={12}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5">
                                        Create Task
                                    </Typography> 
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained"
                                        fullWidth={true}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained"
                                        fullWidth={true}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Sprint End Date"
                                error={false}
                                helperText=""
                                type=''
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained"
                                    fullWidth={true}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}