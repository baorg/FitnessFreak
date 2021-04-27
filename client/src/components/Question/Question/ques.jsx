import React from "react"
import { A } from 'hookrouter';
import TimeAgo from 'javascript-time-ago';
import { Divider } from '@material-ui/core';

import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";


import styled from 'styled-components';
import noimage from '../../../static/noimage.png';

import Answers from './Answers';
import QuestionHeader from './Header';
import QuestionContent from './Content';
import { responsive } from '../../utils/data.json';
import PostAnswer from './post_answer';

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


// Styled components ===================================

let QuestionContainer = styled.div`
    background: #FFFFFF;
    border-radius: 10px;
    width: 100%;
    padding: 30px 10px 10px 10px;
    margin-bottom: 30px;
    box-sizing: border-box;
    @media (max-width:${responsive.small}){
        border-radius: 0;
        margin: 0 !important;
    }
`;

let Question = styled.div`
    max-height: 600px;
    overflow-y: auto;
    scrollbar-color: #E3E3E3 transparent;
    scrollbar-width: 5px;
    
    
    ::-webkit-scrollbar-thumb {
        background: #E3E3E3;
        border-radius: 10px;
        outline: 1px solid rgb(210, 230, 250);
    }
    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: 1em;
    }

    @media (max-width:${responsive.small}){
        font-size: 12px;
        border: 0;
        padding : 10px;
        /* border-bottom: 1px solid black; */
        border-radius: 0;
        margin: 0 !important;
    }
    .divider{
        color: #444;
    }
    .post-answer{
        position: sticky;
        bottom: 0;
        /* top: 10em; */
        z-index: 1000;
        /* box-shadow: 0 -20px 100px #575757; */
        
    }
`;


// =====================================================


let styles = {
    vote: {
        display: 'flex',
        flexDirection: 'column'
    }
}




export default function ({question, type, user, selectedCategories=[], qtype=0, bottomNeeded=true}) {
    
    /*
        type :- 
            0 : No Answers
            1 :  with Answers
    */


    const timeAgo = new TimeAgo('en');
    let url = "";
    if (type === "answerasked")
        url = `/profile/${question.user._id}/answer-asked/${question._id}`;
    else
        url = `/viewFullQuestion/${question._id}`;
    
    return (
        <QuestionContainer>
            <Question>
                <QuestionHeader 
                    question={question} 
                    user={user}/>
                    <QuestionContent 
                        question={question} 
                        url={url}
                        selectedCategories={selectedCategories}
                        bottomNeeded={bottomNeeded}/>
                {qtype===1 && <Answers quesId={question._id} user={user}/>}
            </Question>
            {bottomNeeded && <PostAnswer
                className="post-answer"
                quesId={question._id} user={user} />}
        </QuestionContainer>
    );
}

