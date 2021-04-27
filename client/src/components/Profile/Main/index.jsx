import React from 'react';
import styled from 'styled-components';
import UserInfoDiv from './Info';
import QuestionAnswer from './content';


// Styled components ===================================

const MainDiv = styled.div`
    min-height: 100vh;
    background-color: #fff;
    border-collapse: collapse;
    grid-column: 2 / 3;
    border-radius: 10px;
`;

// =======================================================



export default function Main(props) {
    
    return (
        <MainDiv>
            <UserInfoDiv
                profileUser={props.profileUser}
                user={props.user} 
                setEditProfile={props.setEditProfile}
                editProfile={props.editProfile}
            />
            <QuestionAnswer
                profileUser={props.profileUser}
                user={props.user} 
            />
        </MainDiv>
    );
}