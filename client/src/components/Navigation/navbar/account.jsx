import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { A, navigate } from 'hookrouter';
import { Avatar, Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList } from '@material-ui/core';
import { AccountBoxRounded, AccountCircleRounded } from '@material-ui/icons';



import LogoutDialog from '../../Auth/logout';

// Styled Components ================================================================

const AccountAvatarDiv = styled.div`
`;

const StyledAccountImage = styled(Avatar)`
  cursor: pointer;
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;

const StyledAccountPlaceholder = styled(AccountCircleRounded)`
  cursor: pointer;
  width: 3em;
  height: 3em;
`;

const StyledPopper = styled(Popper)`
`;
// ====================================================================================

function AccountAvatar({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);
    const [logoutDia, setLogoutDia] = useState(false);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
        <AccountAvatarDiv>
            {user.profile_image ?
            <StyledAccountImage
                src={user.profile_image}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            />
                : <StyledAccountPlaceholder
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                />}
            <StyledPopper id={0} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={()=>navigate(`/profile/${user._id}`)}>Profile</MenuItem>
                                <MenuItem onClick={()=>setLogoutDia(true)}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>)}
            </StyledPopper>
        </AccountAvatarDiv>
        <LogoutDialog user={user} open={logoutDia} setOpen={setLogoutDia} />
        </>);

    
    function handleToggle(event) {
        setOpen((prevOpen => !prevOpen));
    }
    function handleClose(event){
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

}

export default AccountAvatar;