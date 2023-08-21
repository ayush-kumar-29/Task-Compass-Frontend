import React from 'react';
import { Autocomplete, Button, ButtonGroup, CardContent, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import IssueItemComponent from './IssueItemComponent';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function IssueComponent(){
    const sprintNames=["User-1", "User-2", "User-3"]
    const taskIds=["Task-1", "Task-2", "Task-3"]
    return(
        <div>
            <div style={{position: 'sticky',top: '50px', zIndex: 2}}>
                <Paper elevation={0} square sx={{padding:2}} variant='outlined'> 
                    <Grid container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={0.5}></Grid>

                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                options={sprintNames}
                                fullWidth={true}
                                renderInput={(params) => <TextField {...params} label="Assignee" />}    
                            />
                        </Grid>
                        
                        <Grid item xs={1}></Grid>

                        <Grid item xs={2}>
                            <Button variant="contained"
                                    fullWidth={true}
                            >
                                Create Issue
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <FormGroup row>
                                <FormControlLabel control={<Switch defaultChecked />} label="New" />
                                <FormControlLabel control={<Switch />} label="In Progress" />
                                <FormControlLabel control={<Switch />} label="Resolved" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                    </Grid>
                </Paper>
            </div>
            <main style={{flex: '1', overflowY: 'auto', zIndex: 0}}>
                <Grid container justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        <div style={gridPosition}>
                            <Grid container spacing={1} justifyContent="center" direction="column">
                                <Grid item >
                                    <IssueItemComponent/>
                                </Grid>
                                <Grid item>
                                    <IssueItemComponent/>
                                </Grid>
                                <Grid item>
                                    <IssueItemComponent/>
                                </Grid>
                                <Grid item>
                                    <IssueItemComponent/>
                                </Grid>
                                <Grid item>
                                    <IssueItemComponent/>
                                </Grid>
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}