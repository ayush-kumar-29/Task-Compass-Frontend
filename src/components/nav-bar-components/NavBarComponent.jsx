import { Paper, Typography, Grid, Link, Button } from "@mui/material";

export default function NavBarComponent(){
    return(
        <header style={{position: 'sticky', top: '0', zIndex:2}}>
            <Paper variant="outlined" elevation={0} square style={{padding:6}}>
                <Grid container spacing={1}>
                    <Grid item xs={8.5}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                            <Grid item xs={3}>
                                <Typography variant="h5">Work Compass</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" href="/todos">Todos</Link>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" href="/sprints">Sprints</Link>
                                {/* href=""  */}
                            </Grid>
                            <Grid item xs={1.5}>
                                <Link underline="hover" href="/workItems">Work Items</Link>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" href="/issues">Issues</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3.5}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <Grid item xs={3}>
                                <Button>Log In</Button>
                            </Grid>
                            {/* <Grid item xs={2}>
                                <Button>Sign Up</Button>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </header>
    )
}