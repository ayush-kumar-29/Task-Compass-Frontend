import React from 'react';
import { Button, ButtonGroup, CardContent, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import TodoItemComponent from './TodoItemComponent';

const gridPosition = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100vh',
    overflowY: 'auto',
    // height: '80vh'
}

export default function TodoComponent(){
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
                                Add a new Todo
                            </Button>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <RadioGroup row>
                                <FormControlLabel value="open" control={<Radio />} label="Open"/>
                                {/* checked */}
                                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                            </RadioGroup>
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
                                    <TodoItemComponent/>
                                </Grid>
                                <Grid item>
                                    <TodoItemComponent/>
                                </Grid>
                                <Grid item>
                                    <TodoItemComponent/>
                                </Grid>
                                <Grid item>
                                    <TodoItemComponent/>
                                </Grid>
                                <Grid item>
                                    <TodoItemComponent/>
                                </Grid>
                            </Grid> 
                        </div>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}