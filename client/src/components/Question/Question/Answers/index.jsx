import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';
import { TextField, Button } from '@material-ui/core';

import Answer from './answer';
import ajaxRequest from '../../../../ajaxRequest';
import {API_DOMAIN} from '../../../../config';

// Styled Components ====================================================

let AnswersDiv = styled.div`
    margin: 20px 10px 20px 10x;
    width: 100%;
    box-sizing: border-box;
    max-height: 500px;
    overflow: auto;

    ::-webkit-scrollbar-thumb {
      background-color: rgb(78, 78, 78);
      outline: 1px solid rgb(210, 230, 250);
      border-radius: 2px;
    }
    ::-webkit-scrollbar {
      width: 0.8em;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: 1em;
    }
`;

let AnswerInput = styled.div`
    display: flex;
    justify-items: space-around;
    margin-top: 20px;
    margin-bottom: 10px;

    .cmmnt-text{
        flex: 1;
    }
    .post-btn{
        margin-left: auto;
    }
`;

let StyledAnswer = styled(Answer)`
    width: 100%;
    box-sizing: border-box;
`;

let MainDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
`;


let CommentDiv = styled.div`
    height: 3em;
    background-color: #d8d8d8;
    border-radius: 10px;
    margin: 10px 5px 20px 5px;
    padding: 0 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    .inpt{
        flex: 1;
        background-color: transparent;
        border-style: hidden;
        border-left-style: hidden;
        height: 2.5em;
        /* border-right: 2px solid #888888; */
        :focus{
            outline: none;
        }
    }

    .submit-btn{
        font-size: 1em;
        text-transform: none;
    }
`;
// ======================================================================


export default function Answers({quesId, user}){
    let [answerInput, setAnswerInput] = useState("");
    let [answers, setAnswers] = useState([]);
    let [submitAnswerDisabled, setSubmitAnswerDisabled] = useState(true);
    

    useEffect(()=>{
        fetchAnswers();
    }, [quesId]);

    useEffect(()=>{
        setSubmitAnswerDisabled(user===null || answerInput.length===0);
    }, [user, answerInput])


    return (
        <MainDiv>
            <CommentDiv>
                <input 
                    value={answerInput}
                    onChange={(el)=>setAnswerInput(el.target.value)}
                    placeholder="write your Answer "
                    className="cmmnt-text inpt"
                >
                </input>
                <Button
                    disabled={ submitAnswerDisabled }
                    type="submit"
                    className="post-btn"
                    onClick={submitAnswer}
                    color="primary"
                >Answer</Button>
            </CommentDiv>
        
            <AnswersDiv>
                {answers.map(answer=>
                        <StyledAnswer 
                            answer={answer} user={user}
                        />
                )}
            </AnswersDiv>
        </MainDiv>
    );

    async function submitAnswer(){
        if(submitAnswerDisabled===false){
            // Submit answer .....................
            setSubmitAnswerDisabled(true);
            try{
                let res = await ajaxRequest('POST', `${API_DOMAIN}/question/post-answer`, {
                    quesId: quesId,
                    answer: answerInput
                });
                if(res.data.success){
                    navigate(`viewFullQuestion/${quesId}`);
                }
            }catch(err){
                setSubmitAnswerDisabled(false);
            }
        }
    }

    async function fetchAnswers(){
        let res = await ajaxRequest('get', `${API_DOMAIN}/answer/get-answers-of-question?quesId=${quesId}`);

        if(res.data.success){
            setAnswers(res.data.answers);
        }
    }
}