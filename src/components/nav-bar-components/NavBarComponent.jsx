import { Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function NavBarComponent(){
    const authContext = useContext(AuthContext)
    // console.log(authContext)
    return(
        <header style={{position: 'sticky', top: '0', zIndex:2}}>
            <Paper variant="outlined" elevation={0} square style={{padding:6}}>
                <Grid container spacing={1}>
                    <Grid item xs={8.5}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                            <Grid item xs={3}>
                                <Typography variant="h5">
                                    <Link underline="none" to="/home" color={"black"}>
                                        Work Compass
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" to="/todos">Todos</Link>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" to="/sprints">Sprints</Link>
                                {/* href=""  */}
                            </Grid>
                            <Grid item xs={1.5}>
                                <Link underline="hover" to="/workItems">Work Items</Link>
                            </Grid>
                            <Grid item xs={1}>
                                <Link underline="hover" to="/issues">Issues</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3.5}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <Grid item xs={3}>
                                {!authContext.isAuthenticated && <Button><Link underline="none" to="/login">Log In</Link></Button>}
                                {authContext.isAuthenticated && <Button><Link underline="none" to="/logout">Log Out</Link></Button>}
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