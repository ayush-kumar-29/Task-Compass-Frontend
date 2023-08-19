import React from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function AddTodoComponent(){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container
                            direction="column"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">
                                    Add a new Todo
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    error={true}
                                    helperText="Description is empty"
                                    multiline
                                    rows={4}
                                />  
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Due By"
                                    error={false}
                                    helperText=""
                                    type=''
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained"
                                        fullWidth={true}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}