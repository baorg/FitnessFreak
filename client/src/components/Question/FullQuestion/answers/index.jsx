import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';
import { TextField, Button } from '@material-ui/core';

import Answer from './answer';

import ajaxRequest from 'src/ajaxRequest';
import {API_DOMAIN} from 'src/config';
import { UserContext } from 'src/components/utils/UserContext';
import PostComment from 'src/components/Question/Question/post_comments';

// Styled Components ====================================================

let AnswersDiv = styled.div`
    margin: 20px 10px 20px 10x;
    width: 100%;
    box-sizing: border-box;
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


export default function Answers({ quesId }){
    const [answers, setAnswers] = useState([]);
    const [user, ] = useContext(UserContext);

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