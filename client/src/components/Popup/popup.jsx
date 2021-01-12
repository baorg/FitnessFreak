// import React, { useState, forwardRef } from 'react';
// import { navigate } from 'hookrouter';
// import {
//     Dialog, DialogTitle, DialogContent,
//     DialogContentText, DialogActions,
//     Slide, Button, LinearProgress
// } from '@material-ui/core'

// import ajaxRequest from '../../ajaxRequest';
// import CONFIG from '../../config';
// import { SettingsPowerRounded } from '@material-ui/icons';
// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// function Popup(props){
//     function handleClose(){
//         props.setOpen(false);
//     }
//     return (
//         <Dialog
//             open={props.open}
//             TransitionComponent={Transition}
//             keepMounted
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-slide-title"
//             aria-describedby="alert-dialog-slide-description"
//         >
//             <DialogTitle id="alert-dialog-slide-title">Login</DialogTitle>
//             <DialogContent>
//                 <DialogContentText id="alert-dialog-slide-description">
//                 Can't Access This Before Login
//                 </DialogContentText>
//             </DialogContent>
//             {/* <DialogActions>
//               <Button onClick={handleClose} disabled={sending} color="primary">
//                 Login
//               </Button>
//             </DialogActions> */}
//       </Dialog>
//     );

// }


// export default Popup;