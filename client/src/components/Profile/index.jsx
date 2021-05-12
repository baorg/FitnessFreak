import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { useMediaQuery } from '@material-ui/core';

import Navbar from '../Navigation/navbar/navbar';
import LeftRail from './LeftRail';
import RightRail from './RightRail';
import Main from './Main';
import ajaxRequest from '../../ajaxRequest';
import EditProfile from './EditProfile';
import CONFIG from '../../config';
import { Spinner } from 'react-bootstrap';

import { responsive } from '../utils/data.json';

import { UserContext } from '../utils/UserContext';
import FullImageView from 'src/components/Profile/FullImageView';

// Styled components ===================================

let MainDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin: 0;
`;

let StyledSpinner = styled(Spinner)`
    width: 100px;
    height: 100px;
    border-width: 5px;
`;


const ProfileDiv = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    /* grid-template-columns: ${({ midPoint, lastPoint }) => lastPoint ? "0 1fr 0" : midPoint ? "1fr 2fr" : "1fr 800px 1fr"}; */
    /* place-content: center; */
    grid-template-columns: ${({midPoint, lastPoint})=>lastPoint? "0 1fr 0": "1fr 800px 1fr"};
    grid-column: 1 / 2;
    grid-column-gap: 2px;
`;
// ========================================================



export default function Profile({ userId }) {
    const [profileUser, setProfileUser] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [viewImage, setViewImage] = useState(null);
    const [user, setUser ] = useContext(UserContext);

    const midPoint = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
    const lastPoint = useMediaQuery(`(max-width: ${responsive.small})`);

    useEffect(() => {
        console.log('viewImage: ', viewImage, Boolean(viewImage));
    }, [viewImage]);

    useEffect(() => {
        getUserData();
    }, [user, userId]);

    return (
        <>
            <MainDiv active={editProfile}>
                <ProfileDiv midPoint={midPoint} lastPoint={lastPoint}>
                    {/* <LeftRail profile_user={profileUser} /> */}
                    {profileUser ?
                        <Main
                            profileUser={profileUser}
                            user={user}
                            setEditProfile={setEditProfile}
                            setViewImage={setViewImage}
                            editProfile={editProfile}
                        />
                        : <StyledSpinner />}
                        {/* <RightRail /> */}
                </ProfileDiv>
            </MainDiv>
            { editProfile &&
                <EditProfile
                    setOpen={setEditProfile}
                    open={editProfile}
                    user={user}
                    setUser={setUser}
                />}
            <FullImageView
                image={viewImage}
                open={Boolean(viewImage)}
                handleClose={() => setViewImage(null)} />
        </>);

    async function getUserData() {
        let res = await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/users/get-userdata-id`, { user_id: userId });
        res.data.user.own_profile = false;
        if (res.data.user._id === user?._id) {
            res.data.user.own_profile = true;
        }
        console.log('OWN PROFILE: ', res.data.user.own_profile);
        setProfileUser(res.data.user);
    }
}
