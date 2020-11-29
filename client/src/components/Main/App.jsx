import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import './styles.css'
import Question from "./ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from './../../ajaxRequest';
const App = function(props) {

    const [questions, setQuestions] = useState([]);

    useEffect(async () => {
      // let res = await axiosCall('GET', `${ENDPOINT}/Question/profilePrivileges/bookmarks`);
      let res = await axiosCall('GET', `${ENDPOINT}/feed/get-feed`);
      console.log(res.data.questions);
      if (res.data.questions.length == 0) {
          let refresh_res = await axiosCall('POST', `${ENDPOINT}/feed/refresh-feed`);
          if (refresh_res.data.feed == 'refreshed')
              res = await axiosCall('GET', `${ENDPOINT}/feed/get-feed`);
      } 
      setQuestions(res.data.questions);
    }, []);

    const uploadRef = useRef(null);
    function showuploadbox(){
      uploadRef.current.classList.toggle("uploadbox");
    }

    return (
      <>
        <MyNav user={props.user} showuploadbox={showuploadbox} />
        <div ref={uploadRef} className="nodisplay" ></div>
        <SideNavPage />
        <div className="maindivofeverypage">
          {questions ? questions.map(question => <Question key={question._id}  ques={question}/>): <></>}
        </div>
      </>);
};

export default App;
