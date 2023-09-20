import React from 'react';
import { Button, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import TodoCardComponent from './TodoCardComponent';
import WorkItemCardComponent from './WorkItemCardComponent';
import IssueCardComponent from './IssueCardComponent';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"40px",
    marginBottom:"10px"
}

export default function HomePageComponent(){
    return(
        <main style={{flex: '1', overflowY: 'auto'}}>
            <div style={gridPosition}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        {/* TODO CHANGE USER NAME */}
                        <Typography variant="h3">{"Welcome User1"}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={11} justifyContent="center">
                            <Grid item>
                                <TodoCardComponent/>
                            </Grid>
                            <Grid item>
                                <WorkItemCardComponent/>
                            </Grid>
                            <Grid item>
                                <IssueCardComponent/>
                            </Grid>
                        </Grid> 
                    </Grid>
                </Grid>
            </div>
        </main>
    )
}