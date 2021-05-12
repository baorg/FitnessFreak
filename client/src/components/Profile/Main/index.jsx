import React, { useContext } from 'react';
import styled from 'styled-components';
import UserInfoDiv from './Info';
import QuestionAnswer from './content';
import { UserContext } from 'src/components/utils/UserContext';

// Styled components ===================================

const MainDiv = styled.div`
    min-height: 100vh;
    background-color: #fff;
    border-collapse: collapse;
    grid-column: 2 / 3;
    border-radius: 10px;
`;

// =======================================================



export default function Main({ profileUser, editProfile, setEditProfile, setViewImage }) {
    const [user,] = useContext(UserContext);

    return (
        <MainDiv>
            <UserInfoDiv
                profileUser={profileUser}
                setEditProfile={setEditProfile}
                setViewImage={setViewImage}
                editProfile={editProfile}/>
            <QuestionAnswer
                profileUser={profileUser} />
        </MainDiv>
    );
}