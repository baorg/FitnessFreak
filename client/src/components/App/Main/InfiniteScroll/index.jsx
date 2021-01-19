import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import Question from "../../../Question/Question/ques";

import CONFIG from '../../../../config';
import ajaxRequest from '../../../../ajaxRequest';

const StyledInfiniteScroll = styled(InfiniteScroll)`
    min-height: 100%;
    display: grid;
    place-items: center;
`;

export default function (props) {
    const [feed, setFeed] = useState({questions:[], current_page: 0 });
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setFeed({ questions: [], current_page: 0 });
        setHasMore(true);
        return () => {
        }
    }, [props.url]);

    async function refreshFeed(event) {
        await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/feed/refresh-feed`);
        setFeed({questions:[], current_page: 0});
        setHasMore(true);
    }
  
    async function handleLoadMore(page) {
        // let page = feed.current_page+1;
        let newQuestions = await ajaxRequest('GET', `${props.url}page=${page}`);
        if (newQuestions.data.questions.length > 0) {
            return setFeed({
              questions: feed.questions.concat(newQuestions.data.questions),
              current_page: feed.current_page+1
            });
        } else {
            return setHasMore(false);
        }
    }
    return (
        <StyledInfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={ <Spinner /> }
        >
            {feed.questions.map(question => <Question key={question._id} question={question} />)}
        </StyledInfiniteScroll>
    );
}