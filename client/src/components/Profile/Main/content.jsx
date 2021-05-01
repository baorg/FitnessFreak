import React, {useState} from 'react';
import styled from 'styled-components';
// import FollowersList from '../Followers';
// import FollowingsList from '../Following';
import QuestionsList from '../QuestionsList';
import AnswersList from '../AnswersList';
import BookmarksList from '../Bookmarks';



// Styled components =====================================================================================================

let ProfileContent = styled.div`
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    margin: 20px 0 0 0 ;
`;

let SelectButtons = styled.div`
    display: flex;
    justify-content: space-evenly;

    .sel{
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.8);
        cursor: pointer;
    }


    .active{
        font-weight: 500;
        font-size: 25px;
        line-height: 30px;
        color: #065BFB;
    }
`;
// =================================================================================================================================================

export default function Content({ user, profileUser }) {
    const [activeListType, setActiveListType] = useState('question');

    function changeList(type) {
        if (['question', 'answer', 'followers', 'following', 'bookmarks'].some(t=>t===type) && type !== activeListType)
            setActiveListType(type);
    }


    return (
        <ProfileContent>
            <SelectButtons>
                <div
                    className={`sel ${activeListType === 'question'?'active':''}`}
                    onClick={()=>changeList('question')}>Questions Asked</div>
                <div
                    className={`sel ${activeListType === 'answer'?'active':''}`}
                    onClick={()=>changeList('answer')}>Answer</div>
                <div
                    className={`sel ${activeListType === 'bookmarks'?'active':''}`}
                    onClick={()=>changeList('bookmarks')}>Bookmarks
                </div>
            </SelectButtons>

            {
                activeListType === 'question' ?
                    <QuestionsList profileUser={profileUser} user={user}/>
                    : activeListType === 'answer' ?
                        <AnswersList profileUser={profileUser} />
                        : activeListType === 'bookmarks' ?
                            <BookmarksList profileUser={profileUser} />
                            : <></>
            }
        </ProfileContent>
    );
}