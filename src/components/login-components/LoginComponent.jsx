import React, { useContext, useState } from 'react';
import { Alert, Button, CardContent, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { AuthContext } from '../../auth/AuthContext';
// import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
    padding:2,
    marginBottom:"1px"
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function LoginComponent(){
    const [userName, updateUserName] = useState()
    const [userNameError, updateUserNameError] = useState(false)
    const [userNameHelperText, updateUserNameHelperText] = useState(null)

    const [password, updatePassword] = useState()
    const [passwordError, updatePasswordError] = useState(false)
    const [passwordHelperText, updatePasswordHelperText] = useState(null)

    const [isLoginFailed, updateIsLoginFailed] = useState(false)

    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    function userNameChanged(event){
        updateUserName(event.target.value)
    }

    function passwordChanged(event){
        updatePassword(event.target.value)
    }

    function validateUserCreds(){
        var makeApiCall=true

        updateUserNameError(false)
        updateUserNameHelperText(null)
        if(userName==undefined || (userName!=undefined && userName.length==0)){
            makeApiCall=false
            updateUserNameError(true)
            updateUserNameHelperText("User Name cannot be empty.")
        }

        updatePasswordError(false)
        updatePasswordHelperText(null)
        if(password==undefined || (password!=undefined && password.length==0)){
            makeApiCall=false
            updatePasswordError(true)
            updatePasswordHelperText("Password cannot be empty.")
        }

        if(makeApiCall)
            loginUser()
    }

    async function loginUser(){
        try{
            var loginSuccessful = await authContext.authenticateUserCreds(userName, password)
            if(loginSuccessful){
                console.log("Login Successfull")
                navigate("/home")
            }
            else{
                console.log("Login Failed")
                updateIsLoginFailed(true)
            }
        }
        catch(error){
            console.log("Login Failed - "+error)
            updateIsLoginFailed(true)
        }
        
        // authContext.authenticateUserCreds(userName, password)
        // .then((resp) => {
        //     console.log("Login Successfull")
        //     navigate("/welcome")
        // })
        // .catch((error) => {
        //     console.log(error)
        //     updateIsLoginFailed(true)
        // })
    }

    return(
        <main style={{flex: '1', overflowY: 'auto'}}>
            <div style={cardPosition}>
                <Card sx={cardStyle}>
                    <CardContent>
                        <Grid container 
                            direction="column"
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">Login</Typography>
                            </Grid>
                            
                            <Grid item xs={12}></Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="User Name"
                                    error={userNameError}
                                    helperText={userNameHelperText}
                                    value={userName}
                                    onChange={userNameChanged}
                                    required
                                    fullWidth
                                />        
                            </Grid>
                            
                            <Grid item xs={12}></Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    error={passwordError}
                                    helperText={passwordHelperText}
                                    type="password"
                                    value={password}
                                    onChange={passwordChanged}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                {isLoginFailed && 
                                    <>
                                        <Grid item xs={12}></Grid>
                                        <Alert severity="error">Invalid Username or Password.</Alert>
                                    </>
                                }
                            </Grid>
                            
                            {/* <Grid item xs={12}></Grid> */}

                            <Grid item xs={12}>
                                <Button 
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={validateUserCreds}
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography fontSize={12}>Don't have an account? <Link underline="hover" href='/signup'>Sign Up</Link></Typography>
                            </Grid>
                        </Grid> 
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}