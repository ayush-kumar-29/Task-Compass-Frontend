import React, { useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
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

export default function EditTodoComponent(){
    const [todo, setTodo] = useState()
    const params = useParams()

    useEffect(() => {
        // TODO: CHANGE USERNAME
        callRetrieveTodoApi({userName:"user1", open:openFilter, completed:completedFilter})
        .then((resp) => {
            // console.log(resp.data)
            setTodo(resp.data)
        })
        .catch((error) => console.log(error))
    })

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
                                    Edit a Todo
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    // error={true}
                                    // helperText="Description is empty"
                                    multiline
                                    defaultValue="Default Value"
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
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}