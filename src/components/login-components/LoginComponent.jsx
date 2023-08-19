import React from 'react';
import { Button, CardContent, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
    padding:2,
    marginBottom:"1px"
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function LoginComponent(){
    return(
        <main style={{flex: '1', overflowY: 'auto'}}>
            <div style={cardPosition}>
                <Card sx={cardStyle}>
                    {/* <React.Fragment> */}
                        <CardContent>
                            <Grid container 
                                direction="column"
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5">Login</Typography>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        label="User Name"
                                        error={true}
                                        helperText="Invalid User Name"
                                    />        
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        // error={true}
                                        // helperText="Incorrect Password"
                                        helperText=""
                                        type="password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained"
                                            fullWidth={true}
                                    >
                                        Login
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography fontSize={12}>Don't have an account? <Link underline="hover">Sign Up</Link></Typography>
                                </Grid>
                            </Grid> 
                        </CardContent>
                    {/* </React.Fragment> */}
                </Card>
            </div>
        </main>
    )
}