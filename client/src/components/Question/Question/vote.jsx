import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import LikeBtn from '../../static/like_btn';

import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';

// Styled Components =============================================================================

let VoteDiv = styled.div`
    display: flex;
    align-items: center;
    justify-items: space-evenly;
    
    .vote-btn{
        cursor: pointer;
    }
`;

let VoteCountDiv = styled.div`
    color: ${({count})=>count<0?"#ff8080":(count===0?"black":"#065BFB")};
    
    text-align: center;
    height: 1.4em;
    border-radius: 10px;
    margin: 0 15px 0 15px;
    
    font-family: SF Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 27px;
`;

// ======================================================================================

export default function Vote({vote, quesId, type=1}){

    /*
        Type: 
            0: Answer
            1: Question
            2: Comment
    */

    const [votes, setVotes] = useState(vote);
    const [up,setUp]= useState(null);
    const [down,setDown]=useState(null);
    
    useEffect(()=>{
        setVotes(vote);
    }, [vote]);
    useEffect(() => {
        fetchUserStatus();    
    }, []);

    return (
      <VoteDiv>
        <LikeBtn
            type="like"
            active={up}
            onClick={upvote}
            className="vote-btn"
        />
        <VoteCountDiv count={votes.up-votes.down}>{Math.abs(votes.up - votes.down)}</VoteCountDiv>
        <LikeBtn
            type="dislike"
            active={down}
            onClick={downvote}
            className="vote-btn"
        />
      </VoteDiv>
    );


    async function fetchUserStatus(){
        let res = await ajaxRequest('post', `${API_DOMAIN}/question/votes/byUser`, {quesId  :quesId, isQues : type});
        if(res.data.success){
            // console.log('Response: ', res.data.upvote, res.data.downvote);
            setUp(res.data.upvote);
            setDown(res.data.downvote);
        }
    }

    async function upvote(){
        console.log('Upvote clicked.', up, vote);
        if(up!==null){
            let voted = !up;
            setUp(null);
            let res = await ajaxRequest('post', `${API_DOMAIN}/question/votes/editVote`, 
                {
                    isQues: type,
                    quesId: quesId,
                    up: voted});

            if(res.data.success){
                if(res.data.is_saved){
                    setUp(voted);
                    setDown(false);
                }else{
                    setUp(!voted);
                }
                setVotes({
                    up: res.data.vote.upvote,
                    down: res.data.vote.downvote
                });
            }
        }
    }

    async function downvote(){
        if(down!==null){
            let voted = !down;
            
            setDown(null);
            let res = await ajaxRequest('post', `${API_DOMAIN}/question/votes/editVote`, 
                {
                    isQues: type, 
                    quesId: quesId, 
                    down: voted
                });

            if(res.data.success){
                if(res.data.is_saved){
                    setDown(voted);
                    setUp(false);
                }else{
                    setDown(!voted);
                }
                setVotes({
                    up: res.data.vote.upvote,
                    down: res.data.vote.downvote
                });
            }   
        }
    }

}