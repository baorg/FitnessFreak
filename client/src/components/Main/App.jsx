import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import './styles.css'
import Question from "./ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';

const App = function(props) {

  const [ques, setQues] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/Question/getQuestions`,{ withCredentials: true })
      .then(res => {
        if (res.data.isAuthenticated) {
          console.log("res.data = " ,res.data);
          setQues(res.data && res.data.questions);
        } else {
          navigate('/');
        }
      });
  }, []);

  const uploadRef = useRef(null);
  function showuploadbox(){
    uploadRef.current.classList.toggle("uploadbox");
  }

  return (  
    <>
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      <div ref={uploadRef} className="nodisplay" ></div>
      <SideNavPage />
      <div className="posts">
        {ques && ques.map((item, index) => <Question key={index}  ques={item}/>)}
      </div>
    </>
  );
};

export default App;
