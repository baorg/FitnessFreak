import React, { useState } from 'react';
import styled from 'styled-components';

import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';

// Styled Components ================================================

let FollowProfileButton = styled.button`
    float: right;
    margin: 10px 4px 10px 4px;
    height: 3em;
    width: 5em;
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
        background-color: ${({ active }) => active ? "#dadaff" : "inherit" };
    }
`;

//=====================================================================


export default function FollowButton({ profile, setIsFollowing }){
    const [ active, setActive ] = useState(true);
    
    return (
        <FollowProfileButton
            active={active} disabled={!active}
            onClick={handleFollowRequest}
        >
            <span>Follow</span>
        </FollowProfileButton>);
    
    async function handleFollowRequest() {
        setActive(false);
        let res = await ajaxRequest('POST', `${API_DOMAIN}/following/add-following`, { user_id: profile._id });
        if (res.data.success) {
            setIsFollowing(res.data.is_following);
        } else {
            setActive(true);
        }
    }
}