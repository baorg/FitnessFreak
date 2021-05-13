import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { A } from 'hookrouter';


import { Button, Chip, Divider } from '@material-ui/core';
import {
    CalendarToday as CalendarTodayIcon,
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons';

import FullImageView from '../FullImageView';
import noimage from '../../../static/noimage.png';
import nobanner from '../../../static/placeholder_profile_banner.jfif';
import EditProfile from '../EditProfile';
import FollowButton from '../FollowButton';

import FollowingSystemPopover from 'src/components/Profile/FollowingSystem';


import CategoryIcon from 'src/components/static/CategoryIcons';

import { API_DOMAIN } from 'src/config';
import request from 'src/ajaxRequest';

// Styled Components ================================================
let ProfileInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-family: SF Pro;
    font-style: normal;

    >*{
        margin: 5px 0 5px 0;
    }
    .chosen-category{
        display: flex;
        width: 100%;
        box-sizing: border-box;
        >*{
            margin: 0 4px 0 4px;
        }
    }

`;


let ProfileContent = styled.div`
    width: 90%;
    align-self: center;
    display: flex;
    flex-direction: column;
    >*{
        margin: 5px 0 5px 0;
    }
`;

let ProfileBanner = styled.img`
    width: 100%;
    border-radius: 10px;
    margin: 0;
    cursor: pointer;
`;
let ProfileImage = styled.div`
    width: 100%;
    margin-top: -50px;
    display: grid;
    margin-left: 50px;
    cursor: pointer;
    /* place-content: center; */

    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid white;
    }
`;

let Username = styled(A)`
    font-size: 18px;
    line-height: 21px;
    color: #065BFB;
`;
let FirstLastName = styled.div`
    font-weight: 600;
    font-size: 23px;
    line-height: 27px;
`;

let Name = styled.div`
    font-family: SF Pro, sans-serif;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-left: 0;
`;

let JoinedDate = styled.div`
    float: right;
    position: relative;
    top: -20px;
    color: #8f8f8f;
`;

let Bio = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 140px);

    .heading{
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.8);
    }

    .content{
        font-weight: 600;
        font-size: 22px;
        line-height: 26px;
        color: #424259;
        max-width: 80%;
    }
`;


let EditProfileButton = styled(Button)`
    border-radius: 5px;
    font-family: SF Pro;
    font-weight: 600;
    font-size: 20px !important;
    line-height: 25px !important;
    text-decoration: none;
    text-transform: none !important;
    margin: 10px 5px 10px 5px;
    padding: 10px;
    background-color: #065BFB !important;
    /* :hover{
        background-color: #b8b8ff !important;
    } */

    span{
        color: white;
    }

`;


let ScoreCard = styled.div`
    margin: 2em 0 2em 0;
    padding: 10px;
    display: flex;
`;
let MainScore = styled.div`
    width: 200px;
    height: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    .heading{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.8);
    }
    .score{
        font-weight: 600;
        font-size: 27px;
        line-height: 32px;
        color: #424259;
    }
`;


let CategoryScore = styled.div`
    display: flex;
    flex-wrap: wrap;

    .category{
        display: flex;
        flex-direction: column;
        margin: 5px 10px 5px 10px;
        align-items: center;
        .heading{
            font-size: 16px;
            line-height: 19px;
            color: rgba(66, 66, 89, 0.8);
            .icon{
                width: 15px;
                height: 15px;
            }
        }
        .score{
            font-weight: 600;
            font-size: 22px;
            line-height: 26px;
            color: #424259;
        }
    }

`;

let RankDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    position: relative;
    margin-left: auto;
    right: 30px;
    top: -50px;
    width: 0;

    .heading{
        font-size: 17px;
        line-height: 20px;
        color: rgba(66, 66, 89, 0.7);
    }

    .rank{
        font-weight: 600;
        font-size: 27px;
        line-height: 32px;
        color: #065BFB;
    }

`;

let FollowersCountDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    .box{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: -10px 20px 10px 20px;
        cursor: pointer;
        .heading{
            font-weight: normal;
            font-size: 20px;
            line-height: 24px;
            color: rgba(66, 66, 89, 0.8);
        }
        .count{
            font-weight: 600;
            font-size: 27px;
            line-height: 32px;
            color: #424259;
        }
    }
`;
const BtmContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 10px 0 30px 0;
`;
let NameRankDiv = styled.div`
    display: flex;
