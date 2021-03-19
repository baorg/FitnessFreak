import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
import FollowIcon from '../../static/follow_icon';

// Styled Components ================================================

let FollowProfileButton = styled(Button)`
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
        color: #065BFB;
    }
    :hover{
        background-color: white !important;
    }
`;


let FollowIconBtn = styled(FollowIcon)`
    cursor: pointer;

    :hover{
        position: relative;
        transform: scale(1.1);
    }
`;
//=====================================================================


export default function FollowButton({ profile, setIsFollowing, type }){
    const [ active, setActive ] = useState(true);
    
    return <TypeFollow 
                type={type}
                active={active}
                onClick={handleFollowRequest}
            />;
    
    async function handleFollowRequest() {
        setActive(false);
        let res = await ajaxRequest('POST', `${API_DOMAIN}/following/add-following`, { user_id: profile._id });
        if (res.data.success) {
            setIsFollowing(res.data.is_following);
        } else {
            setActive(true);
        }
    }

    function TypeFollow({type, onClick, active}){
        switch(type){
            case 'text':
                return (
                    <FollowProfileButton
                        active={active}
                        onClick={onClick}
                    >
                        <span>Follow</span>
                    </FollowProfileButton>);
            
            case 'icon':
                return (
                    <FollowIconBtn
                        active={active}
                        onClick={onClick}
                    />
                );
            
            default:
                    throw Error('Unknown type');
                    break;
        }
    }

}
