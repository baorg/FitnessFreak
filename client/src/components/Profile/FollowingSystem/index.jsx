import React, { useState, useEffect } from "react";
import { navigate, A } from 'hookrouter';
import {
    Divider, Modal, Slide
} from '@material-ui/core';
import {
    SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
} from '@material-ui/icons';
import {
    NameDiv,
} from 'src/components/Question/Question/Header/styled';


import ajaxRequest from 'src/ajaxRequest';
import CONFIG from 'src/config';
import placeholderImage from 'src/static/noimage.png';
import FollowBtn from 'src/components/Profile/FollowButton'

import styled from 'styled-components';

const StyledModal = styled(Modal)`
    display: grid;
    place-content: center;
`;

const ModalContainer = styled.div`
    height: 80vh;
    max-width: 500px;
    width: 100%;
    padding: 30px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 0;

    .heading{
        height: 30px;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 25px;
        .text{
            margin: auto;
            font-family: SF Pro;
            font-style: normal;
            font-weight: normal;
            font-size: 22px;
            line-height: 26px;
            color: rgba(66, 66, 89, 0.4);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .active{
            font-family: SF Pro;
            font-style: normal;
            font-weight: bold;
            font-size: 27px;
            line-height: 32px;
            color: #065BFB;
            .underscore{
                height: 4px;
                width: 34px;
                border-radius: 2px;
                background: #065BFB;
            }
        }
        
    }

    .close-icon{
        margin-left: auto;
        cursor: pointer;
    }
`;

let NoFollowingDiv = styled.div`
    display: grid;
    place-items: center;
    justify-items: center;
    height: 100px;
`;

const FollowingListContainer = styled.div`

    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 0px;
      border-radius: 5px;
    }


    height: 90%;
    width: 600px;
    max-width: 100%;
    overflow-y: scroll;
    scrollbar-width: 5px;
    scroll-padding: 1px;
    scroll-margin: 2px;
    scrollbar-width: 10px;
    scrollbar-color: #E3E3E3 transparent;
`;

const FollowingsListDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FollowingDiv = styled.div`
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    display: flex;

    .user-name{
        font-family: SF Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #43405B;
    }

    .user-username{
        font-family: SF Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        color: #065BFB;
        margin: 0 0 0 10px;
    }

    img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .follow-btn{
        margin-left: auto;
    }
`

function FollowingSystem({ type, setType, handleClose, profileUser}) {
    const [defaultMessage, setDefaultMessage] = useState("");
    const [FollowingsList, setFollowingsList] = useState(null);
    const [FollowersList, setFollowersList] = useState(null);
    const [List, setList] = useState(null);

    useEffect(changeListEffect, [FollowersList, FollowingsList, type]);

    return (
        <StyledModal
            open={Boolean(type)}
            onClose={handleClose}>
            <ModalContainer>
                <div className="heading">
                    <div
                        className={`text ${type === "followers" ? 'active' : ''}`}
                        onClick={() => setType('followers')}>
                        <span>Followers</span><span className="underscore"/></div>
                    <div
                        className={`text ${type === "followings" ? 'active' : ''}`}
                        onClick={() => setType('followings')}>
                        <span>Followings</span><span className="underscore"/></div>
                    <CloseIcon className="close-icon" onClick={handleClose} />
                </div>
                <Divider />
                <FollowingListContainer>
                {
                    List===null?<></>:
                    List.length > 0 ?
                        <FollowingsListDiv>
                            {List.map(user =>
                                <FollowingDiv>
                                    <img src={user.profile_image || placeholderImage} />
                                    <NameDiv>
                                        <div className="user-name" style={{ fontSize: "20px", padding: "10px", color: "black" }}>
                                            {user.first_name}
                                            {user.is_verified &&
                                                <CheckCircleIcon
                                                    style={{
                                                        color: "#065BFB",
                                                        margin: "auto 0 auto 5px"
                                                    }}
                                                    fontSize="small"
                                                    variant="filled"
                                                    color="primary" />}
                                        </div>
                                        <A className="user-username" href={`/profile/${user._id || user.userId}`}> @{user.username}</A>
                                    </NameDiv>
                                    <FollowBtn
                                        type="btn"
                                        profile={user}
                                    />
                                </FollowingDiv>
                            )}
                        </FollowingsListDiv>
                        : <NoFollowingDiv>{defaultMessage} <SentimentVeryDissatisfiedIcon /></NoFollowingDiv>
                }</FollowingListContainer>
            </ModalContainer>
        </StyledModal>);
    


    async function changeListEffect() {
        switch (type) {
            case 'followers':
                if (FollowersList === null) fetchFollowers();
                else {
                    setList(FollowersList);
                }
                break;
            case 'followings':
                if (FollowingsList === null) fetchFollowings();
                else {
                    setList(FollowingsList);
                }
                break;
            case null:
                setList(null);
                break;
        }
    }

    async function fetchFollowers(){
        let res = await ajaxRequest(
            'GET',
            `${CONFIG.API_DOMAIN}/following/get-followers-list/${profileUser._id}`);

        if(!res.data.followers.length){
            setDefaultMessage("No Followers Yet")
        }
        else{
            setFollowersList(res.data.followers);
        }
    }

    async function fetchFollowings(){
        let res = await ajaxRequest(
            'GET',
            `${CONFIG.API_DOMAIN}/following/get-following-list/${profileUser._id}`);

        if(!res.data.following.length){
            setDefaultMessage("No Followings Yet")
        }
        else{
            setFollowingsList(res.data.following);
        }
    }


}

export default FollowingSystem;