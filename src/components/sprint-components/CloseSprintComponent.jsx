import React, { useContext, useEffect, useState } from 'react';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { callRetrieveWorkItemCountApi } from '../../api/WorkItemApiService';
import { callUpdateSprintStatusApi } from '../../api/SprintApiService';
import { AuthContext } from '../../auth/AuthContext';
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

export default function CloseSprintComponent({openFlag, setOpenFlag, onSprintStatusChanged, sprintName, sprintId}){
    const authContext = useContext(AuthContext)
    const [initialValuesFetched, updateInitialValuesFetched] = useState(false)
    const [newWorkItemCount, updateNewWorkItemCount] = useState()
    const [ongoingWorkItemCount, updateOngoingWorkItemCount] = useState()

    const navigate = useNavigate()

    function closeSprint(){
        callUpdateSprintStatusApi(sprintId, {updateType:"status", newStatus:"CLOSED"}, authContext.token)
        .then((resp) => {
            setOpenFlag(false)
            onSprintStatusChanged()
        })
        .catch((error) => console.log(error))
    }

    useEffect(() =>{
        if(!initialValuesFetched){
            // TODO: CHANGE USER NAME
            callRetrieveWorkItemCountApi({userName:authContext.loggedInUserName, sprintId:sprintId, status:"NEW"}, authContext.token)
            .then((resp) => {
                updateNewWorkItemCount(resp.data)
            })
            .catch((error) => console.log(error))

            // TODO: CHANGE USER NAME
            callRetrieveWorkItemCountApi({userName:authContext.loggedInUserName, sprintId:sprintId, status:"ONGOING"}, authContext.token)
            .then((resp) => {
                updateOngoingWorkItemCount(resp.data)
            })
            .catch((error) => console.log(error))

            updateInitialValuesFetched(true)
        }
    })

    return(
        <Dialog
            open={openFlag}
            onClose={() => {setOpenFlag(false)}}
        >
            <DialogTitle>
                {"Do you want to close the sprint?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Warning: All the uncompleted work items will be closed!
                </DialogContentText>
                <br></br>
                <DialogContentText>
                    {`New Work Items: ${newWorkItemCount}`}
                </DialogContentText>
                <DialogContentText>
                    {`Ongoing Work Items: ${ongoingWorkItemCount}`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    onClick={() => {setOpenFlag(false)}}
                >
                    Go Back
                </Button>
                <Button
                    variant="contained"
                    onClick={closeSprint}
                >
                    Close Sprint
                </Button>
            </DialogActions>
        </Dialog>
        // <div style={cardPosition}>
        //     <Card sx={cardStyle}>
        //         <CardContent>
        //             <Grid container
        //                 direction="column"
        //                 spacing={2}
        //             >
        //                 <Grid item xs={12}>
        //                     <Typography align="center" variant="h5">
        //                         Warning: All the tasks will be closed!
        //                     </Typography>
        //                 </Grid>

        //                 <Grid item xs={12}>
        //                     <Grid container
        //                         direction="column"
        //                     >
        //                         <Grid item xs={12}>
        //                             <Typography align="center" variant="h6">
        //                                 Open Tasks: 12
        //                             </Typography>
        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <Link underline="hover">Show Open Tasks</Link>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
                        
        //                 <Grid item xs={12}>
        //                     <Grid container
        //                         spacing={2}
        //                     >
        //                         <Grid item xs={6}>
        //                             <Button variant="contained"
        //                                     fullWidth={true}
        //                             >
        //                                 Go Back
        //                             </Button>

        //                         </Grid>

        //                         <Grid item xs={6}>
        //                             <Button variant="contained"
        //                                     fullWidth={true}
        //                             >
        //                                 Close Sprint
        //                             </Button>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </CardContent>
        //     </Card>
        // </div>
    )
}