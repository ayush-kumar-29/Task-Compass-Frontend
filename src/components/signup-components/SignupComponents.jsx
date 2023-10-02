import React, { useContext, useState } from 'react';
import { Alert, Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
// import { makeStyles } from '@mui/styles';

const cardStyle = ()=>({
    // width: 500,
    // height: 600,
    borderRadius: 2,
    padding:2,
    marginBottom:"2px"
});

const cardPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:30,
}

export default function SignupComponent(){
    const [email, updateEmail] = useState()
    const [emailError, updateEmailError] = useState(false)
    const [emailHelperText, updateEmailHelperText] = useState(null)

    const [userName, updateUserName] = useState()
    const [userNameError, updateUserNameError] = useState(false)
    const [userNameHelperText, updateUserNameHelperText] = useState(null)

    const [password, updatePassword] = useState()
    const [passwordError, updatePasswordError] = useState(false)
    const [passwordHelperText, updatePasswordHelperText] = useState(null)

    const [isSignupFailed, updateIsSignupFailed] = useState(false)

    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    function emailChanged(event){
        updateEmail(event.target.value)
    }
    
    function userNameChanged(event){
        updateUserName(event.target.value)
    }

    function passwordChanged(event){
        updatePassword(event.target.value)
    }

    function validateUserCreds(){
        var makeApiCall=true

        updateEmailError(false)
        updateEmailHelperText(null)
        if(email==undefined || (email!=undefined && email.length==0)){
            makeApiCall=false
            updateEmailError(true)
            updateEmailHelperText("Email cannot be empty.")
        }

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
            signupUser()
    }

    async function signupUser(){
        try{
            var loginSuccessful = await authContext.registerNewUser(userName, password, email)
            if(loginSuccessful){
                console.log("Signup Successfull")
                navigate("/home")
            }
            else{
                console.log("Login Failed")
                updateIsSignupFailed(true)
            }
        }
        catch(error){
            console.log("Login Failed - "+error)
            updateIsSignupFailed(true)
        }
    }

    return(
        <main  style={{flex: '1', overflowY: 'auto'}}>
            <div style={cardPosition}>
                <Card sx={cardStyle}>
                    <CardContent>
                        <Grid container 
                                direction="column"
                                spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5">Sign Up</Typography>
                            </Grid>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    error={emailError}
                                    helperText={emailHelperText}
                                    value={email}
                                    onChange={emailChanged}
                                    required
                                />   
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
                                />  
                            </Grid>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={12}>
                                {isSignupFailed && <Alert severity="error">Invalid Username or Password.</Alert>}
                            </Grid>

                            <Grid item xs={12}></Grid>

                            <Grid item xs={12}>
                                <Button 
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={validateUserCreds}
                                >
                                    Sign Up
                                </Button>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <Typography fontSize={12}>Already have an account? <Link underline="hover" href='/login'>Log in</Link></Typography>
                            </Grid> */}
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}