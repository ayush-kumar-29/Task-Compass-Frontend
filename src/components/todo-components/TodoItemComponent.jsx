import React from 'react';
import { Button, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import {Grid} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    width: 1200,
    borderRadius: 2
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

const desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus"

export default function TodoItemComponent(){
    return(
        // <Accordion>
        //         <AccordionSummary
        //         aria-controls="panel1a-content"
        //         id="panel1a-header"
        //         >
        //         <Typography>Accordion 1</Typography>
        //         </AccordionSummary>
        //         <AccordionDetails>
        //         <Typography>
        //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        //             malesuada lacus ex, sit amet blandit leo lobortis eget.
        //         </Typography>
        //         </AccordionDetails>
        // </Accordion>
        <div style={cardPosition}>
            <Card sx={cardStyle}>
                <React.Fragment>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant="body1">{desc}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container 
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography>Due Date: 2023-08-31</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            // variant="contained"
                                            fullWidth={true}
                                        >
                                            Mark as done
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}