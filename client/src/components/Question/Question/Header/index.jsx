import styled from 'styled-components';

import { Avatar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { A, navigate } from 'hookrouter';
import moment from 'moment';

import BookmarkIcon from 'src/components/BookMark/MyBookMark';
import FollowBtn from 'src/components/Profile/FollowButton'

import QuestionHeaderMenu from './menu';
import {
    PostedDate, NameDiv, PostedName, QuestionHeader
} from './styled';


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