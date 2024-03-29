import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';
import { TextField, Button } from '@material-ui/core';

import Answer from './answer';
import Comment from './comment';
import ajaxRequest from '../../../../ajaxRequest';
import {API_DOMAIN} from '../../../../config';

// Styled Components ====================================================

let AnswersDiv = styled.div`
    margin: 20px 10px 20px 10x;
    width: 100%;
    box-sizing: border-box;
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



// ======================================================================


export default function Answers({quesId, user}){
    let [answers, setAnswers] = useState([]);    

    useEffect(()=>{
        fetchAnswers();
    }, [quesId]);

    


    return (
        <MainDiv>            
            <AnswersDiv>
                {answers.map(answer=>
                        <StyledAnswer 
                            answer={answer} user={user}
                        />
                )}
            </AnswersDiv>
        </MainDiv>
    );

    async function fetchAnswers(){
        let res = await ajaxRequest('get', `${API_DOMAIN}/answer/get-answers-of-question?quesId=${quesId}`);

        if(res.data.success){
            setAnswers(res.data.answers);
        }
    }
}