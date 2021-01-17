import React, {useState} from 'react';
import styled from 'styled-components';
import { Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Modal, Slide } from '@material-ui/core';

// Styled Components ====================================================================================================

let Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #a0a0a0;
    border-bottom: 1px solid #a0a0a0;
    font-size: 1.4em;
    cursor: pointer;

    .count-div{
        width: 35%;
        text-align: center;
    }


    .modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .paper{
        z-index: 100;
        border: 2px solid #000;
        box-shadow: 5px;
        padding: 2px 4px 3px 4px;
    }
`;

// =======================================================================================================================


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function FollowingSystem({followers, followings}){
    const [active, setActive] = useState(false);

    return (
        // <><Div onClick={handleOpen}>
        //     <div className="count-div">Followers: {followers}</div>
        //     <div className="count-div">Followings: {followings}</div>
        // </Div>
        
        // <Dialog
        //     className="modal"
        //     open={active}
        //     onClose={handleClose}
        //     TransitionComponent={Transition}
        //     keepMounted
        //     onClose={handleClose}
        //     aria-labelledby="alert-dialog-slide-title"
        //     aria-describedby="alert-dialog-slide-description"

        // >
        //     <div className="paper">
        //       <h2 id="transition-modal-title">Transition modal</h2>
        //       <p id="transition-modal-description">react-transition-group animates me.</p>
        //     </div>
        // </Dialog>

        <></>
    );

    function handleOpen() {
        // setActive(true);
    }

    function handleClose() {
        // setActive(false);
    }
}