`;

let EditFollowBtnContainer = styled.div`
    width: fit-content;
    display: grid;
    margin-left: auto;
    place-content: center;
`;
//=====================================================================


export default function UserInfo({profileUser, editProfile, setEditProfile, setViewImage }) {
    const [rank, setRank] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followings, setFollowings] = useState(null);
    
    const [followPop, setFollowPop] = useState(null);

    useEffect(updateRankEffect, []);
    useEffect(updateFollowingEffect, []);

    return (
    <>
        <FollowingSystemPopover
            profileUser={profileUser}
            type={followPop}
            setType={setFollowPop}
            handleClose={() => setFollowPop(null)} />
        <ProfileInfoDiv>
            <ProfileBanner
                onClick={() => setViewImage(profileUser.banner_image)}
                src={profileUser.banner_image || nobanner} alt="" />
            <ProfileImage onClick={()=>setViewImage(profileUser.profile_image)}>
                <img src={profileUser.profile_image || noimage} alt="" />
            </ProfileImage>

            <ProfileContent>
                <NameRankDiv>
                    <Name >
                        <FirstLastName>{profileUser.first_name} {profileUser.last_name}
                        {profileUser.is_verified && <CheckCircleIcon style={{fontSize: 20}} variant="filled" color="primary" />}
                        </FirstLastName>
                        <Username href={`/profile/${profileUser._id}`}>@{profileUser.username}</Username>
                        </Name>
                    <FollowersCountDiv>
                        <div className="box follower"
                            onClick={()=>setFollowPop('followers')}>
                            <div className="heading">Followers</div>
                            {followers && <div className="count">{followers}</div>}
                        </div>
                        <div className="box following"
                            onClick={()=>setFollowPop('followings')}>
                            <div className="heading">Following</div>
                            {followings && <div className="count">{followings}</div>}
                        </div>
                    </FollowersCountDiv>
                    {rank && <RankDiv>
                        <div className="heading">Rank</div>
                        <div className="rank">#{rank}</div>
                    </RankDiv>}
                </NameRankDiv>
                
                
                <BtmContainer>
                    <Bio>
                        <div className="heading">Bio</div>
                        <div className="content">" {profileUser.bio} "</div>
                    </Bio>
                    <EditFollowBtnContainer>
                        {profileUser.own_profile
                        ? <EditProfileButton color="primary" variant="outlined" onClick={handleEditProfileClick}>
                            <span>Edit Profile</span></EditProfileButton> 
                        : <FollowButton profile={profileUser} type="btn" variant="outlined" />}
                    </EditFollowBtnContainer>
                </BtmContainer>
                
                <Divider />

            <ScoreCard>
                <MainScore>
                    <div className="heading">Total score</div>
                    <div className="score">{ profileUser.score.find(s=>s.name==='totalScore').score }</div>
                </MainScore>
                <CategoryScore>
                    {profileUser.score.filter(score => ((score.name !== 'totalScore' && score.name !== 'Followers' ) && score.name !== 'followers')).map(score =>
                        <div className="category">
                            <div className="heading">
                                <CategoryIcon className="icon" category={score.name} /> {score.name}
                            </div>
                            <div className="score">{score.score}</div>
                        </div>)}
                </CategoryScore>
            </ScoreCard>
            <Divider />
        </ProfileContent>
    </ProfileInfoDiv>
    </>);

    function handleEditProfileClick() {
        if (editProfile) {
            
        } else {
            setEditProfile(true);
        }
    }

    function updateRankEffect() {
        effect();
        return cleanup;

        async function effect() {
            try {
                let res = await request('get', `${API_DOMAIN}/rank/user?user-id=${profileUser._id}`);
                console.log(res.data);
                if (res.data.success && res.data.ranking) {
                    console.log('Ranking: ', res.data.ranking);
                    setRank(res.data.ranking);
                }
            } catch (err) {
                console.error('ERROR', err);
            }
            
        }
        function cleanup(){}
    }

    function updateFollowingEffect() {
        effect();
        
        async function effect(){
            try {
                let res = await request('get', `${API_DOMAIN}/following/count/${profileUser._id}`);
                if (res.data.success && res.data.followers && res.data.followings) {
                    setFollowers(res.data.followers);
                    setFollowings(res.data.followings);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

}