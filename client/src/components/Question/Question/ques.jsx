import React from "react"
import { A } from 'hookrouter';
import './style.css';
import TimeAgo from 'javascript-time-ago';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import noimage from '../../../static/noimage.png';
import BookmarkIcon from '../../BookMark/MyBookMark';
import UpDownVote from './vote';
import Answers from './Answers';

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


// Styled components ===================================

let Question = styled.div`
    background-color: white;
    margin: 4px;
    border-radius: 2px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    padding: 4px;
`;

let QuestionHeader = styled.div`
    display: flex;

    .bookmark-icon{
        margin-left: auto;
        margin-right: 20px;
        align-self: center;
        font-size: 35px;
    }
`;

let ProfileImage = styled.img`
    width: 2em;
    height: 2em;
    border-radius: 50%;
    margin: 5px 5px 0 5px;
`;

let PostedName = styled.div`
    margin-left: 5px;
`;

let PostedDate = styled.div`
    font-size: 0.7em;
    color: #8f8f8f;
`;

let NameDiv = styled.div`
    
`;

let CategorySpan = styled.span`
    size: 0.8em;
    color: #2f2f2f;
    width: fit-content;
    background-color: ${({ selected }) => selected? "#9ff5a6":"rgb(238, 238, 238)"};
    padding: 0 4px 0 4px;
    margin: 0 2px 0 2px;
    border-radius: 6px;
`;

let QuestionMainDiv = styled.div`
    width: 100%;
`;
let QuestionTitle = styled.div`
    size: 0.8em;
    font-weight: bolder;
    A{
        color: black;
    }
`;
let QuestionPreviewDiv = styled.div`
    width: 100%;
    max-height: 25em;
    overflow: scroll;
    font-style: bold;

    .question-content{
        color: black;
        text-decoration: none;
    }
`;

let ReadMoreDiv = styled.div`
    position: relative;
    top: -1em;
    display: grid;
    place-items: center;
    background-color: rgba(255, 255, 255, 0.753);
`;

let ReadMoreButton = styled.button`
    background-color: #bfd9e0;
    border: 0;
    border-style: none;
    border-radius: 10px;
    :hover{
        transform: scale(1.1);
        background-color: #82d3e9;
    }
`;

let QuestionCountDiv = styled.div`
    margin-right: 4px;
    display: flex;
    flex-direction: column;
`;

let VoteCount = styled.div`
    background-color: ${props => props.count > 0 ? "#a4f3a4" : props.count < 0 ? "#cfacac" : "#fff99e"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0 2px 0 2px;
    margin-bottom: 2px;
    font-size: 0.8em;
    color: #555555;
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
            <QuestionHeader>
                <Avatar alt={`${question.user?.username || 'unknown'}s_profile_image`} src={question.user?.profile_image}/>
                <PostedName>
                    <NameDiv>
                        {question.user ?
                            <A href={`/profile/${question.user._id || question.user.userId}`}> {question.user.first_name} {question.user.last_name}</A>
                            : "[deleted]"
                        }
                    </NameDiv>
                    <PostedDate>{ new Date(question.posted_at).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'}) }</PostedDate>
                </PostedName>
                <BookmarkIcon className="bookmark-icon" quesId={ question._id}/>
            </QuestionHeader>
            <hr/>
            <QuestionHeader>
                <QuestionCountDiv>
                    <UpDownVote 
                        quesId={question._id} 
                        vote={question.vote}
                    />
                    <VoteCount >
                        <span>{question.answers_count}</span>
                        <span>answers</span>
                    </VoteCount>
                </QuestionCountDiv>
                <QuestionMainDiv>
                    {/* <QuestionTitle>
                    <A href={url}>{question.title}</A>
                    </QuestionTitle> */}
                    <QuestionPreviewDiv>
                        <A className="question-content" dangerouslySetInnerHTML={{ __html: question.question }}  href={url} />
                    </QuestionPreviewDiv>
                    {/* <ReadMoreDiv>
                        <A href={url}><ReadMoreButton>Read More</ReadMoreButton></A>
                    </ReadMoreDiv> */}
                </QuestionMainDiv>
            </QuestionHeader>
            <div className="category-container">
                {question.category.map(category => (
                    <CategorySpan className="category-span" selected={selectedCategories!==null && selectedCategories.some(cat=>cat===category)}>{category}</CategorySpan>
                ))}
            </div>

            {qtype===1 && <Answers quesId={question._id} user={user}/>}
        </Question>
    );
}

