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

export default function ViewIssueComponent(){
    const sprints=["Sprint-1", "Sprint-2", "Sprint-3"]
    const assignee=["User-1", "User-2", "User-3"]
    const status=["New", "In Progress", "Resolved"]
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
                                spacing={2}
                            >
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5">
                                        Issue Id
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
                            <Grid container
                                spacing={3}
                            >
                                <Grid item xs={7.5}>
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

                                        {/* <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                options={sprints}
                                                fullWidth={true}
                                                renderInput={(params) => <TextField {...params} label="Sprint" />}    
                                            />
                                        </Grid> */}

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
                                
                                <Grid item xs={4.5}>
                                    <Grid container
                                        spacing={1.5}
                                    >
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Status"
                                                fullWidth={true}
                                                >
                                                {status.map((status) => {return (
                                                    <MenuItem value={status}>{status}</MenuItem>
                                                )})}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                select={true}
                                                label="Priority"
                                                // disabled={true}
                                                // defaultValue="High"
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
                                                fullWidth={true}
                                                renderInput={(params) => <TextField {...params} label="Assignee" />}    
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container
                                                spacing={1.2}
                                            >
                                                <Grid item xs={12}></Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled
                                                        label="Created By"
                                                        fullWidth={true}
                                                        size="small"
                                                        defaultValue="User-2"
                                                    />
                                                </Grid>

                                                <Grid item xs={12}></Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled
                                                        label="Created On"
                                                        fullWidth={true}
                                                        size="small"
                                                        defaultValue="22-08-2023"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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
            </Card>
        </div>
    )
}