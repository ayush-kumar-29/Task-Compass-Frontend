import React from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
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

export default function EditSprintComponent(){
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
                                    error={true}
                                    helperText="Sprint Name is empty"
                                />  
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Sprint Start Date"
                                    error={false}
                                    helperText=""
                                    type=''
                                />
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
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}