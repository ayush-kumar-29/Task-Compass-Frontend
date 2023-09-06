import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CardContent, Checkbox, Chip, FormControlLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

const sprintName="Sprint Name"

export default function TaskItemComponent(){
    const [status, setStatus]=useState("New")
    const handleChange = (event) => {
        setStatus(event.target.value);
      };
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Task Id
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Task Title
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography>Due Date: 20-08-2023</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Assignee: <Chip label="User Name"/></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Select
                                    defaultValue="New"
                                    value={status}
                                    // label="Age"
                                    onChange={handleChange}
                                    fullWidth={true}
                                >
                                    <MenuItem value={"New"}>New</MenuItem>
                                    <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    // fullWidth={true}
                                >
                                    More Info
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}