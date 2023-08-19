import React from 'react';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import issue_image from "../../assets/issue-image.png"

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
    display: 'flex', 
    justifyContent:"center"
}

export default function IssuesCardComponent(){
    return(
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <img src={issue_image} style={imageStyle}/>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography>{"Pending Issues: 4"}</Typography>
                            </Grid>

                            <Grid item>
                                <Button variant="contained"
                                        fullWidth={true}
                                >
                                    My Issues
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}