import React, { useState,useRef,useEffect, useContext} from "react"
import { A,navigate } from 'hookrouter';
import styled from 'styled-components';



// material UI ==================================
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  Avatar  from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress  from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import PeopleIcon from '@material-ui/icons/People';

// ========================================


import axiosCall from "../../ajaxRequest";
import { responsive } from '../utils/data.json';
import { API_DOMAIN } from '../../config';

import GoldMedal from './goldmedal.png';
import SilverMedal from './silvermedal.png';
import BronzeMedal from './bronzemedal.png';
import { UserContext } from "../utils/UserContext";


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
const UserRankDiv = styled.div`
    
    text-align: left;
    margin-top: 15px;

    display: flex;
    align-items: center;
    background-color: ${({self})=>self?"#6900be":"white"};
    border-radius: 4px;

    &.my-rank{
        position: sticky;
        bottom: 0em;
    }

    .user-rank{
        width: 100px;
        height: 50px;
        font-size: 1.2em;
        text-align: center;
        justify-content: center;

        color: ${({self})=>self?"#a7dcff":"#18a3ff"};
        .rank-medal-img{
            width: 50px;
            height: 50px;
        }
    }


    .name-div{
        display: flex;
        flex-direction: column;
        padding: 10px;
        .name{
            font-size: 20px;
            color: ${({self})=>self?"#a7dcff":"black"}; 
        }

        .username{
            color: ${({self})=>self?"#a7dcff":"blue"}; 
        }
    }

    .followers-div{
        height: 100%;
        margin-left: auto;
    }

    .score-div{
        height: 100%;
        margin-left: auto;
        margin-right: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .main-score{
            font-size: 1.2em;
            color: ${({self})=>self?"#a7dcff":"#18a3ff"};
        }

        .total-score{
            color: ${({self})=>self?"#a7dcff":"#8f8f8f"};
            font-size: 12px;
        }
    }

    .categories-chip-container{
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px 0 10px;

        .categories-chip{
            margin: 4px;
        }
    }
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;

    @media(max-width: ${responsive.small}){
        font-size: 12px;
    }

    .heading{
        margin-bottom: 2em;
        display: flex;
        justify-content: space-evenly;

        font-size: 1.4em;

        .selector-btn{
            color: gray;
            background-color: white;
            text-align: center;
            margin: 0 10px 0 10px;
            border-radius: 10px;
            cursor: pointer;
            min-width: 10em;
            max-width: 15em;
            min-height: fit-content;
            padding: 10px;

            .icon{
                margin-right: 10px;
            }

            .selected-categories{

                .category-chip{
                    margin: 2px;
                }
            }
        }

        .category-selector-btn{
            /* grid-area: select-category; */
            display: flex;
            flex-direction: column;
        }

        .follow-selector-btn{
            /* grid-area: select-follow; */
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
                        style={type==='category'?{backgroundColor: '#6900be', color: "#a7dcff" }:{}} 
                        onClick={()=>setType('category')}>
                        <span>Category</span>
                    </div>
                    <div 
                        className="follow-selector-btn selector-btn" 
                        style={type==='followers'?{backgroundColor: '#6900be', color: "#a7dcff" }:{}} 
                        onClick={()=>setType('followers')}>
                        <PeopleIcon  className="icon"/>
                        <span>Followers</span>
                    </div>
                </div>
                {type==='category' ? <CategoryRanking categories={categories}/> : 
                type==='followers' ? <FollowersRanking /> : <></>}
            </ContentDiv>
            { (!(midPoint||lastPoint)) && <Divider orientation="vertical"  variant="middle" className="divider"/>}
        </RankingDiv>);

    function FollowersRanking(){
        const [ rank, setRank ] = useState(null);
        useEffect(()=>{
            setRank(null);
            
            //axios call
            let url = `${API_DOMAIN}/rank/ByCategory`;
            let data = { type: 'followers', categories: [] };
            
            axiosCall('POST', url, data)
                .then(({ data }) => {
                    setRank(data.ranking);
            });
        }, []);

        return (
            rank === null ? <Progressbar ><CircularProgress /></Progressbar>:
            <>
            {rank.map((el,index)=>
                <UserRankDiv self={user&&el._id===user._id} className={user&&el._id===user._id?"my-rank":""}>
                    { index===0 ?  
                        <div className="user-rank"><img src={GoldMedal} className="rank-medal-img"/></div>
                    :index===1 ?
                        <div className="user-rank"><img src={SilverMedal} className="rank-medal-img"/></div>
                    : index==2 ?
                        <div className="user-rank"><img src={BronzeMedal} className="rank-medal-img"/></div>  
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

    function CategoryRanking({ categories }){
        const [ rank, setRank ] = useState(null);

        useEffect(() => {
            setRank(null);
            
            //axios call
            let url = `${API_DOMAIN}/rank/ByCategory`;
            let data = {};
            
            
            if (categories.length === 0)
                data = { type: 'totalScore', categories: [] };
            else
                data = { type: 'category', categories };
            
            axiosCall('POST', url, data)
                .then(({ data }) => {
                    setRank(data.ranking);
            });
        }, [ categories ]);
        
        return (
            rank === null ? <Progressbar ><CircularProgress /></Progressbar>:
            <>
            {rank.map((el,index)=>
                <UserRankDiv self={user&&el._id===user._id} className={user&&el._id===user._id?"my-rank":""}>
                    { index===0 ?  
                        <div className="user-rank"><img src={GoldMedal} className="rank-medal-img"/></div>
                    :index===1 ?
                        <div className="user-rank"><img src={SilverMedal} className="rank-medal-img"/></div>
                    : index==2 ?
                        <div className="user-rank"><img src={BronzeMedal} className="rank-medal-img"/></div>  
                        : <div className="user-rank">{index+1}.</div>
                    }
                    <Avatar src={el.profile_image} style={{height:"50px", width:"50px", borderRadius:"1000px"}} />
                    <A className="name-div" href={`/profile/${el._id}`}>
                        <div className="name">{el.first_name} {el.last_name}</div>
                        <div className="username">@{el.username}</div>
                    </A>

                    {categories.length ===0 ? 
                        <div className="score-div" >
                            <div className="total-score">Total Score</div>
                            <div className="main-score">{el.totalScore} </div>
                        </div>
                    : categories.length===1?    
                        <div className="score-div" >
                            <div className="total-score">{categories[0]}</div>
                            <div className="main-score">{el.catScore} </div>
                        </div>
                    :   <div className="score-div" >
                            <div className="total-score">Total Score</div>
                            <div className="main-score">{el.totalScore} </div>
                        </div>
                    }
                </UserRankDiv>
            )}
            </>
        );
    }
    
}





// {rank === null ? <Progressbar ><CircularProgress /></Progressbar>:
//             <>
//             {rank.map((el,index)=>
//                 <div className="shiny">
//                     <div style={{display:"inline-block",fontSize:"30px" ,paddingRight:"10px"}}>#{index+1}</div>
//                     <Avatar src={el.profile_image} style={{height:"70px", width:"70px", borderRadius:"1000px"}} />
//                     <A className="name-div" href={`/profile/${el._id}`}>
//                         <div className="name">{el.first_name} {el.last_name}</div>
//                         <div className="username">@{el.username}</div>
//                     </A>

//                     <div className="categories-chip-container">
//                         {categories.map(cat => {
//                             let c = el.score.find(({ name }) => name === cat);
//                             if (c) {
//                                 return <Chip className="categories-chip" size="small" variant="outlined" color="primary" label={`${cat} ${c.score}`} />;
//                             }
//                         })}
//                     </div>

//                     {type === "followers" ?
//                         <div className="score-div" >
//                             <div className="main-score">{el.catScore/4} </div>
//                             <div className="total-score">Followers</div>
//                         </div>:
//                         <div className="score-div" >
//                             <div className="main-score">{el.totalScore} </div>
//                             <div className="total-score">Total Score</div>
//                         </div>}
//                 </div>
//             )}