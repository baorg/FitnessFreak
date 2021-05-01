import React, { useState, useEffect, forwardRef, createContext } from 'react';
import { navigate } from 'hookrouter';

import {
    Snackbar, SnackbarContent,
    Slide, Button, LinearProgress
} from '@material-ui/core';
import {
    Alert, AlertTitle
} from '@material-ui/lab';


import { SettingsPowerRounded } from '@material-ui/icons';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PopupMessageContext = createContext({
    message: "",
    severity: "",
    title: null
});

function PopupMessageProvider(props) {
    
    const [open, setOpen] = useState(false);
    const [popUp, setPopUp] = useState(null);
    
    useEffect(() => {
        if (popUp) {
            setOpen(true);
        }
    }, [popUp]);

    useEffect(() => {
        if (open === false) {
            setPopUp(null);
        }
    }, [open]);

    function showPopUp({title=null, message, severity}) {
        setPopUp({
            title,
            message,
            severity
        });
    }

    function handleClose(){
        setOpen(false);
    }
    return (
        <PopupMessageContext.Provider 
            value={ showPopUp }>
            {props.children}
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                open={open}
                onClose={handleClose}
                key='main-popup-message'>
                { popUp && <Alert severity={popUp.severity}>
                    {popUp.title && <AlertTitle>{popUp.title}</AlertTitle>}
                    {popUp.message}
                </Alert>}
            </Snackbar>
    </PopupMessageContext.Provider>
    );
}


export { PopupMessageContext, PopupMessageProvider};