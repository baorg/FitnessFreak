import React from 'react';
import ReactDOM, { useState } from 'react-dom';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import { Alert } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';


function NetworkProblem({ }) {
    const [open, setopen] = useState(false);
    
    return open &&
        <Snackbar open={true} autoHideDuration={600} onClose={handleClose}>
                <Alert elevation={6} variant="filled" severity="error" onClose={handleClose}> Connection problem! </Alert>
        </Snackbar>;
    
    function handleClose() {
        setopen(false);
    }


}



export default function networkError(err = false) {
    const errorEl = document.getElementById("error-main");
    if (err)
        ReactDOM.render( <NetworkProblem / > , errorEl);
    else
        ReactDOM.render( <> </>, errorEl);
}