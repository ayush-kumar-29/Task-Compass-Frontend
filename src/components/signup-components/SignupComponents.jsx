import React from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
    marginBottom:"2px"
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function SignupComponent(){
    return(
        <main  style={{flex: '1', overflowY: 'auto'}}>
            <div style={cardPosition}>
                <Card sx={cardStyle}>
                    <React.Fragment>
                        <CardContent>
                            <Grid container 
                                    direction="column"
                                    spacing={2}
                            >
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5">Sign Up</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        error={false}
                                        helperText=""
                                    />   
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="User Name"
                                        error={true}
                                        helperText="Enter a user name"
                                    />   
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        error={false}
                                        helperText=""
                                        type="password"
                                    />  
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" 
                                            disabled={false}
                                            fullWidth={true}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </div>
        </main>
    )
}