import React, { useState,useRef,useEffect } from "react"
import { A,navigate } from 'hookrouter';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { Checkbox, CircularProgress, Chip } from '@material-ui/core';

import axiosCall from "../../ajaxRequest";
import { API_DOMAIN } from '../../config';

// Styled Components =====================================================================================================

let RankingDiv = styled.div`

    grid-area: main;
    margin-top: 20px;

    .shiny{
        text-align: left;
        border-bottom: 2px solid #B8B8B8;
        padding: 5px;
        display: flex;
        align-items: center;
    }
    
    .name-div{
        display: flex;
        flex-direction: column;

        .name{
            font-size: 20px;
            padding: 10px;
            color:black;
        }

        .username{
        }
    }

    .followers-div{
        height: 100%;
        margin-left: auto;
    }

    .score-div{
        height: 100%;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .main-score{
            font-size: 20px;
        }

        .total-score{
            font-size: 15px;
            color: #616161;
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

let Progressbar = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
`;


// ========================================================================================================================



export default function Ranking ({ type, categories }) {

  const [rank, setRank] = useState(null);

    useEffect(() => {
        setRank(null);
        console.log(type, categories);
        //axios call
        let url = `${API_DOMAIN}/rank/ByCategory`;
        let data = {};
        
        if (type === 'category') {
            if (categories.length === 0)
                data = { type: 'totalScore', categories: [] };
            else
                data = { type: 'category', categories };
        }else if(type === "followers")
            data = { type, categories: [] };
        else {
          return;
        }

    axiosCall('POST', url, data)
      .then(({ data }) => {
        setRank(data.ranking);
      });
  }, [type, categories]);

  return (
      <RankingDiv>
          {rank === null ? <Progressbar ><CircularProgress /></Progressbar>:
            <>
            {rank.map((el,index)=>
                <div className="shiny">
                    <div style={{display:"inline-block",fontSize:"30px" ,paddingRight:"10px"}}>#{index+1}</div>
                    <Avatar src={el.profile_image} style={{height:"70px", width:"70px", borderRadius:"1000px"}} />
                    <A className="name-div" href={`/profile/${el._id}`}>
                        <div className="name">{el.first_name} {el.last_name}</div>
                        <div className="username">@{el.username}</div>
                    </A>

                    <div className="categories-chip-container">
                        {categories.map(cat => {
                            let c = el.score.find(({ name }) => name === cat);
                            if (c) {
                                return <Chip className="categories-chip" size="small" variant="outlined" color="primary" label={`${cat} ${c.score}`} />;
                            }
                        })}
                    </div>

                    {type === "followers" ?
                        <div className="score-div" >
                            <div className="main-score">{el.catScore/4} </div>
                            <div className="total-score">Followers</div>
                        </div>:
                        <div className="score-div" >
                            <div className="main-score">{el.totalScore} </div>
                            <div className="total-score">Total Score</div>
                        </div>}
                </div>
            )}
            </>
        }
    </RankingDiv>);
    
}