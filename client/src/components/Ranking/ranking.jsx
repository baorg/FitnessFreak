import React, { useState,useRef,useEffect, useContext} from "react";
import { A,navigate } from 'hookrouter';
import styled from 'styled-components';



// material UI ==================================
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  Avatar  from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress  from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import PeopleIcon from '@material-ui/icons/People';

// ========================================


import axiosCall from "../../ajaxRequest";
import { responsive } from '../utils/data.json';
import { API_DOMAIN } from '../../config';

import { 
    FollowersIcon, CategoryIcon
} from './staticfiles';
import { UserContext } from "../utils/UserContext";

import FollowersRanking from './followers';
import CategoryRanking from './category';


// Styled Components =====================================

let RankingDiv = styled.div`

    /* grid-area: main; */
    /* margin-top: 20px; */
    display: flex;
    width: 100%;
    
    .divider{
        height: 80vh;
        top: 10vh;
        position: sticky;
    }
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
    font-weight: 500;
    font-size: 25px;
    line-height: 37px;

    @media(max-width: ${responsive.small}){
        font-weight: 500;
        font-size: 15px; 
        line-height: 37px;
    }

    .heading{
        margin-bottom: 2em;
        display: flex;
        justify-content: center;

        
        .selector-btn{
            color: rgba(66, 66, 89, 0.5);
            background-color: white;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;
            min-width: 10em;
            max-width: 15em;
            min-height: fit-content;
            padding: 10px;
            display: flex;
            justify-content: center;
            .icon{
                align-self: center;
                margin-right: 10px;
                height: 20px;
                width: 20px;
            }

            .selected-categories{

                .category-chip{
                    margin: 2px;
                }
            }
        }

        .category-selector-btn{
            display: flex;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        .follow-selector-btn{
            /* grid-area: select-follow; */
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }

        .selector-container{
            /* grid-area: category; */
            margin: 3px;
        }

        .type-selector{
            /* grid-area: type; */
        }
    }
`;

const Progressbar = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
`;


// ===============================================



export default function Ranking ({ type, setType, categories }) {
    const [ user, ] = useContext(UserContext);
    
    let midPoint = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
    let lastPoint = useMediaQuery(`(max-width: ${responsive.small})`);
    
    return (
        <RankingDiv>
            {!lastPoint && <Divider orientation="vertical"  variant="middle" className="divider" />}
            <ContentDiv>
                <div className="heading">
                    <div 
                        className="category-selector-btn selector-btn" 
                        style={type==='category'?{backgroundColor: '#065BFB', color: "white" }:{}} 
                        onClick={()=>setType('category')}>
                        <CategoryIcon className="icon" />
                        <span>Category</span>
                    </div>
                    <div 
                        className="follow-selector-btn selector-btn" 
                        style={type==='followers'?{backgroundColor: '#065BFB', color: "white" }:{}} 
                        onClick={()=>setType('followers')}>
                        <FollowersIcon className="icon" />
                        <span>Followers</span>
                    </div>
                </div>
                {type==='category' ? <CategoryRanking categories={categories} /> : 
                type==='followers' ? <FollowersRanking categories={categories} /> : <></>}
            </ContentDiv>
            { (!(midPoint||lastPoint)) && <Divider orientation="vertical"  variant="middle" className="divider"/>}
        </RankingDiv>);    
}