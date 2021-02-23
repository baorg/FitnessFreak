import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { A } from 'hookrouter';

import BookmarkIcon from '../../../BookMark/MyBookMark';
import QuestionHeaderMenu from './menu';

// Styled components ===================================

let QuestionHeader = styled.div`
    display: flex;
    align-items: center;

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

let NameDiv = styled.div`

    .posted-by{
        font-size: 0.9rem;
        color: #555;
    }
    
    .posted-by-name{
        font-size: 1.2em;
    }

    .deleted-name{
        color: #333;
    }
`;

// =====================================================


export default function Header({ question, user=null }){
    return (
    <QuestionHeader>
        <Avatar 
            alt={`${question.user&&question.user.username || 'unknown'}s_profile_image`} 
            src={question.user&&question.user.profile_image}/>
            <PostedName>
                <NameDiv>
                    <span className="posted-by">Posted by</span>
                    {question.user ?
                        <A className="posted-by-name" href={`/profile/${question.user._id || question.user.userId}`}> {question.user.username}</A>
                            :<span className="posted-by-name deleted-name">[deleted]</span>}
                </NameDiv>
            </PostedName>
            <div className="icon-div">
                <BookmarkIcon 
                    className="bookmark-icon icon" 
                    quesId={ question._id}/>
                <QuestionHeaderMenu user={user} question={question}/>
            </div>
    </QuestionHeader>);
}