import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import todo_image from "../../assets/todo-image.png"
import { useNavigate } from 'react-router-dom';
import { callRetrievTodosCountApi } from '../../api/TodoApiService';
import { AuthContext } from '../../auth/AuthContext';

const cardStyle = ()=>({
    width: 200,
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
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [todoCount, updateTodoCount] = useState(0)

    function goToTodosPage(){
        navigate("/todos")
    }

    useEffect(() => {
        // TODO: CHANGE USER NAME
        callRetrievTodosCountApi({userName: authContext.loggedInUserName, status:"OPEN"}, authContext.token)
        .then((resp) => {
            updateTodoCount(resp.data)
        })
        .catch((error) => console.log(error))
    }, [todoCount])

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
                            <Typography>{`Pending Todos: ${todoCount}`}</Typography>
                        </Grid>

                        <Grid item>
                            <Button 
                                variant="contained"
                                fullWidth={true}
                                onClick={goToTodosPage}
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