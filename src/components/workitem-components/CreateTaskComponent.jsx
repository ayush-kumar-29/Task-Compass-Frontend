import React, { useState } from 'react';
import { Autocomplete, Button, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
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
    const sprints=["Sprint-1", "Sprint-2", "Sprint-3"]
    const assignee=["User-1", "User-2", "User-3"]
    const status=["New", "Ongoing", "Closed"]
    const priority=["High", "Medium", "Low"]
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5">
                                        Create Task
                                    </Typography> 
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained"
                                        fullWidth={true}
                                    >
                                        Discard
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                spacing={3}
                            >
                                <Grid item xs={7}>
                                    <Grid container
                                        spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                error={false}
                                                fullWidth={true}
                                                helperText=""
                                                type=''
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                error={false}
                                                helperText=""
                                                multiline
                                                fullWidth={true}
                                                rows={6}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item xs={5}>
                                    <Grid container
                                        spacing={2.1}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                label="Priority"
                                                size="small"
                                                fullWidth={true}
                                                >
                                                {priority.map((priority) => {return (
                                                    <MenuItem value={priority}>{priority}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={assignee}
                                                size="small"
                                                fullWidth={true}
                                                renderInput={(params) => <TextField {...params} label="Assignee" />}    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={sprints}
                                                fullWidth={true}
                                                // size="small"
                                                renderInput={(params) => <TextField {...params} label="Sprint" />}    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Due Date"
                                                error={false}
                                                fullWidth={true}
                                                helperText=""
                                                type=''
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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