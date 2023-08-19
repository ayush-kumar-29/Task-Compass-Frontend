import React from 'react';
import { Button, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import TodoCardComponent from './TodoCardComponent';
import TasksCardComponent from './TasksCardComponent';
import IssuesCardComponent from './IssuesCardComponent';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"40px",
    marginBottom:"10px"
}

export default function SignupComponent(){
    return(
        <main style={{flex: '1', overflowY: 'auto'}}>
            <div style={gridPosition}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Typography variant="h3">Welcome User!</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={11} justifyContent="center">
                            <Grid item>
                                <TodoCardComponent/>
                            </Grid>
                            <Grid item>
                                <TasksCardComponent/>
                            </Grid>
                            <Grid item>
                                <IssuesCardComponent/>
                            </Grid>
                        </Grid> 
                    </Grid>
                </Grid>
            </div>
        </main>
    )
}