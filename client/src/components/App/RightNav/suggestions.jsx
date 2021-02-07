import React, {useEffect, useState} from 'react';
import { CircularProgress, Paper, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { A, } from 'hookrouter';

import FollowBtn from '../../Profile/FollowButton';
import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';

// Styled Components ===============================================================================================

let Div = styled.div`
    width: 80%;
    max-width: 400px;
    min-height: 100px;
    padding: 2px;
    place-self: center;
    border-radius: 15px;
    margin: 10px;
    display: grid;
    @media (max-width: 800px){
        display: none;
    }
`;

let Heading = styled.div`
    text-align: center;
    font-size: 1.4em;
    height: 2.5em;
    padding-top: 4px;
    border-bottom: 2px solid #989898;
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

    .name{
        margin-left: 5px;
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
                <Heading> Suggestions for you</Heading>
                <Content>
                    {suggestions.map( user => 
                    <Profile>
                        <Avatar src={user.profile_image}/>
                        <div className="name">
                            <div className="main-name">{user.first_name} {user.last_name}</div>
                            <A className="username" href={`/profile/${user._id}`}>@{user.username}</A>
                        </div>
                        <FollowBtn profile={user} />
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