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

import InfiniteScroll from 'react-infinite-scroller';
// import InfiniteScroll from 'react-infinite-scroll-component';

const App = function(props) {

  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  async function refreshFeed(event) {
    setHasMore(true);
    let refresh_res = await axiosCall('POST', `${ENDPOINT}/feed/refresh-feed`);
    setQuestions([]);
  }
  
  async function handleLoadMore(page) {
    let newQuestions = await axiosCall('GET', `${ENDPOINT}/feed/get-feed?page=${page}`);
    if (newQuestions.data.questions.length > 0) {
      return setQuestions(questions.concat(newQuestions.data.questions));
    } else {
      return setHasMore(false);
    }
  }

    return (
      <>
        <MyNav user={props.user} />
        <div className="nodisplay" ></div>
        <SideNavPage />
        <div className="maindivofeverypage">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>}
            initialLoad={initialLoad}
          >
            
            {questions.map(question => <Question key={question._id} question={question} />)}
          </InfiniteScroll>
          {hasMore == false &&
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            <br/>
              <button onClick={refreshFeed}>Refresh page</button>
            </p>}
        </div>
      </>);
};

export default App;
