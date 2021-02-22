import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
import Question from '../../Question/Question/ques';
import InfiniteScroll from 'react-infinite-scroller';


// Styled Components ==============================================================================================

const QuestionsListDiv = styled(InfiniteScroll)`
    width: 100%;
    min-height: 10em;
    place-items: center;
    display: flex;
    flex-direction: column;

    .no-question-div{
        position: relative;
        top: 5em;
        display: flex;
        flex-direction: column;
        place-items: center;
    }


`;

let NoQuestionDiv = styled.div`
    display: grid;
    place-items: center;
    justify-items: center;
    height: 100px;
`;

// ================================================================================================================
export default function QuestionsList({profileUser, user}) {
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // useEffect(function () {
    //     async function fetchQuestions() {
    //         let res = await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/question/get-questions-of-user?user_id=${props.profileUser._id}`);
    //         setQuestions(res.data.questions);
    //     }
        
    //     fetchQuestions();
    // }, []);

    return (
        <QuestionsListDiv
                pageStart={0}
                loadMore={handleLoadMore}
                hasMore={hasMore}
                loader={<CircularProgress />}
            >
            {   questions.length === 0 && hasMore===false?
                <div className="no-question-div">
                    <SentimentVeryDissatisfied />
                    <div>No Questions asked</div>
                </div> :
                questions.map(ques => <Question key={ques._id} question={ques} user={user} />)}
        </QuestionsListDiv>
    );


    function handleLoadMore(page) {
        ajaxRequest('GET', `${API_DOMAIN}/question/get-questions-of-user?user_id=${profileUser._id}&page=${page}`)
            .then(({ data }) => {
                if (data.questions.length > 0) {
                    console.log("Adding questions: ", data.questions);
                    return setQuestions([...questions, ...data.questions]);
                } else {
                    return setHasMore(false);
                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}