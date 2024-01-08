import React, { useContext, useEffect, useState } from 'react';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { callRetrieveWorkItemCountApi } from '../../api/WorkItemApiService';
import { callDeleteSprintApi } from '../../api/SprintApiService';
import { useNavigate } from 'react-router-dom';
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

export default function DeleteSprintComponent({openFlag, setOpenFlag, sprintName, sprintId, setSprintStatusChanged}){
    const authContext = useContext(AuthContext)
    const [initialValuesFetched, updateInitialValuesFetched] = useState(false)
    const [newWorkItemCount, updateNewWorkItemCount] = useState()
    const [ongoingWorkItemCount, updateOngoingWorkItemCount] = useState()

    const navigate = useNavigate()

    function deleteSprint(){
        callDeleteSprintApi(sprintId, authContext.token)
        .then((resp) => {
            setOpenFlag(false)
            setSprintStatusChanged(true)
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
                {"Do you want to delete the sprint?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Warning: All the work items will be unassigned!
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
                    onClick={deleteSprint}
                >
                    Delete
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
        //                         Warning: All the tasks will be unassigned!
        //                     </Typography>
        //                 </Grid>

        //                 <Grid item xs={12}>
        //                     <Grid container
        //                         direction="column"
        //                     >
        //                         <Grid item xs={12}>
        //                             <Typography align="center" variant="h6">
        //                                 Total Tasks: 12
        //                             </Typography>
        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <Link underline="hover">Show All Tasks</Link>
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
        //                                 Delete
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