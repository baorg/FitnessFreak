import { useState,useRef, useContext, useEffect } from "react";
import { A,navigate } from 'hookrouter';
import React from 'react';
import styled from 'styled-components';

import  Avatar  from '@material-ui/core/Avatar';
import CircularProgress  from '@material-ui/core/CircularProgress'


import axiosCall from "../../ajaxRequest";
import { responsive } from '../utils/data.json';
import { API_DOMAIN } from '../../config';

import { 
    GoldAwardIcon, SilverAwardIcon, BronzeAwardIcon
} from './staticfiles';
import { UserContext } from "../utils/UserContext";

// Styled Components ====================================================================
import UserRankDiv from './UserRankDiv';

const Progressbar = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
`;


// ========================================================================================
export default function FollowersRanking({ categories }){
    const [ rank, setRank ] = useState(null);
    const [ user, ] = useContext(UserContext);

    useEffect(()=>{
        setRank(null);
        
        //axios call
        let url = `${API_DOMAIN}/rank/ByCategory`;
        let data = { type: 'followers', categories: categories };
        
        axiosCall('POST', url, data)
            .then(({ data }) => {
                setRank(data.ranking);
        });
    }, [ categories ]);

    return (
        rank === null ? <Progressbar ><CircularProgress /></Progressbar>:
        <>
        {rank.map((el,index)=>
            <UserRankDiv 
                self={user&&el._id===user._id} 
                className={user&&el._id===user._id?"my-rank":""}
            >
                { index===0 ?  
                    <div className="user-rank"><GoldAwardIcon className="rank-medal-img"/></div>
                :index===1 ?
                    <div className="user-rank"><SilverAwardIcon className="rank-medal-img" /></div>
                : index==2 ?
                    <div className="user-rank"><BronzeAwardIcon className="rank-medal-img"/></div>  
                    : <div className="user-rank">{index+1}.</div>
                }
                <Avatar src={el.profile_image} style={{height:"50px", width:"50px", borderRadius:"1000px"}} />
                <A className="name-div" href={`/profile/${el._id}`}>
                    <div className="name">{el.first_name} {el.last_name}</div>
                    <div className="username">@{el.username}</div>
                </A>

                
                <div className="score-div" >
                    <div className="total-score">Followers</div>
                    <div className="main-score">{el.followers} </div>
                </div>
            </UserRankDiv>
        )}
        </>
    );
}