import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';
import Question from '../../Question/Question/ques';
import { Spinner } from 'react-bootstrap';

const QuestionsListDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

let NoQuestionDiv = styled.div`
    display: grid;
    place-items: center;
    justify-items: center;
    height: 100px;
`;


export default function QuestionsList(props) {
    const [questions, setQuestions] = useState(null);

    useEffect(function () {
        async function fetchQuestions() {
            let res = await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/question/get-questions-of-user?user_id=${props.profileUser._id}`);
            setQuestions(res.data.questions);
            // setQuestions(res.data.question.map(q => ({
            //     ...q, user: {
            //         username: res.data.username,
            //         first_name: res.data.first_name,
            //         last_name: res.data.last_name
            //     }
            // })));
            // console.log('Data :', res.data.question);
        }
        
        fetchQuestions();
    }, []);
    return (questions ?
        (questions.length > 0 ?
            <QuestionsListDiv>
                {questions.map(ques =>
                    <Question question={ques} />
                )}
            </QuestionsListDiv>
            : <NoQuestionDiv> "No Questions posted yet" <SentimentVeryDissatisfiedIcon /></NoQuestionDiv>)
        :<Spinner />
    );
}