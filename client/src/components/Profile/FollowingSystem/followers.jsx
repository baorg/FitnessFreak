import React, { useState, useEffect } from "react";
import {navigate,A } from 'hookrouter';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Spinner } from "react-bootstrap";
import styled from 'styled-components';
import ajaxRequest from '../../../../ajaxRequest';
import CONFIG from '../../../../config';
import placeholderImage from '../../../static/noimage.png';

let NoFollowerDiv = styled.div`
    display: grid;
    place-items: center;
    justify-items: center;
    height: 100px;
`;

const FollowersListDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FollowerDiv = styled.div`
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

function Followers(props) {
    const [followersList, setFollowersList] = useState([]);
    const [defaultMessage, setDefaultMessage] = useState("");

    useEffect(() => {
        async function fetchFollowers(){
            let res = await ajaxRequest(
                'GET',
                `${CONFIG.API_DOMAIN}/following/get-followers-list/${props.profileUser._id}`);
            console.log('Res data: ', res.data);

            if(!res.data.followers.length){
                setDefaultMessage("No Followers Yet")
            }
            else{
                setFollowersList(res.data.followers);
            }
        }
        fetchFollowers();
    }, []);

    return (followersList.length > 0 ?
        <FollowersListDiv>
            {followersList.map(user =>
                <FollowerDiv>
                    <img src={ user.profile_image || placeholderImage }  />
                    <A href={`/profile/${user._id}`} style={{ fontSize: "20px", padding: "10px", color: "black" }}>{user.first_name}</A>
                </FollowerDiv>
            )}
        </FollowersListDiv>
        : <NoFollowerDiv>{defaultMessage} <SentimentVeryDissatisfiedIcon /></NoFollowerDiv>
    );
        {/* <Spinner /> */}
}

export default Followers;