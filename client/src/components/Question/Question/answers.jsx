import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

import Answer from '../../Answer/Answer/answer';
import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';

// Styled Components ====================================================

let AnswersDiv = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 700px;
    max-height: 500px;
    overflow: scroll;
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
    max-width: 800px;
`;
// ======================================================================


export default function Answers({quesId, user}){
    let [answerInput, setAnswerInput] = useState("");
    let [answers, setAnswers] = useState([]);

    useEffect(()=>{
        fetchAnswers();
    }, [quesId]);

    return (
        <>
        <AnswerInput>
            <TextField id={`cmmnt-${quesId}`} 
                variant="filled" label="enter answer" 
                value={answerInput}
                className="cmmnt-text"
                onChange={(el)=>setAnswerInput(el.target.value)}
            />
            <Button className="post-btn" color="primary">Post</Button>
        </AnswerInput>
        <AnswersDiv>
            {answers.map(answer=>
                    <StyledAnswer 
                        answer={answer} user={user}
                        selectedSatisfactoryAnswer={false}
                        quesId={quesId}
                        satisfactory={false}
                        type={0b00}
                    />
            )}
        </AnswersDiv>
        </>
    );


    async function fetchAnswers(){
        let res = await ajaxRequest('get', `${API_DOMAIN}/question/get-answers-of-question?quesId=${quesId}`);

        if(res.data.success){
            setAnswers(res.data.answers);
        }
    }
}