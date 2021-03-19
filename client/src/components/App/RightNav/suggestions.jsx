import React, {useEffect, useState} from 'react';
import { CircularProgress, Paper, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { A, } from 'hookrouter';

import FollowBtn from '../../Profile/FollowButton';
import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';

// Styled Components ===============================================================================================

let Div = styled.div`
    width: fit-content;
    min-width: 300px;
    max-width: 400px;
    min-height: 100px;
    padding: 2px;
    place-self: center;
    border-radius: 15px;
    margin-bottom: 20px;
    display: grid;
    @media (max-width: 800px){
        display: none;
    }
`;

let Heading = styled.div`
    font-family: SF Pro;
    margin-bottom: 25px;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    color: #065BFB;
`;

let Content = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
`;

let Profile = styled.div`
    display: flex;
    justify-items: space-between;
    // border-bottom: 1px solid #898989;
    margin: 2px;
    margin-bottom: 10px;
    .name{
        font-family: SF Pro;
        font-style: normal;
        margin-left: 10px;
        .main-name{
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #424259;
        }
        .username{
            font-weight: normal;
            font-size: 16px;
            line-height: 19px;
            color: rgba(66, 66, 89, 0.6);
        }
    }
    .follow-btn{
        margin-left: auto;
        button{
            border: none;
            border-radius: 2px;
            height: 2em;
        }
    }
`;

let StyledSpinner = styled(CircularProgress)`
    place-self: center;
`;

let Footer = styled.div`
    height: 50px;
`;

// ================================================================================================================


export default function SuggestionBox({}){
    const [loaded, setLoaded] = useState(false);
    const [suggestions, setSuggestions] = useState(null);

    useEffect(()=>{
        fetchSuggestions();
    }, []);



    return (
            <Div>
            {   loaded ? 
                    suggestions ? 
                <>
                <Heading> Suggestions </Heading>
                <Content>
                    {suggestions.map( user => 
                    <Profile>
                        <Avatar src={user.profile_image}/>
                        <div className="name">
                            <div className="main-name">{user.first_name} {user.last_name}</div>
                            <A className="username" href={`/profile/${user._id}`}>@{user.username}</A>
                        </div>
                        <FollowBtn type="icon" profile={user} />
                    </Profile>)}
                </Content>
                <Footer></Footer>
                </>:
                <div> Error, please load again </div>
            : <StyledSpinner /> }
    </Div>);


    async function fetchSuggestions(){
        let data = (await ajaxRequest('GET', `${API_DOMAIN}/users/get-suggestions`)).data;

        setLoaded(true);
        if(data.success){
            setSuggestions(data.suggestions);
        }
    }

}