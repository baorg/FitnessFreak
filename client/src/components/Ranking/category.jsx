import { useState, useRef, useEffect, useContext } from "react";
import { A } from 'hookrouter';
import styled from 'styled-components';

// Material-UI ==================================================

import Typography from '@material-ui/core/Typography';
import  Avatar  from '@material-ui/core/Avatar';
import CircularProgress  from '@material-ui/core/CircularProgress'

// =============================================================


import { 
    GoldAwardIcon, SilverAwardIcon, BronzeAwardIcon
} from './staticfiles';

import axiosCall from "../../ajaxRequest";
import { API_DOMAIN } from '../../config';
import { UserContext } from "../utils/UserContext";

// Styled Components ==========================================================================================
import UserRankDiv from './UserRankDiv';

const Progressbar = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
`;


// ============================================================================================================



export default function CategoryRanking({ categories }){
    const [ rank, setRank ] = useState(null);
    const [ user, ] = useContext(UserContext);
    const selfRef = useRef(null);

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
            <UserRankDiv 
                self={user&&el._id===user._id} 
                className={user&&el._id===user._id?"my-rank":""}
                ref={(user&&el._id===user._id)?selfRef:null}
                onClick={(user&&el._id===user._id)?takeDown:()=>{}}
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
                :   <></>                    
                }
            </UserRankDiv>
        )}
        </>
    );

    function takeDown(){
        if(selfRef){
            selfRef.current.style.position = 'static';
            selfRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            // console.log('Taking down: ', selfRef.current.scrollIntoView);
            selfRef.current.style.position = 'sticky';
        }
    }
}