import React, { useState, useEffect } from "react";
import {navigate,A } from 'hookrouter';
import { Modal, Slide } from '@material-ui/core';
import {
    SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
    Close as CloseIcon,
} from '@material-ui/icons';
import { Spinner } from "react-bootstrap";
import styled from 'styled-components';

import ajaxRequest from 'src/ajaxRequest';
import CONFIG from 'src/config';
import placeholderImage from 'src/static/noimage.png';


const StyledModal = styled(Modal)`
    display: grid;
    place-content: center;
`;

const ModalContainer = styled.div`
    height: 80vh;
    width: 500px;
    padding: 30px;
    background-color: white;
    overflow-y: scroll;
    border: 0;

    .heading{
        height: 30px;
        display: flex;
        align-items: center;
        .text{
            font-family: SF Pro;
            font-size: 1.5em;
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

const FollowingsListDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FollowingDiv = styled.div`
    width: 45%;
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 10px;
    border: 1px solid #afafaf;
    border-radius: 10px;
    padding: 10px;
    
    img{
        height: 50px;
        border-radius: 10px;
    }
`

function Followings({open, handleClose, profileUser}) {
    const [FollowingsList, setFollowingsList] = useState([]);
    const [defaultMessage, setDefaultMessage] = useState("");

    useEffect(() => {
        async function fetchFollowings(){
            let res = await ajaxRequest(
                'GET',
                `${CONFIG.API_DOMAIN}/following/get-following-list/${profileUser._id}`);
            console.log('Res data: ', res.data);

            if(!res.data.following.length){
                setDefaultMessage("No Followings Yet")
            }
            else{
                setFollowingsList(res.data.following);
            }
        }
        fetchFollowings();
    }, []);

    return (
        <StyledModal
            open={open}
            onClose={handleClose}>
            <ModalContainer>
                <div className="heading">
                    <div className="text">Following</div>
                    <CloseIcon className="close-icon" onClick={handleClose} />
                </div>
                {
                    FollowingsList.length > 0 ?
                        <FollowingsListDiv>
                            {FollowingsList.map(user =>
                                <FollowingDiv>
                                    <img src={user.profile_image || placeholderImage} />
                                    <A href={`/profile/${user._id}`} style={{ fontSize: "20px", padding: "10px", color: "black" }}>{user.first_name}</A>
                                </FollowingDiv>
                            )}
                        </FollowingsListDiv>
                        : <NoFollowingDiv>{defaultMessage} <SentimentVeryDissatisfiedIcon /></NoFollowingDiv>
                }
            </ModalContainer>
        </StyledModal>);
}

export default Followings;