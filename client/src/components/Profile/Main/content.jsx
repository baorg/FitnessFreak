import React, {useState} from 'react';
import styled from 'styled-components';
import FollowersList from '../Followers';
import FollowingsList from '../Following';
import QuestionsList from '../QuestionsList';
import AnswersList from '../AnswersList';
import BookmarksList from '../Bookmarks';

// Styled components ===================================
let ProfileContent = styled.div`

`;

let Button = styled.div`
    border-bottom: 2px solid #909090;
    display: flex;
    justify-content: space-evenly;
`;

let btn = styled.div`
    display: grid;
    place-content: center;
    width: 30%;
    height: 3em;
    font-size: 1.4em;
    border-radius: 10px;
    margin: 10px;
    background-color: ${props => props.active?'#8f8f8f':'inherit'};
    :hover{
        background-color: #606060;
        color: #f0f0f0;
        cursor: pointer;
    }

`;

let QuestionButton = styled(btn)`
    text-align: center;
`;

let BookmarksBtn = styled(btn)`
`;

let AnswerButton = styled(btn)`
`;

let FollowersButton = styled(btn)`

`;

let FollowingButton = styled(btn)`

`;

// ======================================================

export default function Content(props) {
    const [activeListType, setActiveListType] = useState('question');

    function changeList(type) {
        if (['question', 'answer', 'followers', 'following', 'bookmarks'].some(t=>t===type) && type !== activeListType)
            setActiveListType(type);
    }


    return (
        <ProfileContent>
            <Button>
                
                <QuestionButton
                    active={activeListType === 'question'}
                    onClick={()=>changeList('question')}
                >Questions Asked</QuestionButton>

                <AnswerButton
                    active={activeListType === 'answer'}
                    onClick={()=>changeList('answer')}
                >Answer</AnswerButton>
                
                <BookmarksBtn
                    active={activeListType === 'bookmarks'}
                    onClick={()=>changeList('bookmarks')}
                >Bookmarks
                </BookmarksBtn>

                {/* <FollowersButton
                    active={activeListType === 'followers'}
                    onClick={()=>changeList('followers')}
                >Followers</FollowersButton>
                
                <FollowingButton
                    active={activeListType === 'following'}
                    onClick={()=>changeList('following')}
                >Following</FollowingButton> */}
            
            </Button>

            {
                activeListType === 'question' ?
                    <QuestionsList profileUser={props.profileUser} />
                    : activeListType === 'answer' ?
                        <AnswersList profileUser={props.profileUser} />
                        : activeListType === 'bookmarks' ?
                            <BookmarksList profileUser={props.profileUser} />
                            : <></>
            }
        </ProfileContent>
    );
}

{/* 
:activeListType === 'followers' ?
                            <FollowersList profileUser={props.profileUser} />
                            : activeListType === 'following' ?
                                <FollowingsList profileUser={props.profileUser} />
                                : <></> */}