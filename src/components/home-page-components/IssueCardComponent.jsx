import React, { useEffect, useState } from 'react';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import issue_image from "../../assets/issue-image.png"
import { useNavigate } from 'react-router-dom';
import { callRetrieveIssueCountApi } from '../../api/IssueApiService';

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
    display: 'flex', 
    justifyContent:"center"
}

export default function IssueCardComponent(){
    const navigate = useNavigate()

    const [issueCount, updateIssueCount] = useState(0)

    function goToIssuesPage(){
        navigate("/issues")
    }

    useEffect(() => {
        // TODO: CHANGE USER NAME
        var count=0
        callRetrieveIssueCountApi({userName:"user1", status:"NEW"})
        .then((resp) => {
            count+=resp.data
        })
        .catch((error) => console.log(error))

        // TODO: CHANGE USER NAME
        callRetrieveIssueCountApi({userName:"user1", status:"IN%20PROGRESS"})
        .then((resp) => {
            count+=resp.data
            updateIssueCount(count)
        })
        .catch((error) => console.log(error))
    }, [issueCount])
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
                                <Typography>{`Pending Issues: ${issueCount}`}</Typography>
                            </Grid>

                            <Grid item>
                                <Button 
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={goToIssuesPage}
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