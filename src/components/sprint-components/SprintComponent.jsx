import React from 'react';
import { Button, ButtonGroup, CardContent, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import SprintItemComponent from './SprintItemComponent';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function SprintComponent(){
    return(
        <div>
            <div style={{position: 'sticky',top: '50px', zIndex: 1}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container>
                        <Grid item xs={2}></Grid>

                        <Grid item xs={4}>
                            <Button variant="contained"
                                    fullWidth={true}
                            >
                                Create a new Sprint
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <FormGroup row>
                                <FormControlLabel control={<Switch defaultChecked />} label="Ongoing" />
                                <FormControlLabel control={<Switch />} label="Closed" />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={1}></Grid>
                    </Grid>
                </Paper>
            </div>
            <main style={{flex: '1', overflowY: 'auto', zIndex: 0}}>
                <Grid container justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <div style={gridPosition}>
                            <Grid container spacing={1} justifyContent="center" direction="column">
                                <Grid item >
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                                <Grid item>
                                    <SprintItemComponent/>
                                </Grid>
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}