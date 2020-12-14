import React, { useState } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import Question from "../Question/Question/ques";
import axiosCall from '../../ajaxRequest';
import Spinner from 'react-bootstrap/Spinner'
import { Button } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller';

import CONFIG from '../../../config.json';


const App = function(props) {
  const [feed, setFeed] = useState({questions:[], current_page: 0 });
  const [hasMore, setHasMore] = useState(true);

  async function refreshFeed(event) {
    await axiosCall('POST', `${CONFIG.API_DOMAIN}/feed/refresh-feed`);
    setFeed({questions:[], current_page: 0});
    setHasMore(true);
  }
  
  async function handleLoadMore(page_) {
    let page = feed.current_page+1;
    let newQuestions = await axiosCall('GET', `${CONFIG.API_DOMAIN}/feed/get-feed?page=${page}`);
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
      <>
        <MyNav user={props.user} />
        <div className="nodisplay" ></div>
        <SideNavPage user={props.user}/>
        <div className="maindivofeverypage">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>}
          >
            {feed.questions.map(question => <Question key={question._id} question={question} />)}
          </InfiniteScroll>
          {hasMore === false &&
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
              <br/>
              <Button  onClick={refreshFeed} variant="contained" color="primary" href="#contained-buttons">Refresh page</Button>
            </p>}
        </div>
      </>);
};

export default App;
