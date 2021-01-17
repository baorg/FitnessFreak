import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';

import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';

import Question from '../../Question/Question/ques';

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
`;


export default function BookmarksList({profileUser}) {
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    return (
        <QuestionsListDiv
                pageStart={0}
                loadMore={handleLoadMore}
                hasMore={hasMore}
                loader={<CircularProgress />}
            >
            {   questions.length === 0 && hasMore===false ?
                <div className="no-question-div">
                    <SentimentVeryDissatisfied />
                    <div>No bookmarked questions</div>
                </div> :
                questions.map(ques => <Question key={ques._id} question={ques} />)}
        </QuestionsListDiv>
    );


    function handleLoadMore(page) {
        ajaxRequest('GET', `${API_DOMAIN}/question/get-bookmarks?user_id=${profileUser._id}&page=${page}`)
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