import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';
import Question from '../../Question/Question/ques';

const AnswersListDiv = styled.div`
    display: flex;
`;

export default function AnswersList(props) {
    const [answers, setAnswers] = useState(null);

    useEffect(function () {
        async function fetchQuestions() {
            let res = await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/Question/get-answers-of-user?user_id=${props.profileUser._id}`);
            console.log('Response: ', res);
        }

        fetchQuestions();
    }, []);

    return (
        <AnswersListDiv>

        </AnswersListDiv>
    )
}