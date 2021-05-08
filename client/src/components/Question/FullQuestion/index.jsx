import React,{useState,useEffect,useRef, useContext} from "react"
import axios from "axios"
import { Spinner } from "react-bootstrap";
import { A,navigate } from "hookrouter";
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';


import { UserContext } from 'src/components/utils/UserContext';
import { responsive } from '../../utils/data.json';

import QuestionHeader from 'src/components/Question/Question/Header';
import QuestionContent from 'src/components/Question/Question/Content';
import QuestionComments from 'src/components/Question/FullQuestion/comments';

import PostAnswer from 'src/components/Question/Question/post_answer';

import Answers from './answers';

import request from 'src/ajaxRequest';
import { API_DOMAIN } from 'src/config';

// Styled Components =======================================================================================


let MainDiv = styled.div`
    overflow-x: hide;
    width: 100%;
    display: grid;
    margin-top: 20px;
`;

let ContentDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: block;
    padding: 2em;
    max-width: 900px;
    place-self: center;
    background-color: white;
    border-radius: 10px;

    @media(max-width: ${responsive.small}){
        font-size: 12px;
    }
    
`;

// ==========================================================================================================


function FullQuestion({ quesId }) {
    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])
    const [totalCount, setTotalCount] = useState(null);
    const [satisfactory, setSatisfactory] = useState(false);
    const [user,] = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);
    const [commentsReload, setCommentsReload] = useState(true);

    useEffect(fetchQuestionEffect, [satisfactory]);


    return (
        <MainDiv>
            {question &&
            <ContentDiv>
                <QuestionHeader
                    question={question}
                    user={user}/>
                <QuestionContent 
                    question={question}
                    url={"#"}
                    selectedCategories={[]}
                    postComment={postComment} />
                <QuestionComments
                    parentId={quesId}
                    parentType="question"
                    commentsReload={commentsReload}
                    onReloaded={() => setCommentsReload(false)} />
                <PostAnswer
                    quesId={quesId} />
                
                <Answers quesId={quesId} />
            </ContentDiv>
                
         }: <Spinner />
        </MainDiv>);

        function fetchQuestionEffect() {
            effect();
            
            async function effect() {
                let res = await ajaxRequest("get", `${CONFIG.API_DOMAIN}/question/get-question/${quesId}`);
                setTotalCount(res.data.question.vote);
                setQuestion(res.data.question);
                
                res = await ajaxRequest("get", `${CONFIG.API_DOMAIN}/question/get-answers-of-question?quesId=${quesId}`);
                // console.log('RESPONSE DATA: ', res.data);
                // console.log(typeof(res.data));
                setAnswers(res.data.answers);
                if (user !== undefined) {
                    ajaxRequest("post", `${CONFIG.API_DOMAIN}/question/isQuestionAskedByUser`, {
                        quesId: quesId
                    }).then(res => {
                        if (res.data.err) {
                            // navigate("/")
                        }
                        else if (res.data.data) {
                            setSatisfactory(true);
                        }
                    });
                }
            }
        }

     function selectedSatisfactoryAnswer(answerId){
        if (window.confirm("Are you sure you want to mark this answer as the Satisfactory Answer")) {
            // txt = "You pressed OK!";
            ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/markAnswer`,{
                quesId: quesId,
                answerId:answerId
            }).then(async(res)=>{
                if(res.data){
                    navigate("/")
                } else{
                    await setSatisfactory(false);
                    navigate(`/viewFullQuestion/${quesId}`)
                }
            })
        } else {
        }
        
    }

    async function postComment({comment}) {
        try {
            let res = await request(
                'post',
                `${API_DOMAIN}/question/post-comment`,
                { comment: comment, questionId: question._id });
            setCommentsReload(true);
        } catch (err) {
            console.error('ERROR', err);
        }
    }
}



export default FullQuestion;