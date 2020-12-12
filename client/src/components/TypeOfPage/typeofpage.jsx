import React, { useState,useRef,useEffect } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import Question from "../Question/Question/ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from "../../ajaxRequest";
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-bootstrap/Spinner'


const TypeOfPage = function(props) {
  const [ques, setQues] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function handleLoadMore(page_) {
    let url;
    if(props.categoryname)
    url=`${ENDPOINT}/Question/getQuestionsCategoryWise/${props.categoryname}`;
    else
    url=`${ENDPOINT}/Question/${props.typeofpage}`
    let newQuestions = await axios.get(`${url}?page=${page_}`, { withCredentials: true })
    if(newQuestions.data.err){
      navigate("/");
    }
    if (newQuestions.data.data.length > 0) {
      return setQues(ques.concat(newQuestions.data.data));
    } else {
      return setHasMore(false);
    }
  }

  return (
    <>
      <MyNav user={props.user} />
      <SideNavPage user={props.user}/>
      <div className="maindivofeverypage" style={{textAlign:"left"}}>
        <h2 style={{marginBottom:"40px"}}>{props.typeofpage}{props.categoryname?` : ${props.categoryname}`:null}</h2>
        {/* <h2>{props.categoryname}</h2> */}
        {/* <div>
        { ques.map((item, index) => <Question key={index}  question={item}/>)}
        </div> */}
        <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>}
          >
            {ques.map(question => <Question key={question._id} question={question} />)}
          </InfiniteScroll>
        {hasMore == false &&
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            <br />
          </p>}
        </div>
    </>
  );
};

export default TypeOfPage;
