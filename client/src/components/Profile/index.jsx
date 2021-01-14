import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../Navigation/navbar/navbar';
import LeftRail from './LeftRail';
import RightRail from './RightRail';
import Main from './Main';
import ajaxRequest from '../../ajaxRequest';
import EditProfile from './EditProfile';
import CONFIG from '../../config';
import { Spinner } from 'react-bootstrap';


// Styled components ===================================

let MainDiv = styled.div`
    position: ${props => props.active ? "fixed" : "static"};
`;

let StyledSpinner = styled(Spinner)`
    width: 100px;
    height: 100px;
    border-width: 5px;
`;


const ProfileDiv = styled.div`
    position: relative;
    top: 50px;
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 600px 1fr;
    grid-column-gap: 2px;
`;
// ========================================================



export default function Profile(props) {
    const [profileUser, setProfileUser] = useState(null);
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        async function getUserData() {
            let res = await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/users/get-userdata-id`, { user_id: props.userId });
            res.data.user.own_profile = false;
            if (res.data.user._id === props.user?._id) {
                res.data.user.own_profile = true;
            }
            console.log('OWN PROFILE: ', res.data.user.own_profile);
            setProfileUser(res.data.user);
        }
        getUserData();
    }, [props.user, props.userId]);

    return (
        <>
            <MainDiv active={editProfile}>
                <ProfileDiv >
                    <LeftRail />
                    {profileUser ?
                        <Main
                            profileUser={profileUser}
                            user={props.user}
                            setEditProfile={setEditProfile}
                            editProfile={editProfile}
                        />
                        : <StyledSpinner />}
                        <RightRail />
                </ProfileDiv>
            </MainDiv>
            { editProfile &&
                <EditProfile
                    setOpen={setEditProfile}
                    open={editProfile}
                    user={props.user}
                    setUser={props.setUser}
                />}
        </>);
}
