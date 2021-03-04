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

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


// Styled components ===================================

let Question = styled.div`
    background-color: white;
    border-radius: 10px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    @media (max-width:${responsive.small}){
        font-size: 12px;
        border: 0;
        border-bottom: 1px solid black;
        border-radius: 0;
        margin: 0 !important;
    }
    .divider{
        color: #444;
    }
`;


// =====================================================


let styles = {
    vote: {
        display: 'flex',
        flexDirection: 'column'
    }
}




export default function ({question, type, user, selectedCategories=[], qtype=0}) {
    
    /*
        type :- 
            0 : No Answers
            1: with Answers
    */


    const timeAgo = new TimeAgo('en');
    let url = "";
    if (type === "answerasked")
        url = `/profile/${question.user._id}/answer-asked/${question._id}`;
    else
        url = `/viewFullQuestion/${question._id}`;
    
    return (
        <Question>
            <QuestionHeader 
                question={question} 
                user={user}/>
                
                <Divider className="divider" />
                <QuestionContent 
                    question={question} 
                    url={url}
                    selectedCategories={selectedCategories}/>
            
            {qtype===1 && <Answers quesId={question._id} user={user}/>}
        </Question>
    );
}

