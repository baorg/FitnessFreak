import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../Navigation/navbar/navbar';
import LeftRail from './LeftRail';
import RightRail from './RightRail';
import Main from './Main';
import ajaxRequest from '../../ajaxRequest';
import CONFIG from '../../config';
import { Spinner } from 'react-bootstrap';


// Styled components ===================================
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

    useEffect(() => {
        async function getUserData() {
            let res = await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/Users/get-userdata-id`, { user_id: props.userId });
            setProfileUser(res.data.user);
        }

        getUserData();
    }, []);

    return (
        <>
            <Navbar user={props.user} />
            <ProfileDiv >
                <LeftRail />
                {profileUser ? <Main profileUser={profileUser} user={props.user} /> : <StyledSpinner />}
                <RightRail />
            </ProfileDiv>
        </>);
}
