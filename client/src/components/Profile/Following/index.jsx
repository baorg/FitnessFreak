import React, { useState, useEffect } from "react";
import {navigate,A } from 'hookrouter';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Spinner } from "react-bootstrap";
import styled from 'styled-components';
import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';
import placeholderImage from '../../../static/noimage.png';

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

function Followings(props) {
    const [FollowingsList, setFollowingsList] = useState([]);
    const [defaultMessage, setDefaultMessage] = useState("");

    useEffect(() => {
        async function fetchFollowings(){
            let res = await ajaxRequest(
                'GET',
                `${CONFIG.API_DOMAIN}/following/get-following-list/${props.profileUser._id}`);
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

    return (FollowingsList.length > 0 ?
        <FollowingsListDiv>
            {FollowingsList.map(user =>
                <FollowingDiv>
                    <img src={ user.profile_image || placeholderImage }  />
                    <A href={`/profile/${user._id}`} style={{ fontSize: "20px", padding: "10px", color: "black" }}>{user.first_name}</A>
                </FollowingDiv>
            )}
        </FollowingsListDiv>
        : <NoFollowingDiv>{defaultMessage} <SentimentVeryDissatisfiedIcon /></NoFollowingDiv>
    );
        {/* <Spinner /> */}
}

export default Followings;