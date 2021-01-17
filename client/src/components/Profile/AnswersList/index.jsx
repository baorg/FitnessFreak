import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroller';


import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';
import AnswerDiv from '../../Answer/Answer/answer';


// Styled Components ==================================================================================================

let AnswersListDiv = styled(InfiniteScroll)`
    width: 100%;
    min-height: 10em;
    place-items: center;
    display: flex;
    flex-direction: column;

    .no-answer-div{
        position: relative;
        top: 5em;
        display: flex;
        flex-direction: column;
        place-items: center;
    }

`;

// =====================================================================================================================

export default function AnswersList({ user, profileUser }) {
    const [answers, setAnswers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    // useEffect(function () {
    //     async function fetchQuestions() {
    //         let res = await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/question/get-answers-of-user?user_id=${profileUser._id}`);
    //         console.log('Response: ', res);
    //     }

    //     fetchQuestions();
    // }, []);

    return (
        <AnswersListDiv
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={<CircularProgress />}
        >
            {
                answers.length === 0 && hasMore === false ?
                <div className="no-answer-div">
                    <SentimentVeryDissatisfied />
                    <div>No Answers given</div>
                </div> :
                    answers.map(answer => <AnswerDiv answer={answer} user={user} satisfactory={answer.marked} quesId={answer.question._id} type={1}/>)
            }
        </AnswersListDiv>
    );
    
    function handleLoadMore(page) {
        return ajaxRequest('GET', `${CONFIG.API_DOMAIN}/question/get-answers-of-user?user_id=${profileUser._id}&page=${page}`)
            .then(({ data }) => {
                if (data.answers.length > 0) {
                    // console.log("Adding answers: ", data.questions);
                    return setAnswers([...answers, ...data.answers]);
                } else {
                    return setHasMore(false);
                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}




//     answers===null ? <CircularProgress />:
//     <AnswersListDiv>
//         {answers.map(answer =>
//             <AnswerDiv answer={answer} user={user} satisfactory={answer.marked} quesId={answer.question._id} />
//         )}
//     </AnswersListDiv>
// )