import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
import UnfollowIcon from '../../static/followers_icon';


// Styled Components ================================================

let UnfollowProfileButton = styled(Button)`
    font-family: SF Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #065BFB;
    margin: 10px 4px 10px 4px;
    background-color: inherit;
    height: 1em;
    text-transform: capitalize !important;
    cursor: ${({ active }) => active ? "pointer" : "wait" };
    span{
        font-size: 1.2em;
        color: #ff5353;
    }
    :hover{
        background-color: white !important;
    }
`;

let UnfollowIconBtn = styled(UnfollowIcon)`
    cursor: pointer;

    :hover{
        position: relative;
        transform: scale(1.1);
    }
`;

//=====================================================================

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
export default function UnfollowButton({ type, profile, setIsFollowing }){
    const [active, setActive] = useState(true);

    return (<>
            <TypeFollow 
            
            />
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


    function TypeFollow(){
      let [text, setText] = useState('Following');
      switch(type){
          case 'text':
              return (
                  <UnfollowProfileButton
                    active={active} disabled={!active}
                    onMouseEnter={()=>setText('Unfollow')}
                    onMouseLeave={()=>setText('Following')}
                    onClick={()=>setActive(false)}>
                <span>{text}</span>
            </UnfollowProfileButton>);
          
          case 'icon':
              return (
                  <UnfollowIconBtn
                      active={active}
                      onClick={()=>setActive(false)}
                  />
              );
          
          default:
                  throw Error('Unknown type');
                  break;
      }
  }

}