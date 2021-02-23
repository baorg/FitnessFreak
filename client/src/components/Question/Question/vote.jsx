import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { ThumbDownAlt, ThumbUpAlt } from '@material-ui/icons';

import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';

// Styled Components =============================================================================

let VoteDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

let VoteCountDiv = styled.div`
    background-color: ${({count})=>count<0?"#ff8080":(count===0?"#e8e8e8":"#4dff4d")};
    width: 100%;
    text-align: center;
    height: 1.4em;
    border-radius: 10px;

    .vote-btn{
        cursor: pointer;
    }
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
        <ThumbUpAlt
          color={up===null? "disabled": (up ? "primary" : "")}
          fontSize="large"
          onClick={upvote}
          className="vote-btn"
        />
        <VoteCountDiv count={votes.up-votes.down}>{votes.up - votes.down}</VoteCountDiv>
        <ThumbDownAlt
          color={down===null? "disabled" : down ? "secondary" : ""}
          fontSize="large"
          onClick={downvote}
          className="vote-btn"
        />
      </VoteDiv>
    );


    async function fetchUserStatus(){
        let res = await ajaxRequest('post', `${API_DOMAIN}/question/votes/byUser`, {quesId  :quesId, isQues : type});
        if(res.data.success){
            console.log('Response: ', res.data.upvote, res.data.downvote);
            setUp(res.data.upvote);
            setDown(res.data.downvote);
        }
    }

    async function upvote(){
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