import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarTodayIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import noimage from '../../../static/noimage.png';
import nobanner from '../../../static/placeholder_profile_banner.jfif';
import EditProfile from '../EditProfile';
import FollowButton from '../FollowButton';
import FollowingSystemDiv from '../FollowingSystem';


// Styled Components ================================================
let ProfileInfoDiv = styled.div`

`;

let ProfileBanner = styled.img`
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
`;
let ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    position: relative;
    top: -50px;
    left: 20px;
    border-radius: 50%;
    background-color: white;
    border-width: 2px;
    border-color: #eeeeee;
    border-style: solid;
`;

let Username = styled.div`
    font-size: 0.8em;
`;
let FirstLastName = styled.div`
    font-size: 1.3em;
`;

let Name = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap');
    font-family: 'Open Sans', sans-serif;
    height: 3em;
    margin-top: -30px;
`;

let JoinedDate = styled.div`
    float: right;
    position: relative;
    top: -20px;
    color: #8f8f8f;
`;

let Bio = styled.div`
    border: 2px solid #8ea09f;
    border-radius: 4px;
    min-height: 5em;
`;

let BioDiv = styled.span`
    position: relative;
    background-color: #eeeeee;
    top: -0.9em;
    left: 1em;
    font-size: 1.4em;
    width: 2em;
    text-align: center;
`;

let EditProfileButton = styled.button`
    float: right;
    border-radius: 20px;
    margin: 10px 5px 10px 5px;
    height: 3em;
    width: 8em;
    border-radius: 1.5em;
    border-style: none;
    border: 2px solid blue; 
    background-color: inherit;
    
    :hover{
        background-color: "#b8b8ff";
    }

    span{
        color: blue;
    }

`;


let ScoreCard = styled.div`
    margin: 2em 0 2em 0;
    padding: 10px;
    border: 2px solid #c2c2c2f3;
    border-radius: 10px;
`;
let MainScore = styled.div`
    height: 2em;
    display: flex;
    align-items: center;
    span{
        font-size: 1.4em;
    }
`;

let Score = styled.div`
    background-color: #70cbe2;
    min-width: 2em;
    text-align: center;
    text-justify: center;
    border-radius: 5px;
    height: fit-content;
    margin: 10px;
    padding: 0 10px 0 10px;
    
    span{
        height: 100%;
        margin: 0 10px 0 10px;
        border-left: 1px solid #777777;
        width: 0;
    }
`;

let CategoryScore = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

//=====================================================================


export default function UserInfo(props) {
    console.log('User: ', props.profileUser);
    console.log('Score: ', props.profileUser.score);

    return (
        <>
        <ProfileInfoDiv>
            <ProfileBanner src={props.profileUser.banner_image || nobanner } alt="" />
            <ProfileImage src={props.profileUser.profile_image || noimage} alt="" />
            {props.profileUser.own_profile
                    ? <EditProfileButton onClick={handleEditProfileClick}>
                        <span>Edit Profile</span></EditProfileButton> 
                    : <FollowButton profile={props.profileUser} />}

                <Name >
                    <FirstLastName>{props.profileUser.first_name} {props.profileUser.last_name}</FirstLastName>
                    <Username>@{props.profileUser.username}</Username>
                    <JoinedDate>Joined { (new Date(props.profileUser.created_at).toLocaleString('en-US', {year: 'numeric', month: 'long'}))}</JoinedDate>
                </Name>
            <hr />
            <Bio>
                <BioDiv>Bio</BioDiv>
                {props.profileUser.bio}
            </Bio>

            <ScoreCard>
                <MainScore>
                    <span>Score</span>
                    <Score>Total <span></span>{ props.profileUser.score.find(s=>s.name==='totalScore').score }</Score>
                </MainScore>
                <hr/>
                <CategoryScore>
                    {props.profileUser.score.filter(score=>(score.name!=='totalScore' && score.name!=='followers')).map(score => 
                        <Score>{score.name} <span></span>{ score.score }</Score>
                    )}
                </CategoryScore>
            </ScoreCard>
            
            <FollowingSystemDiv followers={20} followings={10} />

            </ProfileInfoDiv>
            </>
    );

    function handleEditProfileClick() {
        if (props.editProfile) {
            
        } else {
            props.setEditProfile(true);
        }
    }

}