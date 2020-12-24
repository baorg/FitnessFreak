import React from 'react';
import styled from 'styled-components';
import QuestionDiv from '../../Question/Question/ques';

// Styled components ===================================

let StyledQuestionDiv = styled.div`

`;

// ======================================================

export default function Question(props) {
    
    return (
        <StyledQuestionDiv question={props.question}/>
    );
}