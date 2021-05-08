import styled from 'styled-components';

import { Avatar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { A, navigate } from 'hookrouter';
import moment from 'moment';

import BookmarkIcon from '../../../BookMark/MyBookMark';
import QuestionHeaderMenu from './menu';
import { responsive } from '../../../utils/data.json';
import FollowBtn from '../../../Profile/FollowButton';

// Styled components ===================================
let QuestionHeader = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;

    .avatar{
        width: 56px;
        height: 56px;

        @media(max-width: ${responsive.small}){
            width: 30px;
            height: 30px;
        }
    }

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
    margin-left: 10px;
    display: flex;
    flex-direction:column;
`;

let NameDiv = styled.div`

    .posted-by{
        font-size: 0.9rem;
        color: #555;
    }
    
    .posted-by-name{
        text-decoration: none;
        font-size: 1.2em;
    }

    .deleted-name{
        color: #333;
    }
`;

let PostedDate = styled.div`
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    .posted-on{
        font-size: 14px;
        line-height: 17px;
        color: rgba(66, 66, 89, 0.8);
        
        @media(max-width: ${responsive.small}){
            font-size: 10px;
        }
    }
    .posted-date{
        margin-left: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #424259;

        @media(max-width: ${responsive.small}){
            font-size: 12px;
        }
    }
    
`;

// =====================================================


export default function Header({ question, user = null }) {
    return (
        <QuestionHeader>
            <Avatar
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/profile/${question.user._id}`)} 
                alt={`${question.user && question.user.username || 'unknown'}s_profile_image`}
                src={question.user && question.user.profile_image}
                className="avatar"
            />
            <PostedName>
                <NameDiv>
                    {question.user ?
                        <>
                            <A className="posted-by-name" href={`/profile/${question.user._id || question.user.userId}`}> {question.user.username}</A>
                            {question.user.is_verified && <CheckCircleIcon variant="filled" color="primary" />}
                        </>
                        : <span className="posted-by-name deleted-name">[deleted]</span>}
                    <FollowBtn
                        type="text"
                        profile={question.user}
                    />
                </NameDiv>
                <PostedDate>
                    <span className="posted-on">Posted on</span>
                    <span className="posted-date">{moment(question.posted_at).format('MMMM DD, YYYY')}</span>
                </PostedDate>
            </PostedName>
            <div className="icon-div">
                <BookmarkIcon
                    className="bookmark-icon icon"
                    quesId={question._id} />
                <QuestionHeaderMenu user={user} question={question} />
            </div>
        </QuestionHeader>);

}