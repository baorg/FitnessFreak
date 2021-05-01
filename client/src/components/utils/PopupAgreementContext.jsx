import React, { useState, useEffect, forwardRef, createContext } from 'react';
import { navigate } from 'hookrouter';
import {
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    Slide, Button, LinearProgress
} from '@material-ui/core'


import { SettingsPowerRounded } from '@material-ui/icons';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PopupAgreementContext = createContext({
    content: {content: "", title: ""},
    setOnAgree: async () => { },
    setOnDisagree: async () => { },
    agreeBtn: "Agree",
    disagreeBtn: "Disagree",
});

function PopupAgreementProvider(props) {
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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

    function showPopUp(content, agreeBtn, disagreeBtn, onAgree, onDisagree) {
        setPopUp({
            content,
            agreeBtn,
            disagreeBtn,
            onAgree,
            onDisagree,
        });
    }

    function handleClose(){
        setOpen(false);
    }
    return (
        <PopupAgreementContext.Provider 
            value={ showPopUp }>
            {props.children}
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            {popUp && <><DialogTitle id="alert-dialog-slide-title">{popUp.content.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {popUp.content.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {popUp.agreeBtn && <Button
                    onClick={handleAgree}
                    disabled={loading}
                    color="primary">
                    {popUp.agreeBtn}
              </Button>}
                {popUp.disagreeBtn && <Button
                    onClick={handleDisagree}
                    disabled={loading}
                    color="secondary">
                    {popUp.disagreeBtn}
                </Button>
                }
            </DialogActions></>}
        </Dialog>
    </PopupAgreementContext.Provider>
    );


    function handleAgree() {
        setLoading(true);
        popUp.onAgree().then(() => {
            setLoading(false);
            setOpen(false);
        }).catch(err => {
            
        });
    }

    function handleDisagree() {
        setLoading(true);
        popUp.onDisagree().then(() => {
            setLoading(false);
            setOpen(false);
        }).catch(err => {
        });
    }
}


export { PopupAgreementContext, PopupAgreementProvider};