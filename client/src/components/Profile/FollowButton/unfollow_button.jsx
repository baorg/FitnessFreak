import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';


// Styled Components ================================================

let UnfollowProfileButton = styled.button`
    float: right;
    margin: 10px 4px 10px 4px;
    height: 3em;
    width: 6em;
    border-radius: 1.5em;
    border-style: none;
    border: 2px solid blue; 
    background-color: inherit;
    cursor: ${({ active }) => active ? "pointer" : "wait" };
    span{
        font-size: 1.2em;
        color: blue;
    }
    :hover{
        background-color: ${({ active }) => active ? "#ffadad" : "inherit" };
    }
`;

//=====================================================================

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
export default function UnfollowButton({ profile, setIsFollowing }){
    const [active, setActive] = useState(true);
    const [mouse, setMouse] = useState(false);

    return (<>
            <UnfollowProfileButton
                active={active} disabled={!active}
                onMouseEnter={changeUnfollowing}
                onMouseLeave={changeUnfollowing}
                onClick={()=>setActive(false)}
            >
                <span>{ mouse ? "Unfollow": "Following"}</span>
            </UnfollowProfileButton>
            <Dialog
              open={!active}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">Unfollow</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Unfollow {profile.username}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUnfollow} color="secondary">
                  Unfollow
                </Button>
              </DialogActions>
            </Dialog>
        </>);
    
    function handleClose() {
        setActive(true);
    }

    function changeUnfollowing() {
        setMouse(!mouse);
    }

    async function handleUnfollow() {
        let res = await ajaxRequest('POST', `${API_DOMAIN}/following/remove-following`, { user_id: profile._id });

        if (res.data.success) {
            setIsFollowing(false);
            setActive(true);
        } else if(res.isAuthenticated===false){
            setActive(true);
            setIsFollowing(null);
        } else {
            setActive(true);
        }
    }
}