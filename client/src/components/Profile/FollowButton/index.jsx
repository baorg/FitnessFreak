import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';

import FollowButton from './follow_button';
import UnfollowButton from './unfollow_button';

import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
// Styled Components ==============================================================

let LoadingBtn = styled.button`
    margin: 10px 4px 10px 4px;
    height: 3em;
    width: 5em;
    border-radius: 1.5em;
    border-style: none;
    border: 2px solid blue; 
    background-color: inherit;
    
    span{
        display: block;
        background-color: #d8d8d8; 
        width: 100%;
        height: 0.7em;
    }
`;


let Btn = styled.div`
    float: right;
`;


// =======================================================================================


export default function Button({ profile }) {
    const [isFollowing, setIsFollowing] = useState(null);

    useEffect(() => {
        async function fetchFollowing() {
            let data = (await ajaxRequest('GET', `${API_DOMAIN}/following/check-following?user_id=${profile._id}`)).data;
            if (data.success) {
                setIsFollowing(data.is_following);
            }
        }

        if (isFollowing === null) {
            fetchFollowing();
        }
    })


    return (
        <Btn>
            {
                isFollowing === null ?
                    <></>
                : isFollowing ?
                  <UnfollowButton profile={profile} setIsFollowing={setIsFollowing} />
                : <FollowButton profile={profile} setIsFollowing={setIsFollowing} />
            }
        </Btn>
    );
}