import React, { useContext, useEffect, useState } from 'react';
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

export default function LogoutComponent(){
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        authContext.deauthenticateUserCreds()
        .then((resp) => {
            console.log("Logout Successful.")
        })
        .catch((error) => {
            console.log(error)
        })
        navigate("/login")
    })
    return (<></>);
}