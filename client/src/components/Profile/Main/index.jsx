import React from 'react';
import styled from 'styled-components';
import UserInfoDiv from './Info';
import QuestionAnswer from './content';


// Styled components ===================================

const MainDiv = styled.div`
    min-height: 100vh;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 0px;
    border-left: 2px solid #919191;
    border-right: 2px solid #919191;
    border-collapse: collapse;
`;

// =======================================================



export default function Main(props) {
    
    return (
        <MainDiv>
            <UserInfoDiv profileUser={props.profileUser} user={props.user} />
            <QuestionAnswer profileUser={props.profileUser} user={props.user}/>
        </MainDiv>
    );
}