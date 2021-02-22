import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { A } from 'hookrouter';

import BookmarkIcon from '../../../BookMark/MyBookMark';
import QuestionHeaderMenu from './menu';

// Styled components ===================================

let QuestionHeader = styled.div`
    display: flex;

    .icon-div{
        margin-left: auto;
        display: flex;
    }

    .icon{
        margin-right: 20px;
        align-self: center;
        font-size: 35px;
        cursor: pointer;
    }
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

// =====================================================


export default function Header({ question, user=null }){
    return (<QuestionHeader>
        <Avatar 
            alt={`${question.user&&question.user.username || 'unknown'}s_profile_image`} 
            src={question.user&&question.user.profile_image}/>
            <PostedName>
                <NameDiv>
                    {question.user ?
                        <A href={`/profile/${question.user._id || question.user.userId}`}> {question.user.first_name} {question.user.last_name}</A>
                            : "[deleted]"}
                </NameDiv>
                <PostedDate>
                    { new Date(question.posted_at).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'}) }
                </PostedDate>
            </PostedName>
            <div className="icon-div">
                <BookmarkIcon 
                    className="bookmark-icon icon" 
                    quesId={ question._id}/>
                <QuestionHeaderMenu user={user} question={question}/>
            </div>
        </QuestionHeader>);
}