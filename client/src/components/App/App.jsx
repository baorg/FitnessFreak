import React, { useState,useRef,useEffect } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import Question from "../Question/Question/ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from '../../ajaxRequest';
import Spinner from 'react-bootstrap/Spinner'

// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = function(props) {

  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(async () => {
    let new_questions = questions;
    
    if (currentPage == 0) 
      return setQuestions([]);

    let newQuestions = await axiosCall('GET', `${ENDPOINT}/feed/get-feed?page=${currentPage}`);
    if (newQuestions.data.questions.length > 0) {
      setQuestions(new_questions.concat(newQuestions.data.questions));
    } else {
      setHasMore(false);
    }
  }, [currentPage]);

  async function refreshFeed(event) {
    setHasMore(true);
    setCurrentPage(0);
    let refresh_res = await axiosCall('POST', `${ENDPOINT}/feed/refresh-feed`);
    // if (refresh_res.data.feed == 'refreshed')
    setCurrentPage(1);
  }
  
  async function handleLoadMore() {
    console.log('Handling Load More: ', currentPage);
    await setCurrentPage(currentPage + 1);
  }

    return (
      <>
        <MyNav user={props.user} />
        <div className="nodisplay" ></div>
        <SideNavPage />
        <div className="maindivofeverypage">
          <InfiniteScroll
            dataLength={questions.length} 
            next={handleLoadMore}
            hasMore={hasMore}
            loader={
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refreshFeed}
            pullDownToRefresh
            pullDownToRefreshThreshold={200}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            {questions.map(question => <Question key={question._id} question={question} />)}
          </InfiniteScroll>

        </div>
      </>);
};

export default App;
