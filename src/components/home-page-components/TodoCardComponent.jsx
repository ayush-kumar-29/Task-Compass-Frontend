import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import todo_image from "../../assets/todo-image.png"

const cardStyle = ()=>({
    // width: 200,
    // height: 300,
    borderRadius: 2,
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

const imageStyle={
    width: '120px', 
    height: '120px',
}

export default function TodoCardComponent(props){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <CardContent>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <img src={todo_image} style={imageStyle}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography>{"Pending Todos: 4"}</Typography>
                        </Grid>

                        <Grid item>
                            <Button variant="contained"
                                    fullWidth={true}
                            >
                                My Todos
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}